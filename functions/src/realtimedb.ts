import * as functions from 'firebase-functions';

const coldBootTime = Date.now()
let coldBoot = true;

export const onCreatePostRTD = functions.database.ref('/posts/{PostID}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    console.log('data', data)
    if (data.fail) {
        throw new Error('just fail')
    }
    if (data.failGracefully) {
        return true;
    }
    const now = Date.now()
    const createdAt = new Date(context.timestamp).getTime();
    let runFromCold = false;

    if (coldBoot) {
        runFromCold = true;
        coldBoot = false;
    }
    return snapshot.ref.update({
        cloudFunctionStart: now,
        documentCreatedAt: createdAt,
        coldBootTime,
        runFromCold
    }).then(() => {
        const firstUpdate = Date.now()

        const CreateToExecute = (now - createdAt);
        const CreateToDone = (firstUpdate - createdAt);
        const TotalTime = (firstUpdate - data.requestedAt);
        
        return snapshot.ref.update({
            firstUpdate,
            TotalTime,
            CreateToExecute,
            CreateToDone
        })    
    })
})
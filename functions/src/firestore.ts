import * as functions from 'firebase-functions';

const coldBootTime = new Date();
let coldBoot = true;

export const onCreatePost = functions.firestore.document('posts/{PostID}').onCreate((snapshot, context) => {
    const now = new Date()
    const createdAt = new Date(context.timestamp);
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
        const firstUpdate = new Date()
        const CreateToExecute = (now.getTime() - createdAt.getTime());
        const CreateToDone = (firstUpdate.getTime() - createdAt.getTime());
        const TotalTime = (firstUpdate.getTime() - snapshot.data().requestedAt.toMillis());
        
        return snapshot.ref.update({
            firstUpdate,
            TotalTime,
            CreateToExecute,
            CreateToDone
        })    
    })
})
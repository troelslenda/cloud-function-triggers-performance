import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()


export const createPost = functions.https.onRequest((request, response) => {

    let requestTime;
    if (request.query.realtimedb) {
        requestTime = Date.now();
    }
    else {
        requestTime = new Date();
    }

    const post: any = {
        requestedAt: requestTime,
        message: request.query.message
    }

    if (request.query.failGracefully) {
        post.failGracefully = true;
    }

    let promise;
    if (request.query.realtimedb) {
        const ref = admin.database().ref('posts')
        const newRef = ref.push();
        console.log('post', post)
        promise = newRef.set(post).then(() => {
            response.send('done')
        })

    } else {
        promise = admin.firestore().collection('posts').add(post).then(() => {
            response.send('done')
        })
    }
    return promise

})
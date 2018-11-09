const admin = require('../functions/node_modules/firebase-admin')
const serviceAccount = require('./playground-3299f-firebase-adminsdk-w02dk-7663b927e0.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
admin.firestore().settings({ timestampsInSnapshots: true })

const db = admin.firestore()

db.collection('posts').where('TotalTime', '>', 500).orderBy('TotalTime', 'desc').get().then(query => {

    let counts = {
        total: 0,
        above20: 0,
        above20startis80percent: 0,
        above10: 0,
        above10startis80percent: 0,
        above8: 0,
        above8startis80percent: 0,
        above5: 0,
        above5startis80percent: 0,
        runFromCold: 0,
        subOne: 0,
        sub500: 0,
        sub100: 0,
        sub50: 0,
        sub30: 0
    }
    let docs = []

    query.forEach(doc => {
        counts.total++;
        if (doc.data().TotalTime > 20000) {
            counts.above20++;
            if ((doc.data().CreateToExecute * 100 / doc.data().TotalTime) >= 80) {
                counts.above20startis80percent++
            }
        }
        if (doc.data().TotalTime > 10000) {
            counts.above10++;
            if ((doc.data().CreateToExecute * 100 / doc.data().TotalTime) >= 80) {
                counts.above10startis80percent++
            }
        }

        const createToExecute = doc.data().CreateToExecute;
        const timeInFunction = doc.data().TotalTime - doc.data().CreateToExecute
        docs.push({ TT: doc.data().TotalTime, createToExecute, timeInFunction })

        if (doc.data().TotalTime > 8000) {
            counts.above8++;
            if ((doc.data().CreateToExecute * 100 / doc.data().TotalTime) >= 80) {
                counts.above8startis80percent++
            }
        }
        if (doc.data().TotalTime > 5000) {
            counts.above5++;
            if ((doc.data().CreateToExecute * 100 / doc.data().TotalTime) >= 80) {
                counts.above5startis80percent++
            }
        }
        if (doc.data().runFromCold) {
            counts.runFromCold++;
        }
        if (doc.data().TotalTime < 1000) {
            counts.subOne++;
        }
        if (doc.data().TotalTime < 500) {
            counts.sub500++;
        }
        if (doc.data().TotalTime < 500) {
            counts.sub500++;
        }
        if (doc.data().TotalTime < 100) {
            counts.sub100++;
        }
        if (doc.data().TotalTime < 50) {
            counts.sub50++;
        }
        if (doc.data().TotalTime < 30) {
            counts.sub30++;
        }

    })

    console.log(`Counts:`, counts)
    console.log(docs)
})
const admin = require('../functions/node_modules/firebase-admin')
const serviceAccount = require('./playground-3299f-firebase-adminsdk-w02dk-7663b927e0.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://playground-3299f.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true })

const db = admin.database()



db.ref('posts').on("value", function (snapshot) {


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


    snapshot.forEach(document => {
        const data = document.val()

        counts.total++;
        if (data.TotalTime > 20000) {
            counts.above20++;
            if ((data.CreateToExecute * 100 / data.TotalTime) >= 80) {
                counts.above20startis80percent++
            }
        }
        if (data.TotalTime > 10000) {
            counts.above10++;
            if ((data.CreateToExecute * 100 / data.TotalTime) >= 80) {
                counts.above10startis80percent++
            }
        }

        const createToExecute = data.CreateToExecute;
        const timeInFunction = data.TotalTime - data.CreateToExecute

        if (data.TotalTime > 8000) {
            counts.above8++;
            if ((data.CreateToExecute * 100 / data.TotalTime) >= 80) {
                counts.above8startis80percent++
            }
        }
        if (data.TotalTime > 5000) {
            counts.above5++;
            if ((data.CreateToExecute * 100 / data.TotalTime) >= 80) {
                counts.above5startis80percent++
            }
        }
        if (data.runFromCold) {
            counts.runFromCold++;
        }
        if (data.TotalTime > 20000) {
            counts.above20++;
        }
        if (data.TotalTime > 10000) {
            counts.above10++;
        }
        if (data.above8 > 8000) {
            counts.subOne++;
        }
        if (data.TotalTime > 5000) {
            counts.above5++;
        }
        if (data.TotalTime < 1000) {
            counts.subOne++;
        }
        if (data.TotalTime < 500) {
            counts.sub500++;
        }
        if (data.TotalTime < 100) {
            counts.sub100++;
        }
        if (data.TotalTime < 50) {
            counts.sub50++;
        }
        if (data.TotalTime < 30) {
            counts.sub30++;
        }
    })


    console.log(`Counts:`, counts)
    console.log(docs)

})

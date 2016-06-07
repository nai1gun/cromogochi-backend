const firebase = require('firebase');
const CronJob = require('cron').CronJob;

var startChromogochiJob = function() {
    firebase.initializeApp({
      databaseURL: 'https://chromogochi.firebaseio.com',
      serviceAccount: 'Chromogochi-c0e499a26651.json'
    });

    var db = firebase.database();

    /**
     * Do something with each dyno and save the data back
     */
    function doAndSave(task) {
        var ref = db.ref('/');
        ref.once('value', function(chromogochi) {
            chromogochi.forEach(function(snapshot) {
                try {
                    var name = snapshot.getKey();
                    var obj = snapshot.val();
                    var dyno = obj.dyno;
                    task(dyno);
                    ref.child(name + '/dyno').set(dyno);
                } catch (e) {
                    console.error(e);
                }
            });
        });
    }

    new CronJob('0 0 * * *', function() { // Increment age job - every day 0:00
        doAndSave(function(dyno) {
            dyno.age++;
        });
    }, null, true);

    new CronJob('10 * /2 * * *', function() { // decrement values job - 10 past every 2-nd hour
        doAndSave(function(dyno) {
            if (dyno.sleep > 0) {
                dyno.sleep--;
            }
            if (dyno.joy > 0) {
                dyno.joy--;
            }
            if (dyno.hunger > 0) {
                dyno.hunger--;
            }
        });
    }, null, true);
};

module.exports = {
    startJobs: function () {
        startChromogochiJob();
    }
};
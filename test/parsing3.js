const CronJob = require('cron').CronJob;
const parsing = require("./parsing");
main = async ()=> {
    let job1 = new CronJob('0***REMOVED***/3***REMOVED******REMOVED******REMOVED******REMOVED***', async function () {
        const d = new Date();
        const daddy = this
        console.log('Every 3 minutes between 19-17:', d);
        /*await parsing().then((res) => {
                console.log('Res', res)
                if (res === true) {
                    console.log('Stopping Cron?')
                    daddy.stop();
              ***REMOVED*** else {
                    console.log('Continue with Cron')
              ***REMOVED***
          ***REMOVED***
        )*/
  ***REMOVED***)
    job1.start()
***REMOVED***
main();
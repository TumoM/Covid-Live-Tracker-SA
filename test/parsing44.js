const CronJob = require('cron').CronJob;
const parsing = require("./parsing");
let job2 = null;
let i = 0;
main = async ()=> {
    console.log('in Main')
    job2 = new CronJob('30***REMOVED***/1***REMOVED******REMOVED******REMOVED******REMOVED***', async function () {
        console.log(++i)
        const d = new Date();
        const daddy = this
        console.log('Every 30 minutes between 19-17:', d);
        await parsing().then((res) => {
                console.log('Res', res)
                if (res === true) {
                    console.log('Stopping Cron?')
                    daddy.stop();
              ***REMOVED*** else {
                    console.log('Continue with Cron')
              ***REMOVED***
          ***REMOVED***
        )
  ***REMOVED***)
    console.log('Starting cron job')
    job2.start()
***REMOVED***
main();
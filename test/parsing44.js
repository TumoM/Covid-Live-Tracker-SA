const CronJob = require('cron').CronJob;
const parsing = require("./parsing");
let job2 = null;
let i = 0;
main = async ()=> {
    console.log('in Main')
    job2 = new CronJob('30 */1 * * * *', async function () {
        console.log(++i)
        const d = new Date();
        const daddy = this
        console.log('Every 30 minutes between 19-17:', d);
        await parsing().then((res) => {
                console.log('Res', res)
                if (res === true) {
                    console.log('Stopping Cron?')
                    daddy.stop();
                } else {
                    console.log('Continue with Cron')
                }
            }
        )
    })
    console.log('Starting cron job')
    job2.start()
}
main();
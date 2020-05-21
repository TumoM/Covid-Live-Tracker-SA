    const {Builder, By, until} = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const chromedriver = require('chromedriver');

let links = ['https://sacoronavirus.co.za/2020/04/26/update-on-covid-19-26',
    'https://sacoronavirus.co.za/2020/04/25/update-on-covid-19-25th-april-2020',
    'https://sacoronavirus.co.za/2020/04/24/update-on-covid-19-24th-april-2020',
    'https://sacoronavirus.co.za/2020/04/23/update-on-covid-19-23rd-april-2020',
    'https://sacoronavirus.co.za/2020/04/22/update-on-covid-19-22nd-april-2020',
    'https://sacoronavirus.co.za/2020/04/21/update-on-covid-19-21st-april-2020',
    'https://sacoronavirus.co.za/2020/04/20/update-on-covid-19-20th-april-2020',
    'https://sacoronavirus.co.za/2020/04/19/update-on-covid-19-19th-april-2020',
    'https://sacoronavirus.co.za/2020/04/18/update-on-covid-19-18th-april-2020'];
// let links = []
    let options = new chrome.Options();
    //Below arguments are critical for Heroku deployment
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
(async function example() {
    const promiseArray = []
   /* await links.map(async link=>{
        await driver.get(link)
            .then(async ()=>{
                driver.wait(until.elementsLocated(By.css('.post-content')));
                promiseArray.push(driver.getPageSource())
                console.log("Waiting Done.")
            })
    })*/
    let htmls = []
        /*Promise.all(links.map(async link=>{
            console.log('Getting Link')
            return driver.get(link).then(()=>{
                console.log('Starting sleeping')
                return driver.sleep(6*1000).then(()=> {
                return driver.wait(until.elementLocated(By.css('.post-content')))
                    .then(async ()=>{
                        console.log('done sleeping');
                        let element = driver.findElement((By.css('.post-content')))
                        let html = await element.getAttribute('innerHTML');
                        htmls.push(html)
                        console.log(html)
                        return Promise.resolve(html)

                    })
                })
            })
        }))
            .then(results =>{
                console.log('R1',results)
            })
            .catch(e=>{
                console.log('E1',e)
            })*/

    // await links.map(async link =>{
    let getHtml = async (links)=>{
        htmls = [];
        console.log('Building (Headless) Driver')
        let driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        console.log('Starting Driver loop')
        for (let i = 0;i<links.length;i++){
            let loop = true;
            while (loop) {
                await driver.get(links[i])
                await driver.wait(until.elementLocated(By.css('.post-content')), 10 * 1000)
                const element = await driver.findElement(By.css('article'))
                const html = await element.getAttribute('innerHTML');
                htmls.push(html)
                console.log('R2', html.match(/\d{2}(?:\w{2})?\s\w{3,9}\s20\d{2}?/i)[0])
                if (html){
                    loop = false;
                }
            }
        }
        console.log('Quitting Driver.')
        await driver.quit();
        console.log('Returning Promise.')
        return Promise.resolve(htmls);
    }
    let res = await getHtml(links)
    console.log("RES",res)

    console.log('R3', htmls)


    /* await Promise.all(links.map(async url => {
         // let driver = new Builder().forBrowser('firefox').build();
         executeTask(driver,url).then(result => {
             console.log(result);
             return Promise.resolve(result)
             }).catch(err => {
             //handle errors
             });
         }))

         .then(resolvedList =>{
         console.log("Resolved",resolvedList)

             // do something with resolvedList
     })*/
})();
    async function executeTask (driver,url) {
        try{
            return driver.get(url).then(async ()=>{
                await driver.wait(until.elementsLocated(By.css('.post-content')))
                    .then(async ()=>{
                        let html = await driver.getPageSource().then(html=>{
                            return Promise.resolve(html);
                        });
                        console.log(html)
                    })

            });

        }
        catch(err) {
            return Promise.reject(err);
        }
    }


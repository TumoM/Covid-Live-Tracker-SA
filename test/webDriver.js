    const {Builder, By, Key, until***REMOVED*** = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        // Navigate to Url
        await driver.get('http://sacoronavirus.co.za/?s=update');
        driver.wait(until.elementsLocated(By.css('.entry-title.fusion-post-title a')))
            .then(async value => {
                let html = await driver.getPageSource();
                console.log(html);
          ***REMOVED***);
        await driver.wait(until.elementsLocated(By.css('.single-post')));

  ***REMOVED***
    finally{
        await driver.quit();
  ***REMOVED***
***REMOVED***)();

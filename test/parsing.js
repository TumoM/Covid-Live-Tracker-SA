const HTMLParser = require('node-html-parser'),
    rp = require('request-promise');

const url = "https://sacoronavirus.co.za/category/press-releases-and-notices/";
const linkRegex = /.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}\//
const regex = RegExp('.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}\/', 'g');

rp(url)
    .then(function (html) {
        //success!
        console.log("success!!");
        //   console.log(html);
        const root = HTMLParser.parse(html);
        //console.log("Root",root);

        //console.log(root.structure);
        var entries = root.querySelectorAll(".entry-title.fusion-post-title a");
        var links = []
        console.log("About to filter");
        entries = entries.filter((entry) => {
            // return entry.getAttribute("href").match(linkRegex)
            if (entry.getAttribute("href").match(linkRegex)) {
                console.log("Found One!\n",entry.text);
                  console.log("Outer: ",entry.outerHTML);
                  console.log("Inner: ",entry.innerHTML);
                  console.log("Href: ",entry.getAttribute("href"),"\n");
                  links.push(entry.getAttribute("href"))
                return true;
            }
            else{
                return false;
            }
        });
        console.log(links);
        
        // Pull the stats off a URL
    })
    .catch(function (err) {
        //handle error
    });
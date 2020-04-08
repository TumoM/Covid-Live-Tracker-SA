const HTMLParser = require('node-html-parser'),
    rp = require('request-promise');

const url = "https://sacoronavirus.co.za/category/press-releases-and-notices/";
const linkRegex = /.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\//
const regex = RegExp('.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\/', 'g');

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
                  rp(entry.getAttribute("href"))
                  .then(function (html) {
                      const rootChild = HTMLParser.parse(html);
                      // pull out the two tables 1st
                      const tables = rootChild.querySelectorAll("table");
                      const [table1,table2] = tables;
                      // console.log("TABLE 1 : ",table1.toString(),"\n");
                      // console.log("TABLE 2 : ",table2.toString(),"\n");

                      // pull out paragraph after 1st table
                      const tags = rootChild.querySelector(".post-content").childNodes;

                      let tableFound = false; // A able has been found in the html.
                      let parFound = false; // a valid value has been returned.
                      let tests = tags.filter(tag => { // Filters out the paragraph tag after the 1st table.
                          if (!tableFound) {
                              if (tag.tagName === "table"){
                                  tableFound = true;
                            ***REMOVED***
                        ***REMOVED***else if (!parFound){
                              if (tag.text === "\n") { // Ignores newlines that may crop up.
                                  return false;
                            ***REMOVED***
                              parFound = true;
                              return tag;
                        ***REMOVED***
                    ***REMOVED***);
                      console.log("TESTS:",(tests[0].text).match(/\s((\d+\s+)*\d+)/)[0].trim()); // Matches the string for for the test cases.
                console.log("Found Two!: ",entry.text,"\n");




                ***REMOVED***)
                  .catch(function (err) {
                      //handle error
                ***REMOVED***);
                return true;
          ***REMOVED***
            else{
                return false;
          ***REMOVED***
      ***REMOVED***);
        console.log(links);
        links.forEach(async link => {
            
      ***REMOVED***);
        
        // Pull the stats off a URL
  ***REMOVED***)
    .catch(function (err) {
        //handle error
  ***REMOVED***);
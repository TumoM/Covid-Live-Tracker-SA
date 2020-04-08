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
        entries = entries.filter((entry) => {
            // return entry.getAttribute("href").match(linkRegex)
            if (entry.getAttribute("href").match(linkRegex)) {
                // console.log("Found One!\n", entry.text);
                // console.log("Outer: ", entry.outerHTML);
                // console.log("Inner: ", entry.innerHTML);
                // console.log("Href: ", entry.getAttribute("href"), "\n");
                links.push(entry.getAttribute("href"))
                rp(entry.getAttribute("href"))
                    .then(function (html) {
                        const rootChild = HTMLParser.parse(html);
                        // pull out the two tables 1st
                        const tables = rootChild.querySelectorAll("table");
                        const [table1, table2] = tables;
                        // ToDo: Handle these 2 tables for Provincial Data.

                        // Creates a new root from both tables
                        const rootTable1 = HTMLParser.parse(table1.outerHTML);
                        const rootTable2 = HTMLParser.parse(table2.outerHTML);

                        // Extracts the rows from each table
                        const rowsTable1 = rootTable1.querySelectorAll("tr")
                        const rowsTable2 = rootTable2.querySelectorAll("tr")
                        // console.log(rowsTable1);
                        
                        rowsTable1.forEach((row) =>{
                            row = row.text.split(" ");
                            let name = "";
                            let count = 0;
                            row.forEach((index) =>{
                                if (index.match(/^\d+$/)){ // Checks that index value is a digit
                                    count = Number(index)
                              ***REMOVED***
                                else{
                                    name += index+" " // Appends word and adds a space that was removed from split
                              ***REMOVED***
                          ***REMOVED***)
                            name = name.trim();
                            name = name == "KWAZULU – NATAL"? "KWAZULU–NATAL":name
                            console.log(name,"-",count);
                      ***REMOVED***)

                        // pull out paragraph after 1st table
                        const tags = rootChild.querySelector(".post-content").childNodes;

                        let tableFound = false; // A able has been found in the html.
                        let parFound = false; // a valid value has been returned.
                        let tests = tags.filter(tag => { // Filters out the paragraph tag after the 1st table.
                            if (!tableFound) {
                                if (tag.tagName === "table") {
                                    tableFound = true;
                              ***REMOVED***
                          ***REMOVED*** else if (!parFound) {
                                if (tag.text === "\n") { // Ignores newlines that may crop up.
                                    return false;
                              ***REMOVED***
                                parFound = true;
                                return tag;
                          ***REMOVED***
                      ***REMOVED***);
                        console.log("TESTS:", (tests[0].text).match(/\s((\d+\s+)*\d+)/)[0].trim()); // Matches the string for for the test cases.
                        // console.log("Found Two!: ", entry.text, "\n");
                        console.log("\n");
                  ***REMOVED***)
                    .catch(function (err) {
                        //handle error
                  ***REMOVED***);
                return true;
          ***REMOVED*** else {
                return false;
          ***REMOVED***
      ***REMOVED***);
        // Pull the stats off a URL
  ***REMOVED***)
    .catch(function (err) {
        //handle error
  ***REMOVED***);
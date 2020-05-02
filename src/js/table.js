//define custom mutator
var dateMutator = function(value, data, type, params, component){
    //value - original value of the cell
    //data - the data for the row
    //type - the type of mutation occurring  (data|edit)
    //params - the mutatorParams object from the column definition
    //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
    // ToDo Return date, currently giving the wrong
    // return `${date.getFullYear()***REMOVED***-${date.getMonth()***REMOVED***-${date.getDay()***REMOVED***` //return the new value for the cell data.
    return new Date(value); //return the new value for the cell data.
***REMOVED***

var dateFormatter = function(cell, formatterParams){
    var value = cell.getValue();

    if(value){
        value = moment(value).format('DD/MM/YYYY');
        // value = moment(value).format("MMM DD, YYYY");
  ***REMOVED***

    return value;
***REMOVED***

var numberFormat = function(value, data, type, params, component){
    //value - original value of the cell
    //data - the data for the row
    //type - the type of mutation occurring  (data|edit)
    //params - the mutatorParams object from the column definition
    //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
    // console.log("Type:",typeof value)
    // console.log(component)

    return value === null?null:numeral(value).format('0,0'); //return the new value for the cell data.
***REMOVED***

function setTable(data){
    var fieldEl = document.getElementById("sort-field");
    var dirEl = document.getElementById("sort-direction");

    var table = new Tabulator("#example-table", {
        index:"date", //set the index field to the "age" field.
        layout:"fitColumns",
        responsiveLayout:"hide",
        height:"100%",
        sortOrderReverse:true,
        movableColumns: true,
        pagination:"local",
        paginationSize:30,
        paginationSizeSelector:[10,20,30,50,100,200,500],
        initialSort:[
            {column:"date", dir:"desc"***REMOVED***, //sort by this first
            // {column:"height", dir:"desc"***REMOVED***, //then sort by this second
    ***REMOVED***,
        resizableColumns: false,
        columns:[
            {title:"Date", field:"date",headerSortTristate:true,sorter:"datetime", sorterParams:{
            format:"YYYY/MM/DD",
            alignEmptyValues:"bottom",
  ***REMOVED***mutator: dateMutator, formatter:"datetime", formatterParams:{
                    outputFormat:"DD/MM/YYYY",
                    invalidPlaceholder:"(invalid date)"
              ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            {title:"Total Cases", field:"totalCases",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Total Deaths", field:"totalDeaths",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Total Recoveries", field:"totalRecoveries",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Active Cases", field:"activeCases",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Total Tests", field:"totalTests",sorter:'number', headerSortStartingDir:"desc",headerSortTristate:true, sorterParams:{alignEmptyValues:"bottom",***REMOVED***,formatter:function(cell, formatterParams, onRendered)
                {
                    //cell - the cell component
                    //formatterParams - parameters set for the column
                    //onRendered - function to call when the formatter has been rendered
                    /*console.log("Get Value Len",cell.getValue())
                    console.log(cell.getValue())*/
                    let x = cell.getValue()
                    if (!x){
                        x = "N/A";
                  ***REMOVED***
                    return x
    ***REMOVED*****REMOVED*****REMOVED***headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Daily Cases", field:"dailyNew",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Daily Deaths", field:"dailyDeaths",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
    ***REMOVED***,
  ***REMOVED***);

    table.setData(data)
        .then(function(){
            //Trigger sort when "Trigger Sort" button is clicked
            document.getElementById("sort-trigger").addEventListener("click", function(){
                table.setSort(fieldEl.options[fieldEl.selectedIndex].value, dirEl.options[dirEl.selectedIndex].value);
          ***REMOVED***);
            document.getElementById("sort-reset").addEventListener("click", function(){
                table.clearSort();
                table.setSort('date','desc');
          ***REMOVED***);
      ***REMOVED***)
        .catch(function(error){
            //handle error loading data
      ***REMOVED***);
***REMOVED***
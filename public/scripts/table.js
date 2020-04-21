
let dummyData = [
    {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1***REMOVED***,
    {id:2, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true***REMOVED***,
    {id:3, name:"Christine Lobowski", age:"42", height:0, col:"green", dob:"22/05/1982", cheese:"true"***REMOVED***,
    {id:4, name:"Brendon Philips", age:"125", gender:"male", height:1, col:"orange", dob:"01/08/1980"***REMOVED***,
    {id:5, name:"Margret Marmajuke", age:"16", gender:"female", height:5, col:"yellow", dob:"31/01/1999"***REMOVED***,
    {id:6, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1***REMOVED***,
    {id:7, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true***REMOVED***,
    {id:8, name:"Christine Lobowski", age:"42", height:0, col:"green", dob:"22/05/1982", cheese:"true"***REMOVED***,
    {id:9, name:"Brendon Philips", age:"125", gender:"male", height:1, col:"orange", dob:"01/08/1980"***REMOVED***,
    {id:10, name:"Margret Marmajuke", age:"16", gender:"female", height:5, col:"yellow", dob:"31/01/1999"***REMOVED***,
];
let date
//define custom mutator
var dateMutator = function(value, data, type, params, component){
    //value - original value of the cell
    //data - the data for the row
    //type - the type of mutation occurring  (data|edit)
    //params - the mutatorParams object from the column definition
    //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
    console.log("Type:",typeof value)
    console.log(value)
    date =new Date(value)
    // ToDo Return date, currently giving the wrong
    // return `${date.getFullYear()***REMOVED***-${date.getMonth()***REMOVED***-${date.getDay()***REMOVED***` //return the new value for the cell data.
    return date; //return the new value for the cell data.
***REMOVED***

var dateFormatter = function(cell, formatterParams){
    var value = cell.getValue();

    if(value){
        value = moment(value).format("MMM DD, YYYY");
  ***REMOVED***

    return value;
***REMOVED***

var numberFormat = function(value, data, type, params, component){
    //value - original value of the cell
    //data - the data for the row
    //type - the type of mutation occurring  (data|edit)
    //params - the mutatorParams object from the column definition
    //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
    console.log("Type:",typeof value)
    console.log(component)
    return value; //return the new value for the cell data.
***REMOVED***

setTable = (data)=>{
    var fieldEl = document.getElementById("sort-field");
    var dirEl = document.getElementById("sort-direction");

    var table = new Tabulator("#example-table", {
        index:"date", //set the index field to the "age" field.
        layout:"fitColumns",
        sortOrderReverse:true,
        movableColumns: true,
        initialSort:[
            {column:"totalCases", dir:"desc"***REMOVED***, //sort by this first
            // {column:"height", dir:"desc"***REMOVED***, //then sort by this second
    ***REMOVED***,
        resizableColumns: false,
        frozen:true,
        columns:[
            {title:"Date", field:"date", widthGrow:1,headerSortTristate:true,sorter:"datetime", sorterParams:{
            format:"YYYY/MM/DD",
            alignEmptyValues:"top",
  ***REMOVED***mutator: dateMutator, formatter:"datetime", formatterParams:{
                    outputFormat:"MMM DD, YYYY",
                    invalidPlaceholder:"(invalid date)"
              ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            {title:"Cases", field:"totalCases",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Deaths", field:"totalDeaths",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Recoveries", field:"totalRecoveries",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Active", field:"activeCases",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat***REMOVED***,
            {title:"Tests", field:"totalTests",sorter:'number', sorterParams:{alignEmptyValues:"bottom",***REMOVED***,formatter:function(cell, formatterParams, onRendered)
                {
                    //cell - the cell component
                    //formatterParams - parameters set for the column
                    //onRendered - function to call when the formatter has been rendered
                    console.log("Get Value Len",cell.getValue())
                    console.log(cell.getValue())
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

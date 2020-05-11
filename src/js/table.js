//define custom mutator
var dateMutator = function(value, data, type, params, component){
    //value - original value of the cell
    //data - the data for the row
    //type - the type of mutation occurring  (data|edit)
    //params - the mutatorParams object from the column definition
    //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
    // ToDo Return date, currently giving the wrong
    // return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` //return the new value for the cell data.
    return new Date(value); //return the new value for the cell data.
}

var dateFormatter = function(cell, formatterParams){
    var value = cell.getValue();

    if(value){
        value = moment(value).format('DD/MM/YYYY');
        // value = moment(value).format("MMM DD, YYYY");
    }

    return value;
}

var numberFormat = function(value, data, type, params, component){
    //value - original value of the cell
    //data - the data for the row
    //type - the type of mutation occurring  (data|edit)
    //params - the mutatorParams object from the column definition
    //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
    // console.log("Type:",typeof value)
    // console.log(component)

    return value === null?null:numeral(value).format('0,0'); //return the new value for the cell data.
}

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
            {column:"date", dir:"desc"}, //sort by this first
            // {column:"height", dir:"desc"}, //then sort by this second
        ],
        resizableColumns: false,
        columns:[
            {title:"Date", field:"date",headerSortTristate:true,sorter:"datetime", sorterParams:{
            format:"YYYY/MM/DD",
            alignEmptyValues:"bottom",
    },mutator: dateMutator, formatter:"datetime", formatterParams:{
                    outputFormat:"DD/MM/YYYY",
                    invalidPlaceholder:"(invalid date)"
                }
            },
            {title:"Total Cases", field:"totalCases",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat},
            {title:"Total Deaths", field:"totalDeaths",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat},
            {title:"Total Recoveries", field:"totalRecoveries",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat},
            {title:"Active Cases", field:"activeCases",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat},
            {title:"Total Tests", field:"totalTests",sorter:'number', headerSortStartingDir:"desc",headerSortTristate:true, sorterParams:{alignEmptyValues:"bottom",},formatter:function(cell, formatterParams, onRendered)
                {
                    //cell - the cell component
                    //formatterParams - parameters set for the column
                    //onRendered - function to call when the formatter has been rendered
                    /*console.log("Get Value Len",cell.getValue())
                    console.log(cell.getValue())*/
                    let x = cell.getValue()
                    if (!x){
                        x = "N/A";
                    }
                    return x
                },headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat},
            {title:"Daily Cases", field:"dailyNew",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat},
            {title:"Daily Deaths", field:"dailyDeaths",sorter:'number',headerSortStartingDir:"desc",headerSortTristate:true, mutator: numberFormat},
        ],
    });

    table.setData(data)
        .then(function(){
            //Trigger sort when "Trigger Sort" button is clicked
            document.getElementById("sort-trigger").addEventListener("click", function(){
                table.setSort(fieldEl.options[fieldEl.selectedIndex].value, dirEl.options[dirEl.selectedIndex].value);
            });
            document.getElementById("sort-reset").addEventListener("click", function(){
                table.clearSort();
                table.setSort('date','desc');
            });
        })
        .catch(function(error){
            //handle error loading data
        });
}

let dummyData=[{id:1,name:"Billy Bob",age:"12",gender:"male",height:1,col:"red",dob:"",cheese:1***REMOVED***,{id:2,name:"Mary May",age:"1",gender:"female",height:2,col:"blue",dob:"14/05/1982",cheese:!0***REMOVED***,{id:3,name:"Christine Lobowski",age:"42",height:0,col:"green",dob:"22/05/1982",cheese:"true"***REMOVED***,{id:4,name:"Brendon Philips",age:"125",gender:"male",height:1,col:"orange",dob:"01/08/1980"***REMOVED***,{id:5,name:"Margret Marmajuke",age:"16",gender:"female",height:5,col:"yellow",dob:"31/01/1999"***REMOVED***,{id:6,name:"Billy Bob",age:"12",gender:"male",height:1,col:"red",dob:"",cheese:1***REMOVED***,{id:7,name:"Mary May",age:"1",gender:"female",height:2,col:"blue",dob:"14/05/1982",cheese:!0***REMOVED***,{id:8,name:"Christine Lobowski",age:"42",height:0,col:"green",dob:"22/05/1982",cheese:"true"***REMOVED***,{id:9,name:"Brendon Philips",age:"125",gender:"male",height:1,col:"orange",dob:"01/08/1980"***REMOVED***,{id:10,name:"Margret Marmajuke",age:"16",gender:"female",height:5,col:"yellow",dob:"31/01/1999"***REMOVED***];var dateMutator=function(e,t,r,a,o){return new Date(e)***REMOVED***,dateFormatter=function(e,t){var r=e.getValue();return r&&(r=moment(r).format("MMM DD, YYYY")),r***REMOVED***,numberFormat=function(e,t,r,a,o){return null===e?null:numeral(e).format("0,0")***REMOVED***;setTable=e=>{var t=document.getElementById("sort-field"),r=document.getElementById("sort-direction"),a=new Tabulator("#example-table",{index:"date",layout:"fitColumns",responsiveLayout:"hide",height:"100%",sortOrderReverse:!0,movableColumns:!0,pagination:"local",paginationSize:30,paginationSizeSelector:[10,20,30,50,100,200,500],initialSort:[{column:"date",dir:"desc"***REMOVED***],resizableColumns:!1,columns:[{title:"Date",field:"date",headerSortTristate:!0,sorter:"datetime",sorterParams:{format:"YYYY/MM/DD",alignEmptyValues:"bottom"***REMOVED***,mutator:dateMutator,formatter:"datetime",formatterParams:{outputFormat:"MMM DD, YYYY",invalidPlaceholder:"(invalid date)"***REMOVED******REMOVED***,{title:"Total Cases",field:"totalCases",sorter:"number",headerSortStartingDir:"desc",headerSortTristate:!0,mutator:numberFormat***REMOVED***,{title:"Total Deaths",field:"totalDeaths",sorter:"number",headerSortStartingDir:"desc",headerSortTristate:!0,mutator:numberFormat***REMOVED***,{title:"Total Recoveries",field:"totalRecoveries",sorter:"number",headerSortStartingDir:"desc",headerSortTristate:!0,mutator:numberFormat***REMOVED***,{title:"Active Cases",field:"activeCases",sorter:"number",headerSortStartingDir:"desc",headerSortTristate:!0,mutator:numberFormat***REMOVED***,{title:"Total Tests",field:"totalTests",sorter:"number",headerSortStartingDir:"desc",headerSortTristate:!0,sorterParams:{alignEmptyValues:"bottom"***REMOVED***,formatter:function(e,t,r){let a=e.getValue();return a||(a="N/A"),a***REMOVED***,headerSortStartingDir:"desc",headerSortTristate:!0,mutator:numberFormat***REMOVED***,{title:"Daily Cases",field:"dailyNew",sorter:"number",headerSortStartingDir:"desc",headerSortTristate:!0,mutator:numberFormat***REMOVED***,{title:"Daily Deaths",field:"dailyDeaths",sorter:"number",headerSortStartingDir:"desc",headerSortTristate:!0,mutator:numberFormat***REMOVED***]***REMOVED***);a.setData(e).then((function(){document.getElementById("sort-trigger").addEventListener("click",(function(){a.setSort(t.options[t.selectedIndex].value,r.options[r.selectedIndex].value)***REMOVED***)),document.getElementById("sort-reset").addEventListener("click",(function(){a.clearSort(),a.setSort("date","desc")***REMOVED***))***REMOVED***)).catch((function(e){***REMOVED***))***REMOVED***;
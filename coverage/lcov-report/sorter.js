/* eslint-disable***REMOVED***/
var addSorting = (function() {
   ***REMOVED*****REMOVED***;
    var cols,
        currentSort = {
            index: 0,
            desc: false
      ***REMOVED***;

    // returns the summary table element
    function getTable() {
        return document.querySelector('.coverage-summary');
  ***REMOVED***
    // returns the thead element of the summary table
    function getTableHeader() {
        return getTable().querySelector('thead tr');
  ***REMOVED***
    // returns the tbody element of the summary table
    function getTableBody() {
        return getTable().querySelector('tbody');
  ***REMOVED***
    // returns the th element for nth column
    function getNthColumn(n) {
        return getTableHeader().querySelectorAll('th')[n];
  ***REMOVED***

    // loads all columns
    function loadColumns() {
        var colNodes = getTableHeader().querySelectorAll('th'),
            colNode,
            cols = [],
            col,
            i;

        for (i = 0; i < colNodes.length; i += 1) {
            colNode = colNodes[i];
            col = {
                key: colNode.getAttribute('data-col'),
                sortable: !colNode.getAttribute('data-nosort'),
                type: colNode.getAttribute('data-type') || 'string'
          ***REMOVED***;
            cols.push(col);
            if (col.sortable) {
                col.defaultDescSort = col.type === 'number';
                colNode.innerHTML =
                    colNode.innerHTML + '<span class="sorter"></span>';
          ***REMOVED***
      ***REMOVED***
        return cols;
  ***REMOVED***
    // attaches a data attribute to every tr element with an object
    // of data values keyed by column name
    function loadRowData(tableRow) {
        var tableCols = tableRow.querySelectorAll('td'),
            colNode,
            col,
            data = {***REMOVED***,
            i,
            val;
        for (i = 0; i < tableCols.length; i += 1) {
            colNode = tableCols[i];
            col = cols[i];
            val = colNode.getAttribute('data-value');
            if (col.type === 'number') {
                val = Number(val);
          ***REMOVED***
            data[col.key] = val;
      ***REMOVED***
        return data;
  ***REMOVED***
    // loads all row data
    function loadData() {
        var rows = getTableBody().querySelectorAll('tr'),
            i;

        for (i = 0; i < rows.length; i += 1) {
            rows[i].data = loadRowData(rows[i]);
      ***REMOVED***
  ***REMOVED***
    // sorts the table using the data for the ith column
    function sortByIndex(index, desc) {
        var key = cols[index].key,
            sorter = function(a, b) {
                a = a.data[key];
                b = b.data[key];
                return a < b ? -1 : a > b ? 1 : 0;
***REMOVED*****REMOVED*****REMOVED***
            finalSorter = sorter,
            tableBody = document.querySelector('.coverage-summary tbody'),
            rowNodes = tableBody.querySelectorAll('tr'),
            rows = [],
            i;

        if (desc) {
            finalSorter = function(a, b) {
                return -1***REMOVED*** sorter(a, b);
          ***REMOVED***;
      ***REMOVED***

        for (i = 0; i < rowNodes.length; i += 1) {
            rows.push(rowNodes[i]);
            tableBody.removeChild(rowNodes[i]);
      ***REMOVED***

        rows.sort(finalSorter);

        for (i = 0; i < rows.length; i += 1) {
            tableBody.appendChild(rows[i]);
      ***REMOVED***
  ***REMOVED***
    // removes sort indicators for current column being sorted
    function removeSortIndicators() {
        var col = getNthColumn(currentSort.index),
            cls = col.className;

        cls = cls.replace(/ sorted$/, '').replace(/ sorted-desc$/, '');
        col.className = cls;
  ***REMOVED***
    // adds sort indicators for current column being sorted
    function addSortIndicators() {
        getNthColumn(currentSort.index).className += currentSort.desc
            ? ' sorted-desc'
            : ' sorted';
  ***REMOVED***
    // adds event listeners for all sorter widgets
    function enableUI() {
        var i,
            el,
            ithSorter = function ithSorter(i) {
                var col = cols[i];

                return function() {
                    var desc = col.defaultDescSort;

                    if (currentSort.index === i) {
                        desc = !currentSort.desc;
                  ***REMOVED***
                    sortByIndex(i, desc);
                    removeSortIndicators();
                    currentSort.index = i;
                    currentSort.desc = desc;
                    addSortIndicators();
              ***REMOVED***;
          ***REMOVED***;
        for (i = 0; i < cols.length; i += 1) {
            if (cols[i].sortable) {
                // add the click event handler on the th so users
                // dont have to click on those tiny arrows
                el = getNthColumn(i).querySelector('.sorter').parentElement;
                if (el.addEventListener) {
                    el.addEventListener('click', ithSorter(i));
              ***REMOVED*** else {
                    el.attachEvent('onclick', ithSorter(i));
              ***REMOVED***
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
    // adds sorting functionality to the UI
    return function() {
        if (!getTable()) {
            return;
      ***REMOVED***
        cols = loadColumns();
        loadData();
        addSortIndicators();
        enableUI();
  ***REMOVED***;
***REMOVED***)();

window.addEventListener('load', addSorting);

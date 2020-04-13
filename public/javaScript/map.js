function displayName(name) {
    document.getElementById('country-name').firstChild.data = name;
***REMOVED***
console.log("We here boy!!!!!");

(function() {
    var tooltip = document.getElementById('tooltip');
***REMOVED***)();



var triggers = document.getElementsByClassName('tooltip-trigger');
for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('mousemove', showTooltip);
    triggers[i].addEventListener('mouseout', hideTooltip);
***REMOVED***



function showTooltip(evt) {
    tooltip.setAttributeNS(null, "visibility", "visible");
***REMOVED***

function hideTooltip() {
tooltip.setAttributeNS(null, "visibility", "hidden");
***REMOVED***



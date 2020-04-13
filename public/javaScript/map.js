function displayName(name) {
    document.getElementById('country-name').firstChild.data = name;
}
console.log("We here boy!!!!!");

(function() {
    var tooltip = document.getElementById('tooltip');
})();



var triggers = document.getElementsByClassName('tooltip-trigger');
for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('mousemove', showTooltip);
    triggers[i].addEventListener('mouseout', hideTooltip);
}



function showTooltip(evt) {
    tooltip.setAttributeNS(null, "visibility", "visible");
}

function hideTooltip() {
tooltip.setAttributeNS(null, "visibility", "hidden");
}



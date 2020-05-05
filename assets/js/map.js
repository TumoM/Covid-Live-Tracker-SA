const provinceList={"NORTH WEST":"ZA-NW","EASTERN CAPE":"ZA-EC","FREE TATE":"ZA-FS",MPUMALANGA:"ZA-MP","NORTHERN CAPE":"ZA-NC",LIMPOPO:"ZA-LP","WESTERN CAPE":"ZA-WC",GAUTENG:"ZA-GT","KWAZULU-NATAL":"ZA-NL",UNALLOCATED:"ZA-UN"};let tooltip,tooltipText,tooltipRects;const width=415,legendTitle=$("#legTitle")[0],xPen=92,yPen=220;let legendSet=!1,colourVal=1,provCase={},provDeath={},provRecoveries={},cardList=[];function displayName(t){document.getElementById("country-name").firstChild.data=t}console.log("In Main"),cardList=[],function(){tooltip=document.getElementById("country-name"),tooltipText=tooltip.getElementsByTagName("text")[0],tooltipRects=tooltip.getElementsByTagName("rect");for(let t=0;t<tooltipRects.length;t++)tooltipRects[t].setAttributeNS(null,"width",415)}();const svg=document.getElementById("svg-1");let x,y,triggers=document.getElementsByClassName("tooltip-trigger");for(let t=0;t<triggers.length;t++)triggers[t].addEventListener("mousemove",showTooltip),triggers[t].addEventListener("mouseout",hideTooltip);function showTooltip(t){svg.getScreenCTM();const e=t.target.getAttributeNS(null,"id");tooltipText.firstChild.data=t.target.getAttributeNS(null,"title"),tooltip.setAttributeNS(null,"transform","translate(10 390)");const o=tooltipText.getComputedTextLength();tooltipText.setAttributeNS(null,"x",(415-o)/2),$("#casesTooltip").text(CommaFormatted(provCase[e])),$("#deathsTooltip").text(CommaFormatted(provDeath[e])),$("#recoveryTooltip").text(CommaFormatted(provRecoveries[e])),tooltip.style.opacity=1}function hideTooltip(){tooltip.style.opacity=0}function colourCountry(t,e,o){const s=document.getElementById(t);$("#"+t).removeClass(),$("#"+t).addClass("land tooltip-trigger valid"),s.classList.add(`colour${o}${e}`)}function colourCountries(t,e=1){for(let o=0;o<t.length;o++)for(let s=0;s<t[o].length;s++)colourCountry(t[o][s],o,e)}function legendSetup(t,e,o){o=Math.round(o);const s=$(".keyText"),r=$(".key.legend");r.removeClass(),r.addClass("key legend");for(let t=0;t<5;t++)r[t].classList.add(`colour${colourVal}${t}`);if(s[0].textContent="0 to "+CommaFormatted(e),s[1].textContent=`${CommaFormatted(e+1)} to ${CommaFormatted(e+o)}`,s[2].textContent=`${CommaFormatted(t-3*o+1)} to ${CommaFormatted(t-2*o)}`,s[3].textContent=`${CommaFormatted(t-2*o+1)} to ${CommaFormatted(t-o)}`,s[4].textContent=`${CommaFormatted(t-o+1)} to ${CommaFormatted(t)}`,console.log("Legend Set:",legendSet),!legendSet){const t=$("rect.key:nth-child(7)")[0].getBoundingClientRect().width+$("text.keyText:nth-child(12)")[0].getBoundingClientRect().width;console.log("WIDTH:",t),$(".lightBack").width("55%");const e=legendTitle.getComputedTextLength();legendTitle.setAttributeNS(null,"x",(t-e)/2-92),legendSet=!0}}function setColours(t,e=1){colourVal=e;let o=0,s=1/0,r=0,l=0;const i=[[],[],[],[],[]];Object.keys(t).forEach(e=>{null!==t[e]&&(s=Math.min(s,t[e]),o=Math.max(o,t[e]))}),o=10*Math.round(Math.ceil(o/10)),s=10*Math.round(Math.floor(s/10)),r=o-s,l=r/4,Object.keys(t).forEach(e=>{if("ZA-UN"!==e){const s=t[e];o-l<s&&s<=o?i[4].push(e):o-2*l<=s?i[3].push(e):o-3*l<=s?i[2].push(e):o-4*l<s?i[1].push(e):i[0].push(e)}}),console.log("ANSWERS:",i),colourCountries(i,e),legendSetup(o,s,l)}function setProvs(t,e,o){provCase=t,provDeath=e,provRecoveries=o,console.log("Recovs 1:",o),setupSideBCards()}function CommaFormatted(t){let e=parseInt(t);if(isNaN(e))return"N/A";let o="";e<0&&(o="-"),e=Math.abs(e);let s=String(e);const r=[];for(;s.length>3;){const t=s.substr(s.length-3);r.unshift(t),s=s.substr(0,s.length-3)}return s.length>0&&r.unshift(s),s=r.join(","),t=o+(t=s)}function compareValues(t,e="desc"){return function(o,s){if(!o.hasOwnProperty(t)||!s.hasOwnProperty(t))return 0;const r="string"==typeof o[t]?o[t].toUpperCase():o[t],l="string"==typeof s[t]?s[t].toUpperCase():s[t];let i=0;try{r>l?i=1:r<l&&(i=-1)}catch(t){console.log("Error",t),console.log("-",r)}return"desc"===e?-1*i:i}}function setupSideBCards(){let t;for(const[e,o]of Object.entries(provinceList))t={name:e,cases:provCase[o],deaths:provDeath[o],recoveries:provRecoveries[o]},cardList.push(t);populateSideCards(cardList.sort(compareValues("cases")))}function populateSideCards(t){let e=0;const o=$("#mapContainer .card");let s;console.log("Cards",o),t.forEach(t=>{console.log("Counter",e),s=o[e].children[1].children[0].children,o[e].firstElementChild.firstElementChild.innerText=t.name,s[0].innerText=CommaFormatted(t.cases),s[2].innerText=CommaFormatted(t.deaths),s[4].innerText=CommaFormatted(t.recoveries),e++})}triggers=document.getElementsByClassName("keyText"),Object.values(triggers).forEach(t=>{x=t.getAttribute("x"),y=t.getAttribute("y"),t.setAttribute("x",x-92),t.setAttribute("y",y-220)}),triggers=document.getElementsByClassName("key legend"),Object.values(triggers).forEach(t=>{x=t.getAttribute("x"),y=t.getAttribute("y"),t.setAttribute("x",x-92),t.setAttribute("y",y-220)}),x=$("#legTitle").attr("x"),y=$("#legTitle").attr("y"),$("#legTitle").attr({x:-x-92,y:y-220}),x=$(".lightBack").attr("x"),y=$(".lightBack").attr("y"),$(".lightBack").attr({x:x-92,y:y-220}),console.log("MAX HEIGHT:",$("#svg-1").height()+Number($("#svgColumn").css("padding-top").split(/\D/)[0])),$("#provStatsContainer").css("max-height",$("#svg-1").height()+2*parseInt($("#svgColumn").css("padding-top"))),$(window).resize(()=>{$("#provStatsContainer").css("max-height",$("#svg-1").height()+2*parseInt($("#svgColumn").css("padding-top")))}),$(document).ready(()=>{$(()=>{$(".scroll-pane").jScrollPane({showArrows:!0,resizeSensor:!0})}),$(".toggle.button.map").click(t=>{console.log("you clicked me!"),$("#svgColumn").toggleClass("ten wide"),$("#svgColumn").toggleClass("fourteen wide svgFocus"),$("#provStatsContainer").toggleClass("sidebarHidden"),$("#hideIcon").toggleClass("fa-rotate-180")}),$("#filterC").click(t=>{console.log("you clicked me to filter!"),setColours(provCase,1),populateSideCards(cardList.sort(compareValues("cases")))}),$("#filterD").click(t=>{console.log("you clicked me to filter!"),setColours(provDeath,2),populateSideCards(cardList.sort(compareValues("deaths")))}),$("#filterR").click(t=>{console.log("you clicked me to filter!"),setColours(provRecoveries,3),populateSideCards(cardList.sort(compareValues("recoveries")))}),$("#filterC2").click(t=>{console.log("you clicked me to filter!"),setColours(provCase,1),populateSideCards(cardList.sort(compareValues("cases")))}),$("#filterD2").click(t=>{console.log("you clicked me to filter!"),setColours(provDeath,2),populateSideCards(cardList.sort(compareValues("deaths")))}),$("#filterR2").click(t=>{console.log("you clicked me to filter!"),setColours(provRecoveries,3),populateSideCards(cardList.sort(compareValues("recoveries")))})});
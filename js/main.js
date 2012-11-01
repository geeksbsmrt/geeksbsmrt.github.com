//Adam Crawford
//VFW 1211
//WebApp Part 2
//10/30/2012

document.addEventListener("DOMContentLoaded", function(){

//shorthand getElementByID
var getID = function (element) {
	var selected = document.getElementById(element);
	return selected;
};
//short getElementsByType
var getType = function (type) {
	var lmnts = document.getElementsByType(type);
	return lmnts;
};
//short getElementsByTagName
var getTag = function (tag) {
	var tags = document.getElementsByTagName(tag);
	return tags;
};
var gameGender = function () {
	var radios = document.forms[0].gender;
	for (i=0, j=radios.length; i<j; i++) {
		if (radios[i].checked) {
			return radios[i].value;
		};
	};
};
var isComp = function () {
	return getID('gcomp').checked;
};
// Populate Select Element
var ageGroups = ["U6", "U8", "U10", "U12", "U14", "U18"];
var populateAges = function (ages) {
		var ageItem = getID("gage"),
			insertSelect = document.createElement("select"),
			ogroup = document.createElement("optgroup");
		ogroup.setAttribute("label", "--Ages--");
		insertSelect.appendChild(ogroup);
		insertSelect.setAttribute("id", "ageGroup");
		for (i = 0, j = ages.length; i < j; i++) {
			var insertAge = document.createElement("option"),
				opt = ages[i];
			insertAge.setAttribute("value", opt);
			insertAge.innerHTML = opt;
			insertSelect.appendChild(insertAge);
		};
		ageItem.appendChild(insertSelect);
	};
//Style input fields
var changeStyle = function (tag) {
	if (tag.value === "") {
		tag.setAttribute("class", "required");
	} else {
		tag.removeAttribute("class", "required");
	}
}
var addBlur = function () {
	var tags = getTag("input");
	for (i=0, j=tags.length; i<j; i++) {
		if (tags[i].type === "checkbox" || tags[i].type === "radio" || tags[i].type === "range" || tags[i].type === "submit" || tags[i].type === "hidden") {
			continue;
		} else {
			tags[i].addEventListener("blur", function(){
				changeStyle(this);
			});
		};
	};
};
var toggleDisplay = function (state) {
	switch(state){
		case "on":
			getID('createGame').style.display = "none";
			getID('clear').style.display = "inline";
			getID('display').style.display = "none";
			getID('addNew').style.display = "inline";
			break;
		case "off":
			getID('createGame').style.display = "block";
			getID('clear').style.display = "inline";
			getID('display').style.display = "inline";
			getID('data').style.display = "none";
			getID('addNew').style.display = "none";
			break;
		default:
			return false;
	};
};
var saveData = function () {
	var comp = isComp();
	var gend = gameGender();
	var UUID = Math.floor(Math.random()*10000000000001);
	var values = {};
		values.gDate = ["Game Date: ", getID('gdate').value];
		values.gTime = ["Game Time: ", getID('gtime').value];
		values.gField = ["Game Field: ", getID('gfield').value];
		values.gAge = ["Age Group: ", getID('ageGroup').value];
		values.gGender = ["Gender: ", gend];
		values.gComp = ["Is Competetive: ", comp];
		values.gHome = ["Home Team: ", getID('ghome').value];
		values.gAway = ["Away Team: ", getID('gaway').value];
		values.gComments = ["Comments: ", getID('gspec').value];
		values.ref = ["Referee: ", getID('refname').value];
		values.refGrd = ["Grade: ", getID('refgrade').value];
		values.refYrs = ["Years Reffing: ", getID('refyrs').value];
		values.refEml = ["Email: ", getID('refemail').value];
		values.ar1 = ["AR 1: ", getID('ar1name').value];
		values.ar1Grd = ["Grade: ", getID('ar1grade').value];
		values.ar1Yrs = ["Years Reffing: ", getID('ar1yrs').value];
		values.ar1Eml = ["Email: ", getID('ar1email').value];
		values.ar2 = ["AR 2: ", getID('ar2name').value];
		values.ar2Grd = ["Grade: ", getID('ar2grade').value];
		values.ar2Yrs = ["Years Reffing: ", getID('ar2yrs').value];
		values.ar2Eml = ["Email: ", getID('ar2email').value];
	localStorage.setItem(UUID, JSON.stringify(values));
	alert("Added Game to the Schedule.");
};
var displayData = function () {
	toggleDisplay("on");
	var createDiv = document.createElement("div");
	createDiv.setAttribute("id", "data");
	createDiv.setAttribute("class", "prefixed");
	var createList = document.createElement("ul");
	createDiv.appendChild(createList);
	document.body.appendChild(createDiv);
	getID('data').style.display = "display";
	for (i=0,j=localStorage.length; i<j; i++) {
		var createLi = document.createElement("li");
		createList.appendChild(createLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var createSubList = document.createElement("ul");
		createLi.appendChild(createSubList);
		for (var k in obj) {
			var createSubLi = document.createElement("li");
			createSubList.appendChild(createSubLi);
			var liText = obj[k][0] + " " + obj[k][1];
			createSubLi.innerHTML = liText;
		};
	};
};
var clearData = function () {
	localStorage.clear();
	alert("Cleared");
	window.location.reload();
	return false;
}


// Call Functions
populateAges(ageGroups);
addBlur();
var displaySchedule = getID('display');
displaySchedule.addEventListener("click", displayData);
var clearSchedule = getID('clear');
clearSchedule.addEventListener("click", clearData);
var save = getID('submit');
save.addEventListener("click", saveData);
});

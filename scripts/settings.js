window.onload = function(){
	updateSettingsView();
};

stripProtocol = function stripProto(text) {
  	return text.replace("https://", "").replace("http://", "").replace(/^(www\.)/, "")
};

updateSettingsView = function updateSettingsView(){
	inputValue = JSON.parse(localStorage.getItem('blockedDomains'));
	document.getElementById('blockedDomains').value = inputValue.join("\n");
	inputValue = JSON.parse(localStorage.getItem('blockedWords'));
	document.getElementById('blockedWords').value = inputValue.join("\n");
	inputValue = JSON.parse(localStorage.getItem('partialBlockedDomains'));
	document.getElementById('partialBlockedDomains').value = inputValue.join("\n");
	inputValue = JSON.parse(localStorage.getItem('partialAllowedDomains'));
	document.getElementById('partialAllowedDomains').value = inputValue.join("\n");
	inputValue = JSON.parse(localStorage.getItem('fisheyePlacebo'));
	if (inputValue=="Yes"){
		document.getElementById('fisheye-placebo').checked = true;
	}
};

saveSettings.onclick = function() {
	inputValue = [];
	inputValue = document.getElementById('blockedDomains').value.split("\n");
    for (let i = 0; i < inputValue.length; ++i) {
    	inputValue[i] = stripProtocol(inputValue[i])
    }
	localStorage.setItem('blockedDomains', JSON.stringify(inputValue));
	inputValue = document.getElementById('blockedWords').value.split("\n");
	for (let i = 0; i < inputValue.length; ++i) {
    	inputValue[i] = stripProtocol(inputValue[i])
    }
	localStorage.setItem('blockedWords', JSON.stringify(inputValue));
	inputValue = document.getElementById('partialBlockedDomains').value.split("\n");
	localStorage.setItem('partialBlockedDomains', JSON.stringify(inputValue));
	inputValue = document.getElementById('partialAllowedDomains').value.split("\n");
	for (let i = 0; i < inputValue.length; ++i) {
    	inputValue[i] = stripProtocol(inputValue[i])
    }
	localStorage.setItem('partialAllowedDomains', JSON.stringify(inputValue));
	if (document.getElementById('fisheye-placebo').checked){
		inputValue = document.getElementById('fisheye-placebo').value;
		localStorage.setItem('fisheyePlacebo', JSON.stringify(inputValue));
	} else {
		inputValue = "No";
		localStorage.setItem('fisheyePlacebo', JSON.stringify(inputValue));
	}
};

importSettings.onclick = function() {
	localStorage.setItem('blockedDomains', JSON.stringify(JSON.parse(document.getElementById('settingsBuffer').value)['blockedDomains']));
	localStorage.setItem('blockedWords', JSON.stringify(JSON.parse(document.getElementById('settingsBuffer').value)['blockedWords']));
	localStorage.setItem('partialBlockedDomains', JSON.stringify(JSON.parse(document.getElementById('settingsBuffer').value)['partialBlockedDomains']));
	localStorage.setItem('partialAllowedDomains', JSON.stringify(JSON.parse(document.getElementById('settingsBuffer').value)['partialAllowedDomains']));
	localStorage.setItem('fisheyePlacebo', JSON.stringify(JSON.parse(document.getElementById('settingsBuffer').value)['fisheyePlacebo']));
	updateSettingsView();
};

exportSettings.onclick = function() {
	let exportData = new Object();
	exportData.blockedDomains = JSON.parse(localStorage.getItem('blockedDomains'));
	exportData.blockedWords = JSON.parse(localStorage.getItem('blockedWords'));
	exportData.partialBlockedDomains = JSON.parse(localStorage.getItem('partialBlockedDomains'));
	exportData.partialAllowedDomains = JSON.parse(localStorage.getItem('partialAllowedDomains'));
	exportData.fisheyePlacebo = JSON.parse(localStorage.getItem('fisheyePlacebo'));
	document.getElementById('settingsBuffer').value = JSON.stringify(exportData);
};
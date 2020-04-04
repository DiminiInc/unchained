window.onload = function(){
	inputValue = JSON.parse(localStorage.getItem('blockedDomains'));
	document.getElementById('blockedDomains').value = inputValue.join("\n");
	inputValue = JSON.parse(localStorage.getItem('blockedWords'));
	document.getElementById('blockedWords').value = inputValue.join("\n");
	inputValue = JSON.parse(localStorage.getItem('partialBlockedDomains'));
	document.getElementById('partialBlockedDomains').value = inputValue.join("\n");
	inputValue = JSON.parse(localStorage.getItem('partialAllowedDomains'));
	document.getElementById('partialAllowedDomains').value = inputValue.join("\n");
};


saveSettings.onclick = function() {
	inputValue = [];
	inputValue = document.getElementById('blockedDomains').value.split("\n");
	localStorage.setItem('blockedDomains', JSON.stringify(inputValue));
	inputValue = document.getElementById('blockedWords').value.split("\n");
	localStorage.setItem('blockedWords', JSON.stringify(inputValue));
	inputValue = document.getElementById('partialBlockedDomains').value.split("\n");
	localStorage.setItem('partialBlockedDomains', JSON.stringify(inputValue));
	inputValue = document.getElementById('partialAllowedDomains').value.split("\n");
	localStorage.setItem('partialAllowedDomains', JSON.stringify(inputValue));
};
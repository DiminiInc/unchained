window.onload = function() 
{
	document.getElementById('version').innerHTML = chrome.runtime.getManifest().version;
}
let blockedWords = ["WordToBlock", "DiminiHatersCommunity"];
let blockedPartialDomains = [];
let allowedPartialDomains = [["vk.com","/im"]];
let blockedDomains = ["https://pikabu.ru", "https://www.reddit.com", "https://www.youtube.com"];

let current = window.location.href;


//BLOCK WORDS
findString = function findText(text) {
  if(window.find(text)){
    window.location.replace(chrome.runtime.getURL("blocked.html"));
  };
}


//BLOCK THE PARTIAL DOMAINS
findURL = function changeURL(text){
  if(current === text){
    window.location.replace("https://www.dimini.tk");
  }
}

//ALLOW PARTIAL DOMAINS
allowFindURL = function changeURL(monitored, allowed){
  if(current.includes(monitored)){
  	if (!current.includes(allowed)){
    		window.location.replace(allowed);
    	}
  }
}

//BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text){
  if(current.startsWith(text)){
    window.location.replace(chrome.runtime.getURL("blocked.html"));
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'url-change') {
      current=request.url // new url is now in content scripts!
      for (const allowedPartialDomain of allowedPartialDomains){
	    allowFindURL(allowedPartialDomain[0], allowedPartialDomain[1]);
      }
    }
    //if (request.message === 'time-out') {
    //  current=request.url // new url is now in content scripts!
    //  findAllURL(current);
    //}
});

for (const blockedWord of blockedWords){
    findString(blockedWord);
}

for (const blockedPartialDomain of blockedPartialDomains){
    findURL(blockedPartialDomain);
}

for (const allowedPartialDomain of allowedPartialDomains){
    allowFindURL(allowedPartialDomain[0], allowedPartialDomain[1]);
}

for (const blockedDomain of blockedDomains){
    findAllURL(blockedDomain);
}
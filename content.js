let blockedWords;
let blockedPartialDomains;
let allowedPartialDomains;
let blockedDomains;

let current = window.location.href;

chrome.runtime.sendMessage({method: "getLocalStorage", key: "blockedDomains"}, function(response) {
  blockedWords=response.blockedWords;
  blockedDomains=response.blockedDomains;
  blockedPartialDomains=response.partialBlockedDomains;
  allowedPartialDomains=response.partialAllowedDomains;
  allowedPartialDomains.forEach((element, index) => allowedPartialDomains[index]=element.split(" "));


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
});

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
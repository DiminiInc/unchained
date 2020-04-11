let blockedWords;
let blockedPartialDomains;
let allowedPartialDomains;
let blockedDomains;
let fisheyePlacebo="No";

let current = window.location.href;

chrome.runtime.sendMessage({method: "getLocalStorage", key: "blockedDomains"}, function(response) {
  blockedWords=response.blockedWords;
  blockedDomains=response.blockedDomains;
  blockedPartialDomains=response.partialBlockedDomains;
  allowedPartialDomains=response.partialAllowedDomains;
  allowedPartialDomains.forEach((element, index) => allowedPartialDomains[index]=element.split(" "));
  fisheyePlacebo=response.fisheyePlacebo;
  console.log(fisheyePlacebo);

  for (const blockedWord of blockedWords){
    if (blockedWord!=""){
      findString(blockedWord);
    }
  }

  for (const blockedPartialDomain of blockedPartialDomains){
    if (blockedPartialDomains!=""){
      findURL(blockedPartialDomain);
    }
  }

  for (const allowedPartialDomain of allowedPartialDomains){
    if (allowedPartialDomain!=""){
      allowFindURL(allowedPartialDomain[0], allowedPartialDomain[1]);
    }
  }

  for (const blockedDomain of blockedDomains){
    if (blockedDomain!=""){
      findAllURL(blockedDomain);
    }
  }
});

//BLOCK WORDS
findString = function findText(text) {
  if(window.find(text)){
    if (fisheyePlacebo=="Yes"){
      window.location.replace(chrome.runtime.getURL("blocked.html"));
    } else {
      window.location.replace(chrome.runtime.getURL("block.html"));
    }
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
    if (fisheyePlacebo=="Yes"){
      window.location.replace(chrome.runtime.getURL("blocked.html"));
    } else {
      window.location.replace(chrome.runtime.getURL("block.html"));
    }
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'url-change') {
      current=request.url // new url is now in content scripts!
      for (const allowedPartialDomain of allowedPartialDomains){
        if (allowedPartialDomain!=""){
    	    allowFindURL(allowedPartialDomain[0], allowedPartialDomain[1]);
        }
      }
    }
    //if (request.message === 'time-out') {
    //  current=request.url // new url is now in content scripts!
    //  findAllURL(current);
    //}
});
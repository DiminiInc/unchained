let blockedWords;
let blockedPartialDomains;
let allowedPartialDomains;
let blockedDomains;
let fisheyePlacebo="No";
let allowedPartialDomainsMap = new Map();

let current = window.location.href;

chrome.runtime.sendMessage({method: "getLocalStorage", key: "blockedDomains"}, function(response) {
  blockedWords=response.blockedWords;
  blockedDomains=response.blockedDomains;
  blockedPartialDomains=response.partialBlockedDomains;
  allowedPartialDomains=response.partialAllowedDomains;
  allowedPartialDomains.forEach((element, index) => allowedPartialDomains[index]=element.split(" "));
  for (const allowedPartialDomain of allowedPartialDomains){
    if (allowedPartialDomain!=""){
      if (allowedPartialDomainsMap.get(allowedPartialDomain[0])){
        allowedPartialDomainsMap.get(allowedPartialDomain[0]).push(allowedPartialDomain[1])
      } else {
        allowedPartialDomainsMap.set(allowedPartialDomain[0], [allowedPartialDomain[1]])
      }
    }
  }
  fisheyePlacebo=response.fisheyePlacebo;

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

  if (allowedPartialDomainsMap.size>0){
    for (let [monitoredDomain, allowedURLs] of allowedPartialDomainsMap){
      allowFindURL(monitoredDomain, allowedURLs);
    }
  }

  for (const blockedDomain of blockedDomains){
    if (blockedDomain!=""){
      findAllURL(blockedDomain);
    }
  }
});

stripProtocol = function stripProto(text) {
  return text.replace("https://", "").replace("http://", "").replace(/^(www\.)/, "")
}

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
  if(stripProtocol(current).startsWith(text)){
    if (fisheyePlacebo=="Yes"){
      window.location.replace(chrome.runtime.getURL("blocked.html"));
    } else {
      window.location.replace(chrome.runtime.getURL("block.html"));
    }
  }
}

//ALLOW PARTIAL DOMAINS
allowFindURL = function changeURL(monitored, allowed){
  if(stripProtocol(current).startsWith(monitored)){
    let flag = true;
    for (const allowedURL of allowed){
      if (stripProtocol(current).startsWith(monitored+allowedURL)){
        flag = false;
      }
    }
  	if (flag==true){
    	 window.location.replace(allowed[0]);
    }
  }
}

//BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text){
  if(stripProtocol(current).startsWith(text)){
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
      if (allowedPartialDomainsMap.size>0){
        for (let [monitoredDomain, allowedURLs] of allowedPartialDomainsMap){
          allowFindURL(monitoredDomain, allowedURLs);
        }
      }
    }
    //if (request.message === 'time-out') {
    //  current=request.url // new url is now in content scripts!
    //  findAllURL(current);
    //}
});
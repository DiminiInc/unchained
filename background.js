chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'url-change',
        url: changeInfo.url
      })
    }
  }
);

function FormatDuration(d) {
  if (d < 0) {
    return "?";
  }
  var divisor = d < 3600000 ? [60000, 1000] : [3600000, 60000];
  function pad(x) {
    return x < 10 ? "0" + x : x;
  }
  return Math.floor(d / divisor[0]) + ":" + pad(Math.floor((d % divisor[0]) / divisor[1]));
}

var History = {};

chrome.browserAction.setBadgeText({ 'text': '?'});
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#161616" });

function Update(t, tabId, url) {
  if (!url) {
    return;
  }
  if (tabId in History) {
    if (url == History[tabId][0][1]) {
      return;
    }
  } else {
    History[tabId] = [];
  }
  History[tabId].unshift([t, url]);

  var history_limit = parseInt(localStorage["history_size"]);
  if (! history_limit) {
    history_limit = 23;
  }
  while (History[tabId].length > history_limit) {
    History[tabId].pop();
  }

  chrome.browserAction.setBadgeText({ 'tabId': tabId, 'text': '0:00'});
  // chrome.browserAction.setPopup({ 'tabId': tabId, 'popup': "popup.html#tabId=" + tabId});
}

function HandleUpdate(tabId, changeInfo, tab) {
  Update(new Date(), tabId, changeInfo.url);
  // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'url-change',
        url: changeInfo.url
      })
    }
}

function HandleRemove(tabId, removeInfo) {
  delete History[tabId];
}

function HandleReplace(addedTabId, removedTabId) {
  var t = new Date();
  delete History[removedTabId];
  chrome.tabs.get(addedTabId, function(tab) {
    Update(t, addedTabId, tab.url);
  });
}


function UpdateBadges() {
  var now = new Date();
  for (tabId in History) {
    var description = FormatDuration(now - History[tabId][0][0]);

    chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});
    //if (description.slice(0, -3)>=1){
    //chrome.tabs.sendMessage( tabId, {
    //    message: 'time-out',
    //    url: changeInfo.url
   //   })
    //}
  }
}

setInterval(function(){var now = new Date();
  for (tabId in History) {
    var description = FormatDuration(now - History[tabId][0][0]);
    chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});
  }}, 1000);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage")
      sendResponse({data: localStorage[request.key],
        blockedDomains: JSON.parse(localStorage['blockedDomains']),
        blockedWords: JSON.parse(localStorage['blockedWords']),
        partialBlockedDomains: JSON.parse(localStorage['partialBlockedDomains']),
        partialAllowedDomains: JSON.parse(localStorage['partialAllowedDomains'])
      });
    else
      sendResponse({}); // snub them.
});

chrome.tabs.onUpdated.addListener(HandleUpdate);
chrome.tabs.onRemoved.addListener(HandleRemove);
chrome.tabs.onReplaced.addListener(HandleReplace);
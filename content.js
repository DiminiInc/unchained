var current = window.location.href;

//BLOCK WORDS
findString = function findText(text) {
  if(window.find(text)){
    document.documentElement.innerHTML = '';
    document.documentElement.innerHTML = '<h1>WARNING!</h1><h2>SITE ACCESS DENIED</h2><p>The content on this webpage is very violent and/or very erotic.</p><p>For the advancement of the Central Eastern Republic and the preservation of harmony, please do not attempt further access.</p><p>Thank you for your cooperation.</p><p>This message is brought to you by the Bureau of Information Technology and Civil Harmony</p>';
    document.documentElement.scrollTop = 0;
  };
}


//BLOCK THE PARTIAL DOMAINS
findURL = function changeURL(text){
  if(current === text){
    window.location.replace("https://www.dimini.tk");
  }
}

//BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text){
  if(current.startsWith(text)){
    window.location.replace(chrome.runtime.getURL("blocked.html"));
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'url-change') {
      current=request.url // new url is now in content scripts!
      allowFindURL("vk.com","/im");
    }
    //if (request.message === 'time-out') {
    //  current=request.url // new url is now in content scripts!
    //  findAllURL(current);
    //}
});


findString("WordToBlock");
findAllURL("https://pikabu.ru");
findAllURL("https://www.reddit.com");
findAllURL("https://www.youtube.com");
allowFindURL("vk.com","/im");

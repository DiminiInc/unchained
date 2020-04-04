window.onload = function(){
document.getElementById('blockedDomains').value = localStorage.getItem('blockedDomains');
  };


saveSettings.onclick = function() {
localStorage.setItem('blockedDomains', document.getElementById('blockedDomains').value);
  };
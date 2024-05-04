
  document.body.style.display = 'none';
  window.onload = function() {
    var UserInput = null;

    var cookies = document.cookie;
    var cookiesArray = cookies.split(';');
    var pass = 'amlucnVpMDcxMw==';

    for(var c of cookiesArray){
      var cArray = c.split('=');
      if(cArray[0].indexOf('cruw-basic') > -1){
        UserInput = decodeURIComponent(cArray[1]);
      }
    }
    if(!(UserInput && UserInput == window.atob(pass))){
      UserInput = prompt("パスワードを入力して下さい:","");
    }

    if(UserInput != window.atob(pass)){
      document.body.innerHTML = "403 Forbidden";
    }else{
      var now = new Date();
      now.setMinutes(now.getMinutes() + 60*24*3);
      document.cookie = "cruw-basic=" + encodeURIComponent(UserInput) + ";expires=" + now.toUTCString()+"; path=/;";
    }
    document.body.style.display = null;
  }

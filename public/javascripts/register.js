if (document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
}

function initializeCode() {
    window.addEventListener('load', onLoad);
}

function onLoad(event){
    document.getElementById("register").addEventListener("submit", registerCall);
}

//Posting register info to backend
async function registerCall(event){
    event.preventDefault();
    const usernameErr = document.getElementById("username_err");
    const passwordErr = document.getElementById("password_err");


    var userInfoJSON = {
      username: document.getElementById("username_input").value, 
      password: document.getElementById("password_input").value
    };
    const data = JSON.stringify(userInfoJSON);

    const response = await fetch("/api/register", {  
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: data
    });
    const responseJSON = await response.json();

    if (Object.keys(responseJSON).length === 0){
      window.location.replace("/login.html");
    }
    else {
      var err = [];
      for (var i = 0; i < responseJSON.errors.length; i++){
        err.push(JSON.stringify(responseJSON.errors[i].param));
      }

      if (err.includes('"password"')){
        var errPasswordP = document.createElement("p");
        errPasswordP.innerHTML = "Password is not strong enough";
        passwordErr.appendChild(errPasswordP);
      }
      if (err.includes('"username"')){
        var errusernameP = document.createElement("p");
        errusernameP.innerHTML = "username already in use";
        usernameErr.appendChild(errusernameP);
      }
    }

  }
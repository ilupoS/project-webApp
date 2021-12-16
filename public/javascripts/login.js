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
    document.getElementById("login").addEventListener("submit", loginCall);
}

async function loginCall(event){
    event.preventDefault();
    const errDiv = document.getElementById("err");

    //loging info formating
    var userInfoJSON = {
      username: document.getElementById("username_input").value, 
      password: document.getElementById("password_input").value
    };


    const response = await fetch("/api/login", {  
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfoJSON)
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
    if (!responseJSON.success){
      if(errDiv.lastChild != null){errDiv.removeChild(errDiv.lastChild)}
      var errP = document.createElement("p");
      errP.innerHTML = "Invalid credentials";
      errDiv.appendChild(errP);
    } else {
      storeToken(responseJSON.token);
      window.location.replace("/");
    }


  }

  function storeToken(token) {
    localStorage.setItem("auth_token", token);
}
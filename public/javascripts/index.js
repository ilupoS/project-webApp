if (document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
}
  
function initializeCode() {
    getItems();
    window.addEventListener('load', onLoad);

}

function onLoad(event){

    //event.preventDefault();
    const page = document.getElementById("con");
    const authToken = localStorage.getItem("auth_token");
    
    //Checking if user has authToken
    if(authToken){
      var token = atob(authToken.split(".")[1]);
      var tokenjson = JSON.parse(token);

      let logoutButton = document.createElement("button");
      let usernameHTML = document.createElement("p");
      logoutButton.innerHTML = "Logout";
      logoutButton.id = "logout";
      
      usernameHTML.innerHTML = JSON.stringify(tokenjson.username).replace(0, "").slice(1,-1);
      page.appendChild(logoutButton);
      page.appendChild(usernameHTML);
      logoutButton.addEventListener("click", logoutFunction);

      //Post form field for posts
      var form = document.createElement("form");
      form.setAttribute("method", "post");

      let addItem = document.createElement("textarea");
      addItem.id = "add-item";

      var submitButton = document.createElement("input");
      submitButton.setAttribute("type", "submit");
      submitButton.setAttribute("value", "Post");

      form.appendChild(addItem);
      form.appendChild(submitButton);

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        submitPost(authToken);
        location.reload();
      });    
      page.appendChild(form);
    }
    else{
      //not logged in
      let loginLink = document.createElement("a");
      loginLink.href = "/login.html";
      loginLink.innerHTML = "Login";

      let registerLink = document.createElement("a");
      registerLink.href = "/register.html";
      registerLink.innerHTML = "Register";

      let spacing = document.createElement("p");
      spacing.innerHTML = " ";
      
      page.appendChild(loginLink);
      page.appendChild(spacing);
      page.appendChild(registerLink);

    }
}

function logoutFunction(){
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}




async function getItems () {
    const response = await fetch('/api/posts/all');
    const items = await response.json();
    generateItemHTML(items);
    return items;
}

function generateItemHTML (data) {
    const container = document.getElementById("post-div");
    const posts = document.createElement("div");
    posts.id = "posts"

    for (var i = 0; i < data.items.length; i++) {
        var div = document.createElement("div");
        
        var p = document.createElement("p");
        p.innerHTML = data.items[i].item;

        var h2 = document.createElement("h2");
        h2.innerHTML = data.items[i].username;

        var button = document.createElement("button");
        button.data = data.items[i]._id;
        button.innerHTML =  "Go to post";

        button.addEventListener("click", function (e) {
          console.log(this.data);
          window.location.replace("/itemPage.html?id=" + this.data);
        });
        
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(button);
        
        posts.appendChild(div);
    }
    container.appendChild(posts);
}

async function submitPost (authToken){
    item = document.getElementById("add-item").value;
    data = {
      "items": item
    }

    fetch("/api/posts/addpost", {
        method: "POST",
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + authToken
          },
          body: JSON.stringify(data)
      });
}

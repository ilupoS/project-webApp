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

    //Generating navbar depending on if user is logged in
    navBarGeneration(authToken);
    
    //Checking if user has authToken
    if(authToken){
      //Post form field for posts
      var form = document.createElement("form");
      form.setAttribute("method", "post");

      var div1 = document.createElement("div");
      var div2 = document.createElement("div");

      div1.className = "input-field";
      div2.className = "input-field";

      let addItem = document.createElement("textarea");
      addItem.id = "add-item";
      addItem.className = "materialize-textarea";

      let label = document.createElement("label");
      label.for = "add-item";
      label.innerHTML = "Write your post here";

      div1.appendChild(addItem);
      div1.appendChild(label);

      var submitButton = document.createElement("button");
      submitButton.setAttribute("type", "submit");
      submitButton.setAttribute("value", "Post");
      submitButton.id = "submit-comment";
      submitButton.className = "btn";
      submitButton.innerHTML = "Post snippet";

      div2.appendChild(submitButton);

      form.appendChild(div1);
      form.appendChild(div2);

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        submitPost(authToken);
        location.reload();
      });    
      page.appendChild(form);
    }
    else{
      //not logged in
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
        div.className = "card";
        
        var p = document.createElement("code");
        p.innerHTML = data.items[i].item;
        p.style = "white-space: pre-wrap";
        

        var h2 = document.createElement("h3");
        h2.innerHTML = "Publisher: " + data.items[i].username;

        var button = document.createElement("button");
        button.data = data.items[i]._id;
        button.innerHTML =  "Go to post";
        button.className = "btn right";

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

function navBarGeneration(authToken){
  var navBar = document.getElementById("nav-mobile");
  if(authToken){
    var a_logout = document.createElement("a");
    a_logout.href = "javascript:logoutFunction();";
    a_logout.innerHTML = "Logout";

    var li = document.createElement("li");
    li.appendChild(a_logout);
    navBar.appendChild(li);
  }
  else {
    var a_login = document.createElement("a");
    a_login.href = "/login.html";
    a_login.innerHTML = "Login";

    var li = document.createElement("li");
    li.appendChild(a_login);
    navBar.appendChild(li);

    var a_register = document.createElement("a");
    a_register.href = "/register.html";
    a_register.innerHTML = "Register";

    var li = document.createElement("li");
    li.appendChild(a_register);
    navBar.appendChild(li);
  }

}

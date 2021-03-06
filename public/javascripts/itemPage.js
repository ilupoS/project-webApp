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

    const link = window.location.search;
    const urlParams = new URLSearchParams(link);
    getItem(urlParams.get("id"));

    const authToken = localStorage.getItem("auth_token");

    navBarGeneration(authToken);

    if(authToken){
        createCommentField(urlParams.get("id"));
      }
      else{
        
      }
}

async function getItem (id) {
    const response = await fetch('/api/posts/post/' + id);
    const items = await response.json();
    generateItemHTML(items);
    return items;
}


function generateItemHTML (data) {

    //fetching and creating comments for clients
    fetchComments(data.items._id);

    const container = document.getElementById("post-div");
    const post = document.createElement("div");
    post.id = "post"
    var div = document.createElement("div");
        
    var p = document.createElement("code");
    p.innerHTML = data.items.item;
    p.style = "white-space: pre-wrap";

    var h2 = document.createElement("h2");
    h2.innerHTML = "Publisher: " + data.items.username;

    div.appendChild(h2);
    div.appendChild(p);
        
    post.appendChild(div);
    container.appendChild(post);
}

async function fetchComments (id){

    const response = await fetch("/api/posts/comments/" + id)
    const data = await response.json();
    
    var commentsDiv = document.getElementById("comments-div");
    

    for(var i = 0; i < data.items.length; i++){
        var commentDiv = document.createElement("div");
        commentDiv.className = "card";

        var p = document.createElement("p");
        var h3 = document.createElement("h5");

        h3.innerHTML = data.items[i].username;
        p.innerHTML = data.items[i].comment;

        commentDiv.appendChild(h3);
        commentDiv.appendChild(p);
        commentsDiv.appendChild(commentDiv);
    }
    console.log(data.items.length);
}


async function submitComment (authToken, postsId, comment){

    data = {
      "postId": postsId,
      "comment": comment
    }
  
    fetch("/api/posts/addcomment", {
        method: "POST",
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + authToken
          },
          body: JSON.stringify(data)
      });
}

function createCommentField(id){
    var div = document.getElementById("commenting-field-div");

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.id = "comment-input";
    form.style.display = "block";

    var addComment = document.createElement("textarea");
    addComment.id = "comment-field";
  
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Comment");
    submitButton.className = "btn";
  
    form.appendChild(addComment);
    form.appendChild(submitButton);
 

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var commentText = document.getElementById("comment-field").value;
        submitComment(localStorage.getItem("auth_token"), id, commentText);
        location.reload();
    });

    div.appendChild(form);


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

function logoutFunction(){
  localStorage.removeItem("auth_token");
  location.reload();
}

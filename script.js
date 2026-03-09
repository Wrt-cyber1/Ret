let currentUser="";

function getUsers(){
return JSON.parse(localStorage.getItem("users")||"{}");
}

function saveUsers(users){
localStorage.setItem("users",JSON.stringify(users));
}

function register(){

let user=document.getElementById("user").value;
let pass=document.getElementById("pass").value;

let users=getUsers();

users[user]={pass:pass,followers:[],photo:""};

saveUsers(users);

alert("Conta criada");

}

function login(){

let user=document.getElementById("user").value;
let pass=document.getElementById("pass").value;

let users=getUsers();

if(users[user] && users[user].pass===pass){

currentUser=user;

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

document.getElementById("profileName").innerText=user;

updateProfile();

loadFeed();

}else{

alert("Login errado");

}

}

function logout(){
location.reload();
}

function updateProfile(){

let users=getUsers();

document.getElementById("followers").innerText=
"Seguidores: "+users[currentUser].followers.length;

if(users[currentUser].photo)
document.getElementById("profilePic").src=
users[currentUser].photo;

}

function changePhoto(){

let file=document.getElementById("profileUpload").files[0];

let reader=new FileReader();

reader.onload=function(){

let users=getUsers();

users[currentUser].photo=reader.result;

saveUsers(users);

updateProfile();

}

reader.readAsDataURL(file);

}

function post(){

let file=document.getElementById("photo").files[0];

let caption=document.getElementById("caption").value;

let reader=new FileReader();

reader.onload=function(){

let posts=JSON.parse(localStorage.getItem("posts")||"[]");

posts.unshift({
user:currentUser,
img:reader.result,
caption:caption,
likes:[],
comments:[]
});

localStorage.setItem("posts",JSON.stringify(posts));

loadFeed();

}

reader.readAsDataURL(file);

}

function like(i){

let posts=JSON.parse(localStorage.getItem("posts"));

let likes=posts[i].likes;

if(likes.includes(currentUser))
likes.splice(likes.indexOf(currentUser),1);
else
likes.push(currentUser);

localStorage.setItem("posts",JSON.stringify(posts));

loadFeed();

}

function comment(i){

let text=prompt("Comentário");

if(!text) return;

let posts=JSON.parse(localStorage.getItem("posts"));

posts[i].comments.push(currentUser+": "+text);

localStorage.setItem("posts",JSON.stringify(posts));

loadFeed();

}

function loadFeed(){

let feed=document.getElementById("feed");

feed.innerHTML="";

let posts=JSON.parse(localStorage.getItem("posts")||"[]");

posts.forEach((p,i)=>{

let html=`

<div class="post">

<b>${p.user}</b>

<img src="${p.img}">

<p>${p.caption}</p>

<p class="like" onclick="like(${i})">
❤️ ${p.likes.length}
</p>

<button onclick="comment(${i})">Comentar</button>

`;

p.comments.forEach(c=>{
html+=`<div class="comment">${c}</div>`;
});

html+="</div>";

feed.innerHTML+=html;

});

}
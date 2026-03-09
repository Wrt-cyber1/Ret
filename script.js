let currentUser="";

function users(){
return JSON.parse(localStorage.getItem("users")||"{}");
}

function saveUsers(data){
localStorage.setItem("users",JSON.stringify(data));
}

function register(){

let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

let data=users();

data[u]={pass:p,photo:"",followers:[]};

saveUsers(data);

alert("Conta criada");

}

function login(){

let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

let data=users();

if(data[u] && data[u].pass===p){

currentUser=u;

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

document.getElementById("name").innerText=u;

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

let data=users();

document.getElementById("followers").innerText=
"Seguidores: "+data[currentUser].followers.length;

if(data[currentUser].photo)
document.getElementById("avatar").src=data[currentUser].photo;

}

function changeAvatar(){

let file=document.getElementById("profilePic").files[0];

let reader=new FileReader();

reader.onload=function(){

let data=users();

data[currentUser].photo=reader.result;

saveUsers(data);

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

<b>@${p.user}</b>

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
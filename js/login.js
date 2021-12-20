let account=document.querySelector('#zhanghu');
let show=document.querySelector('.zhanghu');
let btnS=document.querySelector('#saoma');
let saoma=document.querySelector('.saoma');
let cureS=document.querySelector('.cure');
let code=document.querySelector('.code_img img');
let phone=document.querySelector('.phone_img');
account.onclick=function(){
    show.style.display='block';
    saoma.style.display='none';
    account.classList.add('color');
    cureS.classList.remove('cure');
}
btnS.onclick=function(){
    cureS.classList.add('cure');
    saoma.style.display='block';
    show.style.display='none';
    account.classList.remove('color');
}

code.onmouseEnter=function(){
    phone.style.display='block';
}
code.onmouseLeave=function(){
    phone.style.display='none';
}

let username=document.querySelector('.tel');
let pwd=document.querySelector('.password');
let data=localStorage.getItem("users");
data=JSON.parse(data);
let content=[];
for(let i in data){
    content.push(data[i]);
}
console.log(content);
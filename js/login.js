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
let btn=document.querySelector('.zhanghu button #login');
let sign1=document.querySelector('.sign1');
// let sign2=document.querySelector('.sign2');
// console.log(btn);
data=JSON.parse(data);
// let content='';

let state=false;
// 如果写在test函数里面，传参后变量的值仍是false，没有改变为true，也就不能登录
btn.onclick=test;
// 如果加（）直接调用

// let status=false;不能写在这里，要写在btn前面，因为上面已经触发test这个函数了
function clickTest(username,pwd){
    for(let i in data){
        if(username==i||username==data[i][1]){
            // console.log(1111);
            if(pwd==data[i][0]){
                state=true;
                // window.location.href='index.html';
            }
        }
    }
}

function test(){
    // console.log(111);
    clickTest(username.value,pwd.value);
    if(state==true){
        localStorage.setItem('login',JSON.stringify(username.value));
        window.location.href='index.html';

    }else{
        state=false;
        sign1.innerHTML='用户名或密码错误';
    }
}
let user=localStorage.getItem('user');
let userName=document.querySelector('.username');
let pwd=document.querySelector('.pwd');
let confirm1=document.querySelector('.true');
let mail=document.querySelector('.email');
let regis=document.querySelector('form>button>a');
let input=document.querySelectorAll('input');
let tip1=document.querySelector('.tip1');
// console.log(tip1);
let tip2=document.querySelector('.tip2');
let tip3=document.querySelector('.tip3');
let tip4=document.querySelector('.tip4');
let tip=document.querySelectorAll('.tip')
// let exist=document.querySelector('.existInput')

// let obj={};
let arr=[]
// obj["张三"]=['123','123@qq.com'];
// 用户名是键，密码和邮箱为值
let obj1=localStorage.getItem('users');
obj1=JSON.parse(obj1);
// console.log(obj1);
// 填入内容后遍历，如果i==张三 证明已经有这个用户了，然后下面就提示该用户名已存在，如果不存在就继续写密码邮箱，然后保存
userName.onblur=function(){
    if(!userName.value){
        tip1.innerHTML='用户名不能为空';
    }else{
        judge();
    }
}
function judge(){
    for(let i in obj1){
        console.log(userName.value);
        console.log(i);
            if(i==userName.value){
                console.log(123);
                tip1.innerHTML='用户名已存在';
            }
            else{
                tip1.innerHTML='用户名可用';
            }
    }
}
pwd.onblur=function(){
    if(!pwd.value){
        tip2.innerHTML='密码不能为空';
    }else{
        tip2.innerHTML='密码可用';
    }
}

confirm1.onblur=function(){
    if(!confirm1.value){
        tip3.innerHTML='密码不能为空';
    }else{
        tip3.innerHTML='密码一致';
    }
}

mail.onblur=function(){
    if(!mail.value){
        tip4.innerHTML='邮箱地址不能为空';
    }
    let res=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    let status=res.test(mail.value);
    // console.log(status);
    if(status==false){
        tip4.innerHTML='邮箱地址错误';

    }else{
        tip4.innerHTML='邮箱地址正确';
    }
}
regis.onclick=function(){
    if(tip1.innerHTML=='用户名可用'&&tip2.innerHTML=='密码可用'&&tip3.innerHTML=='密码一致'&&tip4.innerHTML=='邮箱地址正确'){
    window.location.href='login.html';
    let users=localStorage.getItem('users');
    if(!users){
    let obj={};
    obj[userName.value]=[pwd.value,mail.value];
    localStorage.setItem('users',JSON.stringify(obj));
    }else{
        let obj=JSON.parse(users);
        obj[userName.value]=[pwd.value,mail.value];
        localStorage.setItem('users',JSON.stringify(obj));
        }
    }else{
        return;
    }

    input.forEach(item=>{
        item.value='';
    })
    }

  
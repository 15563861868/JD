let loginned=document.querySelector('.user_login');
let regis=document.querySelector('.register');
let str=localStorage.getItem('login');
str=JSON.parse(str);
if(str){
    loginned.innerHTML=str;
    regis.innerHTML='&nbsp;&nbsp;退出';
}
regis.onclick=function(){
if(regis.innerHTML=='&nbsp;&nbsp;免费注册'){
    window.location.href='register.html';
    }else if(regis.innerHTML=='&nbsp;&nbsp;退出'){
        regis.innerHTML='&nbsp;&nbsp;免费注册';
        loginned.innerHTML='你好，请登录';
        localStorage.removeItem('login');
}
}
loginned.onclick=function(){
if(loginned.innerHTML=='你好，请登录'){
    window.location.href='login.html';
    }
}

 // console.log(this._$('.ad_618 .close_ad'));4
 _$('.ad_618 .close_ad').onclick = () => {
     _$('.ad_618').classList.add('hide');
 }

 // 轮播
 let show = _$('.content .show');
 let timer = '';
 timer = setInterval(function () {
     let show = _$('.content .show');
     if (num < lis.length - 1) {
         show.className = '';
         show.nextElementSibling.className = 'show';
         num++;
     } else {
         num = 0;
         lis.forEach(item => {
             item.className = '';
         })
         one.className = 'show';
     }
     active();
 }, 2000);
 _$('.content').onmouseover = () => {
     clearInterval(timer);
 }
 _$('.content').onmouseout = () => {
     timer = setInterval(function () {
         let show = _$('.content .show');
         if (num < lis.length - 1) {
             show.className = '';
             show.nextElementSibling.className = 'show';
             num++;
         } else {
             num = 0;
             lis.forEach(item => {
                 item.className = ''
             })
             one.className = 'show';
         }
         active();
     }, 2000);
 }

 let lis = $$('.content li');

 let one = lis[0];
 let last = lis[lis.length - 1];
 // console.log(last);
 let num = 0;
 let next = _$(".btn_r");
 let prev = _$(".btn_l");
 // next按钮
 next.onclick = () => {
     let show = _$('.content .show');
     if (num < lis.length - 1) {
         show.className = '';
         show.nextElementSibling.className = 'show';
         num++;
     } else {
         num = 0;
         lis.forEach(item => {
             item.className = ''
         })
         one.className = 'show';
     }
     active();
 }
 // previous按钮
 prev.onclick = () => {
     let show = _$('.content .show');
     //  let last = lis[lis.length - 1];
     // console.log(last);
     if (num > 0) {
         show.className = '';
         show.previousElementSibling.className = 'show';
         num -= 1;
     } else {
         num = lis.length - 1;
         lis.forEach(item => {
             item.className = '';
         })
         last.className = 'show';
     }
     active();
 }

 // 底部小按钮
 for (let i = 0; i < lis.length; i++) {
     let li = create('li');
     _$('.dotted').appendChild(li);
 }

 // 设置小按钮背景
 for (let k = 0; k < lis.length; k++) {
     lis[k].setAttribute('id', k);
 }
 let btns = $$('.dotted li')
//  btns[0].className = 'active';
//  for(let i=0;i<btns.length;i++){
//      picShow();
//      btns[i].onclick=function(){
//          lis[i].className='show';
//      }
//  }
 //  console.log(btns);
// function picShow(){
//     lis.forEach(item=>{
//         item.className = '';
//     })
// }
 function active() {
     btns.forEach(item => {
         item.className = '';
     })
     let pic = _$('.content .show');
     let index = pic.getAttribute('id');
     // console.log(index);
     btns[index].className = 'active';

 }


 //  倒计时
 setInterval(time, 1000);

 function time() {
     let endDate = new Date('2021-12-24 18:00:00').getTime();
     // 现在的时间
     let nowTime = new Date().getTime();
     // 总秒数
     let time = parseInt((endDate - nowTime) / 1000);
     let h = complement(parseInt(time / 3600 % 24));
     let m = complement(parseInt(time / 60 % 60));
     let s = complement(parseInt(time % 60));
     _$('.time_count .count_time .hour').innerHTML = h;
     _$('.count_time .minute').innerHTML = m;
     _$('.time_count .count_time .seconds').innerHTML = s;
 }
 time();

 function complement(num) {
     return num < 10 ? num = '0' + num : num
 }

 // 秒杀手动轮播
 let ul = _$('.miaosha_content');
 let col = $$('.miaosha_content .col');
 // console.log(col);
 let right = _$('.miaosha_lunbo .btn_r');
 let i = 0;
 right.onclick = () => {
     if (i < col.length - 1) {
         i += 1;
         ul.style.left = -(800 * i) + 'px';
     } else if (i == col.length - 1) {
         i = 0;
         ul.style.left = -(800 * i) + 'px';
     }
 }
 let left = _$('.miaosha_lunbo .btn_l');
 left.onclick = () => {
     if (i > 0) {
         i -= 1;
         ul.style.left = -(800 * i) + 'px';
     } else {
         i = col.length - 1;
         ul.style.left = -(800 * i) + 'px';
     }
 }

 // 我的购物车
 let goodsNum=_$('.shop_car .num');
 let goods=localStorage.getItem('cart');
 goods=JSON.parse(goods);
 let newIndex=0;
 for(let i in goods){
     newIndex++;
 }
//  console.log(newIndex);
 goodsNum.innerHTML=newIndex;



 // 为你推荐tab切换
 let label = document.querySelectorAll('.for_you_menu .for_tab_index');
 let content = document.querySelectorAll('.for_you_tab');
 let tabBtn=document.querySelectorAll('.for_you_menu .for_tab_index a');
 // 鼠标移入tab栏，显示对应子tab栏内容
 for(let i=0;i<label.length;i++){
    label[i].onclick = function(){
        console.log(111);
        clearName();
        tabBtn[i].classList.add('for_you_current');
        content[i].style.display = 'block';
    }
 }

 function clearName() {
     tabBtn.forEach(item => {
         item.classList.remove('for_you_current');
     })
     content.forEach(item => {
         item.style.display = 'none';
     })
 }



 function _$(ele) {
     return document.querySelector(ele)
 }

 function $$(ele) {
     return document.querySelectorAll(ele)
 }

 function create(ele) {
     return document.createElement(ele)
 }

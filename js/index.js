 // console.log(this._$('.ad_618 .close_ad'));4
 _$('.ad_618 .close_ad').onclick = () => {
     _$('.ad_618').classList.add('hide');
 }

 // 轮播
 let timer='';
 timer=setInterval(function(){
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
},2000);
 _$('.content').onmouseover=()=>{
    clearInterval(timer);
 }
 _$('.content').onmouseout=()=>{
    timer=setInterval(function(){
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
    },2000);
 }
 let show =_$('.content .show');
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
 btns[0].className = 'active';
//  console.log(btns);

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
setInterval(time,1000);
function time(){
    let endDate=new Date('2021-12-16 18:00:00').getTime();
    // 现在的时间
    let nowTime=new Date().getTime();
    // 总秒数
    let time=parseInt((endDate-nowTime)/1000);
    let h=complement(parseInt(time/3600%24));
    let m=complement(parseInt(time/60%60));
    let s=complement(parseInt(time%60));
    _$('.time_count .count_time .hour').innerHTML=h;
    _$('.count_time .minute').innerHTML=m;
    _$('.time_count .count_time .seconds').innerHTML=s;
}
time();
function complement(num){
    return num < 10 ? num = '0' + num : num
}

// 秒杀手动轮播
let ul=_$('.miaosha_content');
let col=$$('.miaosha_content .col');
// console.log(col);
let right=_$('.miaosha_lunbo .btn_r');
let i=0;
right.onclick = () => {
    if(i<col.length-1){
        i+=1;
        ul.style.left=-(800*i)+'px';
    }else if(i==col.length-1){
        i=0;
        ul.style.left=-(800*i)+'px';
    }
}
let left=_$('.miaosha_lunbo .btn_l');
left.onclick=()=>{
    if(i>0){
        i-=1;
        ul.style.left=-(800*i)+'px';
    }else{
        i=col.length-1;
        ul.style.left=-(800*i)+'px';
    }
}

// 我的购物车
// let goodsNum=_$('.shop_car .num');
// let goods=JSON.parse(localStorage.getItem('cart'));
// let goods=localStorage.getItem('cart');
// console.log(goods);

// 加入购物车
let enter=$$('.lookfor_sim .xiangsi');
// console.log(enter);




 function _$(ele) {
     return document.querySelector(ele)
 }

 function $$(ele) {
     return document.querySelectorAll(ele)
 }

 function create(ele) {
     return document.createElement(ele)
 }
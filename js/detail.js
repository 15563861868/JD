let small = document.querySelector('.mid_photo');
let smallbox = document.querySelector('.mid_photo div')
// console.log(small.offsetTop);
let mask = document.querySelector('.mask');
let big = document.querySelector('.big_photo');
let bigBox = document.querySelector('.big_photo div');

let picAll=document.querySelectorAll('.big_photo>div');
let smallpic = document.querySelectorAll('.mid_photo>div');
// console.log(smallpic);
let btn = document.querySelectorAll('.preview_list .list_item li img');
let li = document.querySelectorAll('.preview_list .list_item .list_item_menu li')
// let ul=document.querySelector('.preview_list .list_item');

small.onmouseover = () => {
    mask.style.display = 'block';
    big.style.display = 'block';
}

small.onmouseout = () => {
    mask.style.display = 'none';
    big.style.display = 'none';
    // console.log(123);
}
for (let i = 0; i < btn.length; i++) {
    // console.log(btn.length);
    btn[i].onclick = () => {
        clean();
        // let src = btn[i].getAttribute('src');
        // console.log(src);
        smallpic[i].style.display='block';
        // console.log(smallpic[i]);
        picAll[i].style.display='block';
        // console.log(picAll[i]);
        picAll[i].className='showOut';
    }
}
for (let k = 0; k < li.length; k++) {
    li[k].onclick = function(){
        clear();
        // console.log(this);
        this.className = 'liActive';
    }
}

let goodsNum=document.querySelector('.shop_car .num');
 let goods=localStorage.getItem('cart');
 goods=JSON.parse(goods);
 let newIndex=0;
 for(let i in goods){
     newIndex++;
 }
//  console.log(newIndex);
 goodsNum.innerHTML=newIndex;

// console.log(pic);
small.onmousemove = (e) => {
    e = e || window.event
    let x = e.pageX - small.offsetParent.offsetLeft - mask.offsetWidth / 2
    let y = e.pageY - small.offsetTop - mask.offsetHeight / 2
    if (x <= 0) {
        x = 0
    } else if (x >= small.offsetWidth - mask.offsetWidth) {
        x = small.offsetWidth - mask.offsetWidth
    }
    if (y <= 0) {
        y = 0
    } else if (y >= small.offsetHeight - mask.offsetHeight) {
        y = small.offsetHeight - mask.offsetHeight
    }
    mask.style.left = x + 'px'
    mask.style.top = y + 'px'
    let w = x / (parseInt(getComputedStyle(smallpic[0]).width) - mask.offsetWidth)
    // console.log(smallpic[0].offsetWidth);
    let h = y / (parseInt(getComputedStyle(smallpic[0]).height)  - mask.offsetHeight)
    // console.log(smallpic[0].offsetWidth - mask.offsetWidth);
    // console.log(w);
    let pic = document.querySelector('.showOut');
    let img=pic.querySelector('img')
    // console.log(img);
    // console.log(pic,pic.offsetWidth,big.offsetWidth);
    // console.log(w);
    pic.style.left = -w * (pic.offsetWidth - big.offsetWidth) + 'px'
    pic.style.top = -h * (pic.offsetHeight - big.offsetHeight) + 'px'
    // console.log(pic.offsetWidth - big.offsetWidth);
}

let ul=document.querySelector('.preview_list .list_item');
let col=document.querySelectorAll('.preview_list .list_item .list_item_menu');
let right=document.querySelector('.arrow_next');
let i=3;
right.onclick = () => {
    if(i%2==0){
        col[1].style.display='none';
        col[0].style.display='block';
    }else{
        col[0].style.display='none';
        col[1].style.display='block';
        // console.log(col[1]);
    }
    i++
}
let left=document.querySelector('.arrow_prev');
// let k=-3;
left.onclick=()=>{
    if(i%2==0){
        col[1].style.display='none';
        col[0].style.display='block';
    }else{
        col[0].style.display='none';
        col[1].style.display='block';
    }
    i--
}

let hov=document.querySelectorAll('.nav_tab .nav_tab_item h2');
let show=document.querySelectorAll('.nav_tab .nav_tab_item .item_tab_msg');
for(let i=0;i<hov.length;i++){
    hov[i].onmouseenter=()=>{
        // console.log(i);
        show[i].style.display='show';
        // console.log(show[i]);
    }
    hov[i].onmouseleave=()=>{
        // console.log(i);
        show[i].style.display='none';
    }
}

let label = document.querySelectorAll('.nav_tab_list .nav_tab_item');
 let content = document.querySelectorAll('.nav_tab_item .item_tab_msg');
 let firstBtn=document.querySelector('.w1 .nav_total .red_bg');
 console.log(firstBtn);
 let allContent=document.querySelector('.item_toatl_msg')
 // 鼠标移入tab栏，显示对应子tab栏内容
 for(let i=0;i<label.length;i++){
    label[i].onmouseenter = function(){
        clearName();
        content[i].style.display = 'block';
    }
 }
 firstBtn.onmouseenter=function(){
     allContent.style.display='block'
 }
 firstBtn.onmouseleave=function(){
    allContent.style.display='none'
}
 function clearName() {
     content.forEach(item => {
         item.style.display = 'none';
     })
 }

function clear(){
    btn.forEach(item=>{
        item.className='';
    })
}

function clean(){
    // console.log(111);
    smallpic.forEach(item=>{
        item.style.display='none';
    })
    picAll.forEach(item=>{
        item.style.display='none';
        item.className='';
    })
}
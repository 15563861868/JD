let small=document.querySelector('.mid_photo');
let mask=document.querySelector('.mask');
let big=document.querySelector('.big_photo');
small.onmouseover=()=>{
    mask.style.display='block';
    big.style.display='block';
}

small.onmouseout=()=>{
    mask.style.display='none';
    big.style.display='none';
}

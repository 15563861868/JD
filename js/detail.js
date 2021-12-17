let small = document.querySelector('.mid_photo');
// console.log(small.offsetTop);
let mask = document.querySelector('.mask');
let big = document.querySelector('.big_photo');
let pic = document.querySelector('.big_photo>img');
let smallbox = document.querySelector('.mid_photo>img');
let btn = document.querySelectorAll('.preview_list .list_item .list_item_menu li');
small.onmouseover = () => {
    mask.style.display = 'block';
    big.style.display = 'block';
}

small.onmouseout = () => {
    mask.style.display = 'none';
    big.style.display = 'none';
}
small.onmousemove = (e) => {
    e = e || window.event
    let x = e.pageX - small.offsetLeft - mask.offsetWidth / 2
    let y = e.pageY - small.offsetTop - mask.offsetHeight / 2
    if (x <= 0) {
        x = 0
    } else if (x >= smallbox.offsetWidth - mask.offsetWidth) {
        x = smallbox.offsetWidth - mask.offsetWidth
    }
    if (y <= 0) {
        y = 0
    } else if (y >= small.offsetHeight - mask.offsetHeight) {
        y = small.offsetHeight - mask.offsetHeight
    }
    mask.style.left = x + 'px'
    mask.style.top = y + 'px'
    let w = x / (smallbox.offsetWidth - mask.offsetWidth)
    let h = y / (smallbox.offsetHeight - mask.offsetHeight)
    pic.style.left = -w * (pic.offsetWidth - big.offsetWidth) + 'px'
    pic.style.top = -h * (pic.offsetHeight - big.offsetHeight) + 'px'
}
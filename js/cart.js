class Cart {
    constructor() {
        this.getGoods();
        this.checkAll();
        this._$('.shop_list').addEventListener('click', this.bubbleFn.bind(this));
    }
    bubbleFn(event) {
        let tar = event.target;
        // console.log(tar);
        // console.log(this.$$('.check-one').checked);
        // console.log(this);
        // console.log(this.$$('.check-one'));
        tar.classList.contains('j-checkbox') && this.checkOneFn(tar);
        tar.classList.contains('increment') && this.addFn(tar);
        tar.classList.contains('decrement') && this.decFn(tar);
        tar.classList.contains('p-action_x') && this.delFn(tar);

    }
    async getGoods() {
        let goods = await axios.get({
            url: 'data.json'
        });
        // console.log(goods);

        let cartGoods = localStorage.getItem('cart');
        // console.log(cartGoods);
        if (!cartGoods) return;
        cartGoods = JSON.parse(cartGoods);
        let now = goods.filter(item => {
            // console.log(cartGoods[item.id]);
            return cartGoods[item.id];
            // 这里的条件是，item.id是goods中的id，如果cartGoods中有这个id，就是符合条件，返回goods中对应的元素；
            // 如果item.id=1，进入filter，如果cartGoods里面有键为1，就会返回一个值（数字），转化为布尔值就是true，如果没有就返回undefined，转为false。
        })
        this.render(now, cartGoods);
        this.delChecked();
        this.one();
        this.deleteAll();
        // 如果写在constructor中，获取不到节点，因为getGoods获取了数据以后就执行del，还没有渲染到节点，所以在del中没办法获取节点  异步问题
    }
    render(now, cartGoods) {
        let html = '';
        now.forEach(item => {
            html += `<div class="cart-item check-cart-item" good-id="${item.id}">
            <div class="p-checkbox">
                <input type="checkbox" name="" id="" class="j-checkbox">
            </div>
            <div class="p-goods">
                <div class="p-img">
                    <img src="${item.src}">
                </div>
                <div class="p-msg two_row">${item.name}</div>
            </div>
            <div class="p-price"><span>￥</span><span class="money">${item.price}</span></div>
            <div class="p-num">
                <div class="quantity-form">
                    <a href="javascript:;" class="decrement">-</a>
                    <input type="text" class="itxt" value="${cartGoods[item.id]}">
                    <a href="javascript:;" class="increment">+</a>
                </div>
            </div>
            <div class="p-sum"><span>￥</span><span class="money">${cartGoods[item.id]*item.price}</span></div>
            <div class="p-action"><a href="javascript:;" class="p-action_x">删除</a><br><a href="javascript:;">移入关注</a></div>
        </div>`
        })
        this._$('.shop_list').innerHTML = html;
    }

    checkAll() {
        let allBtn = this.$$('.checkall');
        allBtn[0].addEventListener('click', this.allCheckFn.bind(this, 1));
        allBtn[1].addEventListener('click', this.allCheckFn.bind(this, 0));
    }
    allCheckFn(index, event) {
        let status = event.target.checked;
        this.$$('.checkall')[index].checked = status;
        this.radio(status);
        this.sumTotal(status);
    }
    radio(status) {
        this.$$('.j-checkbox').forEach(item => {
            item.checked = status;
        })
    }
    checkOneFn(tar) {
        this.sumTotal();
        if (!tar.checked) {
            this.$$('.checkall')[0].checked = false;
            this.$$('.checkall')[1].checked = false;
            return
        }
        let res = Array.from(this.$$('.j-checkbox')).some(item => {
            // console.log(item.checked);
            return !item.checked;
        })
        // console.log(res);
        if (!res) {
            this.$$('.checkall')[0].checked = true;
            this.$$('.checkall')[1].checked = true;
        }
        this.sumTotal();
    }

    sumTotal(sta = true) {
        let totalNum = 0;
        let totalPrice = 0;
        if (sta) {
            this.$$('.j-checkbox').forEach(item => {
                if (item.checked) {
                    // 如果单选选中，才进入计算
                    let onecheck = item.parentNode.parentNode;
                    totalNum += (onecheck.querySelector('.p-num .quantity-form .itxt').value - 0);
                    totalPrice += (onecheck.querySelector('.p-sum .money').innerHTML - 0);
                    // console.log(typeof totalPrice);
                }
            })
        }
        this._$('.amount-sum em').innerHTML = totalNum;
        this._$('.price-sum em').innerHTML = totalPrice;
    }
    // 数量减
    decFn(tar) {
        let num = tar.nextElementSibling;
        if (num.value > 1) {
            num.value = num.value - 0 - 1;
        } else {
            num.value =1;
        }
        // 获取单价和小计
        // 如果当前点击的+的单选被选中，就重新计算合计的值
        let price = tar.parentNode.parentNode.previousElementSibling.querySelector('.money').innerHTML;
        let subTotal = tar.parentNode.parentNode.nextElementSibling.querySelector('.money');
        subTotal.innerHTML = parseInt((num.value * price) * 100) / 100;
        tar.parentNode.parentNode.parentNode.querySelector('.j-checkbox').checked && this.sumTotal();
        this.modify(tar.parentNode.parentNode.parentNode.getAttribute('good-id'), num.value);
    }
    // 数量加
    addFn(tar) {
        let num = tar.previousElementSibling;
        num.value = num.value - 0 + 1;
        // console.log(num.value);
        // 获取单价和小计
        let price = tar.parentNode.parentNode.previousElementSibling.querySelector('.money').innerHTML;
        let subTotal = tar.parentNode.parentNode.nextElementSibling.querySelector('.money');
        subTotal.innerHTML = parseInt((num.value * price) * 100) / 100;
        tar.parentNode.parentNode.parentNode.querySelector('.j-checkbox').checked && this.sumTotal();
        // 如果当前点击的+的单选被选中，就重新计算合计的值
        this.modify(tar.parentNode.parentNode.parentNode.getAttribute('good-id'), num.value);
    }

    delFn(tar) {
        let that = this;
        let tr = tar.parentNode.parentNode;
        layer.open({
            title: '确认删除框',
            content: '确认删除该商品?',
            btn: ['取消', '确认'],
            btn2: function (index, layero) {
                tr.remove();
                tr.querySelector('.j-checkbox').checked && that.sumTotal();
            }
        });
        this.modify(tr.getAttribute('good-id'));
    }

    // 修改local
    modify(id, num = 0) {
        let cartGoods = localStorage.getItem('cart');
        if (!cartGoods) return;
        cartGoods = JSON.parse(cartGoods);
        num == 0 && delete cartGoods[id];
        num != 0 && (cartGoods[id] = num);
        // console.log(cartGoods[id] = num);
        localStorage.setItem('cart', JSON.stringify(cartGoods));
    }
    _$(ele) {
        return document.querySelector(ele)
    }
    $$(ele) {
        return document.querySelectorAll(ele)
    }

    delChecked(){
        let btn=this._$('.remove-batch');
        // console.log(btn);
        // console.log(checkOne);
        // let tr=checkOne.parentNode.parentNode;
        // 节点集合不能获取父级
        let that=this;
        // 这里可以给选中的节点加一个类名，然后点击按钮时，删除有这个类名的节点。
        btn.onclick=()=>{
                layer.open({
                    title: '确认删除框',
                    content: '确认删除选中商品?',
                    btn: ['取消', '确认'],
                    btn2: function (index, layero) {
                        that.select();
                        that.sumTotal();
                    }
                });
            }
    }

    select(){
        let select=document.querySelectorAll('.select');
                        select.forEach(item=>{
                            item.parentNode.parentNode.remove();
                            this.modify(item.parentNode.parentNode.getAttribute('good-id'));
                        })
    }
    one(){
        let checkOne=this.$$('.cart-item-list .j-checkbox');
        for(let i=0;i<checkOne.length;i++){
            checkOne[i].onclick=()=>{
                if(checkOne[i].checked==true){
                    checkOne[i].classList.add('select');
                }else{
                    checkOne[i].classList.remove('select');
                }
            }
        }
    }

    deleteAll(){
        let that=this;
        let del=document.querySelector('.clear-all');
        // let check=document.querySelectorAll('.j-checkbox');
        del.onclick=()=>{
            layer.open({
                title: '确认删除框',
                content: '确认删除全部商品?',
                btn: ['取消', '确认'],
                btn2: function (index, layero) {
                    that.all();
                    that.sumTotal();
                }
            });
        }
    }

    all(){
        let info=document.querySelectorAll('.cart-item');
        info.forEach(item=>{
            item.remove();
            this.modify(item.getAttribute('good-id'));
        })
    }
}
new Cart;

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
class Goods {
    constructor() {
        this.getGoods()
    }
    async getGoods() {
        let data = await axios.get({
            url: 'data.json',
            data: ''
        })
        // console.log(data);
        let html = '';
        data.forEach(goods => {
            html += `<li>
            <img src="${goods.src}">
            <div class="goods_msg">
                <h4 class="googs_title two_row ">
                    ${goods.name}
                </h4>
                <div class="price">
                    <i>￥</i><i>${goods.price}</i>
                </div>
                <div class="lookfor_sim">
                    <div class="xiangsi" onclick="Goods.addCart(${goods.id},1)">加入购物车</div>
                </div>
            </div>

        </li>`;
        })
        this.shop = document.querySelector('.for_you_goodslist');
        this.shop.innerHTML = html;
    }
    static addCart(id, num) {
        let cartGoods = localStorage.getItem('cart')
        if (cartGoods) {
            cartGoods = JSON.parse(cartGoods);
            for (let attr in cartGoods) {
                attr == id && (num = num + cartGoods[attr]);
            }
            cartGoods[id] = num;
            localStorage.setItem('cart', JSON.stringify(cartGoods));
        } else {
            cartGoods = {
                [id]: num
            };
            // cartGoods=JSON.stringify(cartGoods);
            localStorage.setItem('cart', JSON.stringify(cartGoods));
        }
    }
}
new Goods;
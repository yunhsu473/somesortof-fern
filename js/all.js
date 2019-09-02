// --------home page-------
$('document').ready(function () {
    console.log('load');
    $('.jumbotron').fadeIn(1000);
    $('.container').fadeIn(2500);
    $('.list').fadeIn(2500);
});


// --------news-------
$('.accordion').on('click', '.accordion-control', function (e) {
    e.preventDefault();
    /*被點到的東西他弟，沒有animated的全部（進行中不會受影響），展開或隱藏*/
    $(this).next('.accordion-panel').not(':animated').slideToggle();
})


// ----------cart--------
let cart;

function initCart() {
    cart = window.localStorage.getItem("cart");
    if (cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }
    render(cart);
}

function addToCart(id, title, price) {
    let product = {
        id: id,
        title: title,
        price: price,
        qty: 1
    };
    let index = cart.findIndex(function (item) {
        return item.id === product.id;
    })
    console.log(index);
    if (index === -1) {
        cart.push(product); //產品不存在購物車中，加進去
    } else {
        cart[index].qty += product.qty;
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
    alert('已加入購物車');
}


function render() {
    let list = document.querySelector('.mb-3');
    list.innerHTML = '';
    let product;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        product = cart[i];
        list.innerHTML +=
            `<ul>
                <li style="margin-top: 20px;"><img src="../images/product${product.id}.jpg" alt=""></li>
                <li>${product.title}</li>
                <li>NT$ ${product.price}</li>
                <li>${product.qty}</li>
                <li>NT$ ${product.price * product.qty}</li>
                <li> <button type="button" class="btn btn-outline-secondary" onclick=\"removeCart(${i})\">刪除</button></li>
            </ul>`
        total += product.price * product.qty;
    }
    let totalTex = document.querySelector('.total');
    totalTex.innerHTML = `總計： ${total} 元`
}

function removeCart(index) {
    cart.splice(index, 1);
    console.log(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    render(cart);
}
window.addEventListener('DOMContentLoaded', initCart);
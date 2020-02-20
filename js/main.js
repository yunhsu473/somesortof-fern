// --------nav-------
$(window).scroll(function () {
    let menu_top = $('.nav').offset().top;
    if ($(window).scrollTop() >= menu_top) {
        $('.navbar').addClass('fixed-top')
    }
    else {
        $('.navbar').removeClass('fixed-top')
    }
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
    let buylist = document.querySelector('.mb-3');
    buylist.innerHTML = '';
    let product;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        product = cart[i];
        buylist.innerHTML +=
            `<ul>
                <li style="margin-top: 20px;"><img src="../images/product/product${product.id}.jpg" alt=""></li>
                <li style="flex: 1.5;">${product.title}</li>
                <li>NT$ ${product.price}</li>
                <li style="flex: 0.8;">${product.qty}</li>
                <li style="flex: 0.8;">NT$ ${product.price * product.qty}</li>
                <li style="flex: 0.8;"> <button type="button" class="btn btn-outline-secondary" onclick=\"removeCart(${i})\">刪除</button></li>
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

// ---------fb login----------

//檢查登入狀態
function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response); // The current login status of the person.

    if (response.status === 'connected') { // Logged into your webpage and Facebook.使用者已授權開始應用程式
        // testAPI();
        start();
    } else { // Not logged into your webpage or we are unable to tell.使用者未授權，鼓勵使用者授權
        // loginBtn.style.display = "block";
        // logoutBtn.style.display = "none";
    }
}

function login() {
    FB.login(function (response) {
        statusChangeCallback(response);
    }, {
        scope: "email, public_profile"
    })
};


function logout() {
    let logoutBtn = document.querySelector('#logoutBtn');
    let showFb = document.querySelector('.showFb img');
    let loginBtn = document.querySelector('.loginBtn');

    FB.logout(function (response) {
        // user is now logged out
        statusChangeCallback(response);
        console.log(response);
        logoutBtn.style.display = "none";
        showFb.style.display = "none";
        loginBtn.style.display = "block";
    });
}

window.fbAsyncInit = function () {
    //初始化 fb 套件
    FB.init({
        appId: '488003245282589',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: 'v4.0' // Use this Graph API version for this call.
    });

    //偵測使用者是否已授權
    FB.getLoginStatus(function (response) { // Called after the JS SDK has been initialized.
        statusChangeCallback(response); // Returns the login status.
    });
};

//匿名函式立刻呼叫，這段的目的是載入Facebook JavaScript SDK， 載入完畢後固定呼叫 window.fbAsynsInit()
(function (d, s, id) { // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function start() {
    let loginBtn = document.querySelector('.loginBtn');
    let logoutBtn = document.querySelector('#logoutBtn');

    //呼叫 Graph Api ： FB.api(連線網址，回呼函示(結果))
    FB.api('/me?fields=id,name,email, gender', function (response) {
        console.log(response);
        let showFb = document.querySelector('.showFb');
        showFb.innerHTML = "<img src='http://graph.facebook.com/" + response.id + "/picture' />";
    });
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
}
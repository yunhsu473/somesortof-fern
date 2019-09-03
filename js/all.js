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

// ---------fb login----------

function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response); // The current login status of the person.
    if (response.status === 'connected') { // Logged into your webpage and Facebook.
        testAPI();
    } else { // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}

function checkLoginState() { // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) { // See the onlogin handler
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '488003245282589',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: 'v4.0' // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function (response) { // Called after the JS SDK has been initialized.
        statusChangeCallback(response); // Returns the login status.
    });
};


(function (d, s, id) { // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}
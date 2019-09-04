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
    let buylist = document.querySelector('.mb-3');
    buylist.innerHTML = '';
    let product;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        product = cart[i];
        buylist.innerHTML +=
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
    let loginBtn = document.querySelector('.loginBtn');
    let logoutBtn = document.querySelector('.logoutBtn');

    if (response.status === 'connected') { // Logged into your webpage and Facebook.使用者已授權開始應用程式
        // testAPI();
        start();
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
    } else { // Not logged into your webpage or we are unable to tell.使用者未授權，鼓勵使用者授權
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
    }
}

function login() {
    FB.login(function (response) {
        statusChangeCallback(response);
    }, {
        scope: "email, public_profile, user_gender, user_posts"
    })
};


function logout() {
    FB.logout(function (response) {
        // user is now logged out
        console.log(response);
        loginBtn.style.display = "block";
    });
}

// function checkLoginState() { // Called when a person is finished with the Login Button.
//     FB.getLoginStatus(function (response) { // See the onlogin handler
//         statusChangeCallback(response);
//     });
// }

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
    //呼叫 Graph Api ： FB.api(連線網址，回呼函示(結果))
    FB.api('/me?fields=id,name,email, gender', function (response) {
        console.log(response);
        let showFb = document.querySelector('.showFb');
        showFb.innerHTML = "<img src='http://graph.facebook.com/" + response.id + "/picture' />";
    });
}
// function testAPI() { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
//     console.log('Welcome!  Fetching your information.... ');
//     FB.api('/me', function (response) {
//         console.log('Successful login for: ' + response.name);
//         document.getElementById('status').innerHTML =
//             'Thanks for logging in, ' + response.name + '!';
//     });
// }

// --------------firebase---------

// var firebaseConfig = {
//     apiKey: "AIzaSyBwYrFFXTDqxvjcp2eeYzXF7t719WfxT6g",
//     authDomain: "somesortof-fern.firebaseapp.com",
//     databaseURL: "https://somesortof-fern.firebaseio.com",
//     projectId: "somesortof-fern",
//     storageBucket: "",
//     messagingSenderId: "497299808743",
//     appId: "1:497299808743:web:f9fdb75c5725bc40"
// };
// firebase.initializeApp(firebaseConfig);

// //check login status
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         console.log("Signed In", user.email);
//     } else {
//         console.log("Not Signed In");
//     }
// });

// //support Facebook login
// let provider = new firebase.auth.FacebookAuthProvider();
// provider.addScope('email', 'user_birthday');

// function login() {
//     firebase.auth().signInWithPopup(provider).then(function (result) {
//         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         console.log(user);
//     }).catch(function (error) {
//         console.log(error);
//     });
// }
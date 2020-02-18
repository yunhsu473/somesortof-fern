// --------home page-------
$('document').ready(function () {
    console.log('load');
    $('.jumbotron').fadeIn(1000);
    $('.container').fadeIn(2500);
    $('.list').fadeIn(2500);
});

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
    logoutBtn.style.display = "block";
}


// -----newsData-----
let newsData = [{
    theme: `2020 市集活動予告 `,
    content: `<br>
                報告一下近況， <br>
                今天還有五六日三天會在新北投好好市集， <br>
                接著2 / 4 - 9 一整個禮拜， 會參加台北國際書展， 預計會有新品 <br>
<br>
                2020 一開始就很不平靜， <br>
                國際上各種消息加上一大堆的爭吵做戲 <br>
                還有自己工作上的不愉快都讓人煩躁 <br>
                什麼都做不到實在超無力的。 <br>
                算是逼著自己畫了一張 <br>
                但還是好厭世 <br>

                大家出門務必要帶戴口罩， 自己多加小心 <br>
                都要好好的， 拜託。 <br>

                <br>
                1. 29 & 1.31 - 2.2 | <a target="_blank" href="https://www.facebook.com/haomarket/?fref=mentions&__xts__%5B0%5D=68.ARDiZn_rv1F1Tgghi61bjraMXVGPMgRpde99A15c9l3t4KoycKvQs1vWbqxOAlAJhVt76-A0NAqey4yohHxWxzAqluBxrqHbEimPZIUvV4GiELgmMnW7K2yEi3dQJxUdIytWaul2yAJblXcsWjJ_ySNnia9CZ-4h9fMtvmhdkHbD0bs_p9LDNbKdHNSuGIgycoLc7SBm-reZc-thY2Iw-LdVnUOgFdxqARAx4eYAw2nn21lULqBGqUymg2lylSSVBfaH-AcK9F249X2hkWqp7u47e8-wMRgVdCvoHgL7NaH_7YGGQ3Dim6ynuO4OoWGrEr2rCAOCwlxJvBCez0I9JOKZNG4i&__tn__=K-R"> 好好手感微笑市集 </a>::: 新北投車站 <br>
                2. 4 - 9 | <a target="_blank" href="https://www.facebook.com/taipeibookfair/?fref=mentions&__xts__%5B0%5D=68.ARDiZn_rv1F1Tgghi61bjraMXVGPMgRpde99A15c9l3t4KoycKvQs1vWbqxOAlAJhVt76-A0NAqey4yohHxWxzAqluBxrqHbEimPZIUvV4GiELgmMnW7K2yEi3dQJxUdIytWaul2yAJblXcsWjJ_ySNnia9CZ-4h9fMtvmhdkHbD0bs_p9LDNbKdHNSuGIgycoLc7SBm-reZc-thY2Iw-LdVnUOgFdxqARAx4eYAw2nn21lULqBGqUymg2lylSSVBfaH-AcK9F249X2hkWqp7u47e8-wMRgVdCvoHgL7NaH_7YGGQ3Dim6ynuO4OoWGrEr2rCAOCwlxJvBCez0I9JOKZNG4i&__tn__=K-R"> 台北國際書展 </a>::: 世貿一館 <br>
                <br>
                <img src="../images/news6.jpg" alt = "">
`
}, {
    theme: `市集活動予告：9.29 | 自己印 紙膠帶 Plan B - 你的市集・ 2019 台北場::: 松菸2號倉庫 `,
    content: `<br>
                <img src="../images/news5.jpg" alt=""> <br>
                <br>
                時間：2019-09-29 10:30-18:00 (最後入場) <br>
                地點：松山文創園區 2號倉庫
                (110台北市信義區光復南路133號) <br>
                關於：<br>
                生活很難，<br>
                不過我們永遠都可以回家，<br>
                摸摸喜愛的紙膠帶，<br>
                使用喜愛的文具，<br>
                進行創作、享受作手帳的時光，<br>
                這是我們都可以擁有的Plan B ♥<br>
                9/29 一起來你的市集，<br>
                探索屬於你的Plan B !!<br>`
}, {
    theme: `市集活動予告：9.21-22 | 尊任＿文酷展 Creative stationery exhibition::: 尊任咖啡(臺中)`,
    content: `<br>
                <img src="../images/news4.png" alt=""><br>
                <br>
                時間：2019年9月21日 - 22日 <br>
                地點：尊任咖啡 (403台中市西區民權路229巷21號) <br>
                關於：<br>
                以文具為主題的展覽市集，<br>
                邀請台灣高質感文創文具手創家展覽，<br>
                讓高品質的作品可以有一個專門展售平台，<br>
                與大家一起共享簡單卻深奧的文具魅力。<br>
`
}, {
    theme: `2019 新品紙膠帶預購`,
    content: `<br>
            ｜預購日期_2019/08/27 - 2019/09/13 <br>
            ｜出貨日期_09/29後依訂單順序安排出貨<br>
            <a href="https://urlzs.com/aXvqk" target="_blank">｜預購表單連結</a> <br>
            <br>
            A款 ::: 忒緹絲 (預購+市集限定款)<br>
            7.1cm X 10m / 95cm Loop<br>
            霧面PET+UV印刷+白墨 ::: 預購價:$360/卷 (定價$390)<br>
            <img src="../images/news3a.jpg" alt="">
            <br><br>
            B款 ::: 肉球<br>
            5cm X 10m / 245cm Loop<br>
            霧面日本和紙+白色離型紙+UV印刷 ::: 預購價:$260/卷 (定價$280)<br>
            <img src="../images/news3b.jpg" alt="">
            <br><br>
            C款 ::: Tetris俄羅斯方塊<br>
            2cm X 10m / 60cm Loop<br>
            霧面日本和紙+白色離型紙+UV印刷+立體燙金 ::: 預購價:$160/卷 (定價$165)<br>
            <img src="../images/news3c.png" alt="">
            <br><br>
            D款 ::: 幾何<br>
            2cm X 10m / 80cm Loop<br>
            霧面日本和紙+UV印刷 ::: 預購價:$145/卷 (定價$150)<br>
            <img src="../images/news3d.png" alt="">
            <br><br>
            E款 ::: 小人物<br>
            4.5cm X 10m / 45cm Loop<br>
            霧面日本和紙+UV印刷 ::: 定價$200/卷(非預購款無另做折扣)<br>
            <img src="../images/news3e.png" alt="">
            <br><br>
            F款 ::: Elf Season<br>
            2.5cm X 10m / 125cm Loop<br>
            PET+UV印刷+白墨 ::: 定價$160/卷(非預購款無另做折扣)<br>
            <img src="../images/news3f.png" alt="">
            <br><br>
            ◆ 訂單滿額500(含)以上<br>
            即贈:手工車縫內封插畫手帳本*1<br>
            (每單限一本，預購限定)<br>
            <br>
            ◆ 運送方式 ::: 郵局掛號 / 全家取貨 / 7-11取貨 / 市集取件<br>`
}, {
    theme: `新品紙膠帶介紹 ::: 肉球`,
    content: `<br>
            | 成分 |<br>
            內含約50隻大大小小長長短短(?)的喵<br>
            富含眼睛滋養+心靈療癒成分，建議大量使用!<br>
            <br>
            | 副作用 |<br>
            可能因心滿意足不想做任何事，導致事情延宕。<br>
            <br>
            | 規格 |<br>
            5cm X 10m / 245cm Loop(超~~~長~~~)<br>
            霧面日本和紙+白色離型紙+UV印刷<br>
            ::: 預購價:$260/卷 (定價$280) <br>
            <br>
            <img src="../images/news2.jpg" alt="">`
}, {
    theme: `市集活動予告：9.8 |嘎啦嘎啦室內市集｜解憂雜貨店`,
    content: `<br>
            <img src="../images/news1.jpg" alt="">
            <br>
            時間：2019年9月7日 星期六，下午1:00 – 下午7:00 <br>
            地點：嘎啦嘎啦市集 (104 台北市吉林路141號3樓) <br>
            詳情：<br>
            這是我看了『解憂雜貨店 』這本書，想到的主題。<br>
            <br>
            如果真的有那麼ㄧ個地方，可以讓你完全把煩惱都放進去，<br>
            或是像魏如萱唱的那樣，『 買你的不快樂』，那絕對是個每天都會爆滿的地方！<br>
            （其實我覺得錢櫃也算是解憂雜貨店的ㄧ種～顆顆）<br>
            <br>
            雖然我沒有找到ㄧ個真正可以解決你煩惱的地方，<br>
            可是我知道我這邊的陽光<br>
            還有這些充滿療癒感的創作<br>
            可以暫時，消除你ㄧ點點的憂鬱<br>
            <br>
            連續兩天的解憂雜貨店<br>
            <br>
            9月7日 參與品牌<br>
            ↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟<br>
            <br>
            百物語工作室<br>
            魚山<br>
            Rainbow ring 彩虹麟<br>
            何包蛋<br>
            Arwen H. / 阿文, Rachel Liao Illustration<br>
            老林雜貨TraveLin<br>
            CMYK<br>
            偶們<br>
            Scent Forest 香氛森林<br>
            Complex B<br>
            Sumomo<br>
            <br>
            9月8日 參與品牌<br>
            ↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟↟<br>
            YANG YANG<br>
            Tegokoro 甜手心<br>
            島嶼芳療師 O'SUN Aroma<br>
            Hlbmeow 花莉巴喵<br>
            神木系女孩<br>
            慢陶斯理<br>
            Y＊handmade<br>
            不好意思 bu hao yi si<br>
            羊君<br>
            片片<br>
`
}]

for (let i = 0; i < newsData.length; i++) {
    $('.accordion').append(`<li><button class="accordion-control btn btn-outline-success">${newsData[i].theme}</button><div class="accordion-panel"><p>${newsData[i].content}</p></div></li>`)
}
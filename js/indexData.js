// -----indexData-----
let recommand = [{
    image: `images/index/product1.jpg`,
    content: `| 2020 小鼠紅包袋 |`
}, {
    image: `images/index/product2.jpg`,
    content: `| 內封插畫筆記本 | plan/e/t`
}, {
    image: `images/index/product3.jpg`,
    content: `| 胸章套組 | 群 messes`
}, {
    image: `images/index/product4.jpg`,
    content: `| 婚禮插畫 | 含框手繪原稿 :: 全彩雙人半身`
}]

for (let i = 0; i < recommand.length; i++) {
    $('.recommend>div').append(`<div class="card" style="width: 20rem;"><img src="${recommand[i].image}" class="card-img-top"><div class="card-body"><h5 class= "card-title">${recommand[i].content}</h5></div></div>`)
}


let paperTape = [{
    image: `images/index/paperTape1.jpg`,
    content: `肉球 / 5.0cm貓咪紙膠帶`
}, {
    image: `images/index/paperTape2.jpg`,
    content: `忒緹絲 / 7.1cm紙膠帶`
}, {
    image: `images/index/paperTape3.png`,
    content: `Tetris 俄羅斯方塊 / 2.0cm紙膠帶`
}, {
    image: `images/index/paperTape4.jpg`,
    content: `龍子 / 5.0cm紙膠帶`
}]

for (let i = 0; i < recommand.length; i++) {
    $('.paperTape>div').append(`<div class="card" style="width: 20rem;"><img src="${paperTape[i].image}" class="card-img-top"><div class="card-body"><h5 class="card-title">${paperTape[i].content}</h5></div></div>`)
}

// -----productData-----
let productData = [{
    image: `../images/product/product1.png`,
    title: ` 2019 雙面掛曆::海報 | ms.Orchid`,
    price: `650`,
    content: `｜約38*59.4 cm<br>
                ｜飄銀紙 250 gsm， 雙面印刷 < br >
                ｜黑緞帶+小吊牌，透明圓筒包裝<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product2.jpg`,
    title: ` | 胸章套組 | <br>群 messes`,
    price: `250`,
    content: `｜胸章直徑約3.2 cm<br>
                ｜背紙尺寸約19.5*10.5 cm <br>
                ｜霧面質感+背面金屬別針<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product3.jpg`,
    title: ` | 插畫明信片 |<br> Human diagram人類圖鑑`,
    price: `250`,
    content: `｜14.8 *10.5 cm<br>
                ｜半黑紙，單面riso印刷，黑金雙色油墨<br>
                ｜真空袋包裝 (無信封)<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product4.jpg`,
    title: ` | 人像插畫 | <br>A5手繪原稿 :: 全彩全身`,
    price: `1200`,
    content: `｜尺寸為A5大小，約為14.8*21 cm<br>
                ｜創意插畫紙180gsm<br>
                ｜6B鉛筆+水彩+色鉛筆<br>
                ｜皮殼棉紙包裝，縫線封口<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product5.jpg`,
    title: `| 人像插畫 | <br>A5手繪原稿 :: 全彩多人半身`,
    price: `1200`,
    content: `｜尺寸略小於A5，約18*13~15 cm<br>
                ｜創意插畫紙180gsm<br>
                ｜6B鉛筆+水彩+色鉛筆<br>
                ｜真空袋+緞帶包裝<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product6.jpg`,
    title: `| 人像插畫 | <br>A6手繪原稿 :: 全彩單人半身`,
    price: `650`,
    content: `｜尺寸略小於A6，約10*13~15 cm<br>
                ｜創意插畫紙180gsm<br>
                ｜6B鉛筆+水彩+色鉛筆<br>
                ｜真空袋+緞帶包裝<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product7.jpg`,
    title: `| 內封插畫筆記本 |<br> plan/e/t`,
    price: `175`,
    content: `｜約11*15 cm<br>
                ｜封面:霜白紙180gsm+內頁包含:稻和紙、黑黑紙、砂糖紙、傳統和色紙-墨 、傳統和色紙-青磁<br>
                ｜皮殼棉紙包裝，縫線封口<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product8.jpg`,
    title: `| 插畫明信片 | <br>meow #暹羅-001`,
    price: `45`,
    content: `｜14.8 *10.5 cm
                ｜水彩紙220gsm，雙面印刷<br>
                ｜OPP袋包裝 (無信封)<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}, {
    image: `../images/product/product9.jpg`,
    title: `| 插畫小卡 | <br>殘肢系列*6入`,
    price: `295`,
    content: `｜14.8 *10.5 cm<br>
                ｜9x7cm、9x9cm、9x11cm(各兩張)<br>
                ｜凝雪映畫270gsm，雙面印刷，正面局部光<br>
                ｜黑緞帶+打凹小吊牌<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}]

for (let i = 0; i < productData.length; i++) {
    $('.productData').append(`<div class="card" style="width: 20rem;">
                                <img src="${productData[i].image}" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">${productData[i].title}</h5>
                                    <p class="card-text">
                                    <span>NT$ ${productData[i].price}</span>
                                    <br>
                                    ${productData[i].content}
                                    </p>
                                    <button type="button" class="btn btn-success"  onclick="addToCart(${[i+1]}, '${productData[i].title}', ${productData[i].price})">加入購物車</button>
                                </div>
                            </div>
`)
}


// -----soldout-----
let soldout = [{
    image: `../images/product/product10.JPG`,
    title: `| 印刷帆布袋 | <br>沒有就不穿。`,
    price: `405`,
    content: `｜12N帆布，米色<br>
                ｜約 34.5 * 38.5 cm，提把長約40 cm<br>
                ｜拍照效果和螢幕影響可能造成色差，商品皆以實體為主。`
}]

for (let i = 0; i < soldout.length; i++) {
    $('.soldout').append(`<div class="card" style="width: 20rem;">
                            <img src="${soldout[i].image}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${soldout[i].title}</h5>
                                <p class="card-text">
                                <span>NT$ ${soldout[i].price}</span>
                                <br>
                                ${soldout[i].content}
                                </p>
                                <button type="button"  class="btn btn-secondary btn-lg"  disabled >已售完</button>
                            </div>
                        </div>
`)
}

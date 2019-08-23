// --------home page-------
$('document').ready(function () {
    console.log('load');
    $('.jumbotron').fadeIn(1000);
    $('.container').fadeIn(2500);
    $('.list').fadeIn(2500);
});

// -------intro----

// --------news-------
$('.accordion').on('click', '.accordion-control', function (e) {
    e.preventDefault();
    /*被點到的東西他弟，沒有animated的全部（進行中不會受影響），展開或隱藏*/
    $(this).next('.accordion-panel').not(':animated').slideToggle();
})
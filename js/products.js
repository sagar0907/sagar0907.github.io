$(document).ready(function () {
    $('.down-arrow').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".display-slab").offset().top
        }, 1000);
    });
});

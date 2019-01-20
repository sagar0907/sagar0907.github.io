function initClickHandlers() {
    $('.down-arrow').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".display-slab").offset().top
        }, 1000);
    });
}

function initScrollHandlers() {
    let slabs = $(".display-slab");
    $(window).scroll(function () {
        let scrollTop = $(window).scrollTop();
        for (let i = 0; i < slabs.length; i++) {
            let slab = $(slabs[i]);
            if (scrollTop > slab.offset().top - $(window).height()) {
                let leftPart = slab.find(".box-part-left");
                let rightPart = slab.find(".box-part-right");
                leftPart.css("right", "0");
                rightPart.css("left", "0");
                setTimeout(function() {
                    leftPart.removeClass("box-part-left");
                    rightPart.removeClass("box-part-right");
                },2000);
            }
        }
    });
}


$(document).ready(function () {
    initClickHandlers();
    initScrollHandlers()
});

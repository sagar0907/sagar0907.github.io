function documentReady() {
    $(".page-toggle").click(function () {
        var id = $(this).attr('id').split('-')[0] + '-part';
        $("html, body").stop().animate({
            scrollTop: $('#' + id).offset().top
        }, 'slow');
    });
}
$(document).ready(function () {
    documentReady();
});
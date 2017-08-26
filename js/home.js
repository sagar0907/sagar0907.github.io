var base_url = window.location.origin;
function goToHome() {
    window.location = base_url;
}
function goToResume() {
    window.location = base_url + '/resume.html';
}
function goToContact() {
    window.location = base_url + '/contact.html';
}
function showPart(partName) {
    if (partName === 'home') {
        goToHome();
    } else if (partName === 'resume') {
        goToResume();
    } else if (partName === 'contact') {
        goToContact();
    }
}
function documentReady() {
    $(".one-part-toggle").click(function () {
        var id = $(this).attr('id');
        if (id) {
            var partName = id.split('-')[0];
            showPart(partName);
        }
    });
    $(".part-toggle").click(function () {
        var id = $(this).attr('id');
        if (id) {
            var partName = id.split('-')[0];
            showPart(partName);
        }
    });
    $(".page-toggle").click(function () {
        var id = $(this).attr('id').split('-')[0] + '-part';
        $(document.body).animate({
            scrollTop: $('#' + id).offset().top
        }, 'slow');
    });
}
$(document).ready(function () {
    documentReady();
});
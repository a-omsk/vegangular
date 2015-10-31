$(document).ready(function() {
    function changeMapHeight() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        $('#map').height(windowHeight).width(windowWidth);
    }
    $(window).resize(function() {
        changeMapHeight();
    });
    changeMapHeight();
});

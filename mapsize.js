$(document).ready(function() {
    function changeMapHeight() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var sidebarHeight = $('div.sidebar').height();
        var controlPanelHeight = $('div.control-panel').height();
        $('.location-container').height(sidebarHeight - controlPanelHeight);
        $('#map').height(windowHeight).width(windowWidth);
    }
    $(window).resize(function() {
        changeMapHeight();
    });
    changeMapHeight();
});

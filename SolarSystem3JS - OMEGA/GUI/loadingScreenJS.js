$(function()
{

$(".loader").css("width","100%");
setTimeout(loadingScreenKaybol,5500);
setTimeout(loadingScreenSil,6000);

});
function loadingScreenKaybol()
{
    $(".loadingScreen").css("opacity","0");
}
function loadingScreenSil()
{
    $(".loadingScreen").remove();
}
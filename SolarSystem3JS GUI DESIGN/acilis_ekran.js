$(function () 
{

	setTimeout(ekranKapat,17500);
	setTimeout(ekranSil,21000);
});
function ekranKapat()
{
	$(".yaziAnimContainer").css("opacity","0");
}
function ekranSil()
{
	$(".yaziAnimContainer").remove();
}
var intervalIDs = [];
var skipInterval = undefined;
var startSystem = false;
$(function () 
{
	$(".yaziAnimContainer").click(skipFonk);
	intervalIDs.push(setTimeout(ekranKapat,17500));
	intervalIDs.push(setTimeout(ekranSil,21000));
});
function skipFonk()
{
	deleteEkranInterval();
	startSystem=true;
	$(".yaziAnimContainer").css("opacity","0");
	setTimeout(ekranSil,1000);
}
function ekranKapat()
{
	$(".yaziAnimContainer").css("opacity","0");
}
function ekranSil()
{
	$(".yaziAnimContainer").remove();
}
function deleteEkranInterval()
{
	for(let i=0;i<intervalIDs.length;i++)
	{
		clearTimeout(intervalIDs[i]);
	}	
	while(intervalIDs.length>0)
	{
		intervalIDs.pop();
	}
}
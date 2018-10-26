$(function() 
{
	//şuan sistemle alakalı bir şey yok

});

function konsol_outPut()
{
	//dunya pozisyonunu veriyor
	var dunya = $(".dunya");
	var dunyaPoz = dunya.position();
	console.log('%cDünya Koordinat X : '+dunyaPoz.left+' Y :'+dunyaPoz.top,'color:blue');
}
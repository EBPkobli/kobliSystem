$(function()
{
	$('.btn-div').on('click',aktifButon); //arka planı beyazlaştırıyor
	$('.btn-div.check i').on('click',checkTrue); //checked yapıp yeşile çeviriyor
});

function aktifButon()
{
	//tıklandıysa aktifleştir kardeşlerindeki active classı sil
	$(this).addClass('active').siblings().removeClass('active');
	//mesala 1 divin içindeki 3div kardeştir
}
function checkTrue()
{
	//kendine ekle checked
	$(this).toggleClass('checked');
	//senden sonra gelen elemente de ekle
	$(this).next().toggleClass('checked');
	//bak bakalım id attr'ında ne yazıyor yani butonun ne bu sayede
	//butonları birbirinden ayırıyorum..
	switch($(this).parent().attr('id'))
	{
		case 'btn-cizgiCiz':
		if($(this).hasClass('checked'))
		{
			$('.orta .gunes .dunya').css("background","#f00");
			$('.orta .gunes .dunya .ay').css("background","#fff");
		}else
		{
			$('.orta .gunes .dunya').css("background","transparent");
			$('.orta .gunes .dunya .ay').css("background","transparent");
		}

		break;

		case 'btn-yorunge':

		break;
	}
}
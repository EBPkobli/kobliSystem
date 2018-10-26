document.addEventListener('mousemove', onDocumentMouseMove, false); //fare takibi
document.addEventListener('mousedown', onDocumentMouseDown, false); //fare tik
window.onload = init; //onLoad fonksiyonu sayfa geldikten sonra init fonksiyonunu çağırıyor!
window.onresize = tekrarBoyut;

//---------------------------Ekran buyultup kucultugunde tekrar çiz-------------------------------------
function tekrarBoyut() {
    //ekran değiştirildiğinde tekrardan kendini boyutlandır!
    sadeceKamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//---------------------------Ekran buyultup kucultugunde tekrar çiz-------------------------------------

//---------------------------Fare takibi EVENT-------------------------------------
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
//---------------------------Fare takibi EVENT-------------------------------------

//---------------------------Fare Tık EVENT-------------------------------------
function onDocumentMouseDown(event) {


}
//---------------------------Fare Tık EVENT-------------------------------------
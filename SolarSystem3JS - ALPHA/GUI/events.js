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

    if (kobliCameraControl.status == "exit") {
        kobliCameraControl.stopCam = true;
        kobliObject.set_mouse_onPlanet(undefined);
        kobliCameraControl.setActivePlanet(undefined);
        return 0;
    }
    if (kobliObject.get_mouse_onPlanet() == undefined) {
        return 0;
    }
    event.preventDefault(); // prevent action if mouse on planet
    kobliCameraControl.stopCam = false;
    kobliCameraControl.setActivePlanet(kobliObject.get_mouse_onPlanet());

}
//---------------------------Fare Tık EVENT-------------------------------------
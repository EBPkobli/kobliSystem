document.addEventListener('mousemove', onDocumentMouseMove, false); //fare takibi
document.addEventListener('mousedown', onDocumentMouseDown, false); //fare tik
window.onload = init; //onLoad fonksiyonu sayfa geldikten sonra init fonksiyonunu çağırıyor!
window.onresize = tekrarBoyut;

//---------------------------Ekran buyultup kucultugunde tekrar çiz-------------------------------------
function tekrarBoyut() {
    //ekran değiştirildiğinde tekrardan kendini boyutlandır!
    if (kameraPermission) {
        kucukKameraSagUst.updateProjectionMatrix();
        kucukKameraSagAlt.updateProjectionMatrix();
    }
    buyukKamera.updateProjectionMatrix();
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
    // event.preventDefault();
    if (m_onPlanet != "uzay") {
        planetMesh = scene.getObjectByName(m_onPlanet);
        buyukKamera.position.x = planetMesh.position.x - 1.5 * planetMesh.geometry.parameters.radius;
        buyukKamera.position.y = planetMesh.position.y;
        buyukKamera.position.z = planetMesh.position.z + 6 * planetMesh.geometry.parameters.radius;
        cameraControl.target = new THREE.Vector3(-10, 0, 25);
        animKamera["takip"] = true;
        animKamera["takipObje"] = m_onPlanet;
        if (m_onPlanet == "ay") {
            animKamera["lookAtObje"] = "dunya";
        } else if (m_onPlanet == "bulut") {
            animKamera["lookAtObje"] = "gunes";
        } else {
            animKamera["lookAtObje"] = "dunya";
        }
        /*  var lookat = new THREE.Vector3(-10,0,25);; /// whatever Vector3 you are using already
          buyukKamera.target = lookat;
          buyukKamera.update();
      */
    }
    else {
        //takibi bırak
        animKamera["takip"] = false;
    }

}
//---------------------------Fare Tık EVENT-------------------------------------
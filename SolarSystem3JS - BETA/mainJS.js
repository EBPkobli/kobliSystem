// Global Değerler
var renderer, scene,sadeceKamera;
var mouse = new THREE.Vector2(), INTERSECTED;
var rayCaster; //fare nesneye dokundu
var gunesSistemi;
// Global Değerler


function init() {


    rayCaster = new THREE.Raycaster();
    //---------------------------Scene Ayar-------------------------------------
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: antiAliasPermission });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    //---------------------------Scene Ayar-------------------------------------

    //Kamera 2 büyük kamera
    sadeceKamera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 1, 1000);
    // Position the sadeceKamera and point it at the center of the scene
    sadeceKamera.position.x = 50;
    sadeceKamera.position.y = 80;
    sadeceKamera.position.z = 200;
    sadeceKamera.lookAt(15, 0, 0);
    sadeceKamera.name = "sadeceKamera";

    cameraControl = new THREE.OrbitControls(sadeceKamera); //Fare ile kamera kontrollü ramledim.
    /*cameraControl.minPolarAngle = (goruntu2D) ? Math.PI : 0; // y aksisinde hareket etmemesi için 2d gözüksün ondan
    cameraControl.screenSpacePanning = true; //tersine çalışıyor yoksa fare alışması zor
    cameraControl.enablePan = false; // lookat'i sapıttırıyor detaylardan düzeltirim uğraşmak istemedim
    cameraControl.maxDistance = maxZoom; //maximum zoom yapma
    cameraControl.rotateSpeed = cameraDonmeHiz;
    */

    //---------------------------Kamera Ayar-------------------------------------

    //---------------------------Uzay Eklendi & Ayar-------------------------------------
    //Space background is a large sphere
    var uzayTex = THREE.ImageUtils.loadTexture("../Resimler/uzay2k.jpg");
    var uzaySphereGeo = new THREE.SphereGeometry(450, 50, 50);
    var uzaySphereMat = new THREE.MeshPhongMaterial();
    uzaySphereMat.map = uzayTex;

    var uzayMesh = new THREE.Mesh(uzaySphereGeo, uzaySphereMat);
    uzayMesh.name = "uzay";

    //uzayMesh needs to be double sided as the camera is within the uzayMesh
    uzayMesh.material.side = THREE.DoubleSide;
    uzayMesh.material.map.wrapS = THREE.RepeatWrapping;
    uzayMesh.material.map.wrapT = THREE.RepeatWrapping;
    uzayMesh.material.map.repeat.set(1, 1);

    scene.add(uzayMesh);
    //---------------------------Uzay Eklendi & Ayar-------------------------------------



    //---------------------------Güneş Eklendi & Ayar-------------------------------------
    var gunesGeometri = new THREE.SphereGeometry(gunesCap, segmentCount, segmentCount);
    var gunesMateryal = new THREE.MeshBasicMaterial();
    var gunesText = THREE.ImageUtils.loadTexture("../Resimler/gunes2k.jpg");
    gunesMateryal.map = gunesText;
    var gunesMesh = new THREE.Mesh(gunesGeometri, gunesMateryal);
    gunesMesh.name = 'gunes';
    gunesSistemi = new orbitSystem(gunesMesh,scene,gunesRotationSpeed,true);
    
    //---------------------------Güneş Eklendi & Ayar-------------------------------------


    //---------------------------Dünya Eklendi & Ayar-------------------------------------
    var dunyaGeometri = new THREE.SphereGeometry(dunyaCap, segmentCount, segmentCount);
    var dunyaMateryal = new newMaterial("../Resimler/earthmap4k.jpg");
    var dunyaMesh = new THREE.Mesh(dunyaGeometri, dunyaMateryal);
    dunyaMesh.name = 'dunya';
    gunesSistemi.addPlanet(dunyaMesh,dunyaRotationSpeed,dunyaGunesUzaklik,0,dunyaDonmeHiz);
    //---------------------------Dünya Eklendi & Ayar-------------------------------------


    //---------------------------Bulut Eklendi & Ayar-------------------------------------
    var bulutGeometri = new THREE.SphereGeometry(dunyaGeometri.parameters.radius * 1.01,
        dunyaGeometri.parameters.widthSegments,
        dunyaGeometri.parameters.heightSegments);
    var bulutMateryal = new newMaterial("../Resimler/fair_clouds_4k.png", true);
    var bulutMesh = new THREE.Mesh(bulutGeometri, bulutMateryal);
    bulutMesh.name = 'bulut';
    gunesSistemi.addPlanet(bulutMesh,bulutRotationSpeed,dunyaGunesUzaklik,0,dunyaDonmeHiz);
    gunesSistemi.setDontDrawLine('bulut');
    //---------------------------Bulut Eklendi & Ayar-------------------------------------

    //---------------------------Ay Eklendi & Ayar-------------------------------------
    var ayGeometri = new THREE.SphereGeometry(ayCap, segmentCount, segmentCount);
    var ayMateryal = newMaterial("../Resimler/ay2k.jpg")
    var ayMesh = new THREE.Mesh(ayGeometri, ayMateryal);
    ayMesh.name = "ay";
    gunesSistemi.getByName("dunya").mySelf.addPlanet(ayMesh,ayRotationSpeed,dunyaAyUzaklik,0,ayDonmeHiz);
    //---------------------------Ay Eklendi & Ayar-------------------------------------

    //---------------------------ambiyansIşık Eklendi & Ayar-------------------------------------
    var ambientLight = new THREE.AmbientLight(0x111111, .5);
    scene.add(ambientLight);
    //---------------------------ambiyansIşık Eklendi & Ayar-------------------------------------

    //---------------------------GÜNEŞ IŞIK Eklendi & Ayar-------------------------------------
    var sphere = new THREE.SphereBufferGeometry(gunesCap - 0.1, segmentCount, segmentCount);
    light1 = new THREE.PointLight(0XFFFFFF, 1, 550);
    light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0XFFFF00 })));
    scene.add(light1);
    //---------------------------GÜNEŞ IŞIK  Eklendi & Ayar-------------------------------------

    //---------------------------FPS Eklendi & Ayar-------------------------------------
    addStatsObject();
    //---------------------------FPS Eklendi & Ayar-------------------------------------

    //Body'e canvas eklendi
    document.body.appendChild(renderer.domElement);

    gunesSistemi.addScene();
    //RENDER işlemi başlatıldı!
    render();
}
function render() {


    //Kameranın dönebilmesi hareket edebilmesi için güncellendi
    cameraControl.update();


    //---------------------------------Nesne Seçici------------------------------------
    rayCaster.setFromCamera(mouse, sadeceKamera);
    gunesSistemi.setRayCaster(rayCaster)
    gunesSistemi.mouseOnPlanet();
    //---------------------------------Nesne Seçici------------------------------------

    //FPS için güncellendi HAZIR GUI
    stats.update();
    //FPS için güncellendi HAZIR GUI BALDAN TATLI

    //----------------Gezegenlere kendi içinde dönme-----------------------
    gunesSistemi.rotateThem();
    //----------------Gezegenlere kendi içinde dönme-----------------------

    //----------------Güneşin etrafında dönen dünya veya dünya etrafında ay----------------
    gunesSistemi.planetRotateParent();
    //----------------Güneşin etrafında dönen dünya veya dünya etrafında ay----------------

    //----------------Ayın dünya merkezli dunyaAyUzaklik çaplı yörüngesi!----------------
    gunesSistemi.drawOrbits();
    //----------------Ayın dünya merkezli dunyaAyUzaklik çaplı yörüngesi!----------------

    //-----------------Dünya ile Ay arasındaki Çizgi-----------------
    gunesSistemi.drawLines();
    //-----------------Dünya ile Ay arasındaki Çizgi-----------------

    //-----------------ÇİZİM RENDERLAMA İŞLEMİ----------------
    renderer.render(scene, sadeceKamera);
    //-----------------ÇİZİM RENDERLAMA İŞLEMİ----------------


    //sonsuz döngü her frame başına
    requestAnimationFrame(render);

}


//----------------------------------FPS Sayacının konumu yeri boyutu----------------------------------
function addStatsObject() {
    stats = new Stats();
    stats.domElement.classList.add("FPS_Sayac");
    //Jquery ile yapılır sağ geçirme!
    stats.domElement.style.left = '';
    //stats.domElement.style.translate = 'transformX(-50%)';
    stats.domElement.style.right = "0";
    //Jquery ile yapılır sağ geçirme!
    document.body.appendChild(stats.domElement);
}
//----------------------------------FPS Sayacının konumu yeri boyutu----------------------------------

function newMaterial(textureYol, transparency = false) {
    var thingText = THREE.ImageUtils.loadTexture(textureYol);
    var thingMat = new THREE.MeshPhongMaterial();
    thingMat.map = thingText;
    thingMat.transparent = transparency;
    return thingMat;
}



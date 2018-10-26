// Global Değerler
var renderer, scene, sadeceKamera;
var mouse = new THREE.Vector2(), INTERSECTED;
var rayCaster; //fare nesneye dokundu
// Global Değerler


function init() {
    //---------------------------Scene Ayar-------------------------------------
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: antiAliasPermission });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMap.enabled = true;
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
    cameraControl.minPolarAngle = (goruntu2D) ? Math.PI : 0; // y aksisinde hareket etmemesi için 2d gözüksün ondan
    cameraControl.screenSpacePanning = true; //tersine çalışıyor yoksa fare alışması zor
    cameraControl.enablePan = false; // lookat'i sapıttırıyor detaylardan düzeltirim uğraşmak istemedim
    cameraControl.maxDistance = maxZoom; //maximum zoom yapma
    cameraControl.rotateSpeed = cameraDonmeHiz;


    //---------------------------Kamera Ayar-------------------------------------

    //---------------------------SOUND Ayar-------------------------------------
    var listener = new THREE.AudioListener();
    sadeceKamera.add(listener);
    var audioLoader = new THREE.AudioLoader();
    var sunSound = new THREE.PositionalAudio( listener );
    audioLoader.load( '../sounds/sun.ogg', function( buffer ) {
        sunSound.setBuffer( buffer );
        sunSound.setLoop(true);
        sunSound.setVolume(0.5);
        sunSound.setRefDistance( 5 );
        sunSound.play();
    });
    var saturnSound = new THREE.PositionalAudio( listener );
    audioLoader.load( '../sounds/saturn.ogg', function( buffer ) {
        saturnSound.setBuffer( buffer );
        saturnSound.setLoop(true);
        saturnSound.setVolume(0.35);
        saturnSound.setRefDistance( 1.5 );
        saturnSound.play();
    });
    var jupiterSound = new THREE.PositionalAudio( listener );
    audioLoader.load( '../sounds/jupiter.ogg', function( buffer ) {
        jupiterSound.setBuffer( buffer );
        jupiterSound.setLoop(true);
        jupiterSound.setVolume(0.35);
        jupiterSound.setRefDistance( 1.5 );
        jupiterSound.play();
    });

    //---------------------------SOUND Ayar-------------------------------------

    //---------------------------Uzay Eklendi & Ayar-------------------------------------
    //Space background is a large sphere
    var uzayTex = THREE.ImageUtils.loadTexture("img/uzay2.jpg");
    var uzaySphereGeo = new THREE.SphereGeometry(290, 50, 50);
    var uzaySphereMat = new THREE.MeshPhongMaterial();
    uzaySphereMat.map = uzayTex;

    var uzayMesh = new THREE.Mesh(uzaySphereGeo, uzaySphereMat);
    uzayMesh.name = "uzay";

    //uzayMesh needs to be double sided as the camera is within the uzayMesh
    uzayMesh.material.side = THREE.BackSide;
    

    scene.add(uzayMesh);
    //---------------------------Uzay Eklendi & Ayar-------------------------------------

    //-----------------KOBLI SISTEM INIT EDILDI-----------------------
    kobliSystem.initSelf(scene,renderer,sadeceKamera,mouse);
    kobliObject.set_mouse_onPlanet(undefined);

    kobliCameraControl.init(sadeceKamera,cameraControl);
    //-----------------KOBLI SISTEM INIT EDILDI-----------------------

    //---------------------------Güneş Eklendi & Ayar-------------------------------------
    var theSun = new kobliPlanet("Gunes", "ffffff", gunesCap, "basic", false, "img/gunes2k.jpg", gunesRotationSpeed);
    theSun.getMeshSelf().add(sunSound);
    kobliSystem.add(theSun);
    //for now
    kobliCameraControl.setlookAtPlanet(theSun);
    //---------------------------Güneş Eklendi & Ayar-------------------------------------

    //---------------------------Merkür Eklendi & Ayar-------------------------------------

    var theMercury = new kobliPlanet("Merkur", "ffffff", dunyaCap / 2, "WITHLIGHT", false, "img/merkur2k.jpg", 0.1, 0.5, true, true, "a1a1a1", "a1a1a1",5);
    kobliSystem.add(theMercury).to("Gunes");
    kobliSystem.giveDistance("Merkur", 23);

    //---------------------------Merkür Eklendi & Ayar-------------------------------------


    //---------------------------Venüs Eklendi & Ayar-------------------------------------

    var theVenus = new kobliPlanet("Venus", "ffffff", dunyaCap / 1.5, "WITHLIGHT", false, "img/venus2k.jpg", dunyaRotationSpeed, -0.15, true, true, "d2782a", "d2782a",-5);
    kobliSystem.add(theVenus).to("Gunes");
    kobliSystem.giveDistance("Venus", 35);


    //---------------------------Venüs Eklendi & Ayar-------------------------------------


    //---------------------------Dünya Eklendi & Ayar-------------------------------------

    var theEarth = new kobliPlanet("Dunya", "ffffff", dunyaCap, "WITHLIGHT", false, "img/earth4k.jpg", dunyaRotationSpeed, 0.09, true, true, "1c546f", "1c546f",0.5);
    kobliSystem.add(theEarth).to("Gunes");
    kobliSystem.giveDistance("Dunya", 50);

    var theEarthCloud = new kobliPlanet("Bulut","ffffff",dunyaCap*1.01,"WITHLIGHT",true,"img/earthCloud4k.png",dunyaRotationSpeed*2,0.09,false,false,"1c546f", "1c546f",0.5);
    kobliSystem.add(theEarthCloud).to("Gunes");
    kobliSystem.giveDistance("Bulut",50);

    //---------------------------Dünya Eklendi & Ayar-------------------------------------

    //---------------------------Ay Eklendi & Ayar-------------------------------------
    var theMoon = new kobliPlanet("Ay", "ffffff", ayCap, "WITHLIGHT", false, "img/ay2k.jpg", ayRotationSpeed, 0.5,true,true,"a39f9c","a39f9c");
    kobliSystem.add(theMoon).to("Dunya");
    kobliSystem.giveDistance("Ay", 5);
    //---------------------------Ay Eklendi & Ayar-------------------------------------

    //---------------------------Mars Eklendi & Ayar-------------------------------------
    var theMars = new kobliPlanet("Mars", "ffffff", dunyaCap * 1.2, "WITHLIGHT", false, "img/mars2k.jpg", dunyaRotationSpeed * 1.5,-0.08, true, true, "e36439", "e36439",-1.1);
    kobliSystem.add(theMars).to("Gunes");
    kobliSystem.giveDistance("Mars", 70);
    //---------------------------Mars Eklendi & Ayar-------------------------------------

    //---------------------------Jupiter Eklendi & Ayar-------------------------------------
    var theJupiter = new kobliPlanet("Jupiter", "ffffff", dunyaCap * 6, "WITHLIGHT", false, "img/jupiter2k.jpg", dunyaRotationSpeed, 0.03, true, true, "d9d2ca", "d9d2ca",1.2);
    kobliSystem.add(theJupiter).to("Gunes");
    theJupiter.getMeshSelf().add(jupiterSound);
    kobliSystem.giveDistance("Jupiter", 96);
    //---------------------------Jupiter Eklendi & Ayar-------------------------------------

    //---------------------------Saturn Eklendi & Ayar-------------------------------------
     var theSaturn = new kobliPlanet("Saturn","ffffff",dunyaCap*3,"WITHLIGHT",false,"img/saturn2k.jpg",dunyaRotationSpeed,-0.004,true,true,"dbc095","dbc095",-1.7);
     kobliSystem.add(theSaturn).to("Gunes");
     kobliSystem.giveDistance("Saturn",125);
     theSaturn.getMeshSelf().add(saturnSound);
     var theRing = new kobliPlanetRing("SaturnRing",dunyaCap*3);
     kobliSystem.add(theRing).to("Saturn");

     
     //---------------------------Saturn Eklendi & Ayar-------------------------------------

     //---------------------------Uranus Eklendi & Ayar-------------------------------------
     var theUranus = new kobliPlanet("Uranus","ffffff",dunyaCap*3.25,"WITHLIGHT",false,"img/uranus2k.jpg",dunyaRotationSpeed,0.05,true,true,"abdde4","abdde4",2.4);
     kobliSystem.add(theUranus).to("Gunes");
     kobliSystem.giveDistance("Uranus",150);
     //---------------------------Uranus Eklendi & Ayar-------------------------------------
 
     //---------------------------Neptune Eklendi & Ayar-------------------------------------
     var theNeptune = new kobliPlanet("Neptune","ffffff",dunyaCap*2.8,"WITHLIGHT",false,"img/neptune2k.jpg",dunyaRotationSpeed,-0.023,true,true,"3a58b8","3a58b8",-1.4);
     kobliSystem.add(theNeptune).to("Gunes");
     kobliSystem.giveDistance("Neptune",180);
     //---------------------------Neptune Eklendi & Ayar-------------------------------------

     //---------------------------Pluto Eklendi & Ayar-------------------------------------
     var thePluto = new kobliPlanet("Pluto","ffffff",dunyaCap/3,"WITHLIGHT",false,"img/pluto1k.jpg",dunyaRotationSpeed,0.039,true,true,"6d7687","6d7687",8.45);
     kobliSystem.add(thePluto).to("Gunes");
     kobliSystem.giveDistance("Pluto",230);
     //---------------------------Pluto Eklendi & Ayar-------------------------------------
     
    //---------------------------ambiyansIşık Eklendi & Ayar-------------------------------------
    var sceneLight = new kobliLight("sceneLight","ambient",0x222222,0.85);
    kobliSystem.add(sceneLight);
    //---------------------------ambiyansIşık Eklendi & Ayar-------------------------------------

    //---------------------------GÜNEŞ IŞIK Eklendi & Ayar-------------------------------------
    var sunLight = new kobliLight("gunesIsik","pointlight",0xffffff,undefined,gunesCap/1.25,0xffcc00,350,0.5,theSun);
    kobliSystem.add(sunLight);

    //---------------------------GÜNEŞ IŞIK  Eklendi & Ayar-------------------------------------

    //---------------------------FPS Eklendi & Ayar-------------------------------------
    addStatsObject();
    //---------------------------FPS Eklendi & Ayar-------------------------------------

    //Body'e canvas eklendi
    document.body.appendChild(renderer.domElement);

    //RENDER işlemi başlatıldı!
    render();
}
function render() {


    //
    kobliCameraControl.animateCamera("spin");
    //Kameranın dönebilmesi hareket edebilmesi için güncellendi
    cameraControl.update();


    //---------------------------------Nesne Seçici------------------------------------
    

    //---------------------------------Nesne Seçici------------------------------------

    //FPS için güncellendi HAZIR GUI
    stats.update();
    //FPS için güncellendi HAZIR GUI BALDAN TATLI

    //----------------Gezegenlere kendi içinde dönme-----------------------
    kobliSystem.rotateThem();
    //----------------Gezegenlere kendi içinde dönme-----------------------

    //----------------Güneşin etrafında dönen dünya veya dünya etrafında ay----------------
    kobliSystem.spinThem();
    //----------------Güneşin etrafında dönen dünya veya dünya etrafında ay----------------

    //----------------Ayın dünya merkezli dunyaAyUzaklik çaplı yörüngesi!----------------
    kobliSystem.drawOrbits();
    //----------------Ayın dünya merkezli dunyaAyUzaklik çaplı yörüngesi!----------------

    //-----------------Dünya ile Ay arasındaki Çizgi-----------------
    kobliSystem.drawLines();
    //-----------------Dünya ile Ay arasındaki Çizgi-----------------

    kobliSystem.mouseOn_object();

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



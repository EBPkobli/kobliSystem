// Global Değerler
var renderer, scene, dinamikYorunge, kucukKameraSagAlt, kucukKameraSagUst, buyukKamera;
var mouse = new THREE.Vector2(), INTERSECTED;
var rayCaster; //fare nesneye dokundu
var tmpSecici; // geçici nesne
var m_onPlanet;
var animKamera = {
    "takip": false,
    "takipObje": "",
    "lookAtObje": ""
}
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

    //---------------------------Kamera Ayar-------------------------------------
    kucukKameraSagUst = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 1, 1000);
    kucukKameraSagUst.name = "kucukKameraSagUst";
    // Küçük kamera
    kucukKameraSagUst.position.x = 0;
    kucukKameraSagUst.position.y = 0;
    kucukKameraSagUst.position.z = 0;
    kucukKameraSagUst.lookAt(0, 0, 0);
    // add controls

    kucukKameraSagAlt = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 1, 1000);
    kucukKameraSagAlt.name = "kucukKameraSagAlt";
    // Küçük kamera
    kucukKameraSagAlt.position.x = 0;
    kucukKameraSagAlt.position.y = 0;
    kucukKameraSagAlt.position.z = 0;
    kucukKameraSagAlt.lookAt(0, 0, 0);
    // add controls



    //Kamera 2 büyük kamera
    buyukKamera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 1, 1000);
    // Position the buyukKamera and point it at the center of the scene
    buyukKamera.position.x = 50;
    buyukKamera.position.y = 80;
    buyukKamera.position.z = 200;
    buyukKamera.lookAt(15, 0, 0);
    buyukKamera.name = "buyukKamera";

    cameraControl = new THREE.OrbitControls(buyukKamera); //Fare ile kamera kontrollü ramledim.
    cameraControl.minPolarAngle = (goruntu2D) ? Math.PI : 0; // y aksisinde hareket etmemesi için 2d gözüksün ondan
    cameraControl.screenSpacePanning = true; //tersine çalışıyor yoksa fare alışması zor
    cameraControl.enablePan = false; // lookat'i sapıttırıyor detaylardan düzeltirim uğraşmak istemedim
    cameraControl.maxDistance = maxZoom; //maximum zoom yapma
    cameraControl.rotateSpeed = cameraDonmeHiz;

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
    var gunesGeometri = new THREE.SphereGeometry(gunesCap, 30, 30);
    var gunesMateryal = new THREE.MeshBasicMaterial();
    var gunesText = THREE.ImageUtils.loadTexture("../Resimler/gunes2k.jpg");
    gunesMateryal.map = gunesText;
    var gunesMesh = new THREE.Mesh(gunesGeometri, gunesMateryal);
    gunesMesh.name = 'gunes';
    gunesMesh["aCizgi"] = 'undefined';
    gunesSistemi = new planetSystem(gunesMesh);
    scene.add(gunesMesh);
    //---------------------------Güneş Eklendi & Ayar-------------------------------------


    //---------------------------Dünya Eklendi & Ayar-------------------------------------
    var dunyaGeometri = new THREE.SphereGeometry(dunyaCap, 30, 30);
    var dunyaMateryal = new newMaterial("../Resimler/earthmap4k.jpg");
    var dunyaMesh = new THREE.Mesh(dunyaGeometri, dunyaMateryal);
    dunyaMesh.name = 'dunya';
    dunyaMesh["aCizgi"] = 'undefined';
    dunyaMesh["yorungeCizgi"] = 'undefined';
    dunyaMesh.position.x = 0;
    gunesSistemi.addPlanet(dunyaMesh,50);
    scene.add(dunyaMesh);
    //---------------------------Dünya Eklendi & Ayar-------------------------------------


    //---------------------------Bulut Eklendi & Ayar-------------------------------------
    var bulutGeometri = new THREE.SphereGeometry(dunyaGeometri.parameters.radius * 1.01,
        dunyaGeometri.parameters.widthSegments,
        dunyaGeometri.parameters.heightSegments);
    var bulutMateryal = new newMaterial("../Resimler/fair_clouds_4k.png", true);
    var bulutMesh = new THREE.Mesh(bulutGeometri, bulutMateryal);
    bulutMesh.name = 'bulut';
    gunesSistemi.addPlanet(bulutMesh,50);
    scene.add(bulutMesh);
    //---------------------------Bulut Eklendi & Ayar-------------------------------------

    //---------------------------Ay Eklendi & Ayar-------------------------------------
    var ayGeometri = new THREE.SphereGeometry(ayCap, 30, 30);
    var ayMateryal = newMaterial("../Resimler/ay2k.jpg")
    var ayMesh = new THREE.Mesh(ayGeometri, ayMateryal);
    ayMesh.name = "ay";
    ayMesh["yorungeCizgi"] = 'undefined'
    ayMesh.position.x = 0;
    ayMesh.position.y = 0;
    ayMesh.position.z = 0;
    gunesSistemi.getChildPlanetbyName("dunya").mySelf.addPlanet(ayMesh,15);
    scene.add(ayMesh);
    //---------------------------Ay Eklendi & Ayar-------------------------------------

    //---------------------------ambiyansIşık Eklendi & Ayar-------------------------------------
    var ambientLight = new THREE.AmbientLight(0x111111, .5);
    scene.add(ambientLight);
    //---------------------------ambiyansIşık Eklendi & Ayar-------------------------------------

    //---------------------------GÜNEŞ IŞIK Eklendi & Ayar-------------------------------------
    var sphere = new THREE.SphereBufferGeometry(gunesCap - 0.1, 30, 30);
    light1 = new THREE.PointLight(0XFFFFFF, 1, 550);
    light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0XFFFF00 })));
    scene.add(light1);
    //---------------------------GÜNEŞ IŞIK  Eklendi & Ayar-------------------------------------

    //---------------------------FPS Eklendi & Ayar-------------------------------------
    addStatsObject();
    //---------------------------FPS Eklendi & Ayar-------------------------------------

    //Body'e canvas eklendi
    document.body.appendChild(renderer.domElement);

    //Yörünge Çizen fonksiyon çağrıldı
    //Dünya ile güneş arasındaki yörünge
    yorungeCiz("gunes", "dunya", 80, 0x1111ff);





    //RENDER işlemi başlatıldı!
    render();
}
var ayAci = { Aci: 0 }; //Ayın dönme Açısı
var dunyaAci = { Aci: 0 }; // Dünyanın Güneşe açısı
function render() {


    //Kameranın dönebilmesi hareket edebilmesi için güncellendi
    cameraControl.update();


    //---------------------------------Nesne Seçici------------------------------------
    rayCaster.setFromCamera(mouse, buyukKamera);
    var intersects = rayCaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (intersects[0].object.name != "uzay") {
            interectedObj = intersects[0].object;
            interectedGEO = interectedObj.geometry.parameters;

            //---ust uste binen objeleri ayırt etmek için!---
            var gobje = scene.getObjectByName("geciciObje");
            if (gobje != undefined && interectedObj != gobje) {
                scene.remove(scene.getObjectByName("geciciObje"));
                tmpSecici = undefined;
                m_onPlanet = undefined;
            }
            //---ust uste binen objeleri ayırt etmek için!---
            if (interectedGEO != undefined && tmpSecici == undefined) {
                var tmpSeciciGeo = new THREE.SphereBufferGeometry(interectedGEO.radius * 1.1, interectedGEO.widthSegments, interectedGEO.heightSegments);
                var tmpSeciciMateryal = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                tmpSeciciMateryal.transparent = true;
                tmpSeciciMateryal.opacity = 0.25;
                tmpSecici = new THREE.Mesh(tmpSeciciGeo, tmpSeciciMateryal);
                tmpSecici.name = "geciciObje";
                tmpSecici.position.x = interectedObj.position.x;
                tmpSecici.position.y = interectedObj.position.y;
                tmpSecici.position.z = interectedObj.position.z;
                m_onPlanet = interectedObj.name;
                scene.add(tmpSecici);
            }

        } else {
            if (scene.getObjectByName("geciciObje") != undefined) {
                scene.remove(scene.getObjectByName("geciciObje"));
                tmpSecici = undefined;
            }
            m_onPlanet = "uzay";
        }
    } else {


    }
    //---------------------------------Nesne Seçici------------------------------------

    //FPS için güncellendi
    stats.update();


    //----------------Gezegenlere kendi içinde dönme-----------------------
    scene.getObjectByName("bulut").rotation.y += bulutRotation;
    scene.getObjectByName("dunya").rotation.y += dunyaRotation;
    scene.getObjectByName("ay").rotation.y += ayRotation;
    scene.getObjectByName("gunes").rotation.y += gunesRotation;
    //----------------Gezegenlere kendi içinde dönme-----------------------

    //----------------dunyaAyUzaklik birim çapla dönüyor----------------
    etrafDon("dunya", "ay", dunyaAyUzaklik, ayAci, ayDonmeHiz);
    if (ayAci == 360) ayAci = 0;

    //----------------dunyaAyUzaklik birim çapla dönüyor----------------

    //----------------Ayın dünya merkezli dunyaAyUzaklik çaplı yörüngesi!----------------
    yorungeCiz("dunya", "ay", dunyaAyUzaklik, 0xffffff);
    //----------------Ayın dünya merkezli dunyaAyUzaklik çaplı yörüngesi!----------------

    //----------------dunyaGunesUzaklik birim çapla dönüyor----------------
    etrafDon("gunes", "dunya", dunyaGunesUzaklik, dunyaAci, dunyaDonmeHiz);
    if (dunyaAci == 360) dunyaAci = 0;
    //----------------dunyaGunesUzaklik birim çapla dönüyor----------------

    //----------------dunyaGunesUzaklik birim çapla dönüyor DÜNYA BULUTU İÇİN AYRICA!----------------
    etrafDon("gunes", "bulut", dunyaGunesUzaklik, dunyaAci, 0);
    //----------------dunyaGunesUzaklik birim çapla dönüyor DÜNYA BULUTU İÇİN AYRICA!----------------

    //-----------------Dünya ile Ay arasındaki Çizgi-----------------
    aCizgiCiz("dunya", "ay", 0xffffff);
    //-----------------Dünya ile Ay arasındaki Çizgi-----------------

    //-----------------Dünya ile Ay arasındaki Çizgi-----------------
    aCizgiCiz("gunes", "dunya", 0x0000ff);
    //-----------------Dünya ile Ay arasındaki Çizgi-----------------



    if (kameraPermission) {
        //render işlemi gerçekleşti!
        var left = Math.floor(0);
        var top = Math.floor(0);
        var width = Math.floor(window.innerWidth / 2);
        var height = Math.floor(window.innerHeight);

        renderer.setViewport(left, top, width, height);
        renderer.setScissor(left, top, width, height);
        renderer.setScissorTest(true);
        renderer.render(scene, buyukKamera);
        //


        //render işlemi gerçekleşti!
        var left = Math.floor(window.innerWidth / 2);
        var top = Math.floor(0);
        var width = Math.floor(window.innerWidth / 2);
        var height = Math.floor(window.innerHeight / 2);

        renderer.setViewport(left, top, width, height);
        renderer.setScissor(left, top, width, height);

        var tmp = [];
        tmp["kamera"] = kucukKameraSagUst;

        kameraTakip("dunya", "gunes", tmp["kamera"]);
        kucukKameraSagUst.updateProjectionMatrix();
        renderer.render(scene, kucukKameraSagUst);
        //

        //render işlemi gerçekleşti!
        var left = Math.floor(window.innerWidth / 2);
        var top = Math.floor(window.innerHeight / 2);
        var width = Math.floor(window.innerWidth / 2);
        var height = Math.floor(window.innerHeight / 2);

        renderer.setViewport(left, top, width, height);
        renderer.setScissor(left, top, width, height);

        tmp["kamera"] = kucukKameraSagAlt;

        kameraTakip("gunes", "dunya", tmp["kamera"]);
        kucukKameraSagAlt.updateProjectionMatrix();
        renderer.render(scene, kucukKameraSagAlt);
        //

    } else {
        renderer.render(scene, buyukKamera);
    }
    animKameraTakip(animKamera);
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

//----------------------------------X'in Y etrafında döndüren fonksiyon----------------------------------
function etrafDon(merkezObje, donenObje, yariCap, obje, hiz) {
    obje.Aci += hiz // başta kalsın yoksa bulut ileride kalıyor dünyadan
    merkezObjeMeshPos = scene.getObjectByName(merkezObje).position;
    donenObjeMeshPos = scene.getObjectByName(donenObje).position;
    donenObjeMeshPos.x = merkezObjeMeshPos.x + yariCap * Math.sin((obje.Aci / 180) * Math.PI);
    donenObjeMeshPos.z = merkezObjeMeshPos.z + yariCap * Math.cos((obje.Aci / 180) * Math.PI);


}
//----------------------------------X'in Y etrafında döndüren fonksiyon----------------------------------

//----------------------------------hareketli X'in Y etrafındaki yörüngesi----------------------------------
function yorungeCiz(merkezObje, uyduObje, yariCap, renk) {
    if (yorungePermission) {
        var material = new THREE.LineBasicMaterial({ color: renk });
        var geometry = new THREE.Geometry();
        var merkezObjeMesh = scene.getObjectByName(merkezObje);
        var uyduObjeMesh = scene.getObjectByName(uyduObje);
        var merkezX = merkezObjeMesh.position.x;
        var merkezY = merkezObjeMesh.position.y;
        var merkezZ = merkezObjeMesh.position.z;
        if (uyduObjeMesh["yorungeCizgi"] != "undefined") scene.remove(uyduObjeMesh["yorungeCizgi"]);
        for (let i = 0; i <= 360; i += 10) {
            geometry.vertices.push(new THREE.Vector3(merkezX + yariCap * Math.sin((i / 180) * Math.PI), merkezY, merkezZ + yariCap * Math.cos((i / 180) * Math.PI)));
        }
        uyduObjeMesh["yorungeCizgi"] = new THREE.Line(geometry, material);
        scene.add(uyduObjeMesh["yorungeCizgi"]);
    }
}
//----------------------------------hareketli X'in Y etrafındaki yörüngesi----------------------------------



//---------------------------------Dünya ile Ay arasındaki ÇizgiÇiz----------------------------------
function aCizgiCiz(merkezObje, donenObje, renk) {
    if (cizgiPermission) {
        sceneMerkezObje = scene.getObjectByName(merkezObje);
        sceneDonenObje = scene.getObjectByName(donenObje);
        if (sceneMerkezObje["aCizgi"] != "undefined") scene.remove(sceneMerkezObje["aCizgi"]);
        var cizgiMat = new THREE.LineBasicMaterial({ color: renk });
        var cizgiGeo = new THREE.Geometry();
        cizgiGeo.vertices.push(sceneMerkezObje.position);
        cizgiGeo.vertices.push(sceneDonenObje.position);
        sceneMerkezObje["aCizgi"] = new THREE.Line(cizgiGeo, cizgiMat);
        scene.add(sceneMerkezObje["aCizgi"]);

    }
}
//---------------------------------Dünya ile Ay arasındaki ÇizgiÇiz----------------------------------


//---------------------------------Dünyadan Güneşi izleyen takip kamerası fonk----------------------------------
function kameraTakip(takipObje, lookAtObje, kameraSelf) {

    takipOBJ = scene.getObjectByName(takipObje);
    lookAtOBJ = scene.getObjectByName(lookAtObje);
    lookAtOBJPos = lookAtOBJ.position;
    kameraSelf.position.x = takipOBJ.position.x;
    kameraSelf.position.y = takipOBJ.position.y;
    kameraSelf.position.z = takipOBJ.position.z;
    kameraSelf.lookAt(lookAtOBJPos.x, lookAtOBJPos.y, lookAtOBJPos.z);
}
//---------------------------------Dünyadan Güneşi izleyen takip kamerası fonk----------------------------------

function animKameraTakip(struct_Animcam) {
    if (struct_Animcam["takip"]) {
        takipOBJ = scene.getObjectByName(struct_Animcam["takipObje"]);
        lookAtOBJ = scene.getObjectByName(struct_Animcam["lookAtObje"]);
        lookAtOBJPos = lookAtOBJ.position;
        var yariCap = takipOBJ.geometry.parameters.radius;

        if (struct_Animcam["takipObje"] == "ay") {
            etrafDonC(struct_Animcam["takipObje"], yariCap*2, ayAci, 0);
        }else if(struct_Animcam["takipObje"] == "bulut")
        {
            etrafDonC(struct_Animcam["takipObje"], yariCap, dunyaAci, 0);
        }
        else
        {
            buyukKamera.position.x = takipOBJ.position.x;
            buyukKamera.position.y = takipOBJ.position.y + yariCap*1.25;
            buyukKamera.position.z = takipOBJ.position.z - yariCap;
        }
        cameraControl.target = new THREE.Vector3(lookAtOBJPos.x, lookAtOBJPos.y, lookAtOBJPos.z);
    }
}


//----------------------------------X'in Y etrafında döndüren fonksiyon----------------------------------
function etrafDonC(merkezObje, yariCap, obje) {
    merkezObjeMeshPos = scene.getObjectByName(merkezObje).position;
    donenObjeMeshPos = buyukKamera.position;
    donenObjeMeshPos.x = merkezObjeMeshPos.x + (2.5 * yariCap) * Math.sin((obje.Aci / 180) * Math.PI);
    donenObjeMeshPos.z = merkezObjeMeshPos.z + (6 * yariCap) * Math.cos((obje.Aci / 180) * Math.PI);


}
//----------------------------------X'in Y etrafında döndüren fonksiyon----------------------------------

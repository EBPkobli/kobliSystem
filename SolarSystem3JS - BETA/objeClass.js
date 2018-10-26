class orbitSystem {

    constructor(parentPlanet, mainScene, rotationSpeed = 0,centerPlanet = false) {
        this.m_parentP = parentPlanet;
        this.m_parentPos = parentPlanet.position;
        this.m_parentPRad = parentPlanet.geometry.parameters.radius;
        this.m_parentPName = parentPlanet.name;
        this.m_rotationSpeed = rotationSpeed;
        this.m_parentChilds = [] //Güneşin çocugu dünya , dünyanında çocugu ay
        this.m_parentChildLove = []; //Güneş ile dünya arasındaki mesafe
        this.m_parentChildLoveAngle = []; // Güneş ile dünya arasındaki açı
        this.m_parentChildLoveAngleFast = []; // Güneş ile dünya arasındaki açı hızı
        this.m_parentChildLoveColor = []; //Çizgi ve yörüngelerin rengi
        this.m_parentChildLoveOrbit = []; //Yörünge objelerinin dizisi
        this.m_parentChildLoveLine = []; //Çizgi objelerinin dizisi
        this.m_scene = mainScene; //ekleme çıkarma vs işlemlerde lazım olacak sınıfta dursun.
        this.m_mouseOn = false;
        this.m_rayCaster = undefined;
        this.m_mouseOnSelf = undefined;
        this.m_dontDrawAnyLine = false; //sadece bulut için kapatacağım.
        this.m_myParent = undefined;
        if(centerPlanet)
            orbitSystem.setSystemPlanet(parentPlanet.name);
    }

    //------------STATIC FONKSIYONLAR-------------------
    static setDrawOrbitPermission(Permission) {
        orbitSystem.drawOrbitPermission = Permission;
    }
    static setDrawLinePermission(Permission) {
        orbitSystem.drawLinePermission = Permission;
    }
    static setSystemPlanet(centerPlanet)
    {
        orbitSystem.mainPlanet = centerPlanet;
    }
    static setActivePlanet()
    {
        //az kaldı hissedebiliyorum
    }
    //------------STATIC FONKSIYONLAR-------------------

    //---------------------------SET'TERLARIM-------------------------


    setPos(x, y, z, absolutePos = false) {
        if (absolutePos) {
            this.m_parentPos.x = x;
            this.m_parentPos.y = y;
            this.m_parentPos.z = z;
        } else {
            this.m_parentPos.x += x;
            this.m_parentPos.y += y;
            this.m_parentPos.z += z;
        }
    }
    setName(newName) {
        this.m_parentPName = newName;
        this.m_parentP.name = this.m_parentPName;
    }
    setRadius(newRadius) {
        //Objenin silinip tekrardan eklenmesi gerekiyor.
        this.m_parentPRad = newRadius;
        this.m_parentP.geometry.parameters.radius = this.m_parentPRad;
    }

    setRotationSpeed(newSpeed) {
        this.m_rotationSpeed = newSpeed;
    }
    setChildColor(whichPlanet, colorOfLove) {

        var thePlanet = this.getByName(whichPlanet);
        var thePlanetParent = thePlanet.mySelf.getMom();
        var thePlanetIndex = thePlanet.childIndex;
        thePlanetParent.m_parentChildLoveColor[thePlanetIndex] = colorOfLove;
    }
    setFakeMouse(fakeMouseonHer) {
        this.m_mouseOn = fakeMouseonHer;
    }
    setRayCaster(rayCaster) {
        this.m_rayCaster = rayCaster;
    }
    setDontDrawLine(whichPlanet) {
        if (whichPlanet == this.getPlanetName()) {
            this.m_dontDrawAnyLine = true;
        } else {
            var planetValue = this.getByName(whichPlanet);
            planetValue.mySelf.m_dontDrawAnyLine = true;
        }
    }
    //---------------------------SET'TERLARIM-------------------------

    //---------------------------GET'TERLARIM-------------------------
    getdontDrawLine() {
        return this.m_dontDrawAnyLine;
    }
    getPlanet() {
        return this.m_parentP;
    }
    getMom()
    {
        return this.m_myParent;
    }

    getPlanetName() {
        return this.m_parentPName;
    }

    getRadius() {
        return this.m_parentPRad;
    }

    getPos() {
        return this.m_parentPos;
    }

    getRotationSpeed() {
        return this.m_rotationSpeed = newSpeed;
    }

    getChildColor(whichPlanet) {
        var thePlanet = this.getByName(whichPlanet);
        var thePlanetParent = thePlanet.mySelf.getMom()
        var thePlanetIndex = thePlanet.childIndex;
        return thePlanetParent.m_parentChildLoveColor[thePlanetIndex];
    }

    getRayCaster() {
        return this.m_rayCaster;
    }
    //---------------------------GET'TERLARIM-------------------------

    //---------------------------CHILDLARIM-------------------------
    addPlanet(newPlanet, rotateSpeed = 0, radiusBetween = 10, angleBetween = 0, angleSpeed = 0, childColor = 0xffffff) {
        this.m_parentChilds.push(new orbitSystem(newPlanet, this.m_scene, rotateSpeed));
        this.m_parentChilds[this.m_parentChilds.length - 1].m_myParent = this;
        this.m_parentChildLove.push(radiusBetween);
        this.m_parentChildLoveAngle.push(angleBetween);
        this.m_parentChildLoveAngleFast.push(angleSpeed);
        this.m_parentChildLoveColor.push(childColor);
        this.m_parentChildLoveOrbit.push("none");
        this.m_parentChildLoveLine.push("none");
    }
    delete() {
        console.log("Doesnt work for now");
        /*
        if(this.m_parentChilds.length>0)
        {
            this.deletePlanet(this.m_parentPName);
        }
        if(this.m_myParent != undefined)
        {
            this.m_myParent.deletePlanet(this.getPlanetName());
        }else{
            console.log("Güneş silinemez! Sistem bölünemez!");
        }
        */
    }
    deletePlanet(planetName) {
        if (planetName != orbitSystem.mainPlanet) {
            //patlama ihtimali yüksek deneyince görücez..
            let g2delete = this.getByName(planetName);
            let planetSelf = g2delete.mySelf;
            this.m_scene.remove(planetSelf)
            this.m_scene.remove(planetSelf.getPlanet());
            planetSelf.deleteAllChilds();
            let planetIndex = g2delete.childIndex;
            //----------------planet kendi---------------
            var firstSliceIt = this.m_parentChilds.splice(planetIndex, 1);
            delete firstSliceIt[0]; //burayı denemem gerekiyor\\
            //----------------planet kendi---------------

            //----------------çocuga mesafesinide sil---------------
            firstSliceIt = this.m_parentChildLove.splice(planetIndex, 1);
            delete firstSliceIt[0]; //burayı denemem gerekiyor\\
            //----------------çocuga mesafesinide sil---------------

            //----------------Tutan gezegenle arasındaki açı---------------
            firstSliceIt = this.m_parentChildLoveAngle.splice(planetIndex, 1);
            delete firstSliceIt[0]; //burayı denemem gerekiyor\\
            //----------------Tutan gezegenle arasındaki açı---------------

            //----------------Dönme hızınıda sil---------------
            firstSliceIt = this.m_parentChildLoveAngleFast.splice(planetIndex, 1);
            delete firstSliceIt[0]; //burayı denemem gerekiyor\\
            //----------------Dönme hızınıda sil---------------

            //----------------Rengi sil---------------
            firstSliceIt = this.m_parentChildLoveColor.splice(planetIndex, 1);
            delete firstSliceIt[0]; //burayı denemem gerekiyor\\
            //----------------Rengi sil---------------

            //----------------Orbiti kaldı---------------
            this.deleteOrbits(this.m_parentChildLoveOrbit[planetIndex]);
            firstSliceIt = this.m_parentChildLoveOrbit.splice(planetIndex, 1);
            delete firstSliceIt[0]; //burayı denemem gerekiyor\\
            //----------------Orbiti kaldı---------------

            //----------------Line'ı kaldır---------------
            this.deleteLine(this.m_parentChildLoveLine[planetIndex]);
            firstSliceIt = this.m_parentChildLoveLine.splice(planetIndex, 1);
            delete firstSliceIt[0]; //burayı denemem gerekiyor\\
            //----------------Line'ı kaldır---------------

            delete planetSelf.getPlanet();
        } else {
            console.log("You cant delete the sun");
        }

    }

    deleteAllChilds() {
        if (this.hasChild()) {
            for (var i = 0; i < this.m_parentChilds.length > 0; i++) {
                this.m_scene.remove(this.m_parentChilds[i].getPlanet());
                delete this.m_parentChilds[i].getPlanet();
                delete this.m_parentChilds[i];
                delete this.m_parentChildLove[i];
                delete this.m_parentChildLoveAngle[i];
                delete this.m_parentChildLoveAngleFast[i]; // Güneş ile dünya arasındaki açı hızı

            }
        }
    }

    hasChild() {
        if (this.m_parentChilds.length > 0) return true; else return false;
    }

    getChildPlanetbyName(whichPlanet) {
        for (var i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i].getPlanetName() == whichPlanet)
                return {
                    mySelf: this.m_parentChilds[i],
                    parentLove: this.m_parentChildLove[i],
                    parentLoveAngle: this.m_parentChildLoveAngle[i],
                    parentLoveAngleFast: this.m_parentChildLoveAngleFast[i],
                    indexOf: i
                };
        }
    }
    getByName(whichPlanet) {
        if (this.getPlanetName() == whichPlanet) {
            return {
                mySelf: this,
                childIndex: "PARENT",
                found: true
            };
        }
        for (var i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i].getPlanetName() == whichPlanet) {
                return {
                    mySelf: this.m_parentChilds[i],
                    childIndex: i,
                    found: true
                };
            }
            if (this.m_parentChilds[i].hasChild()) {
                var returnValue = this.m_parentChilds[i].getByName(whichPlanet);
                if (returnValue.found) {
                    return {
                        mySelf: returnValue.mySelf,
                        childIndex: i,
                        found: true
                    };
                }
            }
        }
        return {
            mySelf: undefined,
            childIndex: -1,
            found: false
        }
    }
    //---------------------------CHILDLARIM-------------------------

    //---------------------------SCENE DRAWER-------------------------
    addScene() {
        //ilk Parent
        this.m_scene.add(this.m_parentP);
        for (var i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i].hasChild()) {
                this.m_parentChilds[i].addScene();
            } else {
                this.m_scene.add(this.m_parentChilds[i].m_parentP);
            }
        }
    }
    //---------------------------SCENE DRAWER-------------------------

    //---------------------------kendi etrafında dondurme-------------------------

    rotateThem() {
        this.m_parentP.rotation.y += this.m_rotationSpeed;
        for (var i = 0; i < this.m_parentChilds.length; i++) {
            this.m_parentChilds[i].rotateThem();
        }
    }

    //---------------------------kendi etrafında dondurme-------------------------


    //---------------------------gezegenleri etrafında döndür-------------------------

    planetRotateParent() {
        for (var i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i].hasChild()) {
                this.m_parentChilds[i].planetRotateParent();
            }
            this.m_parentChildLoveAngle[i] += this.m_parentChildLoveAngleFast[i]; //bulutlar için
            var childAngle = this.m_parentChildLoveAngle[i];
            var parentPos = this.getPos();
            var childPos = this.m_parentChilds[i].getPos();
            var radiusBetweenPandC = this.m_parentChildLove[i];
            childPos.x = parentPos.x + radiusBetweenPandC * Math.sin((childAngle / 180) * Math.PI);
            childPos.z = parentPos.z + radiusBetweenPandC * Math.cos((childAngle / 180) * Math.PI);
        }
    }

    //---------------------------gezegenleri etrafında döndür-------------------------

    drawOrbits() {
        if (orbitSystem.drawOrbitPermission) {
            for (var i = 0; i < this.m_parentChilds.length; i++) {
                //first childs!
                if (this.m_parentChilds[i].hasChild()) {
                    this.m_parentChilds[i].drawOrbits();
                }
                var material = new THREE.LineBasicMaterial({ color: this.m_parentChildLoveColor[i] });
                var geometry = new THREE.Geometry();
                var parentPlanetPos = this.getPos();
                var parentX = parentPlanetPos.x;
                var parentY = parentPlanetPos.y;
                var parentZ = parentPlanetPos.z;
                var orbitSelf = this.m_parentChildLoveOrbit[i];
                var radiusBetweenPandC = this.m_parentChildLove[i];
                if (orbitSelf != "none") {
                    this.m_scene.remove(orbitSelf);
                }
                for (let j = 0; j <= 360; j += 10) {
                    var vectorX = parentX + radiusBetweenPandC * Math.sin((j / 180) * Math.PI);
                    var vectorY = parentY;
                    var vectorZ = parentZ + radiusBetweenPandC * Math.cos((j / 180) * Math.PI);
                    geometry.vertices.push(new THREE.Vector3(vectorX, vectorY, vectorZ));
                };
                orbitSelf = new THREE.Line(geometry, material);
                this.m_scene.add(orbitSelf);
                this.m_parentChildLoveOrbit[i] = orbitSelf;
            }
        } else {
            if (this.m_parentChildLoveOrbit.length > 0) {
                for (var i = 0; i < this.m_parentChildLoveOrbit.length; i++) {
                    //first childs..
                    if (this.m_parentChilds[i].hasChild()) {
                        this.m_parentChilds[i].drawLines();
                    }
                    if (this.m_parentChildLoveOrbit[i] != "none") {
                        this.m_scene.remove(this.m_parentChildLoveOrbit[i]);
                        delete this.m_parentChildLoveOrbit[i];
                        this.m_parentChildLoveOrbit[i] = "none";
                    }
                }
            }
        }

    }
    deleteOrbits(orbitSelf) {
        this.m_scene.remove(orbitSelf);
    }
    drawLines() {
        if (orbitSystem.drawLinePermission) {
            for (var i = 0; i < this.m_parentChilds.length; i++) {
                //first childs..
                if (this.m_parentChilds[i].hasChild()) {
                    this.m_parentChilds[i].drawLines();
                }
                var parentPos = this.getPos();
                var childPos = this.m_parentChilds[i].getPos();
                var lineSelf = this.m_parentChildLoveLine[i];
                if (lineSelf != "none") {
                    this.m_scene.remove(lineSelf);
                    delete this.m_parentChildLoveLine[i];
                }
                var lineMat = new THREE.LineBasicMaterial({ color: this.m_parentChildLoveColor[i] });
                var lineGeo = new THREE.Geometry();

                lineGeo.vertices.push(parentPos);
                lineGeo.vertices.push(childPos);

                lineSelf = new THREE.Line(lineGeo, lineMat);
                this.m_scene.add(lineSelf);
                this.m_parentChildLoveLine[i] = lineSelf;
            }
        }
        else {
            if (this.m_parentChildLoveLine.length > 0) {
                for (var i = 0; i < this.m_parentChildLoveLine.length; i++) {
                    //first childs..
                    if (this.m_parentChilds[i].hasChild()) {
                        this.m_parentChilds[i].drawOrbits();
                    }
                    if (this.m_parentChildLoveLine[i] != "none") {
                        this.m_scene.remove(this.m_parentChildLoveLine[i]);
                        delete this.m_parentChildLoveLine[i];
                        this.m_parentChildLoveLine[i] = "none";
                    }
                }
            }
        }
    }
    deleteLine(lineSelf) {
        this.m_scene.remove(lineSelf);
    }
    mouseOnPlanet() {
        var mouseOnThem = this.m_rayCaster.intersectObjects(this.m_scene.children);
        if (mouseOnThem.length > 0) //eğer bir şeylerin üstündeyse pratik olarak her zaman üstünde
        {
            //var tillSystem=0; sonra eklerim
            var mouseOn = mouseOnThem[0].object;
            if (mouseOn.name != "uzay") {
                var mouseOnHer = this.getByName(mouseOn.name);
                if (mouseOnHer.found) {
                    mouseOnHer.mySelf.m_mouseOn = true;
                    mouseOnHer.mySelf.m_mouseOnSelf = mouseOnHer.mySelf;
                    this.deactiveOthers(mouseOnHer.mySelf);


                } else {
                    this.deactiveOthers(undefined);
                    //something gone wrong i couldnt find it?!
                    //bir şeyler çok ters gitti bulamadı
                }
            } else {
                this.deactiveOthers(undefined);
            }
        } else {
            this.deactiveOthers(undefined);
        }
    }
    deactiveOthers(activePlanet) {
        if (this != activePlanet) {
            this.m_mouseOn = false;
            this.m_mouseOnSelf = activePlanet;
        }
        for (var i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i] != activePlanet) {
                this.m_parentChilds[i].m_mouseOn = false;
                this.m_parentChilds[i].m_mouseOnSelf = activePlanet;
            }
            if (this.m_parentChilds[i].hasChild()) {
                this.m_parentChilds[i].deactiveOthers(activePlanet);
            }
        }
    }
}
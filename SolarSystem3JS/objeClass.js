class planetSystem {
    constructor(parentPlanet, mainScene, rotationSpeed = 0) {
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
        this.m_activePlanet = false;
        this.m_rayCaster = undefined;
        this.m_someoneActive = false;
        this.m_activePlanetSelf = undefined;
    }

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
        let indexOf = this.getChildPlanetbyName(whichPlanet).indexOf;
        this.m_parentChildLoveColor[indexOf] = colorOfLove;
    }
    setActive(activeIt) {
        this.m_activePlanet = activeIt;
    }
    setRayCaster(rayCaster) {
        this.m_rayCaster = rayCaster;
    }
    //---------------------------SET'TERLARIM-------------------------

    //---------------------------GET'TERLARIM-------------------------

    getPlanet() {
        return this.m_parentP;
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
        let indexOf = this.getChildPlanetbyName(whichPlanet).indexOf;
        return this.m_parentChildLoveColor[indexOf];
    }

    getActive() {
        return this.m_activePlanet;
    }

    getRayCaster() {
        return this.m_rayCaster;
    }
    //---------------------------GET'TERLARIM-------------------------

    //---------------------------CHILDLARIM-------------------------
    addPlanet(newPlanet, radiusBetween, angleBetween = 0, rotateSpeed = 0, childColor = 0xffffff) {
        this.m_parentChilds.push(new planetSystem(newPlanet, this.m_scene));
        this.m_parentChildLove.push(radiusBetween);
        this.m_parentChildLoveAngle.push(angleBetween);
        this.m_parentChildLoveAngleFast.push(rotateSpeed);
        this.m_parentChildLoveColor.push(childColor);
        this.m_parentChildLoveOrbit.push("none");
        this.m_parentChildLoveLine.push("none");
    }
    deletePlanet(planetName) {
        //patlama ihtimali yüksek deneyince görücez..
        let g2delete = this.getChildPlanetbyName(planetName);
        let planetSelf = g2delete.mySelf;
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
        firstSliceIt = this.m_parentChildLoveOrbit.splice(planetIndex, 1);
        delete firstSliceIt[0]; //burayı denemem gerekiyor\\
        //----------------Orbiti kaldı---------------

        //----------------Line'ı kaldır---------------
        firstSliceIt = this.m_parentChildLoveLine.splice(planetIndex, 1);
        delete firstSliceIt[0]; //burayı denemem gerekiyor\\
        //----------------Line'ı kaldır---------------

        delete planetSelf.getPlanet();

    }

    deleteAllChilds() {
        if (this.hasChild()) {
            for (let i = 0; i < this.m_parentChilds.length > 0; i++) {
                this.m_scene.remove(this.m_parentChilds[i].getPlanet());
                delete this.m_parentChilds[i];
                delete this.m_parentChildLove[i];
                delete this.m_parentChildLoveAngle[i];
                delete this.m_parentChildLoveAngleFast[i]; // Güneş ile dünya arasındaki açı hızı
                delete this.m_parentChilds[i].getPlanet();
            }
        }
    }

    hasChild() {
        if (this.m_parentChilds.length > 0) return true; else return false;
    }

    getChildPlanetbyName(whichPlanet) {
        for (let i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i].getPlanetName() == whichPlanet)
                return {
                    mySelf: this.m_parentChilds[i],
                    parentLove: this.m_parentChildLove[i],
                    parentLoveAngle: this.m_parentChildLoveAngle[i],
                    parentLoveAngleFast: this.m_parentChildLoveAngleFast[i],
                    childIndex: i
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
        for (let i = 0; i < this.m_parentChilds.length; i++) {
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
                        grandChildIndex: returnValue.childIndex,
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
        for (let i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i].hasChild()) {
                this.m_parentChilds[i].addScene();
            }
        }
    }
    //---------------------------SCENE DRAWER-------------------------

    //---------------------------kendi etrafında dondurme-------------------------

    rotateThem() {
        this.m_parentP.rotation.y += this.m_rotationSpeed;
        for (let i = 0; i < this.m_parentChilds.length; i++) {
            this.m_parentChilds[i].rotateThem();
        }
    }

    //---------------------------kendi etrafında dondurme-------------------------


    //---------------------------gezegenleri etrafında döndür-------------------------

    planetRotateParent() {
        for (let i = 0; i < this.m_parentChilds.length; i++) {
            if (this.m_parentChilds[i].hasChild()) {
                this.m_parentChilds[i].planetRotateParent();
            }
            this.m_parentChildLoveAngle[i] += this.m_parentChildLoveAngleFast[i]; //bulutlar için
            var childAngle = this.m_parentChildLoveAngle[i];
            var parentPos = this.getPos();
            var childPos = this.m_parentChilds[i].getPos();
            var radiusBetweenPandC = this.m_parentChildLove[i];
            childPos.x = parentPos.x + radiusBetweenPandC * Math.sin((childAngle / 180) * Math.PI);
            childPos.y = parentPos.y + radiusBetweenPandC * Math.cos((childAngle / 180) * Math.PI);
        }
    }

    //---------------------------gezegenleri etrafında döndür-------------------------

    drawOrbits(Permission) {
        if (Permission) {
            for (let i = 0; i < this.m_parentChilds.length; i++) {
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
                for (let j = 0; j <= 360; i += 10) {
                    var vectorX = parentX + radiusBetweenPandC * Math.sin((i / 180) * Math.PI);
                    var vectorY = parentY;
                    var vectorZ = parentZ + yariCap * Math.cos((i / 180) * Math.PI);
                    geometry.vertices.push(new THREE.Vector3(vectorX, vectorY, vectorZ));
                }
                orbitSelf = new new THREE.Line(geometry, material);
                this.m_scene.add(orbitSelf);
            }
        }

    }
    drawLines(Permission) {
        if (Permission) {
            for (let i = 0; i < this.m_parentChilds.length; i++) {
                //first childs..
                if (this.m_parentChilds[i].hasChild()) {
                    this.m_parentChilds[i].drawLines();
                }
                var parentPos = this.getPos();
                var childPos = this.m_parentChilds[i].getPos();
                var lineSelf = this.m_parentChildLoveLine[i];
                if (lineSelf != "none") {
                    this.m_scene.remove(lineSelf);
                }
                var lineMat = new THREE.LineBasicMaterial({ color: this.m_parentChildLoveColor[i] });
                var lineGeo = new THREE.Geometry();

                lineGeo.vertices.push(parentPos);
                lineGeo.vertices.push(childPos);

                lineSelf = new THREE.Line(lineGeo, lineMat);
                this.m_scene.add(lineSelf);
            }
        }
    }
    mouseOnPlanet() {
        var mouseOnThem = this.m_rayCaster.intersectObjects(this.m_scene.children);
        if (mouseOnThem.length > 0) //eğer bir şeylerin üstündeyse pratik olarak her zaman üstünde
        {
            //var tillSystem=0; sonra eklerim
            var mouseOn = mouseOnThem[0].object;
            if (mouseOn.name != "uzay") {
                var mouseOnHer = this.getByName(mouseOn.name);
                if(mouseOnHer.found)
                {
                    mouseOnHer.mySelf.m_activePlanet = true;
                    mouseOnHer.mySelf.m_activePlanetSelf = mouseOnHer.mySelf;
                    deactiveOthers(mouseOnHer.mySelf);
                    console.log(this);
                    
                }else
                {
                    this.deactiveOthers(undefined);
                    //something gone wrong i couldnt find it?!
                    //bir şeyler çok ters gitti bulamadı
                }
            }else
            {
                this.deactiveOthers(undefined);
            }
        }else
        {
            this.deactiveOthers(undefined);
        }
    }
    deactiveOthers(activePlanet)
    {
        var wakeUp;
        if(activePlanet != undefined)
        {
            wakeUp = true;
        }else
        {
            wakeUp = false;
        }
        if(this!=activePlanet)
        {
            this.m_activePlanet=false;
            this.m_someoneActive = wakeUp;
            this.m_activePlanetSelf = activePlanet;
        }
        for(let i=0;i<this.m_parentChilds.length;i++)
        {
            if(this.m_parentChilds[i]!=activePlanet)
            {
                this.m_parentChilds[i].m_activePlanet=false;
                this.m_parentChilds[i].m_someoneActive = wakeUp;
                this.m_parentChilds[i].m_activePlanetSelf = activePlanet;
            }
            if(this.m_parentChilds[i].hasChild())
            {
                this.m_parentChilds[i].deactiveOthers(activePlanet);
            }
        }
    }
}
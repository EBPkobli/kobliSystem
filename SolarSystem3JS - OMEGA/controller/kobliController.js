class kobliSystem {
    constructor() {
        console.log("mm Im sorry it is static class.");
    }
    static initSelf(webGL_Scene, webGL_Renderer, webGL_Kamera, win_Mouse) {
        if (kobliSystem.initialized == undefined) {
            kobliSystem.initialized = "it is initialized";
            kobliSystem.objeList = [];
            kobliSystem.orbitDrawPermission = true;
            kobliSystem.lineDrawPermission = false;
            kobliSystem.webGL_Scene = webGL_Scene;
            kobliSystem.webGL_Renderer = webGL_Renderer;
            kobliSystem.webGL_Kamera = webGL_Kamera;
            kobliSystem.webGL_Raycaster = new THREE.Raycaster();
            kobliSystem.win_Mouse = win_Mouse;
            kobliSystem.lineControl = true; //for much more performance
            kobliSystem.orbitControl = true;
        } else {
            console.log("It is already initialized. Dont do it again please?");
        }
    }
    //--------------------add planet or light or something else?-------------------
    static add(obje) {
        kobliSystem.objeList.push(obje);
        kobliSystem.webGL_Scene.add(obje.getMeshSelf());
        return kobliSystem;
    }
    //--------------------add planet or light or something else?-------------------

    //--------------------it gives parent to last member of objelist-------------------
    static to(objeName, mySelf = undefined) {
        if (mySelf == undefined) {
            let lastObje = kobliSystem.objeList[kobliSystem.objeList.length - 1];
            if (lastObje.getParent() == undefined) {
                let parentObje = kobliSystem.findByName(objeName);
                lastObje.setParent(parentObje);
            } else {
                console.log("Adding obje already has own parent.");
                console.log("If you want to change it .change('parent',obje);");
            }
        }
        else {
            let parentObje = kobliSystem.findByName(objeName);
            mySelf.setParent(parentObje);
        }
    }
    //--------------------it gives parent to last member of objelist-------------------

    //--------------------change any obje propertie-------------------
    static change(objeName, objeProp, objePropValue) {
        let objeSelf = kobliSystem.findByName(objeName);
        if (objeSelf != undefined) {
            let multiProp = objeProp.split(",");
            if (typeof (objePropValue) != "string") { objePropValue = objePropValue.toString(); }
            let multiValue = objePropValue.split(",");
            if (multiProp.length != multiValue.length) {
                console.log("Properties doesnt match with Values check it again.");
                return 0;
            }
            for (let i = 0; i < multiProp.length; i++) {
                multiProp[i] = multiProp[i].toUpperCase();
                multiValue[i] = multiValue[i].toUpperCase();
                switch (multiProp[i]) {
                    case "PARENT"://ofcourse going to change just signature of it.
                        var parent = kobliSystem.findByName(multiValue[i]);
                        objeSelf.setParent(parent);
                        break;
                    case "LINECOLOR":
                        objeSelf.setLineColor(multiValue[i]);
                        break;
                    case "ORBITCOLOR":
                        objeSelf.setOrbitColor(multiValue[i]);
                        break;
                    case "RADIUS":
                        objeSelf.setRad(multiValue[i]);
                        break;
                    case "DISTANCE":
                        if (objeSelf.getParent() != undefined) {
                            objeSelf.setParentDistance(multiValue[i]);
                        } else {
                            console.log("You cant give distance it hasnt any parent.");
                        }
                        break;
                    case "COLOR":
                        objeSelf.setObjectColor(multiValue[i]);
                        break;
                    case "ROTATIONSPEED":
                        objeSelf.setRotationSpeed(multiValue[i]);
                        break;
                    case "SPINSPEED":
                        objeSelf.setSpinSpeed(multiValue[i]);
                        break;
                    case "DRAWORBIT":
                        objeSelf.setOrbitPermission(multiValue[i]);
                        break;
                    case "DRAWLINE":
                        objeSelf.setLinePermission(multiValue[i]);
                        break;
                    case "ORBITDEG":
                        objeSelf.setOrbitDegree(multiValue[i]);
                        break;
                    default:
                        console.log("Couldnt find this propertie " + multiProp[i]);
                        break;
                }
            }
        } else {
            console.log("I couldnt found " + objeName);
        }

    }
    //--------------------change any obje propertie-------------------

    //--------------------take parent from obje-------------------
    static separate(objeName) {
        kobliSystem.change(objeName, "parent", undefined);
    }
    //--------------------take parent from obje-------------------

    //--------------------give distance between parent and self-------------------
    static giveDistance(objeName, distance) {
        kobliSystem.change(objeName, "DISTANCE", distance);
    }
    //--------------------give distance between parent and self-------------------

    //--------------------set position of planet or etc-------------------
    static changePosition(objeName, X, Y, Z, absolute = false) {
        let objeSelf = kobliSystem.findByName(objeName);
        objeSelf.setPos(X, Y, Z, absolute);
    }
    //--------------------set position of planet or etc-------------------


    //--------------------destroy obje with her family-------------------
    static deleteObje(objeName, withChild = false) {
        //değiştirlecek gereksiz iterasyonlar yapıyorum!
        var returnObj = kobliSystem.findByName(objeName, true);
        if (returnObj == undefined) return undefined;
        var objeIndex = returnObj.indexOf;
        var objeSelf = returnObj.obj;
        if (withChild) {
            for (let i = objeIndex/*index olarak hep parenttan küçük */; i < objeChilds.length; i++) {
                //sonra yazarım belki..
            }
        }
        var meshSelf = objeSelf.getMeshSelf();
        kobliSystem.webGL_Scene.remove(meshSelf);
        if (objeSelf instanceof kobliPlanet) {
            objeSelf.deleteMeshSelf(kobliSystem.webGL_Scene);
            objeSelf.deleteLineSelf(kobliSystem.webGL_Scene);
            objeSelf.deleteOrbitSelf(kobliSystem.webGL_Scene);
        } else if (objeSelf instanceof kobliLight) {
            meshSelf.children[0].geometry.dispose();
            meshSelf.children[0].material.dispose();
            // objeSelf.deleteMeshSelf();
        }
        kobliSystem.objeList.splice(objeIndex, 1);
        kobliObject.set_mouse_onPlanet(undefined);
        //delete kobliSystem.findByName(objeName);
    }
    //--------------------destroy obje with her family-------------------

    //--------------------find obje-------------------
    static findByName(objeName, withIndex = false) {
        if (objeName == "" || objeName == undefined || objeName == "uzay") return undefined;
        let myObjes = kobliSystem.objeList;
        for (var i = 0; i < myObjes.length; i++) {
            if (myObjes[i].getName().toUpperCase() == objeName.toUpperCase()) {
                if (withIndex) {
                    return { obj: myObjes[i], indexOf: i };
                } else {
                    return myObjes[i];
                }
            }
        }
        //console.log("I couldnt find any obje inside objeList.");
    }
    static findIndex(objeName) {
        let myObjes = kobliSystem.objeList;
        for (let i = 0; i < myObjes.length; i++) {
            if (myObjes[i].getName().toUpperCase() == objeName.toUpperCase()) {
                return i;
            }
        }
        console.log("I couldnt find any obje inside objeList.");
    }
    /* static findChilds(obje) {
         let myObjes = kobliSystem.objeList;
         var childs = [];
         for (let i = 0; i < myObjes.length; i++) {
             if (myObjes[i].getParent()) {
                 if (myObjes[i].getParent() == obje) {
                     childs.push(myObjes[i]);
                 }
             }
         }
         return childs;
     }*/
    //--------------------find obje-------------------

    //------------------rotatethem around theirself------------------
    static rotateThem() {
        var objeList = kobliSystem.objeList;
        for (let i = 0; i < objeList.length; i++) {
            let rotationSpeed = objeList[i].getRotationSpeed();
            if (rotationSpeed == undefined) return 0;
            objeList[i].setRotation(rotationSpeed);
        }
    }
    //------------------rotatethem around theirself------------------

    //------------------spin them around parrents------------------
    static spinThem() {
        var objeList = kobliSystem.objeList;

        for (let i = 0; i < objeList.length; i++) {
            if (objeList[i].getParent() != undefined) {
                var spinSpeed = objeList[i].getSpinSpeed();
                if (spinSpeed == undefined) return 0; //if spin speed doesnt have any value then dont even catch parent
                objeList[i].setSpinAngle(spinSpeed); //bulutlar için
                var spinAngle = objeList[i].getSpinAngle();
                var selfPos = objeList[i].getPos();
                var parentPos = objeList[i].getParent().getPos();
                var radiusBetween = objeList[i].getParentDistance();
                selfPos.x = parentPos.x + radiusBetween * Math.sin((spinAngle / 180) * Math.PI);
                selfPos.y = parentPos.y + objeList[i].getOrbitDegree() * Math.sin((spinAngle / 180) * Math.PI);
                selfPos.z = parentPos.z + radiusBetween * Math.cos((spinAngle / 180) * Math.PI);
            }
        }

    }
    //------------------spin them around parrents------------------

    static drawOrbits() {
        if (kobliSystem.orbitDrawPermission) {
            kobliSystem.orbitControl = true;

            var objeList = kobliSystem.objeList;
            for (let i = 0; i < objeList.length; i++) {
                var sameGeoSpotted = false; //for performance
                var orbitSelf = objeList[i].getOrbit();
                if (objeList[i].getOrbitPermission()) {
                    var orbitMaterial = new THREE.LineBasicMaterial({ color: objeList[i].getOrbitColor() });
                    var orbitGeometry = new THREE.Geometry();
                    var parent = objeList[i].getParent();
                    if (parent != undefined) {
                        var parentPos = parent.getPos();
                        var parentX = parentPos.x;
                        var parentY = parentPos.y;
                        var parentZ = parentPos.z;
                        var distanceBetween = objeList[i].getParentDistance();

                        for (let j = 0; j <= 360; j += 10) {
                            var vectorX = parentX + distanceBetween * Math.sin((j / 180) * Math.PI);
                            var vectorY = parentY + objeList[i].getOrbitDegree() * Math.sin((j / 180) * Math.PI);
                            var vectorZ = parentZ + distanceBetween * Math.cos((j / 180) * Math.PI);
                            if (orbitSelf != undefined/*for first step */) {
                                if(j==10)
                                if ((orbitSelf.geometry.vertices[j/10].x == vectorX) &&
                                    (orbitSelf.geometry.vertices[j/10].y == vectorY) &&
                                    (orbitSelf.geometry.vertices[j/10].z == vectorZ)) {
                                    sameGeoSpotted = true;
                                    break;
                                }
                            }
                            orbitGeometry.vertices.push(new THREE.Vector3(vectorX, vectorY, vectorZ));

                        };
                        if (sameGeoSpotted) {
                            //same orbit spotted doesnt require to draw it again! for better performance

                            sameGeoSpotted = false;
                        } else {
                            if (orbitSelf == undefined/*for first step */) {
                                orbitSelf = new THREE.Line(orbitGeometry, orbitMaterial);
                                kobliSystem.webGL_Scene.add(orbitSelf);
                                objeList[i].setOrbit(orbitSelf);
                            } else {
                                //BURASIORASI
                                /* kobliSystem.webGL_Scene.remove(orbitSelf);
                                 orbitSelf.geometry.dispose();
                                 orbitSelf.material.dispose();
                                 */
                                objeList[i].deleteOrbitSelf(kobliSystem.webGL_Scene);
                                orbitSelf = new THREE.Line(orbitGeometry, orbitMaterial);
                                kobliSystem.webGL_Scene.add(orbitSelf);
                                objeList[i].setOrbit(orbitSelf);
                            }
                        }
                    } else {
                        if (orbitSelf != undefined) {
                            objeList[i].deleteOrbitSelf(kobliSystem.webGL_Scene);
                        }
                    }
                } else {
                    if (orbitSelf != undefined) {
                        objeList[i].deleteOrbitSelf(kobliSystem.webGL_Scene);
                    }
                }
            }

        } else {
            if (kobliSystem.orbitControl) {
                var objeList = kobliSystem.objeList;

                for (let i = 0; i < objeList.length; i++) {
                    orbitSelf = objeList[i].getOrbit();
                    if (orbitSelf != undefined) {
                        objeList[i].deleteOrbitSelf(kobliSystem.webGL_Scene);
                    }
                }
                kobliSystem.orbitControl = false;
            }
        }
    }
    static drawLines() {
        if (kobliSystem.lineDrawPermission) {
            kobliSystem.lineControl = true;
            var objeList = kobliSystem.objeList;
            for (let i = 0; i < objeList.length; i++) {
                var lineSelf = objeList[i].getLine();
                if (objeList[i].getLinePermission()) {
                    var parent = objeList[i].getParent();
                    if (parent != undefined) {
                        var parentPos = objeList[i].getParent().getPos();
                        var childPos = objeList[i].getPos();
                        if (lineSelf != undefined) {
                            objeList[i].deleteLineSelf(kobliSystem.webGL_Scene);
                        }
                        var lineMaterial = new THREE.LineBasicMaterial({ color: objeList[i].getLineColor() });
                        var lineGeometry = new THREE.Geometry();
                        lineGeometry.vertices.push(parentPos);
                        lineGeometry.vertices.push(childPos);
                        lineSelf = new THREE.Line(lineGeometry, lineMaterial);
                        kobliSystem.webGL_Scene.add(lineSelf);
                        objeList[i].setLine(lineSelf);
                    } else {
                        if (lineSelf != undefined) {
                            objeList[i].deleteLineSelf(kobliSystem.webGL_Scene);
                        }
                    }
                } else {
                    if (lineSelf != undefined) {
                        objeList[i].deleteLineSelf(kobliSystem.webGL_Scene);
                    }
                }
            }
        } else {
            if (kobliSystem.lineControl) {
                kobliSystem.lineControl = false;
                for (let i = 0; i < kobliSystem.objeList.length; i++) {
                    var lineSelf = kobliSystem.objeList[i].getLine();
                    if (lineSelf != undefined) {
                        kobliSystem.objeList[i].deleteLineSelf(kobliSystem.webGL_Scene);
                    }
                }
            }
        }
    }
    static orbitDrawOrder(newOrder) {
        kobliSystem.orbitDrawPermission = newOrder;
    }
    static lineDrawOrder(newOrder) {
        kobliSystem.lineDrawPermission = newOrder;
    }
    static drawPermission(newOrder) {
        kobliSystem.lineDrawPermission = newOrder;
        kobliSystem.orbitDrawPermission = newOrder;
    }
    static mouseOn_object() {
        kobliSystem.webGL_Raycaster.setFromCamera(kobliSystem.win_Mouse, kobliSystem.webGL_Kamera);
        var m_onObjects = kobliSystem.webGL_Raycaster.intersectObjects(kobliSystem.webGL_Scene.children);
        if (m_onObjects.length > 0) {
            var m_onObject = m_onObjects[0].object;
            if (kobliCameraControl.activePlanet != undefined) {
                if (m_onObject == kobliCameraControl.activePlanet.getMeshSelf()) {
                    return 0; //dont do it for active planet dont draw it again
                } else if (m_onObject.name == "uzay") {
                    kobliCameraControl.status = "exit";
                }

            }

            if (m_onObject.name == "tmpObj") return 0; //for much performance doesnt have to iteration
            var objectSelf = kobliSystem.findByName(m_onObject.name);
            if (objectSelf instanceof kobliPlanet) {
                if (kobliObject.get_mouse_onPlanet() == undefined) createTMP(objectSelf);
            }
            else if (objectSelf == undefined) {
                objectSelf = kobliSystem.findByOrbit(m_onObject);
                if (objectSelf == undefined) { kobliSystem.deleteObje("tmpObj", false); return undefined; }
                if (kobliObject.get_mouse_onPlanet() == undefined) createTMP(objectSelf);



            }
        }
    }
    static findByOrbit(orbitObject) /* For raycaster easy selector */ {
        if (orbitObject.name == "uzay" || orbitObject.name == "Gunes" || orbitObject == undefined) return undefined;
        let myObjes = kobliSystem.objeList;
        for (let i = 0; i < myObjes.length; i++) {
            if (myObjes[i].getOrbit() == orbitObject) {
                return myObjes[i];
            }
        }
        return undefined;
        //console.log("I couldnt find any obje inside objeList.");
    }
}
function createTMP(originalOBJ) {
    kobliSystem.deleteObje("tmpObj", false);
    var tmpObj = new kobliPlanet("tmpObj", "00cc00", originalOBJ.getRad() * 1.1, "basic", true, undefined, originalOBJ.getRotationSpeed(), originalOBJ.getSpinSpeed(), false, true, "11cc11", "11cc11", originalOBJ.getOrbitDegree(), 0.25);
    tmpObj.setSpinAngle(originalOBJ.getSpinAngle());
    if (originalOBJ.getParent() != undefined) {
        kobliSystem.add(tmpObj).to(originalOBJ.getParent().getName(), tmpObj);
    }
    else {
        kobliSystem.add(tmpObj).to(originalOBJ.getName(), tmpObj);
    }
    kobliSystem.giveDistance("tmpObj", originalOBJ.getParentDistance());
    kobliSystem.changePosition("tmpObj", originalOBJ.getPos().x, originalOBJ.getPos().y, originalOBJ.getPos().z, true);
    kobliObject.set_mouse_onPlanet(originalOBJ);
    kobliCameraControl.status = undefined;
}
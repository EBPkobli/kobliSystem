class kobliCameraControl {
    static init(webGL_camera, webGL_orbitControl) {
        kobliCameraControl.webGL_camera = webGL_camera;
        kobliCameraControl.webGL_orbitControl = webGL_orbitControl;
        kobliCameraControl.stopCam = false;
        kobliCameraControl.activePlanet = undefined;
        kobliCameraControl.status = undefined;
    }
    static setActivePlanet(PlanetX) {
        kobliCameraControl.activePlanet = PlanetX;
    }
    static setlookAtPlanet(PlanetY) {
        kobliCameraControl.lookAtPlanet = PlanetY;
    }
    static animateCamera(animationType) {
        
        if (kobliCameraControl.activePlanet == undefined || kobliCameraControl.stopCam == true) {
            kobliSystem.orbitDrawOrder(orbitPlanets); //-----------for now-----------
            kobliSystem.lineDrawOrder(linePlanets);
            return undefined;//if there is no active planet then let it go
        }
        //-----------for now-----------
        kobliSystem.drawPermission(false);

        if (kobliCameraControl.activePlanet.getName() == "Gunes") {
            kobliCameraControl.lookAtPlanet = kobliSystem.objeList[3/**The Earth */];
        } else {
            kobliCameraControl.lookAtPlanet = kobliSystem.objeList[0/**The Sun */];
        }
        //-----------for now-----------
        switch (animationType) {
            case "log":
                break;
            case "nospin":
                break;
            case "spin":
                kobliCameraControl.setCamPoswithAng(kobliCameraControl.activePlanet);

                break;
            default:
                kobliCameraControl.setCamPosition(kobliCameraControl.getActivePPX(), kobliCameraControl.getActivePPY(), kobliCameraControl.getActivePPZ());
                kobliCameraControl.setLookat(kobliCameraControl.getLookAtPPX(), kobliCameraControl.getLookAtPPY(), kobliCameraControl.getLookAtPPZ());
                break;
        }

    }
    static setCamPoswithAng(planetX) {
        if (planetX.getParent() == undefined) { kobliCameraControl.animateCamera(); return undefined; }
        let spinSpeed = planetX.getSpinSpeed();
        if (spinSpeed == undefined) { kobliCameraControl.animateCamera("nospin"); return undefined; } //if spin speed doesnt have any value then dont even catch parent
        let spinAngle = planetX.getSpinAngle();
        let parentPos = planetX.getParent().getPos();
        let radiusBetween = planetX.getParentDistance();
        let planetXRad = planetX.getRad();
        let cameraRadius = radiusBetween + planetXRad * 8;
        kobliCameraControl.webGL_camera.position.x = parentPos.x + cameraRadius * Math.sin((spinAngle / 180) * Math.PI);
        kobliCameraControl.webGL_camera.position.y = parentPos.y + planetX.getOrbitDegree() * Math.sin((spinAngle / 180) * Math.PI);
        kobliCameraControl.webGL_camera.position.z = parentPos.z + (cameraRadius+1) * Math.cos((spinAngle / 180) * Math.PI);
        kobliCameraControl.setLookat(parentPos.x,parentPos.y, parentPos.z);
    }
    static setCamPosition(X, Y, Z) {
        kobliCameraControl.webGL_camera.position.x = X
        kobliCameraControl.webGL_camera.position.y = Y + 3;
        kobliCameraControl.webGL_camera.position.z = Z

    }
    static setLookat(X, Y, Z) {
        kobliCameraControl.webGL_orbitControl.target = new THREE.Vector3(X, Y, Z);
    }
    static getActivePPX() {
        //actually it doesnt come here if undefined but anyway lets check it
        if (kobliCameraControl.activePlanet == undefined) return undefined; //or it going to crash
        return kobliCameraControl.activePlanet.getPos().x;
    }
    static getActivePPY() {
        if (kobliCameraControl.activePlanet == undefined) return undefined; //or it going to crash
        return kobliCameraControl.activePlanet.getPos().y;
    }
    static getActivePPZ() {
        if (kobliCameraControl.activePlanet == undefined) return undefined; //or it going to crash
        return kobliCameraControl.activePlanet.getPos().z;
    }
    static getLookAtPPX() {
        if (kobliCameraControl.lookAtPlanet == undefined) return undefined; //or it going to crash
        return kobliCameraControl.lookAtPlanet.getPos().x;
    }
    static getLookAtPPY() {
        if (kobliCameraControl.lookAtPlanet == undefined) return undefined; //or it going to crash
        return kobliCameraControl.lookAtPlanet.getPos().y;
    }
    static getLookAtPPZ() {
        if (kobliCameraControl.lookAtPlanet == undefined) return undefined; //or it going to crash
        return kobliCameraControl.lookAtPlanet.getPos().z;
    }

}
class kobliObject {
    constructor(myName,
        myScale,
        myParent,
        myMatColor,
        myRotation,
        myRadius = 1,
        myRotationSpeed = 0.001,
        mySpinSpeed = 0.001,
        mydrawLinePermission = true,
        mydrawOrbitPermission = true,
        myLineColor = 0xffffff,
        myOrbitColor = 0xf0f0f0,
        myMesh = undefined,
        orbitDegree = 0 /*just for fun */) {
        this.m_name = myName;
        this.m_radius = myRadius;
        this.m_myRotationSpeed = myRotationSpeed;
        this.m_scale = myScale;
        this.m_parent = myParent;
        this.m_parentDistance = 0;
        this.m_ownLine = undefined;
        this.m_ownOrbit = undefined;
        this.m_ownLineColor = myLineColor;
        this.m_ownOrbitColor = myOrbitColor;
        this.m_drawLinePermission = mydrawLinePermission;
        this.m_drawOrbitPermission = mydrawOrbitPermission;
        this.m_myColor = myMatColor;
        this.m_spinSpeed = mySpinSpeed;
        this.m_rotation = myRotation;
        this.m_spinAngle = 0;
        this.m_meshSelf = myMesh;
        this.m_katSayi = 1000;
        this.m_orbitDegree = orbitDegree;
    }
    //-------------------Setters-------------------

    setName(newName) {
        if (typeof (newName) == "string") {
            this.m_name = newName; //tek tek fonksiyondan propertinin kendisine çevrilecek!..
        } else {
            console.log("New name of planet have to string you made it " + typeof (newName));
        }

    }
    setPos(newX = 0, newY = 0, newZ = 0, absolute = false) {
        try {
            if (absolute) {

                this.m_meshSelf.position.x = newX;
                this.m_meshSelf.position.y = newY;
                this.m_meshSelf.position.z = newZ;
            }
            else {
                this.m_meshSelf.position.x = this.getPos().x + newX;
                this.m_meshSelf.position.y = this.getPos().y + newY;
                this.m_meshSelf.position.z = this.getPos().z + newZ;
            }
        } catch{
            console.log("Something gone terrible while giving position.");
        }
    }
    setRad(newRadius = 1) {
        if (typeof (newRadius) != "number") { newRadius = parseFloat(newRadius); }
        if (typeof (newRadius) == "number") {
            let oran = newRadius / this.getRad();
            this.m_scale.x = oran;
            this.m_scale.y = oran;
            this.m_scale.z = oran;
            this.m_radius = newRadius;
        } else {
            console.log("New radius of planet have to number you made it " + typeof (newRadius));
        }
    }
    setRotationSpeed(newRotationSpeed = 0) {
        if (this.m_myRotationSpeed != undefined) {
            if (typeof (newRotationSpeed) != "number") { newRotationSpeed = parseFloat(newRotationSpeed); }
            if (typeof (newRotationSpeed) == "number") {
                this.m_myRotationSpeed = newRotationSpeed / this.m_katSayi;
            } else {
                console.log("New RotationSpeed of planet have to number you made it " + typeof (newRotationSpeed));
            }
        }
    }
    setLineColor(newColor) {
        if (this.m_ownLineColor != undefined) {
            this.m_ownLineColor = strtoHex(newColor);
        }
    }
    setOrbitColor(newColor) {
        if (this.m_ownOrbitColor != undefined) {
            this.m_ownOrbitColor = strtoHex(newColor);
        }
    }
    setParent(newParent) {
        this.m_parent = newParent;
    }
    setParentDistance(newParentDistance) {
        if (typeof (newParentDistance) != "number") { newParentDistance = parseFloat(newParentDistance); }
        if (typeof (newParentDistance) == "number") {
            this.m_parentDistance = newParentDistance;
        } else {
            console.log("New distance of planet have to number you made it " + typeof (newParentDistance));
        }
    }
    setObjectColor(newColor) {
        if (typeof (newColor) != "number") { newColor = parseFloat(newColor); }
        this.m_myColor = newColor;
    }

    setSpinSpeed(newSpinSpeed) {
        if (typeof (newSpinSpeed) != "number") { newSpinSpeed = parseFloat(newSpinSpeed); }
        if (typeof (newSpinSpeed) == "number") {
            this.m_spinSpeed = newSpinSpeed / this.m_katSayi;
        } else {
            console.log("New spinSpeed of planet have to number you made it " + typeof (newSpinSpeed));
        }
    }

    setRotation(plusRotation) {
        if (this.m_rotation != undefined) {
            if (typeof (plusRotation) != "number") { plusRotation = parseFloat(plusRotation); }
            this.m_rotation.y += plusRotation;
        }
    }

    setLinePermission(newPermission) {
        if (newPermission == "TRUE") newPermission = true; else newPermission = false;
        this.m_drawLinePermission = newPermission;
    }
    setOrbitPermission(newPermission) {
        if (newPermission == "TRUE") newPermission = true; else newPermission = false;
        this.m_drawOrbitPermission = newPermission;
    }
    setSpinAngle(plusAngle) {
        if (this.m_spinAngle != undefined) {
            if (this.getSpinAngle() >= 360) { this.m_spinAngle = 0; }
            this.m_spinAngle += plusAngle;
        }
    }
    setOrbit(newOrbit) {
        this.m_ownOrbit = newOrbit;
    }
    setLine(newLine) {
        this.m_ownLine = newLine;
    }
    setOrbitDegree(newDegree) {
        if(typeof(newDegree)=="string") newDegree = parseFloat(newDegree);
        this.m_orbitDegree = newDegree;
    }

    //-------------------Setters-------------------

    //-------------------Getters-------------------
    getName() {
        return this.m_name;
    }
    getPos() {
        return this.m_meshSelf.position;
    }
    getRad() {
        return this.m_radius;
    }
    getRotationSpeed() {
        return this.m_myRotationSpeed;
    }
    getLineColor() {
        return this.m_ownLineColor;
    }
    getOrbitColor() {
        return this.m_ownOrbitColor;
    }
    getParentDistance() {
        return this.m_parentDistance;
    }
    getLine() {
        return this.m_ownLine;
    }
    getOrbit() {
        return this.m_ownOrbit;
    }
    getParent() {
        return this.m_parent;
    }
    getScale() {
        return this.m_scale;
    }
    getObjectColor() {
        return this.m_myColor;
    }
    getSpinSpeed() {
        return this.m_spinSpeed;
    }
    getRotation() {
        return this.m_rotation;
    }
    getLinePermission() {
        return this.m_drawLinePermission;
    }
    getOrbitPermission() {
        return this.m_drawOrbitPermission;
    }
    getSpinAngle() {
        return this.m_spinAngle;
    }
    getMeshSelf() {
        return this.m_meshSelf;
    }
    getOrbitDegree() {
        return this.m_orbitDegree;
    }
    //-------------------Getters-------------------

    //-------------------Delete FOR MEMORY LEAK IT IS DAMN IMPORTANT!-------------------
    //if you dont it would crash and much lower fps
    deleteMeshSelf(webGL_scene) {
        if (this.m_meshSelf != undefined) {
            webGL_scene.remove(this.m_meshSelf);
            this.m_meshSelf.geometry.dispose();
            this.m_meshSelf.material.dispose();
            delete this.m_meshSelf;
        }
    }
    deleteLineSelf(webGL_scene) {
        if (this.m_ownLine != undefined) {
            webGL_scene.remove(this.m_ownLine);
            delete this.m_ownLine.geometry.vertices;
            this.m_ownLine.geometry.dispose();
            this.m_ownLine.material.dispose();
            delete this.m_ownLine;
        }
    }
    deleteOrbitSelf(webGL_scene) {
        if (this.m_ownOrbit != undefined) {
            webGL_scene.remove(this.m_ownOrbit);
            delete this.m_ownOrbit.geometry.vertices;
            this.m_ownOrbit.geometry.dispose();
            this.m_ownOrbit.material.dispose();
            delete this.m_ownOrbit;
        }
    }
    //-------------------Delete FOR MEMORY LEAK IT IS DAMN IMPORTANT!-------------------


    static set_mouse_onPlanet(planetX)
    {
        kobliPlanet.m_onPlanet = planetX;
    }

    static get_mouse_onPlanet()
    {
        return kobliPlanet.m_onPlanet;
    }

}
class kobliPlanet extends kobliObject {
    constructor(planetName,
        planetColor = "ffffff",
        planetRadius = 1,
        planetMeshStyle = "basic",
        planetMeshTrans = false,
        planetTexturePath = "NONE",
        planetRotationSpeed = 0.001,
        planetSpinSpeed = 0.001,
        planetDrawLinePermission = true,
        planetDrawOrbitPermission = true,
        planetLineColor = "f0f0f0",
        planetOrbitColor = "ffffff", planetOrbitDegree = 0, planetOpacity = 1) {

        var kobliPlanetGEO = new THREE.SphereGeometry(planetRadius, 30, 30/* my standart for it */);
        var kobliPlanetMAT = newMaterial(planetTexturePath, planetMeshStyle, strtoColor(planetColor), planetMeshTrans);
        kobliPlanetMAT.opacity = planetOpacity
        var kobliPlanetMESH = new THREE.Mesh(kobliPlanetGEO, kobliPlanetMAT);
        kobliPlanetMESH.name = planetName;

        super(kobliPlanetMESH.name,
            kobliPlanetMESH.scale,
            undefined,
            kobliPlanetMAT.color,
            kobliPlanetMESH.rotation,
            planetRadius,
            planetRotationSpeed,
            planetSpinSpeed,
            planetDrawLinePermission,
            planetDrawOrbitPermission,
            strtoHex(planetLineColor),
            strtoHex(planetOrbitColor),
            kobliPlanetMESH, planetOrbitDegree);
    }
}

class kobliPlanetRing extends kobliObject {
    constructor(ringName, ringRadius = 1) {

        var kobliRingMesh = createRings(ringRadius, 30);
        kobliRingMesh.name = ringName;

        super(kobliRingMesh.name,
            kobliRingMesh.scale,
            undefined,
            kobliRingMesh.material.color,
            kobliRingMesh.rotation,
            ringRadius,
            0,
            0,
            false,
            false,
            strtoHex("ffffff"),
            strtoHex("ffffff"),
            kobliRingMesh);
    }
}
//have to cause cant use it before super
function newMaterial(texturePath, meshStyle, planetColor, transparency = false) {
    var thingMat;
    switch (meshStyle.toUpperCase()) {
        case "BASIC":
            thingMat = new THREE.MeshBasicMaterial();
            break;
        case "WITHLIGHT":
            thingMat = new THREE.MeshPhongMaterial();
            break;
        default:
            thingMat = new THREE.MeshBasicMaterial();
            console.log("I dont know this " + meshStyle + " so i made it basic.");
            break;
    }
    if (texturePath != "NONE" && texturePath != undefined && texturePath != "") {
        try {
            var thingText = THREE.ImageUtils.loadTexture(texturePath);
            thingMat.map = thingText;
        }
        catch{
            console.log("I couldnt find texturepath are sure about it?");
            console.log(texturePath);
        }
    } else {
        thingMat.color.r = planetColor.red;
        thingMat.color.g = planetColor.green;
        thingMat.color.b = planetColor.blue;

    }
    thingMat.transparent = transparency;
    return thingMat;
}

class kobliLight extends kobliObject {

    constructor(lightName, lightStyle = "ambient", lightColor = 0xffffff, lightOpacity = 0.5, lightSphereRadius = 0x00ff00, lightSphereColor = 0xffffff, lightRadius = 50, lightIntensity = 0.5, myParent = undefined) {
        switch (lightStyle.toUpperCase()) {
            case "AMBIENT":
                var ambientLight = new THREE.AmbientLight(lightColor, lightOpacity);
                ambientLight.name = lightName;
                super(lightName, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ambientLight);
                break;
            case "POINTLIGHT":
                var sphere = new THREE.SphereBufferGeometry(lightSphereRadius, 30, 30);
                var light = new THREE.PointLight(lightColor, 1, lightRadius);
                light.intensity = lightIntensity;
                light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: lightSphereColor })));
                light.name = lightName;
                super(lightName, undefined, myParent, light.color, undefined, sphere.parameters.radius, undefined, undefined, undefined, undefined, undefined, undefined, light);
                break;
            default:
                console.log("Dont know this " + lightStyle + " style.")
                return undefined;
        }
    }
}


function strtoHex(str) {
    var splitedStr = str.split("");
    var numbers = [];
    for (let i = 0; i < splitedStr.length; i++) {
        hexToNumber(splitedStr[i].toUpperCase(), numbers);
    }

    var calculated = 0;
    for (let i = 1; i <= numbers.length; i++) {
        calculated += numbers[numbers.length - i] * Math.pow(16, (i - 1));
    }
    return calculated;
}
function strtoColor(str) {
    var splitedStr = str.split("");
    var numbers = [];
    for (let i = 0; i < splitedStr.length; i++) {
        hexToNumber(splitedStr[i].toUpperCase(), numbers);
    }

    var calcColor = [];
    var calculated = 0;
    for (let i = 0; i < numbers.length; i += 2) {
        calculated = numbers[i] * Math.pow(16, 1) + numbers[i + 1] * Math.pow(16, 0);
        calcColor.push(calculated);
    }
    return { red: calcColor[0], green: calcColor[1], blue: calcColor[2] };
}
function hexToNumber(str, numbers) {

    switch (str.toUpperCase()) {
        case 'A':
            numbers.push(10);
            break;
        case 'B':
            numbers.push(11);
            break;
        case 'C':
            numbers.push(12);
            break;
        case 'D':
            numbers.push(13);
            break;
        case 'E':
            numbers.push(14);
            break;
        case 'F':
            numbers.push(15);
            break;
        case '0':
            numbers.push(0);
            break;
        case '1':
            numbers.push(1);
            break;
        case '2':
            numbers.push(2);
            break;
        case '3':
            numbers.push(3);
            break;
        case '4':
            numbers.push(4);
            break;
        case '5':
            numbers.push(5);
            break;
        case '6':
            numbers.push(6);
            break;
        case '7':
            numbers.push(7);
            break;
        case '8':
            numbers.push(8);
            break;
        case '9':
            numbers.push(9);
            break;
        default:
            numbers.push(0);
            break;
    }
}

//not mine
function createRings(radius, segments) {
    return new THREE.Mesh(new THREE.XRingGeometry(1.2 * radius, 2 * radius, 2 * segments, 5, 0, Math.PI * 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('../img/saturn-rings.png'), side: THREE.DoubleSide, transparent: true, opacity: 0.6
    }))
};

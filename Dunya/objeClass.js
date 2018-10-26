/*export default class planetClass
{
    
    constructor(planetX)
    {
        this.planetSelf = planetX;
        this.planetChilds = [];
        this.planetChildsRadius = [];

    }
    addChild(childPlanet,childPlanetRadius) 
    {
        this.planetChilds.push(childPlanet);
        this.planetChildsRadius.push(childPlanetRadius);

    }
    removeChild()
    {
        this.planetChilds.pop();
        this.planetChildsRadius.pop();

    }
    findPlanet(whichPlanet)
    {
        let indexOf = this.findInside(whichPlanet);
        let cPlanet = this.planetChilds[indexOf];
        let cPlanetRadius = this.planetChildsRadius[indexOf];
        return {Planet : cPlanet , Radius : cPlanetRadius};
    }
    findInside (whichPlanet) 
    {
        for(let i =0;i<this.planetChilds.length;i++)
        {
            if(this.planetChilds[i]==whichPlanet) return i;
        }
    }
}
export class cameraClass
{

}

export {planetClass,cameraClass} from 'objeClass.js';
*/
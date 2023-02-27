import CubeMeasure from "./CubeMeasure";
import CubeDimension from "./CubeDimension";

class Cube {

    name: string
    title: string
    cubeMeasures: CubeMeasure[]
    cubeDimensions: CubeDimension[]

    constructor(cube: Object) {
        this.name = "name" in cube ? (cube["name"] as string) : "Unknown"
        this.title = "shortTitle" in cube ? (cube["shortTitle"] as string) : "Unknown"
        this.cubeMeasures = new Array <CubeMeasure>()
        this.cubeDimensions = new Array <CubeDimension>()
        this.parseObject(cube)
    }

    parseObject(cube: Object){
        if("measures" in cube){
            let measures = (cube["measures"] as [Object])
            measures.forEach(async (item) => {
                this.cubeMeasures.push(this.parseMeasure(item))
            })
        }
        if("dimensions" in cube){
            let dimensions = (cube["dimensions"] as [Object])
            dimensions.forEach(async (item) =>{
                this.cubeDimensions.push(this.parseDimension(item))
            })
        }
    }

    parseMeasure(item: Object){
        return new CubeMeasure(item)
    }

    parseDimension(item: Object){
        return new CubeDimension(item)
    }
}

export default Cube
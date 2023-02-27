
class CubeBase{

    name: string
    title: string
    type: string

    constructor(item: Object) {
        this.name = "name" in item ? (item["name"] as string) : "Unknown"
        this.title = "shortTitle" in item ? (item["shortTitle"] as string) : "Unknown"
        this.type = "type" in item ? (item["type"] as string) : "Unknown"
    }
}

export default CubeBase
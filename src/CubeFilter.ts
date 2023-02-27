import CubeBase from "./CubeBase";
import Filter from "./Filter";

class CubeFilter<T>{

    item: CubeBase
    filterType: Filter
    filterValue: T

    constructor(item: CubeBase, filterType: Filter, filterValue: T) {
        this.item = item
        this.filterType = filterType
        this.filterValue = filterValue
    }
}

export default CubeFilter
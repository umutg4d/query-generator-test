import CubeFilter from "../CubeFilter";
import ProcessParams from "./ProcessParams";

class FilterProcessParams extends ProcessParams{

    filter: CubeFilter<Object>

    constructor(filter: CubeFilter<Object>) {
        super();
        this.filter = filter;
    }
}

export default FilterProcessParams
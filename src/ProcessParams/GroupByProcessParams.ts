import CubeDimension from "../CubeDimension";
import ProcessParams from "./ProcessParams";


class GroupByProcessParams extends ProcessParams{

    dimension: CubeDimension

    constructor(dimension: CubeDimension) {
        super();
        this.dimension = dimension;
    }
}

export default GroupByProcessParams
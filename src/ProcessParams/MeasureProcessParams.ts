import Measure from "../Measure";
import ProcessParams from "./ProcessParams";


class MeasureProcessParams extends ProcessParams{

    measure: Measure

    constructor(measure: Measure) {
        super();
        this.measure = measure;
    }
}

export default MeasureProcessParams
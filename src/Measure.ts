import CubeMeasure from "./CubeMeasure";
import AggregationType from "./AggregationType";

class Measure {

    measureColumn: CubeMeasure
    aggregationType: AggregationType

    constructor(measureColumn: CubeMeasure, aggregationType: AggregationType ) {
        this.measureColumn = measureColumn
        this.aggregationType = aggregationType
    }
}

export default Measure
import AggregationType from "../AggregationType";
import MeasureProcessParams from "../ProcessParams/MeasureProcessParams";
import QueryDecorator from "./QueryDecorator";
import QueryProcess from "./QueryProcess";

class MeasureDecorator extends QueryDecorator{

    baseProcess: QueryProcess

    constructor(baseProcess: QueryProcess, measureProcessParams: MeasureProcessParams) {
        super(measureProcessParams);
        this.baseProcess = baseProcess;
    }

    process() {
        let knexRootQuery = this.baseProcess.process();
        let measureProcessParams = (this.processBaseParams as MeasureProcessParams);
        if(measureProcessParams.measure.aggregationType == AggregationType.AVG){
            return knexRootQuery.avg(measureProcessParams.measure.measureColumn.name);
        }else if(measureProcessParams.measure.aggregationType == AggregationType.SUM){
            return knexRootQuery.sum(measureProcessParams.measure.measureColumn.name);
        }else if(measureProcessParams.measure.aggregationType == AggregationType.MAX){
            return knexRootQuery.max(measureProcessParams.measure.measureColumn.name);
        }else if(measureProcessParams.measure.aggregationType == AggregationType.MIN){
            return knexRootQuery.max(measureProcessParams.measure.measureColumn.name);
        }
    }
}

export default MeasureDecorator
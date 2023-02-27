import GroupByProcessParams from "../ProcessParams/GroupByProcessParams";
import QueryDecorator from "./QueryDecorator";
import QueryProcess from "./QueryProcess";


class GroupByDecorator extends QueryDecorator{

    baseProcess: QueryProcess;

    constructor(baseProcess: QueryProcess, groupByProcessParams: GroupByProcessParams) {
        super(groupByProcessParams);
        this.baseProcess = baseProcess;
    }

    process() {
        let knexRootQuery = this.baseProcess.process();
        let groupByProcessParams = (this.processBaseParams as GroupByProcessParams);
        return knexRootQuery.groupBy(groupByProcessParams.dimension.name);
    }

}

export default GroupByDecorator
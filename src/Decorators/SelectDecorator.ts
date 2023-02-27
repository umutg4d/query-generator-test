import GroupByProcessParams from "../ProcessParams/GroupByProcessParams";
import QueryDecorator from "./QueryDecorator";
import QueryProcess from "./QueryProcess";
import SelectProcessParams from "../ProcessParams/SelectProcessParams";


class SelectDecorator extends QueryDecorator{

    baseProcess: QueryProcess;

    constructor(baseProcess: QueryProcess, selectParams: SelectProcessParams) {
        super(selectParams);
        this.baseProcess = baseProcess;
    }

    process() {
        let knexRootQuery = this.baseProcess.process();
        let selectProcessParams = (this.processBaseParams as SelectProcessParams);
        return knexRootQuery.from(selectProcessParams.cubeName);
    }

}

export default SelectDecorator
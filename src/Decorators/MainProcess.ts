import {knex} from "knex";
import MainProcessParams from "../ProcessParams/MainProcessParams";
import QueryProcess from "./QueryProcess";

class MainProcess extends QueryProcess{

    constructor(mainProcess: MainProcessParams) {
        super(mainProcess);
    }

    process() {
        let processBaseParams = (this.processBaseParams as MainProcessParams);
        let knexQueryRoot = knex(processBaseParams.cubeName);
        return knexQueryRoot;
    }
}

export default MainProcess
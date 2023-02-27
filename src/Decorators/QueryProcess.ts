import ProcessParams from "../ProcessParams/ProcessParams";

abstract class QueryProcess{

     processBaseParams: ProcessParams

    constructor(processBase: ProcessParams){
        this.processBaseParams = processBase;
    }

   abstract process();
}

export default QueryProcess
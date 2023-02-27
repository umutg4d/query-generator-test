import ProcessParams from "./ProcessParams";

class SelectProcessParams extends ProcessParams{

    cubeName: string

    constructor(cubeName: string) {
        super();
        this.cubeName = cubeName;
    }
}

export default SelectProcessParams
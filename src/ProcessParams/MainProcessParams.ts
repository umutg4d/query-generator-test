import ProcessParams from "./ProcessParams";


class MainProcessParams extends ProcessParams{

    cubeName: string

    constructor(cubeName: string) {
        super();
        this.cubeName = cubeName;
    }
}

export default MainProcessParams
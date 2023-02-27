import URLHelper from "./URLHelper";
import axios from "axios";

class URLRequest {

    constructor() {}

    sendRequest(helper: URLHelper){
        if(helper.requestType == "GET"){
            return axios.get(helper.url, helper.params)
        }else if(helper.requestType == "POST"){
            return axios.post(helper.url)
        }
    }
}

export default URLRequest
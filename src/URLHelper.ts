

class URLHelper
{
    url: string
    requestType: string
    params: Object

    constructor(url: string, requestType: string, params: Object) {
        this.url = url
        this.requestType= requestType
        this.params = params
    }
}

export default URLHelper
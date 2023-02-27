import CubeDimension from "../CubeDimension";
import Measure from "../Measure";
import CubeMeasure from "../CubeMeasure";
import AggregationType from "../AggregationType";
import Filter from "../Filter";
import CubeFilter from "../CubeFilter";
import CubeBase from "../CubeBase";


class QueryParams{

    jsonParameters: any
    dimensions: CubeDimension[]
    measures: Measure[]
    filters: CubeFilter<Object>[]

    constructor(jsonParameters) {
        this.jsonParameters = jsonParameters;
        this.dimensions = [];
        this.measures = [];
        this.filters = [];
        this.parseQueryParams();
    }

    parseQueryParams(){
        if ("dimensions" in this.jsonParameters){
            let dimensions = this.jsonParameters["dimensions"];
            dimensions.forEach(item => {
                this.dimensions.push(new CubeDimension(item));
            });
        }
        if ("measures" in this.jsonParameters){
            let measures = this.jsonParameters["measures"];
            measures.forEach(item => {
                let cubeMeasure = new CubeMeasure(item);
                this.measures.push(new Measure(cubeMeasure, this.aggregationTypeConvert(item["aggType"])));
            })
        }
        if ("filters" in this.jsonParameters){
            let filters = this.jsonParameters["filters"];
            filters.forEach(item => {
                let cubeBase = new CubeBase(item);
                this.filters.push(new CubeFilter(cubeBase, this.filterTypeConvert(item["operator"]), item["value"]));
            })
        }
    }

    filterTypeConvert(filterType: string){
        if (filterType == "equals"){
            return Filter.Equals;
        }
        else if (filterType == "not equals"){
            return Filter.NotEquals;
        }
        else if(filterType == "bigger"){
            return Filter.Bigger;
        }
        else if(filterType == "bigger equals"){
            return Filter.BiggerEqual;
        }
        else if(filterType == "lesser"){
            return Filter.Lesser;
        }
        else if(filterType == "lesser equals"){
            return Filter.LesserEqual;
        }
    }

    aggregationTypeConvert(aggType: string){
        if (aggType == "sum")
            return AggregationType.SUM
        else if(aggType == "max")
            return AggregationType.MAX
        else if(aggType == "avg")
            return AggregationType.AVG
        else if(aggType == "min")
            return AggregationType.MIN
    }

}

export default QueryParams
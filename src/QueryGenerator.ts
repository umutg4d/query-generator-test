import Cube from "./Cube";
import CubeDimension from "./CubeDimension";
import Measure from "./Measure";
import {Knex, knex} from 'knex';
import { SnowflakeDialect } from "knex-snowflake-dialect";
import AggregationType from "./AggregationType";
import Filter from "./Filter";
import CubeFilter from "./CubeFilter";
import QueryBuilder = Knex.QueryBuilder;
import FilterDecorator from "./Decorators/FilterDecorator";
import FilterProcessParams from "./ProcessParams/FilterProcessParams";
import GroupByDecorator from "./Decorators/GroupByDecorator";
import GroupByProcessParams from "./ProcessParams/GroupByProcessParams";
import MainProcess from "./Decorators/MainProcess";
import MainProcessParams from "./ProcessParams/MainProcessParams";
import MeasureDecorator from "./Decorators/MeasureDecorator";
import MeasureProcessParams from "./ProcessParams/MeasureProcessParams";
import SelectDecorator from "./Decorators/SelectDecorator";
import SelectProcessParams from "./ProcessParams/SelectProcessParams";


class QueryGenerator{

    cube: Cube
    groupBy: CubeDimension[]
    measures: Measure[]
    filters: CubeFilter<Object>[]

    constructor(cube:Cube, groupBy: CubeDimension[], measures: Measure[], filters: CubeFilter<Object>[]) {
        this.cube = cube;
        this.groupBy = groupBy;
        this.measures = measures;
        this.filters = filters;
    }

    testQuery(){
        let cubeName = this.cube.name;
        console.log(this.measures[0]);
        let knexQueryRoot = knex({
            debug: true,
            pool: {
                min: 1,
                max: 1
            }});

        this.measures.forEach(measure => {
            knexQueryRoot = this.measureDecorate(knexQueryRoot, measure);
        });
        knexQueryRoot.from(cubeName);
        this.filters.forEach(filter => {
            knexQueryRoot = this.filterDecorate(knexQueryRoot, filter);
        });
        this.groupBy.forEach(item => {
            knexQueryRoot = this.dimensionDecorate(knexQueryRoot, item);
        });
        let qb = ((knexQueryRoot as unknown) as QueryBuilder<unknown,unknown>);
        console.log(qb.toQuery());
    }

    testQueryWithDecorator(){
        let cubeName = this.cube.name;
        let c1 = new MainProcess(new MainProcessParams(cubeName));
        console.log(this.measures);
        this.measures.forEach(item => {
            c1 = new MeasureDecorator(c1, new MeasureProcessParams(item));
        })
        c1 = new SelectDecorator(c1, new SelectProcessParams(cubeName));
        console.log(this.filters);
        this.filters.forEach(filter => {
            c1 = new FilterDecorator(c1, new FilterProcessParams(filter));
        });
        console.log(this.groupBy);
        this.groupBy.forEach(item => {
            c1 = new GroupByDecorator(c1, new GroupByProcessParams(item));
        });
        let qb = c1.process();
        console.log(qb.toString());
    }

    measureDecorate(knexRootQuery, measure: Measure){
        if(measure.aggregationType == AggregationType.AVG){
            return knexRootQuery.avg(measure.measureColumn.name);
        }else if(measure.aggregationType == AggregationType.SUM){
            return knexRootQuery.sum(measure.measureColumn.name);
        }else if(measure.aggregationType == AggregationType.MAX){
            return knexRootQuery.max(measure.measureColumn.name);
        }else if(measure.aggregationType == AggregationType.MIN){
            return knexRootQuery.max(measure.measureColumn.name);
        }
    }

    filterDecorate(knexRootQuery, filter: CubeFilter<Object>){
        if (filter.filterType == Filter.Equals){
            return knexRootQuery.where(filter.item.name, '=', filter.filterValue)
        }else if (filter.filterType == Filter.NotEquals){
            return knexRootQuery.where(filter.item.name, '!=', filter.filterValue)
        }else if (filter.filterType == Filter.Bigger){
            return knexRootQuery.where(filter.item.name, '>', filter.filterValue)
        }
        else if (filter.filterType == Filter.BiggerEqual){
            return knexRootQuery.where(filter.item.name, '>=', filter.filterValue)
        }
        else if (filter.filterType == Filter.Lesser){
            return knexRootQuery.where(filter.item.name, '<', filter.filterValue)
        }
        else if (filter.filterType == Filter.LesserEqual){
            return knexRootQuery.where(filter.item.name, '<=', filter.filterValue)
        }
    }

    dimensionDecorate(knexRootQuery, dimension: CubeDimension){
        return knexRootQuery.groupBy(dimension.name);
    }
}

export default QueryGenerator
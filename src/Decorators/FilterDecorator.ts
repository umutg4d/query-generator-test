import Filter from "../Filter";
import FilterProcessParams from "../ProcessParams/FilterProcessParams";
import QueryDecorator from "./QueryDecorator";
import QueryProcess from "./QueryProcess";


class FilterDecorator extends QueryDecorator{

    baseProcess: QueryProcess;

    constructor(baseProcess: QueryProcess, filterProcessParams: FilterProcessParams) {
        super(filterProcessParams);
        this.baseProcess = baseProcess;
    }

    process() {
        let knexRootQuery = this.baseProcess.process();
        let filterProcessParams = (this.processBaseParams as FilterProcessParams);
        if (filterProcessParams.filter.filterType == Filter.Equals){
            return knexRootQuery.where(filterProcessParams.filter.item.name, '=', filterProcessParams.filter.filterValue)
        }else if (filterProcessParams.filter.filterType == Filter.NotEquals){
            return knexRootQuery.where(filterProcessParams.filter.item.name, '!=', filterProcessParams.filter.filterValue)
        }else if (filterProcessParams.filter.filterType == Filter.Bigger){
            return knexRootQuery.where(filterProcessParams.filter.item.name, '>', filterProcessParams.filter.filterValue)
        }
        else if (filterProcessParams.filter.filterType == Filter.BiggerEqual){
            return knexRootQuery.where(filterProcessParams.filter.item.name, '>=', filterProcessParams.filter.filterValue)
        }
        else if (filterProcessParams.filter.filterType == Filter.Lesser){
            return knexRootQuery.where(filterProcessParams.filter.item.name, '<', filterProcessParams.filter.filterValue)
        }
        else if (filterProcessParams.filter.filterType == Filter.LesserEqual){
            return knexRootQuery.where(filterProcessParams.filter.item.name, '<=', filterProcessParams.filter.filterValue)
        }
    }
}

export default FilterDecorator
import React, { useEffect } from "react";
import Card from "../../UI/Card";
import Filter from "./Filter";

const Filters = (props) => {
  var filters = props.filters;
  let filtersContent = <p></p>;

  useEffect(() => {
    filters = props.filters;
    mapFilters();
  }, [props.filters]);

  const handleFilterStateChange = (state, filterStrength, filterID) => {
    filters.forEach(filter => {
      if(filter.id === filterID){
        filter.isFilterEnabled = state;
        filter.strength = filterStrength;
      }
    });
    props.applyFilters(filters);
  }

  const mapFilters = () => {
    if (filters.length > 0) {
      filtersContent = filters.map((filter) => (
        <Filter
          id={filter.id}
          strength={filter.strength}
          isFilterEnabled={filter.isFilterEnabled}
          filterStateChange={handleFilterStateChange}
        />
      ));
    }
  };
  mapFilters();

  
  return (
    <div id="filtersContainer">
      <Card className="filters">{filtersContent}</Card>
    </div>
  );
};
export default Filters;

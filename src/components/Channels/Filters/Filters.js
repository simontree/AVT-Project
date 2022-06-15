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

  const handleFilterStateChange = (state, filterStrength, filterID, filterType) => {
    filters.forEach(filter => {
      if(filter.id === filterID){
        filter.isFilterEnabled = state;
        filter.strength = filterStrength;
        filter.type = filterType;
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
          filterType={filter.type}
          filterStateChange={handleFilterStateChange}
          channelID={props.channelID}
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

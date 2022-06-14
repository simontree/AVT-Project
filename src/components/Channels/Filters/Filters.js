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

  const mapFilters = () => {
    if (filters.length > 0) {
      filtersContent = filters.map((filter) => (
        <Filter
          id={filter.id}
          strength={filter.strength}
          isFilterEnabled={filter.isFilterEnabled}
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

import React from "react";

const NewFilter = (props) => {
  const createNewFilter = () => {
    var filterData = {
      id: props.getNextFilterID(),
      strength: props.defaultStrength,
      isFilterEnabled: false,
    };
    props.addFilterEvent(filterData);
  };

  return (
    <div>
      <button
        className="addFilterButton"
        value={"Add Filter"}
        onClick={createNewFilter}
      >
        Add Filter
      </button>
    </div>
  );
};

export default NewFilter;
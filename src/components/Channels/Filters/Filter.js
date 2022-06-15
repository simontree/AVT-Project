import React, { useState } from "react";

const Filter = (props) =>{
    const [filterID, setFilterID] = useState(props.id);
    const [filterStrength, setFilterStrength] = useState(props.strength);
    const [isFilterEnabled, setIsFilterEnabled] = useState(props.isFilterEnabled);   
    
    const enableDisableFilter = (event) =>{
        setIsFilterEnabled((prev) => {
            const state = event.target.checked;
            props.filterStateChange(state, filterStrength, filterID);
            return state;
        });
    }
    const updateStrength = (event) =>{
        setFilterStrength((prev) => {
            const updatedStrength = event.target.value;
            props.filterStateChange(isFilterEnabled, updatedStrength, filterID);
            return updatedStrength;
        });
    }
    return(
        <div className="filter" id={filterID}>
            <label>{filterID}</label>
                <input type="checkbox" id={"filtercheckBox+ID+CID"}
                 onChange={enableDisableFilter} checked={isFilterEnabled}></input>
                <input type='range' min='0' max='1' step="0.01"
                id='filterSlider+ID+CID' onChange={updateStrength}
                value={filterStrength}
                ></input>
        </div>
    )
}

export default Filter;
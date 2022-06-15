import React, { useState } from "react";

const Filter = (props) =>{
    const [filterID, setFilterID] = useState(props.id);
    const [filterStrength, setFilterStrength] = useState(props.strength);
    const [isFilterEnabled, setIsFilterEnabled] = useState(props.isFilterEnabled);
    const [filterType, setFilterType] = useState(props.filterType)   
    
    const enableDisableFilter = (event) =>{
        setIsFilterEnabled((prev) => {
            const state = event.target.checked;
            props.filterStateChange(state, filterStrength, filterID, filterType);
            return state;
        });
    }
    const updateStrength = (event) =>{
        setFilterStrength((prev) => {
            const updatedStrength = event.target.value;
            props.filterStateChange(isFilterEnabled, updatedStrength, filterID, filterType);
            return updatedStrength;
        });
    }
    const updateFilterType = (event) =>{
        setFilterType((prev) =>{
            const updatedFilterType = event.target.value;
            props.filterStateChange(isFilterEnabled, filterStrength, filterID, updatedFilterType);
            console.log(updatedFilterType);
            return updatedFilterType;
        });
    }
    
    return(
        <div className="filter" id={filterID}>
            <select name={filterID + "options"} onChange={updateFilterType} >
                <option value={"lowpass"}>Lowpass</option>
                <option value={"highpass"}>Highpass</option>
            </select>
            <input type="checkbox" id={'filterCheckbox' + filterID + props.channelID}
                onChange={enableDisableFilter} checked={isFilterEnabled}></input>
            <input type='range' min='0' max='10' step="0.01"
                id={'filterSlider' + filterID + props.channelID} onChange={updateStrength}
                value={filterStrength}
            ></input>
        </div>
    )
}

export default Filter;
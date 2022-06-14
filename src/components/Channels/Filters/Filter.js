import React, { useState } from "react";

const Filter = (props) =>{
    //props.applyFilter();
    const [filterID, setFilterID] = useState(props.id);
    const [filterStrength, setFilterStrength] = useState(props.strength);
    const [isFilterEnabled, setIsFilterEnabled] = useState(props.isFilterEnabled);    

    return(
        <div className="filter">
            <label>Lowpass</label>
                <input type="checkbox" id={"filtercheckBox+ID+CID"}></input>
                <input type='range' min='0' max='10' step="0.25"
                id='filterSlider+ID+CID' ></input>
        </div>
    )
}

export default Filter;
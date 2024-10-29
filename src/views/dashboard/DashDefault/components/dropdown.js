import React from "react";
import Select from "react-select";
const dropDown = ({multi,handleChange,value, options,label,disabled=false,closeMenuOnSelect=false}) => {
     options = multi
      ? [{ label: "Select All", value: "all" }, ...options]
      : options;
  

    const onchange=(selected)=> {
    if(multi && selected.length && selected.find(option => option.value === "all")){
       handleChange(options.slice(1))

    }else{
      if(!multi){
        handleChange((selected && selected.value) || null)
      }else{
        handleChange(selected);
      }
    }
      
    
  }
    return (
      <div className={`react-select-wrapper ${multi ? "multi" : ""}`}>
     <label className="font-weight-bolds"> {label} </label>{' '}

        <Select
          name="dropdown"
          options={options}
          isMulti={multi}
          value={value ? value : null}
          onChange={onchange}
          isDisabled={disabled}
          closeMenuOnSelect={closeMenuOnSelect}

        />
      </div>
    );


  };
  export const  DropDown= React.memo(dropDown)
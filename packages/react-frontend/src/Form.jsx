// src/Form.jsx
import React, { useState } from "react";

function Form() {
    const [person, setPerson] = useState({
        name: "",
        job: ""
    });
    
    // only 1 event at a time, either editing/changing the name field or the job field
    // function will be called every time one of the fields (name or job) changes its value
    function handleChange(event) {
        const {name, value } = event.target;
        if (name === "job")
            setPerson({ name: person["name"], job:value });
        else setPerson ({ name:value, job: person["job"] }); 
    }
    
    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}
            />
            <label htmlFor="job">Job</label>
            <input
                type="text"
                name="job"
                id="job"
                value={person.job}
                onChange={handleChange}
            />
        </form>
    );
}
export default Form;
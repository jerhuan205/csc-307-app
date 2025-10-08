// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((res)     => res.json())
            .then((json)    => setCharacters(json["users_list"]))
            .catch((error)  => { console.group(error); });
    }, [] );

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    function removeOneCharacter(index) {
        const userToDelete = characters[index];

        // route to HTTP DELETE request
        fetch(`http://localhost:8000/users/${userToDelete.id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 204) {
                    // update frontend only if backend confirms with 204
                    const updated = characters.filter((_, i) => i !== index);
                    setCharacters(updated);
                } else if (response.status === 404) {
                    console.warn("Resource not found.");
                } else {
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    }

    function updateList(person) {
        postUser(person)
            .then((response) => {
                // Update if backend responds 201
                if (response.status === 201) {
                    return response.json(); // parses new user obj with the id
                } else {
                    // Don't update the state on frontend; no changes
                }
            })
            .then((newUser) => {
                // updates the state with the new obj
                setCharacters([...characters, person]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Component render
    return (
        <div className="container">
            <Table 
                characterData={characters} 
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}
export default MyApp;
"use client"
import { useState, useEffect } from "react";

export default function Input(props: any) {
 
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêcher le rechargement de la page
            props.search();
        }
    };

    return (
        <>
            <input
                placeholder="Research"
                type="text"
                list="artists"
                onKeyPress={handleKeyPress}
                onChange={(event) => {
                    props.setSearchInput(event.target.value);
                    
                }}
            />
           
            <button onClick={props.search}>Search</button>
        </>
    );
}

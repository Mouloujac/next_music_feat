"use client"
import { useState, useEffect } from "react";

export default function Input(props: any) {
    useEffect(() => {
        if (props.searchInput) {
            props.optionSearch();
        }
    }, [props.searchInput]);

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
            <datalist id="artists">
                {props.artistsName.map((artist: string, index: number) => (
                    <option key={index} value={artist} />
                ))}
            </datalist>
            <button onClick={props.search}>Search</button>
        </>
    );
}

"use client";

import { useState, useEffect } from "react";

export default function Input(props : any){
    
    return (
        <>
            <input 
                placeholder="Research"
                type="input"
                onKeyUp={event => {
                    if (event.key == "Enter") {
                        console.log('Pressed enter');
                        props.search()
                    }
                }}
                onChange={event => props.setSearchInput(event.target.value)}
                >
           </input>
        <button
            onClick={event => {
                console.log('Bouton cliqué !')
                props.search()
        }}
        >Search</button>
        </>
    )
}
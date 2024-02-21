"use client";

import { useState, useEffect } from "react";


export default function Card( props ){
   
    return (
        <>
        <div className="card">
            <img className="albumImage" src={props.albumImg}>
            </img>
            <div>
                <div className="trackName">
                    <p>{props.trackName}</p>
                </div>
                {props.artistsName.map((artiste, index) => (
                    <a key={index}>{artiste}, </a>
                ))}
               
            </div>
        </div>
        </>
    )
}
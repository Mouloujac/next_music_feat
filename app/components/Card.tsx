"use client";

import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";


export default function Card( props: { albumImg: string | undefined; trackName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; artistsName: (string | number | boolean | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined)[]; } ){
   
    return (
        <>
        <div className="card">
            <img className="albumImage" src={props.albumImg}>
            </img>
            <div>
                <div className="trackName">
                    <p>{props.trackName}</p>
                </div>
                {props.artistsName.map((artiste: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
                    <a key={index}>{artiste}, </a>
                ))}
               
            </div>
        </div>
        </>
    )
}
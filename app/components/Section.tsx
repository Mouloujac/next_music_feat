"use cient"


import Card from "./Card";
import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";


export default function Section({ tracks, artist }) {
    
    return (
        <>
        <section className="bg-gray-700 box-content m-auto">
            <h2 className="p-2">{artist}</h2>
            {tracks.map((track: any, index: Key | null | undefined) => (
                <Card key={index} track={track} />
            ))}
        </section>
        </>
    );
}

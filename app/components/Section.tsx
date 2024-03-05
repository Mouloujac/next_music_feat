"use cient"


import Card from "./Card";
import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";


export default function Section({ tracks, artist, setMusicUrl, setAudioUrl, setIsPlaying, isPlaying }) {
    function toggleSection(event: { target: { nextElementSibling: any; }; }) {
        const sectionTracks = event.target.nextElementSibling; // Sélectionnez le div suivant après le h2
        sectionTracks.classList.toggle('expanded'); // Ajoutez ou supprimez la classe 'expanded'
    }
    
    return (
        <>
        <section className=" box-content w-[500px] flex flex-col mt-4 overflow-hidden m-auto">
            <div onClick={toggleSection} className="text-gray-300 flex justify-between bg-gray-700 p-2">            
                <h2 className=" flex  sectionTitle hover:cursor-pointer" >{artist}</h2>
                <span className="flex">{tracks.length}<span>.</span><span className="flex"> Feats</span></span>
            </div>
            <div className="overflow-hidden h-0 sectionTracks">
                {tracks.map((track: any, index: Key | null | undefined) => (
                    <Card key={index} setIsPlaying={setIsPlaying} track={track} setMusicUrl={setMusicUrl} isPlaying={isPlaying} setAudioUrl={setAudioUrl}/>
                ))}
            </div>
        </section>
    </>
    
    );
}

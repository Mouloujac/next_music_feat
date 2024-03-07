"use client";

import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";
import AudioPlayer from "./AudioPlayer";

export default function Card ({ track, setMusicUrl, setAudioUrl, setIsPlaying, isPlaying }){
    
    const handleAlbumDivClick = () => {
        
        setAudioUrl(track.preview_url); // Met à jour l'URL de la piste audio
        setIsPlaying(true); // Démarre la lecture
        
    };

    

    return (
        <>
        <div className="card py-3 w-full flex m-auto px-3">
            <div className="albumDiv relative w-14 hover:cursor-pointer" onClick={handleAlbumDivClick}>
            <img className="w-14 z-10 absolute" src={track.albumImage}></img>
            <img className="playButton w-14 absolute opacity-0 hover:opacity-1 z-50 transition-all"  src="play.svg">
            </img>
            </div>
            <div className="flex justify-between w-full">
                <div className="trackName ml-5 mt-1 flex flex-col justify-start items-start">
                    <p>
                        {track.artists.map((artist: any, index: Key | null | undefined) => (
                            <a key={index} href={artist.external_urls.spotify} target="_blank" className="hover:underline text-gray-400 ">{artist.name}, </a>
                        ))}
                    </p>
                    <p><a href={track.external_urls.spotify} target="_blank" className="text-gray-300 hover:underline">{track.name}</a></p>
                </div>
                <div className="flex justify-self-center text-center content-center ml-16 my-auto text-gray-300">
                    {(track.duration_ms / 60000).toFixed(2)}
                </div>
               
               
            </div>
        </div>
        </>
    )
}
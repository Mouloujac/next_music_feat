"use client";

import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";


export default function Card ({ track }){
   
    return (
        <>
        <div className="card py-5 w-full flex m-auto">
            <div className="albumDiv relative w-14">
            <img className="w-14 z-10 absolute" src={track.album.images[0].url}></img>
            <img className="playButton w-14 absolute opacity-0 hover:opacity-1 z-50 transition-all" src="play.svg">
            </img>
            </div>
            <div className="flex justify-betweenw-full">
                <div className="trackName ml-5 mt-1 flex flex-col justify-start items-start">
                    <p><span className="hover:underline">{track.artists[1].name}</span>, <span className="hover:underline">{track.artists[0].name}</span></p>
                    <p><span className="text-gray-300 hover:underline">{track.name}</span></p>
                </div>
                <div className="flex justify-self-center text-center content-center ml-16 my-auto text-gray-300">
                    3:35
                </div>
               
               
            </div>
        </div>
        </>
    )
}
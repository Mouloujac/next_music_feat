"use client"

import React, { useEffect, useState } from "react";

export default function ArtistSelection( { artistsOption, setSearchInput, search } ){

    function artistClick(artist: string | number | boolean | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined){
        setSearchInput(artist)
        search()
    }

    return(
        <div className="w-full flex">
          {artistsOption.map((artist: { images: string | any[]; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => (
            <div key={index} className="m-auto">
              {artist.images.length > 0 ? (
                <div className="relative text-center px-3 hover:cursor-pointer" onClick={() => artistClick(artist.name)}>
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={artist.images[0].url}
                      alt={artist.name}
                    />
                  </div>
                  <div className="mt-1">{artist.name}</div>
                </div>
              ) : (
                <div className="relative text-center px-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                    <img
                      className="w-full h-full object-cover"
                      src="avatarImg.png"
                      alt="Avatar"
                    />
                  </div>
                  <div className="mt-1">{artist.name}</div>
                </div>
              )}
            </div>
          ))}
        </div>
    )
}
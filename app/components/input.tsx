"use client";
import { useState, useEffect } from "react";

export default function Input(props: any) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Empêcher le rechargement de la page
      props.search();
    }
  };

  return (
    
      <div className="flex rounded-full bg-[#0d1829] px-2 w-full max-w-[200px] m-12">
        <button className="self-center flex p-1 cursor-pointer bg-[#0d1829]">
          {" "}
          <svg
            width="2px"
            height="5px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            
          </svg>
        </button>

        <input
          className="w-full bg-[#0d1829] flex bg-transparent pl-2 text-[#cccccc] outline-0"
          placeholder=""
          type="text"
          list="artists"
          onKeyPress={handleKeyPress}
          onChange={(event) => {
            props.setSearchInput(event.target.value);
            // Vérifiez si la longueur de la chaîne est supérieure à trois pour déclencher la recherche
            if (event.target.value.length >= 2) {
                props.searchArtistsOption(); // Appel de la fonction de recherche des artistes
            }
        }}
        />
        <button
          type="submit"
          className="relative p-2 bg-[#0d1829] rounded-full"
          onClick={props.search}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </g>
          </svg>
        </button>
      </div>
   
  );
}

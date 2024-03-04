"use client";

import React, { useEffect, useState } from "react";
import Input from "./components/input";
import Card from "./components/Card";
import AudioPlayer from "./components/AudioPlayer";
import config from "../config";
import axios from 'axios';

export default function Home() {
  const CLIENT_ID: string = config.spotify.clientId;
  const CLIENT_SECRET: string = config.spotify.clientSecret;
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [artistsName, setArtistsName] = useState<string>("");
  const [artistsNameId, setArtistsNameId] = useState<string>("");
  const [trackName, setTrackName] = useState<string[]>([]);
  const [albumImg, setAlbumImg] = useState<string>("");
  const [featName, setFeatName] = useState<string[]>([]);
  const [featID, setFeatID] = useState<string[]>([]);
  const [tracksFeat, setTracksFeat] = useState<any[]>([]);
  

  useEffect(() => {
    var authParameters: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    console.log("search: " + searchInput);
   
    setTracksFeat([])

    var artistParameters: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        
        setArtistsNameId(data.artists.items[0].id);
        setArtistsName(searchInput)
        searchArtist(searchInput, data.artists.items[0].id)
      });
  }





  async function searchArtist(name: string, ID: string) { 
    console.log("searchArtist: " + name);
    console.log("searchArtistId: " + ID);
   
    setTracksFeat([]);

    const baseUrl = "https://api.spotify.com/v1/search?q="
    const limit = 50; // Nombre de résultats par page
    const type = "track";
    const query = name;
    let offset = 0;
    let allTracks: { [artistName: string]: any[] } = {}; // Stockage de toutes les pistes organisées par artiste

    // Effectuer une première requête pour obtenir le nombre total de résultats
    while (true) {
        try {
            const url = `${baseUrl}${query}&type=${type}&limit=${limit}&offset=${offset}`;

            const config = {
                method: "GET",
                url: url,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            };

            const response = await axios(config);

            if (response.status === 200) {
                const tracks = response.data.tracks.items;
              
                // Filtrer les pistes pour celles qui ont un artiste avec l'ID spécifié
                const filteredTracks = tracks.filter((track: { artists: { id: string; }[]; }) => {
                  return track.artists.some(artist => artist.id === ID);
                });
              
                // Organiser les morceaux par artiste, en évitant de créer une entrée pour searchInput
                for (const track of filteredTracks) {
                    for (const artist of track.artists) {
                        const artistName = artist.name;
                        if (artistName !== name) { // Vérifie si le nom de l'artiste n'est pas égal à searchInput
                            if (!allTracks[artistName]) {
                                allTracks[artistName] = [];
                            }
                            allTracks[artistName].push(track);
                        }
                    }
                }
                
                // Si le nombre de pistes récupérées est inférieur au nombre de pistes limitées par la recherche,
                // cela signifie qu'il n'y a plus de pistes à récupérer
                if (tracks.length < limit) {
                    break;
                }
                
                // Augmenter l'offset pour récupérer la prochaine page de résultats
                offset += limit;
            }
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API:", error);
            break;
        }
    }
    // Une fois que toutes les pistes ont été récupérées et organisées par artiste, vous pouvez les stocker dans un state ou une variable
    setTracksFeat(allTracks);
    console.log(allTracks)
}















  async function impr(){
    console.log(tracksFeat)
  }
  


  return (
    <main className="">
      <h1>MUSIC FEAT</h1>
      <button onClick={impr}>Fait voar</button>
      <Input search={search} searchInput={searchInput} setSearchInput={setSearchInput} artistsName={artistsName} />
      <Card />
    </main>
  );
}
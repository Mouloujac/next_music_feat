"use client";

import { useEffect, useState } from "react";
import Input from "./components/input";
import Card from "./components/Card";
import { headers } from "next/headers";

export default function Home() {

const CLIENT_ID = "edd2d584de44432ab7040f29de9101df";
const CLIENT_SECRET = "ae3345099e784b0387be258522148e85";
const [accessToken, setAccessToken] = useState("");
const [searchInput, setSearchInput] = useState("");
const [artistsName, setArtistsName] = useState([]);
const [trackName, setTrackName] = useState('');
const [albumImg, setAlbumImg] = useState('');

useEffect(() => {
  var authParameters = {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    console.log("search: " + searchInput)

    var artistParameters = {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + "&type=track" , artistParameters)
      .then(response => response.json())
      .then(data => {
        const nomsArtistes = data.tracks.items[0].artists.map(artist => artist.name);
        setArtistsName(nomsArtistes);
        const nomsTracks = data.tracks.items[0].name;
        setTrackName(nomsTracks);
        const urlImage = data.tracks.items[0].album.images[0].url;
        setAlbumImg(urlImage);
        
      })
    // Il faut faire un appel a "Tracks" et garder que ceux ou "items[0].artists.map(artist => artist.name)" egal a la recherche dans un premier temp
      

      
  }

  return (
    <main className="">
      <h1>MUSIC FEAT</h1>
      <Input search={search} setSearchInput={setSearchInput} />
      <Card trackName={trackName} artistsName={artistsName} albumImg={albumImg}/>
    </main>
  )
}

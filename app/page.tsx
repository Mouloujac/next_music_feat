"use client";

import React, { useEffect, useState } from "react";
import Input from "./components/input";
import Card from "./components/Card";
import AudioPlayer from "./components/AudioPlayer";
import config from "../config";

export default function Home() {
  const CLIENT_ID: string = config.spotify.clientId;
  const CLIENT_SECRET: string = config.spotify.clientSecret;
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [artistsName, setArtistsName] = useState<string[]>([]);
  const [artistsNameId, setArtistsNameId] = useState<string>("");
  const [trackName, setTrackName] = useState<string[]>([]);
  const [albumImg, setAlbumImg] = useState<string>("");
  const [featName, setFeatName] = useState<string[]>([]);
  const [featID, setFeatID] = useState<string[]>([]);
  const [tracksFeat, setTracksFeat] = useState<any[]>([]);
  const [groupedArray, setGroupedArray] = useState([]);

  
  const listFeat = tracksFeat.map((feat: any, index: number) => (
    <li key={index}>
      <div className="card">
        <img className="albumImage" src={feat.imageUrl}></img>
        <div>
          <div className="trackName">
            <p>{feat.name}</p>
          </div>
          {feat.artists.map((artiste: any, index: number) => (
            <a key={index}>{artiste.name}, </a>
          ))}
          <AudioPlayer previewUrl={feat.previewUrl} id={feat.id} />
        </div>
        
      </div>
    </li>
  ));

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
        // const nomsArtistes = data.tracks.items[0].artists.map((artist: { name: any; }) => artist.name);
        // setArtistsName(nomsArtistes);
        // const nomsTracks = data.tracks.items[0].name;
        // setTrackName(nomsTracks);
        // const urlImage = data.tracks.items[0].album.images[0].url;
        // setAlbumImg(urlImage);
        console.log(data.artists.items[0].id);
        setArtistsNameId(data.artists.items[0].id);
      });
  }

  function impr(){
    console.log(tracksFeat)
  }

  async function optionSearch() {
    console.log("search: " + searchInput);
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
        // const nomsArtistes = data.tracks.items[0].artists.map((artist: { name: any; }) => artist.name);
        // setArtistsName(nomsArtistes);
        // const nomsTracks = data.tracks.items[0].name;
        // setTrackName(nomsTracks);
        // const urlImage = data.tracks.items[0].album.images[0].url;
        // setAlbumImg(urlImage);
        const names = data.artists.items.map((artist: any) => artist.name);
        setArtistsName(names);
      });
  }


  useEffect(() => {
    if (artistsNameId) {
      var artistParameters: any = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
  
      const fetchAlbums = async (url: string) => {
        const response = await fetch(url, artistParameters);
        const data = await response.json();
        setFeatName((prevFeatName) => [...prevFeatName, ...data.items.map((item: { name: any }) => item.name)]);
        setFeatID((prevFeatID) => [...prevFeatID, ...data.items.map((item: { id: any }) => item.id)]);
        if (data.next) {
          await fetchAlbums(data.next);
        }
      };
  
      fetchAlbums(`https://api.spotify.com/v1/artists/${artistsNameId}/albums?include_groups=appears_on&offset=0&limit=30&market=FR`);
    }
  }, [artistsNameId]);
  

  useEffect(() => {
    if (featID) {
      var artistParameters: any = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      featID.forEach((feat) => {
        var artistFeat = fetch(
          `https://api.spotify.com/v1/albums/${feat}`,
          artistParameters
        )
          .then((response) => response.json())
          .then((data) => {
            let tracksBy = [];

            data.tracks.items.forEach(
              (track: {
                preview_url: any; artists: any[]; name: any 
}) => {
                track.artists.forEach((artist) => {
                  if (artist.name == searchInput) {
                    const updatedTrack = {
                      ...track,
                      imageUrl: data.images[0].url,
                      previewUrl: track.preview_url,
                    };
                    //data.tracks.items where name =  Mettre à jour l'état tracksFeat en ajoutant le nouvel objet de piste
                    setTracksFeat((tracksFeat) => [
                      ...tracksFeat,
                      updatedTrack,
                    ]);
                    tracksFeat.sort()
                  }
                });
              }
            );
          });
      });
    }
   
  }, [featID]);

  return (
    <main className="">
      <h1>MUSIC FEAT</h1>
      <Input search={search} searchInput={searchInput} setSearchInput={setSearchInput} artistsName={artistsName} optionSearch={optionSearch}/>

      <ul>{listFeat}</ul>
      <button onClick={impr}>Click</button>
    </main>
  );
}
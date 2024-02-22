"use client";

import { useEffect, useState } from "react";
import Input from "./components/input";
import Card from "./components/Card";

import config from '../config';



export default function Home() {

const CLIENT_ID = config.spotify.clientId;
const CLIENT_SECRET = config.spotify.clientSecret;
const [accessToken, setAccessToken] = useState("");
const [searchInput, setSearchInput] = useState("");
const [artistsName, setArtistsName] = useState([]);
const [artistsNameId, setArtistsNameId] = useState('');
const [trackName, setTrackName] = useState([]);
const [albumImg, setAlbumImg] = useState('');
const [featName, setFeatName] = useState([]);
const [featID, setFeatID] = useState([]);
const [tracksFeat, setTracksFeat] = useState([]);
const listFeat = tracksFeat.map((feat, index)=>
  <li key={index}>
  <div className="card">
  <img className="albumImage" src={feat.imageUrl}>
  </img>
  <div>
      <div className="trackName">
          <p>{feat.name}</p>
      </div>
      {feat.artists.map((artiste, index) => (
          <a key={index}>{artiste.name}, </a>
          
      ))}
     
  </div>
  <figure>
    <audio controls src={feat.previewUrl} ></audio>
  </figure>
  
</div>
</li>
)

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
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + "&type=artist" , artistParameters)
      .then(response => response.json())
      .then(data => {
        // const nomsArtistes = data.tracks.items[0].artists.map((artist: { name: any; }) => artist.name);
        // setArtistsName(nomsArtistes);
        // const nomsTracks = data.tracks.items[0].name;
        // setTrackName(nomsTracks);
        // const urlImage = data.tracks.items[0].album.images[0].url;
        // setAlbumImg(urlImage);
        console.log(data.artists.items[0].id)
        setArtistsNameId(data.artists.items[0].id)
        
      })
    
    

      
  }

  useEffect(()=>{
    if (artistsNameId) {
    var artistParameters = {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + accessToken
      }
    }
    var includeGroups = 'album,single,appears_on';
    // Il faut faire un appel a "Tracks" et garder que ceux ou "items[0].artists.map(artist => artist.name)" egal a la recherche dans un premier temp
    var artistAlbums = fetch(`https://api.spotify.com/v1/artists/${artistsNameId}/albums?include_groups=appears_on&offset=0&limit=10&market=FR`, artistParameters)    
    .then(response => response.json())
    .then(data => {
      // const nomsArtistes = data.tracks.items[0].artists.map((artist: { name: any; }) => artist.name);
      // setArtistsName(nomsArtistes);
      // const nomsTracks = data.tracks.items[0].name;
      // setTrackName(nomsTracks);
      // const urlImage = data.tracks.items[0].album.images[0].url;
      // setAlbumImg(urlImage);
      
      setFeatName(data.items.map(((item: { name: any; })=>item.name)))
      setFeatID(data.items.map(((item: { id: any; })=>item.id)))

      
    })
    }
  },[artistsNameId])

   useEffect(()=>{
     if (featID) {
     var artistParameters = {
       method: "GET",
       headers: {
         "Content-Type" : "application/json",
         "Authorization" : "Bearer " + accessToken
       }
     }
     featID.forEach((feat)=> {
     var artistFeat = fetch(`https://api.spotify.com/v1/albums/${feat}`, artistParameters)    
    .then(response => response.json())
    .then(data => {
      let tracksBy = [];
      
      data.tracks.items.forEach((track: { artists: any[]; name: any; }) => {
        track.artists.forEach((artist)=> {
          if(artist.name == searchInput){
            const updatedTrack = {
              ...track,
              imageUrl: data.images[0].url,
              previewUrl: track.preview_url
          };
          //data.tracks.items where name =  Mettre à jour l'état tracksFeat en ajoutant le nouvel objet de piste
          setTracksFeat(tracksFeat => [...tracksFeat, updatedTrack]);
          console.log(data)
          }
        })
      });
     
      

      
     })
     }
     )
     
     }
   },[featID])


  return (
    <main className="">
      <h1>MUSIC FEAT</h1>
      <Input search={search} setSearchInput={setSearchInput} />
      
      <ul>{listFeat}</ul>
    </main>
  )
}

"use client";

import React, { useEffect, useState } from "react";
import Input from "./components/input";
import Card from "./components/Card";
import Section from "./components/Section";
import AudioPlayer from "./components/AudioPlayer";
import ArtistSelection from "./components/ArtistSelection";
import config from "../config";
import axios from "axios";

export default function Home() {
  const CLIENT_ID: string = config.spotify.clientId;
  const CLIENT_SECRET: string = config.spotify.clientSecret;
  const [accessToken, setAccessToken] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [artistsName, setArtistsName] = useState<string>("");
  const [artistsNameId, setArtistsNameId] = useState<string>("");
  const [tracksFeat, setTracksFeat] = useState<any[]>([]);
  const [musicUrl, setMusicUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState(""); // État pour stocker l'URL de la piste audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [artistsOption, setArtistsOption] = useState<any[]>([]);

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
    setTracksFeat([]);

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
        setArtistsName(searchInput);
        searchArtist(searchInput, data.artists.items[0].id);
      });
  }

  async function searchArtist(name: string, ID: string) {
    setTracksFeat([]);

    const baseUrl = "https://api.spotify.com/v1/search?q=";
    const limit = 50; // Nombre de résultats par page
    const type = "track";
    const query = name;
    let allTracks: { [artistName: string]: any[] } = {}; // Stockage de toutes les pistes organisées par artiste

    try {
      // Effectuer des requêtes pour récupérer toutes les pistes en tranches de 50 jusqu'à 950
      for (let offset = 0; offset < 950; offset += limit) {
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
          const filteredTracks = tracks.filter(
            (track: { artists: { id: string }[] }) => {
              return track.artists.some((artist) => artist.id === ID);
            }
          );

          // Organiser les morceaux par artiste, en évitant de créer une entrée pour searchInput
          for (const track of filteredTracks) {
            for (const artist of track.artists) {
              const artistName = artist.name;
              if (artistName !== name) {
                // Vérifie si le nom de l'artiste n'est pas égal à searchInput
                if (!allTracks[artistName]) {
                  allTracks[artistName] = [];
                }
                allTracks[artistName].push(track);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API:", error);
    }

    // Stocker toutes les pistes récupérées et organisées par artiste
    setTracksFeat(allTracks);
  }

  async function searchArtistsOption() {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const artists = response.data.artists.items.filter(
          (artist) => !artist.name.includes(",")
        ); // Filtrer les noms d'artistes
        setArtistsOption(artists);
        console.log(artists);
      } else {
        console.error(
          "Erreur lors de la recherche des artistes:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la recherche des artistes:", error);
    }
  }

  return (
    <main className="w-full flex flex-col ">
      <Input
        search={search}
        searchArtistsOption={searchArtistsOption}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        artistsName={artistsName}
      />
      {/* {artistsOption.length > 0 && (
    <datalist id="artists">
    {artistsOption.map((artist, index) => (
        <React.Fragment key={index}>
            <option value={artist.name}>{artist.name}</option>
            {artist.images.length > 0 ? (
                <img src={artist.images[0].url} alt={artist.name} />
            ) : (
                <img src="avatarImg.png" alt="Avatar" />
            )}
        </React.Fragment>
    ))}
    </datalist>

    )} */}
      {artistsOption.length > 0 && (
        <ArtistSelection artistsOption={artistsOption} setSearchInput={setSearchInput} search={search}/>
      )}
      {Object.keys(tracksFeat).map((artistName, id) => (
        <div key={id}>
          <Section
            setIsPlaying={setIsPlaying}
            tracks={tracksFeat[artistName]}
            isPlaying={isPlaying}
            setMusicUrl={setMusicUrl}
            artist={artistName}
            setAudioUrl={setAudioUrl}
          />
        </div>
      ))}
      {isPlaying && (
        <audio
          controls
          autoPlay
          key={audioUrl}
          className="sticky bottom-0 w-full bg-slate-50 z-50"
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </main>
  );
}

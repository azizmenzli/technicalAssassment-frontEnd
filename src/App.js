import React, { useState } from "react";
import axios from "axios";

import "./App.css"

const platforms = ["PC", "PS4", "XBOX", "Android"];
const genres = ["MOBA", "MMORPG", "FPS", "Card Game", "Sport", "Multiplayer"];

const App = () => {
  const [playtimeGames, setPlaytimeGames] = useState([]);
  const [playersGames, setPlayersGames] = useState([]);
  const [platform, setPlatform] = useState("PC");
  const [genre, setGenre] = useState("MOBA");

  const fetchPlaytimeGames = async () => { 
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/top-by-playtime?platform=${platform}&genre=${genre}`
      );
      setPlaytimeGames(response.data);
      console.log(playersGames);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayersGames = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/top-by-players?platform=${platform}&genre=${genre}`
      );
      setPlayersGames(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPlaytimeGames();
    fetchPlayersGames();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Platform:
          <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label>
          Genre:
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
      <h2>Top Games by Playtime</h2>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Total Playtime</th>
          </tr>
        </thead>
        <tbody>
          {playtimeGames.map((game) => (
            <tr key={game._id}>
              <td>{game._id}</td>
              <td>{game.totalPlaytime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Top Games by Players</h2>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Player Count</th>
          </tr>
        </thead>
        <tbody>
          {playersGames.map((game) => (
            <tr key={game.game}>
              <td>{game.game}</td>
              <td>{game.playerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

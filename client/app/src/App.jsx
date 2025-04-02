import { useEffect, useState} from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [key, setKey] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newKey, setNewKey] = useState(""); 

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/songs/");
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addSong = async () => {
    const songData = {
      title,
      artist: artist,
      key: key,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/songs/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      });

      const data = await response.json();
      setSongs((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSong = async (pk) => {
    const songData = {
      title: newTitle,
      artist: newArtist,
      key: newKey,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/songs/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      });

      const data = await response.json();
      setSongs((prev) =>
        prev.map((song) => {
          if (song.id === pk) {
            return data;
          } else {
            return song;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSong = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/songs/${pk}`, {
        method: "DELETE",
      });

      setSongs((prev) => prev.filter((song) => song.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1> OffRxMeds Song List Tracker </h1>

      <table>
        <tr align = "center">
          <th> Song Title </th>
          <th> Artist </th>
          <th> Key </th>
          <th> </th>
          <th> </th>
        </tr>
        
        <tr>
          <td>
            <input type="text" placeholder="New Song Title..." onChange={(e) => setTitle(e.target.value)} />
          </td>
          <td>
            <input type="text" placeholder="New Artist..." onChange={(e) => setArtist(e.target.value)} />
          </td>
          <td>
            <input type="text" placeholder="New Key..." onChange={(e) => setKey(e.target.value)} />
          </td>
          <td> <button onClick={addSong}> Add song </button> </td>
          <td> </td>
        </tr>
        {fetchSongs.map((song) => (
          <tr>
            <td> {song.title} </td>
            <td> {song.artist} </td>
            <td> {song.key} </td>
            <td> <button onClick={() => updateSong(song.id, song.artist, song.key)} > Update </button> </td>
            <td> <button onClick={() => deleteSong(song.id)}> Delete </button> </td>
        </tr>
      ))}
    </table>
  </>
  );
}
export default App;

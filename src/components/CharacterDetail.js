import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(response.data);
        const episodeRequests = response.data.episode.map((episodeUrl) =>
          axios.get(episodeUrl)
        );
        const episodeResponses = await Promise.all(episodeRequests);
        setEpisodes(episodeResponses.map((episode) => episode.data));
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-detail">
      <img src={character.image} alt={character.name} />
      <div>
        <h2>{character.name}</h2>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
        <div>
          <h3>Episodes:</h3>
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>
                {episode.episode} - {episode.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;

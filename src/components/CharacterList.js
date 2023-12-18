import { Link } from "react-router-dom";

const CharacterList = ({ characters }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <Link to={`/character/${character.id}`}>
            <img src={character.image} alt={character.name} />
          </Link>
          <div className="character-info">
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Origin: {character.origin.name}</p>
            <p>Location: {character.location.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;

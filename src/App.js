import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async (page) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching characters:", error);
      return [];
    }
  };

  const loadMoreCharacters = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const nextPage = currentPage + 1;
      const newCharacters = await fetchCharacters(nextPage);
      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialCharacters = async () => {
      const initialCharacters = await fetchCharacters(currentPage);
      setCharacters(initialCharacters);
    };

    loadInitialCharacters();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search onSearch={handleSearch} />
                <CharacterList characters={filteredCharacters} />
                <Pagination
                  charactersPerPage={charactersPerPage}
                  totalCharacters={characters.length}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  onLoadMore={loadMoreCharacters}
                />
              </>
            }
          />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

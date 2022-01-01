import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

const fetchPokemonAPI = (url) => {
  return new Promise(async (resolve, reject) => {
    const randomTimeoutSeconds = Math.floor(Math.random() * 5) + 3;
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        resolve(json);
      } catch (e) {
        reject(e);
      }
    }, randomTimeoutSeconds * 1000);
  });
};

const Pokedex = () => {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    // first way - use abort controller
    const controller = new AbortController();
    const fetchPokemonList = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150', { signal: controller.signal });
      const json = await response.json();
      setSelectedPokemon(json.results[0].url);
      setPokemonList(json.results);
      setLoading(false);
    };
    fetchPokemonList();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    // second way - use a local variable flag
    // you can also use this same idea with refs
    let fetching = true;
    const fetchPokemon = async () => {
      if (!selectedPokemon) {
        return;
      }

      const json = await fetchPokemonAPI(selectedPokemon);
      if (fetching) {
        setSelectedImage(json.sprites.other.dream_world.front_default);
      }
    };

    fetchPokemon();

    return () => (fetching = false);
  }, [selectedPokemon]);

  if (loading) {
    return null;
  }

  return (
    <Container>
      <select value={selectedPokemon} onChange={(e) => setSelectedPokemon(e.target.value)}>
        {pokemonList.map(({ name, url }) => {
          return (
            <option key={name} value={url}>
              {name}
            </option>
          );
        })}
      </select>
      {selectedImage && <StyledImage src={selectedImage} />}
    </Container>
  );
};

const StyledImage = styled.img`
  height: 200px;
  width: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Pokedex;

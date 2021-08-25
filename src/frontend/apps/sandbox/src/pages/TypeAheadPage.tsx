import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';

const fruitList = ['apple', 'orange', 'strawberry', 'kiwi'];
const TypeAheadPage: FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>(fruitList);
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchText(query);
    if (!query.trim()) {
      setSuggestions(fruitList);
    } else {
      setSuggestions(fruitList.filter((fruit) => fruit.indexOf(query) >= 0));
    }
  };

  return (
    <div>
      <h2>TypeAhead Page</h2>
      <Container>
        <input
          type="input"
          autoComplete="off"
          value={searchText}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        {showSuggestions && (
          <SuggestionsContainer>
            {suggestions.map((suggestion) => {
              return (
                <div key={suggestion} onMouseDown={() => setSearchText(suggestion)}>
                  {suggestion}
                </div>
              );
            })}
          </SuggestionsContainer>
        )}
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  border: 1px solid black;
`;

export default TypeAheadPage;

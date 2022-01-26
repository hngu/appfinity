import React, { useEffect, useState } from 'react';

export const RandomMeSearchPage = () => {
  const [query, setQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const isMounted = true;
    const fetchUserData = async () => {
      const response = await fetch('https://randomuser.me/api?results=100');
      const json = await response.json();
      if (isMounted) {
        setUserData(json.results);
      }
    };

    fetchUserData();

    return () => (isMounted = false);
  }, []);

  const onSearchHandler = (query) => {
    setQuery(query);
    const lowercase = query.trim().toLowerCase();
    if (!query) {
      return setSuggestions([]);
    }
    setSuggestions(userData.filter((user) => nameFormatter(user).toLowerCase().includes(lowercase)));
  };

  const showUser = (user) => {
    setQuery('');
    setSuggestions([]);
    setSelectedUser(user);
  };

  if (!userData) {
    return null;
  }

  return (
    <div>
      <h2>Random Me Search</h2>
      <div>
        <input type="text" aria-label="name search" value={query} onChange={(e) => onSearchHandler(e.target.value)} />
      </div>
      <div>
        {suggestions.map((suggestion) => (
          <div onClick={() => showUser(suggestion)} key={nameFormatter(suggestion)}>
            {nameFormatter(suggestion)}
          </div>
        ))}
      </div>
      <div>{!query && selectedUser && <img src={selectedUser.picture.large} />}</div>
    </div>
  );
};

const nameFormatter = ({ name: { title, first, last } }) => {
  return `${title} ${first} ${last}`;
};

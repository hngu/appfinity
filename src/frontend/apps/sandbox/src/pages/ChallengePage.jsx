import React, { useState } from 'react';

export const ChallengePage = () => {
  return (
    <>
      <h2>Challenge</h2>
      <RobotList />
    </>
  );
};

const nestedObjectData = {
  taxi: 'a car licensed to transport passengers in return for payment of a fare',
  food: {
    sushi: 'a traditional Japanese dish of prepared rice accompanied by seafood and vegetables',
    apple: {
      Honeycrisp: 'an apple cultivar developed at the MAES Horticultural Research Center',
      Fuji: 'an apple cultivar developed by growers at Tohoku Research Station',
    },
  },
  candy: {
    horse: 'a horse is very fast',
  },
};

const wrapperStyle = {
  display: 'flex',
  alignItems: 'row',
};

const NestedObjectView = ({ data }) => {
  const indentStyle = {
    marginLeft: '10px',
    marginTop: '10px',
  };
  return (
    <div>
      {Object.entries(data).map(([itemKey, item]) => {
        const reactKey = `${itemKey}`;
        if (typeof item !== 'object') {
          return (
            <div key={reactKey}>
              {itemKey}: {item}
            </div>
          );
        }
        return (
          <div key={reactKey} style={wrapperStyle}>
            <div>{itemKey}:</div>
            <div style={indentStyle}>
              <NestedObjectView data={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RobotList = () => {
  const [query, setQuery] = useState('');
  const [robots, setRobots] = useState([]);

  const addRobot = (e) => {
    e.preventDefault();
    if (robots.includes(query)) {
      return;
    }
    setRobots([...robots, query]);
    setQuery('');
  };

  const removeRobot = (robot) => {
    setRobots(robots.filter((r) => r !== robot));
  };

  return (
    <>
      <form onSubmit={addRobot}>
        <input
          type="text"
          placeholder="Generate Robot"
          value={query}
          onChange={(e) => setQuery(e.target.value.trim())}
        />
        <button type="submit" onClick={addRobot}>
          Enter
        </button>
      </form>
      {robots.length > 0 && <h2>Robot List</h2>}
      <div style={robotGridStyle}>
        {robots.map((robot) => (
          <div key={robot} onClick={() => removeRobot(robot)}>
            <img src={`https://robohash.org/${robot}`} />
          </div>
        ))}
      </div>
    </>
  );
};

const robotGridStyle = {
  display: 'grid',
  gridTemplateRows: 'repeat(3, 1fr)',
  gridTemplateColumns: 'repeat(3, 1fr)',
};

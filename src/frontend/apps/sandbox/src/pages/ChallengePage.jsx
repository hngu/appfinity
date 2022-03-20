import React, { useState, useEffect, useRef } from 'react';

export const ChallengePage = () => {
  return (
    <>
      <h2>Challenge</h2>
      <QuizApp />
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

const GenerateList = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivity = async () => {
    const response = await fetch('https://www.boredapi.com/api/activity');
    const json = await response.json();
    setActivities((a) => [...a, json]);
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return activities.length ? (
    <div>
      <p>
        <button onClick={fetchActivity}>Generate Activity</button>
      </p>
      <ul>
        {activities.map((a, index) => (
          <li key={index}>
            <ExpandableListItem item={a} />
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const ExpandableListItem = ({ item }) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => {
    setExpand((e) => !e);
  };

  return (
    <>
      <div>
        {item.activity}
        <button onClick={toggleExpand}>{expand ? 'Collapse' : 'Expand'}</button>
      </div>
      {expand && (
        <ul>
          <li>Type: {item.type}</li>
          <li>Participants: {item.participants}</li>
          <li>Price: {item.price}</li>
        </ul>
      )}
    </>
  );
};

const LADDER_IMAGE = 'https://raw.githubusercontent.com/jusshe/coding-challenge-pictures/main/ladder.png';

const Ladder = ({ img }) => {
  const ladders = new Array(5).fill(0);
  const [hoverId, setHoverId] = useState(null);

  const onMouseOver = (index) => {
    setHoverId(index);
  };

  const onMouseOut = () => {
    setHoverId(null);
  };

  const getWidth = (index) => {
    return hoverId !== null && index >= hoverId ? 764 : 382;
  };

  const getHeight = (index) => {
    return hoverId !== null && index >= hoverId ? 648 : 324;
  };

  return (
    <div style={{ display: 'inline-grid', alignItems: 'column' }}>
      {ladders.map((_, index) => (
        <img
          key={index}
          src={img}
          onMouseEnter={() => onMouseOver(index)}
          onMouseOut={onMouseOut}
          width={getWidth(index)}
          height={getHeight(index)}
        />
      ))}
    </div>
  );
};

const UserOnlineContext = React.createContext(null);

function UserOnlineContextApp() {
  const [userState, setUserState] = useState({
    Bob: true,
    Gary: true,
    Jessica: true,
    Sam: true,
    Eric: true,
  });
  const value = {
    userState,
    setUserState,
  };

  return (
    <UserOnlineContext.Provider value={value}>
      <UserList />
    </UserOnlineContext.Provider>
  );
}

const UserList = () => {
  const { userState, setUserState } = React.useContext(UserOnlineContext);
  const users = Object.entries(userState);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomIndex];

      setUserState((currenState) => {
        return { ...currenState, [randomUser[0]]: !randomUser[1] };
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [users, setUserState]);
  return (
    <>
      {users.map(([name, isOnline]) => (
        <div key={name}>
          {name} {`${isOnline}`}
        </div>
      ))}
    </>
  );
};

const INITIAL_LIST = {
  'Organize closet': [
    { 'Donate old clothes and shoes': false },
    { 'Buy new shelf': false },
    { 'Put in shelf by color': false },
  ],
  'Finish homework': [
    { 'Finish math homework': false },
    { 'Finish science homework': false },
    { 'Finish Reactjs homework': false },
  ],
  'Achieve nirvana': [{ 'Meditate a little': false }, { 'Gain some wisdom': false }],
};

function ChecklistApp() {
  return <Checklist />;
}

const Checklist = () => {
  const [list, setList] = useState(INITIAL_LIST);
  const toggleTask = (taskKey, subTaskKey) => {
    const newList = { ...INITIAL_LIST };
    newList[taskKey] = newList[taskKey].map((subtask) => {
      if (subtask[subTaskKey] !== undefined) {
        subtask[subTaskKey] = !subtask[subTaskKey];
      }
      return subtask;
    });
    setList(newList);
  };
  return (
    <>
      {Object.entries(list).map(([task, subtasks]) => (
        <Task taskName={task} key={task} subtasks={subtasks} toggleTask={toggleTask} />
      ))}
    </>
  );
};

const Task = ({ taskName, subtasks, toggleTask }) => {
  console.log('task rendered');
  const cleanSubTasks = subtasks.reduce((agg, subtask) => {
    Object.keys(subtask).forEach((s) => {
      agg.push({
        subtask: s,
        value: subtask[s],
      });
    });
    return agg;
  }, []);

  return (
    <>
      <h2>{taskName}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <table>
          <thead>
            <tr>
              <th>
                <h3>In Progress</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {cleanSubTasks
              .filter((s) => !s.value)
              .map((subtask) => (
                <tr key={subtask.subtask} onClick={() => toggleTask(taskName, subtask.subtask)}>
                  <td>{subtask.subtask}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Completed</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {cleanSubTasks
              .filter((s) => s.value)
              .map((subtask) => (
                <tr key={subtask.subtask} onClick={() => toggleTask(taskName, subtask.subtask)}>
                  <td>{subtask.subtask}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const InputBlockApp = () => {
  const [sentences, setSentences] = useState([]);
  const [sentence, setSentence] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const addSentence = (e) => {
    e.preventDefault();
    if (sentence.trim() === '') {
      return;
    }
    setSentences([...sentences, sentence]);
    setSentence('');
  };

  const textClick = (text) => {
    return () => {
      setModalText(text);
      setShowModal(true);
    };
  };

  const closeModal = () => {
    setModalText('');
    setShowModal(false);
  };
  return (
    <>
      <form onSubmit={addSentence}>
        <input type="text" value={sentence} onChange={(e) => setSentence(e.target.value)} />
      </form>
      <ul>
        {sentences.map((s) => (
          <li key={s}>
            <ShortenedText text={s} onTextClick={textClick(s)} />
          </li>
        ))}
      </ul>
      {showModal && <Modal onClose={closeModal}>{modalText}</Modal>}
    </>
  );
};

const ShortenedText = ({ text, onTextClick }) => {
  let shortenedText = text;
  if (shortenedText.length > 5) {
    shortenedText = shortenedText.substr(0, 5) + '...';
  }
  return <div onClick={onTextClick}>{shortenedText}</div>;
};

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '500px',
  border: '1px black solid',
  textAlign: 'center',
};
const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const onBodyClick = (e) => {
      console.log('click');
      if (!modalRef.current) {
        return;
      }
      if (!modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener('click', onBodyClick);

    return () => window.removeEventListener('click', onBodyClick);
  }, []); // hmm why?

  return (
    <div ref={modalRef} style={modalStyles}>
      {children}
    </div>
  );
};

const QUESTIONS = [
  {
    question: 'What is 2*(4+4)?',
    answers: ['2', '4', '8', '16'],
    correct: 3,
  },
  {
    question: 'What is 9*9?',
    answers: ['18', '81', '80', '79'],
    correct: 1,
  },
  {
    question: 'Who was the first president of the United States?',
    answers: ['George Washington', 'John Adams', 'John Quincy Adams', 'Thomas Jefferson'],
    correct: 0,
  },
  {
    question: 'What state is Philadelphia in?',
    answers: ['Commonwealth of Pennsylvania', 'New Jersey', 'New York', 'Massachusetts'],
    correct: 0,
  },
  {
    question: 'What are the two major political parties in the United States?',
    answers: [
      'Democratic Party & Republican Party',
      'Green Party & Red Party',
      'Bull Party & Moose Party',
      'Hamilton Party & Burr Party',
    ],
    correct: 0,
  },
];

function QuizApp() {
  return <Quiz questions={QUESTIONS} />;
}

const Quiz = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const question = questions[currentIndex];
  const isDone = currentIndex >= questions.length;
  const score = isDone
    ? userAnswers.reduce((agg, current, index) => (questions[index].correct === current ? agg + 1 : agg), 0)
    : 0;
  // TODO need to check bounds

  const onSelect = (index) => {
    setUserAnswers([...userAnswers, index]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      <h2>Quiz</h2>
      {isDone && <p>Total score: {(score / questions.length) * 100} </p>}
      {!isDone && (
        <form onSubmit={(e) => e.preventDefault()}>
          <p>{question.question}</p>
          {question.answers.map((choice, index) => (
            <>
              <input type="radio" id={choice} key={choice} value={index} onClick={() => onSelect(index)} />
              <label htmlFor={choice}>{choice}</label>
              <br />
            </>
          ))}
        </form>
      )}
    </div>
  );
};

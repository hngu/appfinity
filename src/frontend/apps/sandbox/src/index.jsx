import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PromisePage from './pages/PromisePage';
import StarRatingPage from './pages/StarRatingPage';
import TypeAheadPage from './pages/TypeAheadPage';
import ToDoPage from './pages/ToDoPage';
import DragDropPage from './pages/DragDropPage';
import VirtualListPage from './pages/VirtualListPage';
import UtilsPage from './pages/UtilsPage';
import AccordionPage from './pages/AccordionPage';
import CarouselPage from './pages/CarouselPage';
import NavBarPage from './pages/NavBarPage';
import InlineEditPage from './pages/InlineEditPage';
import PokedexPage from './pages/PokedexPage';
import { TicTacToePage } from './pages/TicTacToePage';
import { CalendarPage } from './pages/CalendarPage';
import { RenderPage } from './pages/RenderPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { AnalogClockPage } from './pages/AnalogClockPage';
import { ConnectFourPage } from './pages/ConnectFourPage';
import { RandomMeSearchPage } from './pages/RandomMeSearchPage';
import { ChallengePage } from './pages/ChallengePage';
import { ReactPDFPage } from './pages/ReactPDFPage';
import { ReactContextPage } from './pages/ReactContextPage';

const Pages = [
  {
    path: '/star-rating',
    title: 'Star Rating Widget',
    component: StarRatingPage,
  },
  {
    path: '/custom-promise',
    title: 'Custom Promise',
    component: PromisePage,
  },
  {
    path: '/typeahead',
    title: 'Typeahead Example',
    component: TypeAheadPage,
  },
  {
    path: '/todo',
    title: 'Todo Page',
    component: ToDoPage,
  },
  {
    path: '/dragdrop',
    title: 'Drag and Drop',
    component: DragDropPage,
  },
  {
    path: '/virtual-list',
    title: 'Virtual List',
    component: VirtualListPage,
  },
  {
    path: '/utils-page',
    title: 'Utils Page',
    component: UtilsPage,
  },
  {
    path: '/accordion',
    title: 'Accordion Page',
    component: AccordionPage,
  },
  {
    path: '/carousel',
    title: 'Carousel Page',
    component: CarouselPage,
  },
  {
    path: '/navbar',
    title: 'Nav Bar Page',
    component: NavBarPage,
  },
  {
    path: '/inline-edit',
    title: 'Inline Edit Page',
    component: InlineEditPage,
  },
  {
    path: '/pokedex',
    title: 'Pokedex Page',
    component: PokedexPage,
  },
  {
    path: '/tictactoe',
    title: 'Tic-Tac-Toe Page',
    component: TicTacToePage,
  },
  {
    path: '/calendar',
    title: 'Calendar Page',
    component: CalendarPage,
  },
  {
    path: '/render',
    title: 'Render Page',
    component: RenderPage,
  },
  {
    path: '/calculator',
    title: 'Calculator Page',
    component: CalculatorPage,
  },
  {
    path: '/analog-clock',
    title: 'Analog Clock Page',
    component: AnalogClockPage,
  },
  {
    path: '/connect-four',
    title: 'Connect 4 Page',
    component: ConnectFourPage,
  },
  {
    path: '/randomme-search',
    title: 'Random Me Search',
    component: RandomMeSearchPage,
  },
  {
    path: '/challenge',
    title: 'Challenge page',
    component: ChallengePage,
  },
  {
    path: '/react-pdf',
    title: 'React PDF Page',
    component: ReactPDFPage,
  },
  {
    path: '/react-context',
    title: 'React Context page',
    component: ReactContextPage,
  },
];

const App = () => {
  return (
    <Router>
      <h1>My React and TypeScript App!</h1>
      <nav>
        <ul>
          {Pages.map((page) => (
            <li key={page.path}>
              <Link to={page.path}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {Pages.map((page) => (
          <Route key={page.path} path={page.path} component={page.component}></Route>
        ))}
      </div>
    </Router>
  );
};

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);

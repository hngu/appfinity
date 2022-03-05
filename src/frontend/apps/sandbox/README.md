### Setup
1. Install hnvm
2. Run yarn add

### Start development
1. Run yarn start

### Build production
1. Run yarn build

### Sandbox ideas
https://medium.com/@manojsingh047/understanding-frontend-security-ff6585395534

https://learnk8s.io/kubernetes-for-developers
https://dev.to/lunaticmonk/understanding-the-node-js-event-loop-phases-and-how-it-executes-the-javascript-code-1j9

Star Rating

Design Popover

data grid (search, sort)

analog clock

connect 4

progress bar

layout images in masonry format

flipable flash cards

modal

stepper https://ishadeed.com/article/stepper-component-html-css/

image intersectionobserver component

https://ishadeed.com/article/facebook-messenger-chat-component/

react portals


### Systems
Coupon Creator
- Coupon Name
- Coupon Type (master code, unique code)
- Coupon Rules
  - Coupon Code (for master, it is just one, for unique you can add a prefix)
  - Discount Type (Fixed, Percentage, Free Shipping)
  - Checkbox for requires minimum purchase amount (if checked, enter amount)
- Schedule
  - Start time
  - Expiration (Optional end time)

Contacts Table

Popup Creator
- Popup Form Fields (first name, email, phone)
- Popup Design (this launches a preview of the popup for editing the look)
  - save vs publish
- Set targeting rules
  - when to show it
  - who to show it (BE needs to know who to show, the FE just need to know if it should show popup or not)
  - how long to show it

Template Builder

Analytics

Abandon Cart Email Design

https://github.com/alexgurr/react-coding-challenges
https://www.freecodecamp.org/news/how-to-stand-out-during-your-react-coding-interview/
https://www.codeandchaos.com/excercise/jobinterview/2021-02-01-JobInterview-React-Coding-Challenge/
https://www.youtube.com/watch?v=8uahMXnnRtg
https://www.youtube.com/watch?v=Kb3YtXDvPo0
https://github.com/sudheerj/reactjs-interview-questions
https://medium.com/@justin.sherman/react-coding-interview-challenge-10-7d92416a8c7a

### Done
- Dropdown
  - How to close the menu when the user clicks outside of the menu
  - How to position the menu below the dropdown button
  - Concepts: useRef, useEffect cleanup runs after every update, using `.contains`
- Carousel
  - How to render each child element of the carousel individually
  - Concepts: React.Children functions, Flex box
- Accordion
  - How to show a specific child and hide all other children
  - Concepts: React Context to pass in the selected child, specifying a key for each child, height transitions
- Promise Class
  - How to handle chaining and catching errors
- TypeAhead
  - Same idea as Dropdown
  - Also need handle focus/blur on the input field
  - Use debounce/throttle for key press
- Inline Edit Component
  - You only want to save when there is a value. If there isn't a value, then it is hard to see that the text is editable
  - Using CSS to make the input look like a regular text, then on hover indicate it is editable. Clicking should make it editable
  - Using event.key to detect "Enter" on keydown
  - Using an editable state so that you only get updates when the text has finished editing.
- Infinite Scroll
  - This is based on static height container, and static child heights so need to know them first.
  - You need to compute the starting node, the number of visible nodes with padding above and below
  - You have one fixed height container
  - One viewport container inside that fixed height container, which has the total height of all child nodes to display the scrollbar correctly.
  - One wrapper container that can be moved within the viewport container
  - Finally, the child nodes are rendered in the wrapper container
  - Need to have scroll aware hook
- TicTacToe
  - To determine winner, the algorithm is to check current row, current column, and both diagonals
  - Use `:nth-child()` to add borders
  - How to reset the board? Just copy the current board, then set all cells to blanks
  - Do not allow clicking if there is no winner, there is a winner, or the cell is already occupied
  - CSS grid
- Calendar
  - To get the list of days for a month:
    - Create a new date with the current year and month, and day 1.
    - Add a day until the month changes
  - Build grid for calendar
    - I decided to use a grid. I needed to fill it with empty cells for leading days and trailing days
  - Render grid for calendar
    - Render row which displays a week
    - Use flexbox for the rows
  - Checking if a date is valid
  - Handling text input for numeric values - what if the user enters blank?
  - To subtract days: `d.setDate(d.getDate() - 1)`
- React Render
  - React team wants to retire the term "Virtual DOM" and instead use "value UI". React manages/changes it like any other variable.
  - In normal rendering, if the parent component re-renders, its children will also rerender!
  - use `React.memo` or `useMemo` to memoize expensive child components and only rerender when props change.
  - Use `useMemo` to cache an expensive calculation result. It can take a list of dependencies to update the calculation when the dependencies change
  - However, your component should still work without `useMemo`. React can choose to forget memoized values.
  - Use `useCallback` to cache functions or callbacks so your component doesn't re-render when a new callback is created.
  - Also, whats the difference between `useCallback` and `useMemo`? The `useMemo` will compute the result when the dependencies change. If a new value is returned, it returns that value. For `useCallback`, if the dependencies change, a new function always return. `useMemo` skips any unnecessary computation while `useCallback` is used to prevent unnecessary renders when new callbacks are created.
  - The React component right under your context provider should probably use `React.memo`
  - All consumers that are descendants of a Provider will re-render whenever the Provider's value props change
  - React updates are done like this: `render/re-render -> reconciliation -> commit`
  - Know that useMemo and useCallback has a cost tradeoff. You incur memory to save time. Also, the memoization is not guarenteed.
  - React hooks
    - `useImperativeHandle`
    - `useLayoutEffect`
    - `useDebugValue`
- Calculator
  - Using CSS grid to build the UI
  - Need to handle edge cases like using operators one after another, hitting equals multiple times
  - Need to store two states: what to display and the current expression
- React Best Practices
  - Use absolute paths
  - Have components into their own folders (the component file, the test file, and index file)
  - Wrap external components (so refactoring or replacing is easier)
  - Group files by route/domain. This will tell you more about the project rather than a components folder
  - Use data fetching libraries like react query
  - use react prop types and default props (unless you are using typescript then no need)
  - avoid nested render functions. They are better off in their own component file
  - avoid HOC and render props. Use hooks instead.
- Medium Article FE [Exercise] (https://betterprogramming.pub/my-favorite-coding-interview-task-for-frontened-developers-f3e984fa49e2)
  - Single responsibility useEffect (if you can break up a useEffect for better readability then do it)
  - Using requestAnimationFrame instead of throttle or debounce
  - Do not call setState when the component is unmounted
- useEffect hook
  - it encapsulates componentDidMount, componentOnUpdate, and componentDidUnmount in one function!
  - it is dangerous to omit deps in useEffect because if you are updating state in useEffect it will trigger a re-render and thus call the useEffect hook again in an infinite loop
  - if you pass a function as a dep, make sure that function is created via useCallback because if the function was created inside a component's closure, it will create a new one every render causing the useEffect to trigger every time
- React Challenges
  - Beware of JSX conditional rendering
  - `Object.entries` allows you to loop through with an array of `[key, value]`
  - Know the JS array methods
  - Rendering list of objects where each object can be expand/collapse with additional data for that object: use a component that consumes an individual list item. That component can have inner state `expand, setExpand`. When you add/remove/update the list of objects, the ones that are not added or deleted won't reset the expanded states. The updated one will though. That's the drawback. The way it knows this is using the key prop. When the key prop changes, the entire component is re-rendered. You can use the key prop to identify a react component instance and when it is changed, React will destroy that instance and create a new one.
  - if you set state with a stale state/prop object in a useeffect, react will complain and will ask you to add that state or prop as a dependency. That is because when the useEffect runs, it will have a closure to a stale state or prop object. It is warning you about that. One strategy is to use the setState(a => ) to get the current state.
  - if you use a ref inside a useEffect, and you want to do some clean up on it (like removeEventListener), you get a eslint issue: "the ref value will likely have changed by the time...". This is telling you that the clean up function always run async and can run way after the ref is set to null. So what you have to do is set a local variable to references the current ref so that the closure created by the clean up function will have the correct ref.
  - Ladder exercise: on hover, set id and compute the width and height based on the id. Basically, keep it simple and figure out what image is hovered first and manipulate width and height.
  - Refs has the node object so you can do `ref.current.contains` where as `event.target` is not a node object and does not have `.contains`.
  - Is it safe to omit functions from list of dependencies? Generally, no. Let's say you have a useEffect that calls a function that is declared outside of the use effect. The use effect won't know what states/props are being updated in the outside function. So usually you'll want to declare functions needed by an effect inside of it.
  - Interesting - in strict mode the setState function is called [twice](https://stackoverflow.com/questions/61543226/any-reason-for-a-react-state-hook-set-callback-to-fire-twice) so don't try to do anything silly there with toggling true/false in setState
  - How come I can use setList in the #6? I has to get the subtask, then index it. I didn't index before.
  - You can set the whole list but then the whole component gets re-rendered so the better solution is to update local state
  - returning null or false in JSX curly braces will be ignored
  - For scoring, just keep a total score state and calculate if the score is correct. if it is, increment score.
- JSX Conditional Advice
  - beware of `{number && <JSX />}` because a it will render a 0. Thats because falsy left hand side for `&&` are returned. Just use booleans explicitly in JSX conditionals.
  - Avoid ternaries if you can
  - Avoid props.children in JSX conditionals
  - `{condition ? <Tag props1 /> : <Tag props2 />}` will not remount Tag — use unique key or separate && branches if you want the remount.
- Reusable React Components
  - Document props with propTypes or using typescript types
  - Flatten props (avoid nested props)
  - Follow Single responsibility Principle: break up components with List/List Items
  - Create components that have very little business logic (take data - render data)
  - Use hooks to abstract resuable logic
- React Profiling
  - https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html
- React Portals
  - render a react component outside of its tree hierarchy
  - biggest use case is if a child component is being clipped by the parent component's dimensions.
  - For example, rendering a tooltip within a div that has a set width and height. The tooltip can be clipped. You can fix this via CSS but not scalable
  - Context and event handlers work as you expect in the tree hierarchy.
- React Refs
  - React is declarative: views are composed based on state
  - However, if you want to do something in a view like focus, that is not possible in React
  - React provides an escape hatch: refs give you the reference to the DOM node of the rendered react element
  - you can then use that ref to call `focus()`
  - use refs if you need to have React do something imperatively (instruction or command)
- React Synthetic Events
  - JS Event implementations are native to the browser APIs
  - React provides synthetic events which are react implementation of events that are normalized for all browsers so that developers have a consistent API for interacting with them
- Prevent Unnecessary React Re-render Ideas
  - Use Memoization (useMemo, useCallback)
  - For data fetching, consider react-query (it caches response and wont change values if the response didn't change)
  - For redux selectors, consider the Reselect library
- Performant React: Rules and Patterns
  - React components re-render when: state change, props change, the parent component changes, or when a component uses context and the value of the provider changes
  - Rule 1: if the only reason to use useCallback is to prevent re-renders of child components - it wont work
  - Rule 2: If your component manages state, find parts of the component that don't rely on state and memoize them to minimize re-renders
  - Rule 3: never create new components inside the render of another component
  - Rule 4: When using context, memoize the value when it is not a number, string or boolean

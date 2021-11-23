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

calculator

connect 4

progress bar

layout images in masonry format

flipable flash cards

modal

stepper https://ishadeed.com/article/stepper-component-html-css/

image intersectionobserver component

https://ishadeed.com/article/facebook-messenger-chat-component/


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
  - Based on static height container, and static child heights
  - You need to compute the starting node, the number of visible nodes with padding above and below
  - You have one fixed height container
  - One viewport container inside that is the total height of all child nodes
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
  - In normal rendering, if the parent component re-renders, its children will also rerender!
  - use `React.memo` or `useMemo` to memoize expensive child components and only rerender when props change.
  - Use `useMemo` to cache an expensive calculation result. It can take a list of dependencies to update the calculation when the dependencies change
  - However, your component should still work without `useMemo`. React can choose to forget memoized values.
- Use `useCallback` to cache functions or callbacks so your component doesn't re-render when a new callback is created.
- The React component right under your context provider should probably use `React.memo`
- All consumers that are descendants of a Provider will re-render whenever the Provider's value props change

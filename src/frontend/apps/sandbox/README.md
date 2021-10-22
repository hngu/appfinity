### Setup
1. Install hnvm
2. Run yarn add

### Start development
1. Run yarn start

### Build production
1. Run yarn build

### Sandbox ideas
https://bigfrontend.dev/
https://medium.com/@manojsingh047/understanding-frontend-security-ff6585395534

https://learnk8s.io/kubernetes-for-developers
https://dev.to/lunaticmonk/understanding-the-node-js-event-loop-phases-and-how-it-executes-the-javascript-code-1j9

Star Rating

Design Popover

Infinite Scroll

Tictactoe

calendar for any month like date picker

data grid (search, sort)

analog clock

calculator

connect 4

progress bar

layout images in masonry format

flipable flash cards

modal

test out redux store update (does any update cause selectors to update)?

stepper https://ishadeed.com/article/stepper-component-html-css/

typeahead with race conditions 
- https://medium.com/hackernoon/avoiding-race-conditions-when-fetching-data-with-react-hooks-220d6fd0f663
- https://thoughtspile.github.io/2021/10/11/usestate-object-vs-multiple/ (look at typeahead example)

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

### Copying
Go inside this directory and run `rm -rf node_modules/ && tar cvf - . | (cd /dest/dir; tar xvf -)`

### Setup
1. Install hnvm
2. Run yarn add

### Start development
1. Run yarn start

### Build production
1. Run yarn build

### Setup Redux/Redux Toolkit
1. Install `react-redux`, `@reduxjs/toolkit` and `@types/react-redux`
1. Create a store file and configure it with an empty reducer
1. Then wrap your app in a Provider from redux and pass in the store
1. Here is what we have so far: https://github.com/hngu/appfinity/commit/10cd4478597e33460a96f11ac1907562b506dfc1
1. Create a slice file.
1. In the slice file, setup the initial state.
1. In the slice file, setup the slice.
1. Finally, export the slice's action creators (via slice.actions) and the slice's reducer via (slice.reducer)
1. This is what we have for those steps: https://github.com/hngu/appfinity/commit/9bc065af04ca9443f89a07de31fcb6a2ab6bba35
1. Then setup helper hooks to dispatch actions and select state. This is what you have to do: https://github.com/hngu/appfinity/commit/0595173167f8425e11561a8dd6985bb17f89a807
1. Then import your new reducer into the store, replacing the dummy empty reducer
1. Finally, import app selector, app dispatch and the action creators into your app for use.
1. This is what that looks like: https://github.com/hngu/appfinity/commit/e612ce93c96ca1eb55b8efb184a39366616301c5
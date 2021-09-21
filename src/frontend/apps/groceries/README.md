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
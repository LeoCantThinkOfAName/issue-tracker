# How to start
- `npm install`
- get a proxy server started
- create an `.env` file in the project root with following keys
```sh
REACT_APP_CLIENT_ID={YOUR_CLIENT_ID}
REACT_APP_CLIENT_SECRET={YOUR_CLIENT_SECRECT}
REACT_APP_PROXY_URL=http://localhost:8080
REACT_APP_REDIRECT_URL=http://localhost:3000
```
- `npm start` to start the app

# Something you might not be familiar
- [react-query](https://tanstack.com/query/v3/docs/react/overview), this is a data fetching library, which got a pretty decent API for both caching and fetching with built-in hooks
- [chakra-ui](https://chakra-ui.com/) for CSS hater like you, which comes very intuitive props system
- [typescript](https://www.typescriptlang.org/), something you should be aware of as a F2E after 2020, maybe even earlier. you can ignore all the `Promise<SomeType>` or `: SomeType` of `interface` or `type` for now

# Known issues
- There's some weird behavior when you try to login in every page instead of home page. You can try to fix it, shouldn't be too difficult.
- The `services` are a lil bit repetitive, you can probably figure out some way to remove all the fetch headers or whatever.
- There's definitely more bugs in it, because I didn't carefully tested it.

/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_CLIENT_ID: string;
    REACT_APP_CLIENT_SECRET: string;
    REACT_APP_PROXY_URL: string;
    REACT_APP_REDIRECT_URL: string;
  }
}

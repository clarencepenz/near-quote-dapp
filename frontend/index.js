import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { initContract } from "./assets/js/near/utils";
import JavascriptTimeAgo from "javascript-time-ago";
import "./assets/css/global.css";


// The desired locales.
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(ru);

const container = document.querySelector("#root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

window.nearInitPromise = initContract()
  .then(() => {
    <App />;
    root.render(
      <ChakraProvider>
        <App tab="home" />
      </ChakraProvider>
    );
  })
  .catch(console.error);

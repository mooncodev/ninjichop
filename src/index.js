import React from "react";
import { createRoot } from 'react-dom/client';
import { ColorModeScript,ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme.js';
import App from './App.js';
// import netlifyIdentity from 'netlify-identity-widget'
import { authState } from './services/useAuth.js';


// authState().init();
//
// const root = createRoot(document.getElementById("root"))
//
// root.render(
//   <>
//     <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
//     <ChakraProvider theme={theme} resetCss={false} w="100%">
//       <App/>
//     </ChakraProvider>
//   </>
// );


authState().init().then(()=>{

  const root = createRoot(document.getElementById("root"))

  root.render(
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <ChakraProvider theme={theme} resetCss={false} w="100%">
        <App/>
      </ChakraProvider>
    </>
  );
});


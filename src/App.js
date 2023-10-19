import React, {Suspense, useEffect} from 'react';
import {Center, Spinner} from "@chakra-ui/react";
import {createBrowserRouter, Navigate, RouterProvider, redirect} from 'react-router-dom';
import LayoutApp from './views/LayoutApp.js';
import AppNav from './views/navs/AppNav.js';
import PgLanding from './views/PgLanding.js';
import PgDocs from './views/PgDocs.js';
import PgLogin from "./views/PgLogin";
import PgDash from './views/PgDash.js';
import PgUserSettings from './views/PgUserSettings.js';
import PgSubscriptions from './views/PgSubscriptions.js';
import PgWalletHistory from './views/PgWalletHistory.js';
import PgNotFound from './views/PgNotFound.js';
import {useAuth} from './services/useAuth.js';
import {useScroll} from "framer-motion";
import {appState} from "./services/useAppStore";
import { createStandaloneToast } from '@chakra-ui/toast'
const { ToastContainer, toast } = createStandaloneToast()
export {toast};
import {serverOrigin} from "./data/constants";
import StoreFront from "./views/StoreFront/StoreFront";
// const LazyPublicPage = React.lazy(() => import('./views/PublicPage'));

// const AppProvider = React.lazy(() =>
//   import(/* webpackChunkName: "views-app" */ './AppProvider.js')
// );

export const adminRoutes = [
  '/dash', '/settings', '/subscriptions', '/wallet-history',
]
export const publicRoutes = [
  '/', '/login', '/docs', '/404'
]
export const publicHandleRoute = [
  '/sf',
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const router = (isAuthenticated)=>createBrowserRouter([
  { path: "/sf/*", element: (<StoreFront liveMode={true} />),
    // loader: async (e)=> {
    //   // console.log(e.params['*'])
    //   await sleep(50000);
    //   try {
    //     const headers = {"Content-Type": "application/json"};
    //     const res = await fetch(`${serverOrigin}/api/public/${String(e.params['*']).toLowerCase()}`, {
    //       method:'GET', headers,}).then((r)=> r.json()).catch((e)=>e);
    //     if(res.success) {return res.user}else{throw Error('profile not found')}
    //   } catch (e){
    //     return redirect("/404");
    //   }
    // }
  },
  {
    element: <AppNav />,
    children: [
      { path: "/", element: <PgLanding />, },
      { path: "/404", element: <PgNotFound />, },
      { path: "/login", element: <PgLogin />, },
      { path: "/docs", element: <PgDocs />, },
      {
        element: isAuthenticated===true
          ? <LayoutApp/>
          : <Navigate to="/"/>,
        children: [
          { path: "/dash", element: <PgDash />, },
          { path: "/settings", element: <PgUserSettings />, },
          { path: "/subscriptions", element: <PgSubscriptions/>, },
          { path: "/wallet-history", element: <PgWalletHistory/>, },
        ],
      },
    ],
  },
  {
    path: "*", element: <PgNotFound />/*, loader: async (e)=> {
      // console.log(e.params['*'])
      const headers = {"Content-Type": "application/json"};
      const res = await fetch(`${serverOrigin}/api/public/${String(e.params['*']).toLowerCase()}`, {
        method:'GET', headers,}).then((r)=> r.json()).catch((e)=>e);
      return res.success ? res.user : false
    }*/,
  },
]);

export default function App(props) {
  const { variant, children, ...rest } = props;
  const isAuthenticated = useAuth(s=>s.isAuthenticated)

  const { scrollY, scrollYProgress } = useScroll()
  // const isWindowScrolled = useAppStore(s=>s.isWindowScrolled)
  function onScrollChange(value){
    if(value>5 && !appState().isWindowScrolled){
      console.log('win scrolled true')
      appState().set_isWindowScrolled(true)
    }
    else if(value<=5 && appState().isWindowScrolled){
      console.log('win scrolled false')
      appState().set_isWindowScrolled(false)
    }
  }
  useEffect(() => {
    scrollY.on('change', onScrollChange);
  }, []);

  return (<>
    <Suspense fallback={<div className="loading"/>}>
      {/* Fix: protected routes redirect to "/" on page refresh
       Solution: set initial value for isAuthenticated to null because firebase auth runs asyncronously
       and requires an event callback (onAuthStateChanged()) to determine auth status
       therefor, if we load the router before this callback, the page will redirect to "/"
       as if the user is not logged in, and we don't want that. Downside is slightly longer
       time to first paint, though its hard to imagine other auth solutions are any better. */}
      {/*{isAuthenticated!==null && (*/}
        <RouterProvider router={router(isAuthenticated)}/>
      {/*)}*/}
      <ToastContainer/>
    </Suspense>
  </>);
}

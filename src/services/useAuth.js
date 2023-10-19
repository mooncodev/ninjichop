import {serverOrigin} from "../data/constants";

const [__,__E,__W] = [console.log,console.error,console.warn];
import { create } from 'zustand';
import {produce} from 'immer';
// import zukeeper from 'zukeeper';
import jwtDecode from 'jwt-decode';
import { createBrowserHistory } from 'history';
import {setPaths} from "../helpers/pathStringUtils";
import apiCall from "./apiCall";
const history = createBrowserHistory();

export const userSettingsDefaults={
  history: {},
  ethBal:['', '', ''],
}

export const lnpUserInfoDefaults={
  fetchedOnce:false,
  plan: {},
  payMethod: {},
}
const payloadMockEmailPW = {
  email: 'mooncodev@gmail.com',
  password: 'qqqq1111',
}

export const useAuth = create((set, get) => {
  const _s = (fn) => set(produce(fn))
  return {
    user: {},
    isAuthenticated:false,
    userSettings: userSettingsDefaults,
    lnpUserInfo: lnpUserInfoDefaults,
    init: async() => {
      if(window.location.pathname.substring(0,3)==='/sf/'){
        return;
      }
      // debugger;
      await ls.initSessionStorageSync().then()
      const {accessToken, refreshToken}  = jwt.all()
      if (accessToken.get && refreshToken.get) {
        if(!accessToken.expired){
          // __('accessToken is valid -> fetch user profile & login');
          const res = await apiCall('api/profile', 'GET')
          if(res && res.success){
            _s(s=>{s.user=res.user})
            _s(s=>{s.isAuthenticated=true})
          }else{
            _s(s=>{s.isAuthenticated=false})
            _s(s=>{s.user= {}})
            return await get()._logout(false)
          }
          return;
        }
        else {
          // if access expired, but refresh not expired, call
          // /refreshToken endpoint and login on successful refresh
          // __('accessToken is expired -> try refresh flow');
          if(!refreshToken.expired){
            await get()._refreshToken()
          }else{
            await get()._logout(false)
          }
        }
      }else{
        await get()._logout(false)
      }
    },
    _call: async (endpoint, method, headers={}, payload={}) => {
      headers["Content-Type"] = "application/json";
      const res = await fetch(`${serverOrigin}/${endpoint}`, {
        method, headers, body: JSON.stringify(payload),
      }).then((r)=> r.json()).catch((e)=>__E(e));
      if(res.message){ console.log(res.message) }
    },
/*
    _apiCall: async (endpoint, method, payload={}, headers={}) => {
      const res = await get()._refreshToken()
      if(!res){ return false; }
      const accessToken = jwt.getAccessToken()
      const opts = {method, headers:{}}
      opts.headers["Content-Type"] = "application/json";
      if(accessToken) {
        opts.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      if(method==='PUT' || method==='POST'){
        opts.body = JSON.stringify(payload)
      }
      const response = await fetch(`${serverOrigin}/${endpoint}`, opts)
      .then((r)=> r.json()).catch((e)=>__E(e));
      console.log(endpoint,payload,response)
      return response
    },
*/
    _register: async (email, password) => {
      const payload = {email, password};
      const headers = {"Content-Type": "application/json"};
      const res = await fetch(`${serverOrigin}/auth/register`, {
        method:'POST', headers, body: JSON.stringify(payload),
      }).then((r)=> r.json()).catch((e)=>__E(e));
      return res
    },
    _login: async (email, password) => {
      const payload = {email, password};
      const headers = {"Content-Type": "application/json"};
      return await fetch(`${serverOrigin}/auth/login`, {
        method:'POST', headers, body: JSON.stringify(payload),
      }).then(async (r)=> {
        const res = await r.json()
        if(res.mustVerify){
          _s(s=>{s.isAuthenticated=false})
        }
        else if(res.success){
          _s(s=>{s.user=res.user})
          _s(s=>{s.isAuthenticated=true})
          jwt.setAccessToken(res.accessToken)
          jwt.setRefreshToken(res.refreshToken)
          // history.push('./dash');
        }else{
          _s(s=>{s.isAuthenticated=false})
        }
        return res
      }).catch((e)=> {
        _s(s=>{s.isAuthenticated=false})
        __E(e);
      });

      // Call login method in API
      // The server handler is responsible for setting user fingerprint cookie during this as well

      // If you like, you may redirect the user now
    },
    _verify: async (emailVerifCode) => {
      const headers = {"Content-Type": "application/json"};
      const res = await fetch(`${serverOrigin}/auth/verify`, {
        method:'POST', headers, body: JSON.stringify({emailVerifCode}),
      }).then((r)=> r.json()).catch((e)=>__E(e));

      if(res.success){
        //expect login res object & perform login
        _s(s=>{s.user=res.user})
        jwt.setAccessToken(res.accessToken)
        jwt.setRefreshToken(res.refreshToken)
        _s(s=>{s.isAuthenticated=true})
        return res
      }else{
        _s(s=>{s.isAuthenticated=false})
        return false;
      }
    },
    _refreshToken: async () => {
      const {accessToken, refreshToken}  = jwt.all()
      //::If either token is missing, logout completely and redirect to login/home
      if(!accessToken.get || !refreshToken.get) {
        // __('a token was not found, logout completely');
        await get()._logout();
        return false;
      }
      if (!accessToken.expired) {
        // __('accessToken is still valid -> exit refresh check and continue');
        return true;
      }
      //::If refreshToken is expired, logout completely and redirect to login/home
      if (refreshToken.expired) {
        // __('refreshToken is expired -> logout completely');
        await get()._logout(); return false;
      }
      const headers = {"Content-Type": "application/json"};
      const res = await fetch(`${serverOrigin}/auth/refreshToken`, {
        method:'POST', headers, body: JSON.stringify({refreshToken:refreshToken.get}),
      }).then((r)=> r.json()).catch((e)=>__W(e));

      if(res && res.success){
        //expect login res object & perform login
        jwt.setAccessToken(res.accessToken)
        jwt.setRefreshToken(res.refreshToken)
        set({isAuthenticated:true})
        set({user:res.user})
        return res
      }
      else if(res.invalidToken){
        await get()._logout();
        return false;
      }
      else{return false;}

    },

    _logout: async (setLS=true) => {
      //Nullify the token
      _s(s=>{s.user = {} })
      _s(s=>{s.isAuthenticated = false })
      const accessToken = jwt.getAccessToken()
      jwt.setAccessToken('')
      jwt.setRefreshToken('')
      //Set logout item in local storage

      setLS && ls.setLogout()

      if(accessToken) {
        const headers = {"Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`};
        const res = await fetch(`${serverOrigin}/auth/logout`, {
          method:'POST', headers, body: JSON.stringify({accessToken}),
        }).then((r)=> r.json()).catch((e)=>__E(e));
      }

    },
    _forgotPW: (payload) => apiCall('auth/forgotPassword', 'POST', payload),
    _resetPW: (payload) => apiCall('auth/resetPassword', 'POST', payload),
    _changePW: async (newPassword) => apiCall('auth/changePassword', 'POST', {newPassword}),
    _updateUser: async (updaterObject) => {
      const res = await apiCall('api/profile', 'PUT', updaterObject)
      if(res && res.success) {
        const updObjMod = Object.entries(updaterObject).reduce((acc, [k,v])=>{
          acc[`profile.${k}`] = v; return acc;
        },{})
        _s(s=>{
          setPaths(updaterObject,s.user)
        })
      }
      return res
    },
    //keynames for updaterObject here are lodash-style path strings to drill into collections
    _updatePaths: async (updaterObject) => {
      const res = await apiCall('api/profile-path', 'PUT', updaterObject)
      if(res && res.success) {
        //if res.success, update user object with updaterObject from the func arg - not the response
        _s(s=>{setPaths(updaterObject,s.user)})
      }
      return res
    },
    _getUser: async () => {
      __(`fetching user`);
      const res = await apiCall(`api/profile`, 'GET').catch(e=>false)
      console.log(`_getUser:`,res)
      if(res && res.user) {
        _s(s=>{s.user = res.user})
      }
      return res
    },
    _getUserPublic: async (publicHandle) => {
      __(`fetching user`);
      const headers = {"Content-Type": "application/json"};
      const res = await fetch(`${serverOrigin}/api/public/${publicHandle.toLowerCase()}`, {
        method:'GET', headers,}).then((r)=> r.json()).catch((e)=>e);
      console.log(`_getUser:`,res)
      if(res && res.user){
        _s(s=>{s.user = res.user})
      }
      return res
    },
  }
});
// window.store = useAuth;

export const jwt = {
  // Short duration JWT token (5-10 min)
  getAccessToken: () => sessionStorage.getItem("accessToken"),
  setAccessToken: (token) => sessionStorage.setItem("accessToken", token),
  // Longer duration refresh token (30-60 min)
  getRefreshToken: () => sessionStorage.getItem("refreshToken"),
  setRefreshToken: (token) => sessionStorage.setItem("refreshToken", token),
  checkExpiry: async () => {
    const token = jwt.getAccessToken();
    const decode = jwtDecode(token);
    const expirationTime = decode.exp * 1000; // Convert expiration time to milliseconds
    if (Date.now() >= expirationTime) {
      console.log('Access token has expired');
      // Perform logout or refresh token request
      const res = await useAuth.getState()._refreshToken()
    } else {
      console.log('Access token is still valid');
      // Perform API request
      return true
    }
  },
  all: () => {
    const rvErr = {
      accessToken: {get: null, decode: null, expired: null, secUntilExp: null,},
      refreshToken: {get: null, decode: null, expired: null, secUntilExp: null,},
    };
    const rv = rvErr;
    try{
      const accessToken = jwt.getAccessToken() ?? false
      const refreshToken = jwt.getRefreshToken() ?? false
      if(!accessToken || !refreshToken) {
        return rv;
      }
      const nowMs = Date.now()
      rv.accessToken.get = accessToken;
      rv.refreshToken.get = refreshToken;
      rv.accessToken.decode = jwtDecode(accessToken);
      rv.refreshToken.decode = jwtDecode(refreshToken);
      const expAccess = rv.accessToken.decode.exp * 1000;
      const expRefresh = rv.refreshToken.decode.exp * 1000;
      rv.accessToken.secUntilExp = (expAccess - nowMs)/1000
      rv.refreshToken.secUntilExp = (expRefresh - nowMs)/1000
      // __(rv.accessToken.secUntilExp + ' seconds until accessToken expiry' );
      // __(rv.refreshToken.secUntilExp + ' seconds until refreshToken expiry' );
      rv.accessToken.expired = nowMs >= expAccess
      rv.refreshToken.expired = nowMs >= expRefresh
      // if (!rv.accessToken.expired) {__('accessToken is still valid -> exit refresh check and continue');}
      // if (rv.accessToken.expired) {__('refreshToken is expired -> logout completely');}
      return rv
    }catch(e){
      console.warn(e);
      return rvErr
    }
  },

}
export const ls = {
  get: (key) => window.localStorage.getItem(key),
  set: (key,value) => window.localStorage.setItem(key, value),
  setLogout: () => window.localStorage.setItem('logout', String(Date.now())),
  emitSession: () => {
    // __("Emitting sessionStorage")
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    localStorage.removeItem("sessionStorage");
  },
  initSessionStorageSync:async ()=>{
    if (typeof window !== "undefined") {
      window.addEventListener("storage", async(event) => {
        const {newValue} = event
        // __("storage event", event)
        if (event.key === "getSessionStorage") {
          // Some tab asked for the sessionStorage -> send it
          ls.emitSession()
        }
        else if (event.key === "sessionStorage") {
          // sessionStorage is empty -> fill it
          if(newValue && newValue.length){
            const data = JSON.parse(newValue)
            // debugger
            for (let key in data) {
              sessionStorage.setItem(key, data[key])
            }
            if(data.accessToken){
              await useAuth.getState()._getUser();
              await useAuth.setState({isAuthenticated: true })
            }
          }
        }
        else if (event.key === "logout" && useAuth.getState().isAuthenticated) {
          // sessionStorage is empty -> fill it
          __("received logout event from another tab")
          await useAuth.getState()._logout()
        }
      })
      if (!sessionStorage.length
        || (
          (sessionStorage.accessToken!=null && sessionStorage.accessToken==='')
          &&(sessionStorage.refreshToken!=null && sessionStorage.refreshToken==='')
        )) {
        // Ask other tabs for session storage
        // __("Calling getSessionStorage")
        localStorage.setItem("getSessionStorage", String(Date.now()))
      }
    }
  }

}

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.webcrypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

export const authState = ()=>useAuth.getState();

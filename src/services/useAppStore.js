import { create } from 'zustand';
import {produce} from 'immer';
import {authState} from "./useAuth";
import {planState} from "./usePlan";

export const useAppStore = create((set,get) => ({
  appNavDrawerOpen:false,
  set_appNavDrawerOpen: async (bOpen) => {
    set({appNavDrawerOpen:bOpen});
  },

  apiKeyModalIsOpen:false,
  set_apiKeyModalIsOpen: (bOpen) => {
    set({apiKeyModalIsOpen:bOpen});
  },

  stripeIntentModalIsOpen:false,
  //paymentIntent | setupIntent
  stripeIntentModalClientSecret:'',
  stripeIntentModalStatusMessage:'',
  loadStripeIntentModal: () => {
    planState().createSetupIntent().then((res)=>{
      set({stripeIntentModalClientSecret:res.message.client_secret});
      set({stripeIntentModalIsOpen:true});
    }).catch((err)=>{
      console.error(`stripeIntentModal err`, err)
      set({
        stripeIntentModalStatusMessage:
          'Could not communicate with server, please try again, or try later.'
      })
    })

  },

  closeStripeIntentModal: () => {
    set({stripeIntentModalClientSecret:''});
    set({stripeIntentModalIsOpen:false});
    // set({stripeIntentModalStatusMessage:''})
  },
  set_stripeIntentModalIsOpen: (bOpen, type) => {
    set({stripeIntentModalIsOpen:bOpen});
  },
  set_isWindowScrolled: (bIsScrolled) =>set({isWindowScrolled:bIsScrolled}),
  isWindowScrolled:false,
  set_isAppMainScrolled: (bIsScrolled) => set({isAppMainScrolled:bIsScrolled}),
  isAppMainScrolled:false,

  dashTabIdx:0,
  loginPageInitTab:'login', //login|signup
  authModalIsOpen:false,
  authModalTabIndex: 0,
  set_authModalIsOpen: async (bOpen, initialTab) => {
    if(initialTab){
      set({
        authModalTabIndex: {
          'login':0,
          'signup':1,
        }[initialTab]
      })
    }
    set({authModalIsOpen:bOpen});
  },

  _s: (fn) => set(produce(fn)),
}))

export const appState = ()=>useAppStore.getState();

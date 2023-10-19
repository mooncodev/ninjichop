import { create } from 'zustand';
import {produce} from 'immer';
import {authState} from "./useAuth";


export const useSF = create((set,get) => ({

  ws:null,
  connectWs: async (PIN) => {
    const ws = new WebSocket('ws://localhost:8080?pin=1234');
  },

  stationName:'',
  recents: [],
  confirmInfo: {},
  completeInfo: {},
  selectedCurrency: {},

  masterLog: [],

  sfView:'SFConnect',
  //SFConnect|SFHome|SFConfirm|SFComplete|SFGuide|SFHistory
  setSfView: (s) => {
    set({sfView:s});
  },

  tpl: {},
  setTpl: (s) => {
    set({sfTpl:s});
  },

  activityItemModalContext: {orderNumber:''},
  activityItemModalIsOpen: false,
  set_activityItemModalIsOpen: (bOpen, context) => {
    set({
      activityItemModalContext: context,
      activityItemModalIsOpen:bOpen
    });
  },

  _s: (fn) => set(produce(fn)),
}))

export const sfState = ()=>useSF.getState();
export const setSfView = (view)=>sfState().setSfView(view);

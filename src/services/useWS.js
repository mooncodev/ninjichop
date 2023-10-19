import { create } from 'zustand';
import {produce} from 'immer';
import {authState} from "./useAuth";
import {setSfView, sfState, useSF} from "./useSF";
import {toast} from "../App";
import {decompressJSON, parseMessageData} from "../helpers/payloadParsingUtils";


export const useWS = create((set,get) => ({

  ws:null,
  wsStatusMsg:'Not connected',
  wsErrorMsg:'',
  wsClose: () => {
    get().ws.close(1000, 'Closing the connection');
  },
  wsConnect: async (accessPIN, stationName, publicHandle) => {
    let ws = new WebSocket(
      `ws://localhost:5000?accessPIN=${accessPIN}&stationName=${stationName}&publicHandle=${publicHandle}`
    );

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = async (message) => {
      console.log('WS message: ', message);
      const data = await parseMessageData(message);

      if (data.type === 'connectionResponse') {
        set({wsStatusMsg:`Connected as ${sfState().stationName}`})
        set({wsErrorMsg:'data.message'})
        const revLog = data.data.sort((a,b) =>{
          return parseInt(a.orderNumber) < parseInt(b.orderNumber) ? 1 : -1;
        })
        useSF.setState({recents: revLog});
        setSfView('SFHome');
      }
      if (data.type === 'createResponse') {
        //{ purchasePrice, salesTax, salesFees, totalPrice } = data
        useSF.setState({confirmInfo: data.data});
        setSfView('SFConfirm');
      }
      if (data.type === 'confirmResponse') {
        if(data.status==='success'){
          useSF.setState({completeInfo: data.data});
          setSfView('SFComplete');
        }else{
          toast({
            title:'Could not fetch exchange rates',
            description: data.message,
            status:'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
      if (data.type === 'transactionConfirmed') {
        if(data.orderNumber===sfState().completeInfo.orderNumber){
          useSF.setState({confirmInfo: {}});
          useSF.setState({completeInfo: {}});
          setSfView('SFHome');
        }
      }
      if (data.type === 'getRecentsResponse') {
        const revLog = data.data.sort((a,b) =>{
          return parseInt(a.orderNumber) < parseInt(b.orderNumber) ? 1 : -1;
        })
        useSF.setState({recents: revLog});
      }
      if (data.type === 'getMasterLogResponse') {
        useSF.setState({ masterLog: data.data });
      }
      if (data.type === 'cancelResponse') {
        if(data.status==='success'){
          toast({title: "Order Deleted!", status: "info",duration: 5000});
          useSF.getState().set_activityItemModalIsOpen(false, {orderNumber:''})
        }else{
          toast({
            title:'Could not cancel order, please try again!',
            description: data.message,
            status:'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
      else {
        set({wsErrorMsg:'data.message'})
      }
    };

    ws.onerror = (error) => {
      console.warn('WebSocket connection error', error);
      set({wsStatusMsg:'Not connected'})
      set({wsErrorMsg:'WebSocket connection error. Please try again.'})
      setSfView('SFConnect');
    };

    ws.onclose = (message) => {
      console.log('WebSocket connection closed', message);
      set({wsStatusMsg:'Not connected'})
      set({wsErrorMsg:''})
      setSfView('SFConnect');
      useSF.setState({
        recents:[],
        confirmInfo: {},
        completeInfo: {},
        masterLog: [],
        selectedCurrency:{},
      })
      ws = null;
    };
    set({ws})
  },
  awaitRecents: () => new Promise((resolve, reject) => {
    if (get().ws.readyState === WebSocket.OPEN) {
      get().ws.send(JSON.stringify({ type: 'getRecents' }));
    } else {
      console.warn('Cannot send message, WebSocket connection is not open');
      set({wsErrorMsg:'Cannot send message, WebSocket connection is not open'})
      reject('Cannot send message, WebSocket connection is not open');
    }
    const unsubscribe = useWS.subscribe((state) => {
      if(state.recents) {
        resolve();
        unsubscribe();
      }
    });
  }),
  wsSend: (message) => {
    if (get().ws.readyState === WebSocket.OPEN) {
      get().ws.send(JSON.stringify(message));
    } else {
      console.error('Cannot send message, WebSocket connection is not open');
      set({wsErrorMsg:'Cannot send message, WebSocket connection is not open'})
    }
  },

  _s: (fn) => set(produce(fn)),
}))

export const wsState = ()=>useWS.getState();
export const wsSend = (message) => wsState().wsSend(message);
export const awaitRecents = (message) => wsState().awaitRecents(message);

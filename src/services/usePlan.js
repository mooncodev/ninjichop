import {setPaths} from "../helpers/pathStringUtils";

const [__,__E,__W] = [console.log,console.error,console.warn];
import { create } from 'zustand';
import {produce} from 'immer';
import apiCall from "./apiCall";

export const usePlan = create((set, get) => {
  const _s=(fn)=>set(produce(fn))
  return {
    lnpUserNewApiKey:'',
    init: async() => {

    },
    retrievePaymentIntent: async (client_secret) => {
      __(`in retrievePaymentIntent`);
      const response = await fetch(`https://api.stripe.com/v1/payment_intents/${client_secret}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then(r=>r.json());
      if(response.error){
        return response.error;
      }else if(response.paymentIntent){
        return response.paymentIntent;
      }else{
        __('could not retrievePaymentIntent: ', response)
        return false
      }
    },
    retrieveSubscriptionById: async (sub_id) => {
      __(`in usePlan.retrieveSubscriptionById`);
      const res = await apiCall('plan/stripe-retrieve-subscription', 'POST', {sub_id})
      return res;
    },
    createSubscription: async (product) => {
      __(`in usePlan.createSubscription`);
      const res = await apiCall('plan/stripe-create-subscription', 'POST', {product})
      return res;
    },
    payLatestInvoice: async () => {
      __(`in usePlan.payLatestInvoice`);
      const res = await apiCall('plan/stripe-pay-latest-invoice', 'POST', {})
      return res;
    },
    cancelSubscription: async () => {
      __(`in usePlan.cancelSubscription`);
      const res = await apiCall('plan/stripe-cancel-subscription', 'POST', {})
      return res;
    },
    changeSubscription: async () => {
      __(`in usePlan.changeSubscription`);
      const res = await apiCall('plan/stripe-change-subscription', 'POST', {})
      return res;
    },
    createSetupIntent: async (product=false) => {
      __(`in usePlan.createIntent`);
      const res = await apiCall('plan/stripe-create-setup-intent', 'POST', {})
      return res;
    },
    createPaymentIntent: async (product=false) => {
      __(`in usePlan.createIntent`);
      const res = await apiCall('plan/stripe-create-payment-intent', 'POST', {})
      return res;
    },
    generateNewApiKey: async () => {
      __(`in useAuth.generateNewApiKey`);
      const res = await apiCall('plan/generate-new-api-key', 'POST', {})
      set({lnpUserNewApiKey:res.message})
      return res;
    },
  }
});

export const planState = ()=>usePlan.getState();

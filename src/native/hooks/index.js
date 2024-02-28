import {useState, useEffect, useContext} from "react";
import {useSelector} from "react-redux";
import { config } from "../styles/variables"
import { DefaultPubSubContext } from '../utils/pubsub';

export const useCustomAppInfo = () => {
   const influencer = useSelector(state => state.influencer) || {};
   const [isCustomApp, setCustomApp] = useState(false);
//    console.log("isCustomApp", influencer, isCustomApp);
   useEffect(() => {
		setCustomApp(Boolean(config.appDomain && influencer)); 
   }, [config, influencer]);

   return {		
		isCustomApp,
		influencer
   }
}

export const usePubSub = (context = DefaultPubSubContext) => {
    return useContext(context);
};

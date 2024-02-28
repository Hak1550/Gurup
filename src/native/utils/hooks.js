import React, { useState, useEffect, useRef } from "react";
import { Keyboard, Dimensions } from "react-native";
import {useSelector} from "react-redux";
import { config } from "../styles/variables"

export function useKeyboardStatus(){
    const [isOpen, setIsOpen] = useState(false);
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);

    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardWillShow', () => setIsOpen(true));
        keyboardHideListener.current = Keyboard.addListener('keyboardWillHide', () => setIsOpen(false));

        return () => {
            keyboardShowListener.current.remove();
            keyboardHideListener.current.remove();
        }
    })

    return isOpen;
}

export function useDeviceOrientation() {
    const [deviceOrientation, setDeviceOrientation] = useState(null);
    useEffect(() => {
      function updateState() {
        const { height, width } = Dimensions.get('window');
        if (height >= width) {
          setDeviceOrientation('portrait');
        } else {
          setDeviceOrientation('landscape');
        }
      }
  
      updateState(); // for initial render
      Dimensions.addEventListener('change', updateState);
      return () => Dimensions.removeEventListener('change', updateState);
    }, []);
  
    return deviceOrientation;
}
  
export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
};

export const useCustomAppInfo = () => {
   const influencer = useSelector(state => state.influencer) || {};
   const [isCustomApp, setCustomApp] = useState(false);
   useEffect(() => {
		setCustomApp(Boolean(config.appDomain && influencer)); 
   }, [config, influencer]);

   return {		
		isCustomApp,
		influencer
   }
}
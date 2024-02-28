import { Alert, Platform, AlertIOS } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { switchToDev, switchToProd, switchToStaging, switchToBeta,switchDomain} from '../../requester/index';

export default ( function testMode(){
    let clicks = 0;
    return function(){
        clicks = clicks + 1;
        if(clicks >= 5){


            let closeButton = {
                text: 'Cancel',
                style: 'cancel'
            };

            let buttons = [];
            if (Platform.OS == 'ios') {
                buttons.push(closeButton);
            } else {
                buttons.unshift(closeButton);
            }

            Alert.alert(
                'What would you like?',
                '', [
                    {
                        text:"Clear subdomain and switch to prod",
                        onPress: ()=>{
                            AsyncStorage.multiRemove(["subdomain", "jwt_token","env"], async () => {
                                alert("Cleared, please restart app");
                            })
                        }
                    },
                    {
                        text:"Set mode to (iOS only)",
                        onPress: ()=>{
                            // console.log("set mode");
                            AlertIOS.prompt(
                                'Enter subdomain',
                                "Please enter your subdomain",
                                [
                                  {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'OK',
                                    onPress: (s) => {
                                        // console.log("s ",s);
                                        AsyncStorage.setItem("env",s,async ()=>{
                                            switchDomain(s);
                                        })
                                    }
                                  },
                                ],
                                'plain-text'
                              );

                        }
                    },
                    {
                    text:"Switch mode",
                    onPress: ()=>{
                        buttons = [{
                            text: "Switch to dev mode",
                            onPress: () => {
                                AsyncStorage.setItem("env","dev",async ()=>{
                                    switchToDev();
                                })
                            }
                        }, {
                            text: "Switch to staging mode",
                            onPress: () => {
                                AsyncStorage.setItem("env", "staging",async ()=>{
                                    switchToStaging();
                                })
                            }
                        },{
                            text: "Switch to beta mode",
                            onPress: () => {
                                AsyncStorage.setItem("env", "beta", async () => {
                                    switchToBeta();
                                })
                                // AsyncStorage.multiRemove(["env"], async()=>{
                                    // switchToProd()
                                // })
                            }
                        }];
                        
                        // if (Platform.OS == 'ios') {
                            // buttons.push(closeButton);
                        // } else {
                            // buttons.unshift(closeButton);
                        // }
            
                        Alert.alert(
                            'What would you like?',
                            '', buttons, {
                                cancelable: true
                            }
                        )
                    }
                },closeButton], {
                    cancelable: true
                }
            )
        
        }
        setTimeout(()=>{
            clicks=0;
        },1000)
    }
})()
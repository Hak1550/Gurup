#!/bin/bash
. .env
echo "starting buidling the app for "$INFLUENCER_NAME
STAGING_DIR="/Users/jedi/Documents/gurucan-web-35-sample"
echo "staging dir is "$STAGING_DIR
mkdir /Users/jedi/Documents/gurucan-builds/$INFLUENCER_NAME
mkdir /Users/jedi/Documents/gurucan-builds/$INFLUENCER_NAME/$(date +%m-%d-%Y-%H-%M)

echo "directories created"

# DESTINATION_DIR=/Users/jedi/Documents/gurucan-builds/priorytet-12-04-2019-22-36
DESTINATION_DIR=/Users/jedi/Documents/gurucan-builds/$INFLUENCER_NAME/$(date +%m-%d-%Y-%H-%M)
echo "destination directory is "$DESTINATION_DIR
echo "copying assets..."
NATIVE_DIR=$DESTINATION_DIR"/src/native"




cp -R $STAGING_DIR/ $DESTINATION_DIR


echo "assets copied finished"



cat config.sample.json | envsubst > $NATIVE_DIR/app.json
echo "config created"
cp ./tmp/icon.png $NATIVE_DIR/assets/custom/icon.png
cp ./tmp/splash.png $NATIVE_DIR/assets/custom/splash.png

cd $NATIVE_DIR
echo "Cd'ed to"$NATIVE_DIR     
rm -rf ios
rm -rf android
echo "installing dependenccies"
npm i
echo "dependencies installed"
expo eject --non-interactive --eject-method expokit
echo "eject finished"
react-native link react-native-iap
react-native link react-native-onesignal
react-native link react-native-fast-image
react-native link @react-native-community/netinfo
echo "modules linked"
cd $NATIVE_DIR/ios
pod update
echo "pods updated"
pod install
echo "pods installed"


# TODO: set up fastlane, team and build
# fastlane run set_info_plist_value key:"test" value:"test2" path:priotytet/Supporting/Info.plist
#!/bin/bash
green=`tput setaf 2`
reset=`tput sgr0`
red=`tput setaf 1`
AWS_PARAMS=""
while (( "$#" )); do
  case "$1" in
    --release-channel)
      shift
      RELEASE_CHANNEL=$1
      ;;
    --dryrun)
      AWS_PARAMS="$AWS_PARAMS $1"
      shift
      ;;
    -*|--*=) # unsupported flags
      echo "Error: Unsupported flag $1" >&2
      exit 1
      ;;
    *)
      shift
      ;;
  esac
done

HOSTING_ADDRESS="https://gurucan-app-bundle.hb.bizmrg.com";
# HOSTING_ADDRESS="http://gurucan-app-bundle.cdn1.gurucan.ru"
S3_URL="https://hb.bizmrg.com";
TIMESTAMP=`date +%Y-%m-%d_%H-%M-%S`
TEST_AWS_CONFIG="aws s3 ls s3://gurucan-app-bundle --endpoint-url ${S3_URL}"

printf "${green}Test aws config: $TEST_AWS_CONFIG${reset}\n";
eval "$TEST_AWS_CONFIG"
TEST=$?
if [ $TEST -eq 0 ]; then
  printf "\n${green}AWS connection established!${reset}\n"
else
  printf "\n${red}AWS not configured properly: check docs https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html${reset}\n"
  exit 1;
fi

if [[ -z "$RELEASE_CHANNEL" ]]; then
    echo "${red}No release channel: set release channel with flag --release-channel${reset}";
    exit 1;
else
    printf "\n\n${green}Release channel: $RELEASE_CHANNEL${reset}\n";
    printf "\n${green}AWS params passed:$AWS_PARAMS ${reset}\n";

    EXPO_EXPORT="expo export --output-dir $RELEASE_CHANNEL --public-url $HOSTING_ADDRESS/$RELEASE_CHANNEL --target bare";
    printf "\n\n${green}Exporting build to local directory...\n$EXPO_EXPORT${reset}\n";
    eval $EXPO_EXPORT;

    S3_HOST_ARCHIVE="aws s3 cp $RELEASE_CHANNEL s3://gurucan-app-bundle-archive/$RELEASE_CHANNEL-$TIMESTAMP --recursive --endpoint-url ${S3_URL}${AWS_PARAMS}"
    printf "\n\n${green}Hosting build to archive...\n$S3_HOST_ARCHIVE${reset}\n";
    eval $S3_HOST_ARCHIVE;

    HOST_ASSETS="aws s3 cp $RELEASE_CHANNEL/assets s3://gurucan-app-bundle/$RELEASE_CHANNEL/assets --recursive --acl public-read --endpoint-url ${S3_URL}${AWS_PARAMS}"
    printf "\n\n${green}Hosting assets to production...\n$HOST_ASSETS${reset}\n";
    eval $HOST_ASSETS;

    S3_HOST_BUNDLES="aws s3 cp $RELEASE_CHANNEL/bundles s3://gurucan-app-bundle/$RELEASE_CHANNEL/bundles --recursive --acl public-read --endpoint-url ${S3_URL}${AWS_PARAMS}";
    printf "\n\n${green}Hosting bundles to production...\n$S3_HOST_BUNDLES${reset}\n";
    eval $S3_HOST_BUNDLES;

    S3_HOST_IOS_INDEX="aws s3 cp $RELEASE_CHANNEL/ios-index.json s3://gurucan-app-bundle/$RELEASE_CHANNEL/ios-index.json --acl public-read --endpoint-url ${S3_URL}${AWS_PARAMS}";
    printf "\n\n${green}Hosting ios index to production...\n$S3_HOST_IOS_INDEX${reset}\n";
    eval $S3_HOST_IOS_INDEX;

    S3_HOST_ANDROID_INDEX="aws s3 cp $RELEASE_CHANNEL/android-index.json s3://gurucan-app-bundle/$RELEASE_CHANNEL/android-index.json --acl public-read --endpoint-url ${S3_URL}${AWS_PARAMS}";
    printf "\n\n${green}Hosting android index to production...\n$S3_HOST_ANDROID_INDEX${reset}\n";
    eval $S3_HOST_ANDROID_INDEX;

    CLEAR_LOCAL_BUNDLES="rm -rf $RELEASE_CHANNEL";
    printf "\n\n${green}Clearing local release directory...\n$CLEAR_LOCAL_BUNDLES${reset}\n";
    eval "$CLEAR_LOCAL_BUNDLES"; 
fi
import React from "react";
import Styled from "./styles";
import {manifest} from 'expo-updates';
const { id, sdkVersion, revisionId, bundleUrl } = manifest;
// console.log("MANIFEST!", manifest)
const AppInfo = () => {
    let releaseChannel;
    if(bundleUrl){
        releaseChannel = bundleUrl.match(/^https?:\/\/.+?\/(.+?)\//m);
        if (releaseChannel.length > 0){
            releaseChannel = releaseChannel[1];
        }
    }
    return (
        <Styled.AppInfo>
            {id && (
                <Styled.Row>
                    <Styled.Label>ID:</Styled.Label>
                    <Styled.Value>{id}</Styled.Value>
                </Styled.Row>
            )}
            {sdkVersion && (
                <Styled.Row>
                    <Styled.Label>SDK Version:</Styled.Label>
                    <Styled.Value>{sdkVersion}</Styled.Value>
                </Styled.Row>
            )}
            {revisionId && (
                <Styled.Row>
                    <Styled.Label>Revision ID:</Styled.Label>
                    <Styled.Value>{revisionId}</Styled.Value>
                </Styled.Row>
            )}
            {releaseChannel && (
                <Styled.Row>
                    <Styled.Label>Release Channel:</Styled.Label>
                    <Styled.Value>{releaseChannel}</Styled.Value>
                </Styled.Row>
            )}
        </Styled.AppInfo>
    )   
}
// https:\/\/.+?\/(.+?)\/
export default AppInfo;
import styled from "styled-components/native";
import CacheImage from "../../../../components/CacheImage";
import InnerShadow from "../../../../assets/core/svg-icon/inner_shadow";

export const Wrapper = styled.View`
    margin-bottom: 16px;
`

export const ThumbnailWrapper = styled.View`

`

export const Thumbnail = styled(CacheImage)`
    width: 100%;
    aspectRatio: ${16/9};
`

export const Shadow = styled(InnerShadow)`
    position: absolute;
    bottom: 0;
`

export const Title = styled.Text`
	font-size: 20px;
    color: ${({theme}) => theme.$textColor};
    padding-left: 15px;
    line-height: 32px;
`

export const Description = styled.Text`
	font-size: 14px;
    color: ${({theme}) => theme.$textColor};
    padding-left: 15px;
`
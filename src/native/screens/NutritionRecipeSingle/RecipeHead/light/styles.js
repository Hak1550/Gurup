import Styled from "../styles";
import styled from "styled-components/native";

const Shadow = styled(Styled.Shadow).attrs((props) => ({
    ...props,
    offset: 1,
    stopOpacity: 0.3
}))`
`
const Title = styled(Styled.Title)`
    margin-bottom: 15px;
`

const ThumbnailWrapper = styled(Styled.ThumbnailWrapper)`
    margin-bottom: 10px;
`

export default {
    ...Styled,
    Shadow,
    ThumbnailWrapper,
    Title
};
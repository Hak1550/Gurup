import Styled from "../styles";
import styled from "styled-components/native";

const ThumbnailWrapper = styled(Styled.ThumbnailWrapper)`
    margin-bottom: 15px;
    min-height: 20px;
`
const Title = styled(Styled.Title)`
    position: absolute;
    bottom: 0;
`

export default {
    ...Styled,
    Title,
    ThumbnailWrapper
};
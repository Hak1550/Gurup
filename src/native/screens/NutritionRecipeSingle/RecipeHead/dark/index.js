import React from "react";
import Styled from "./styles";

const RecipeHead = ({ nutritionRecipe = {} } = {}) => {
    return (
        <Styled.Wrapper>
            <Styled.ThumbnailWrapper>
                {(nutritionRecipe.img && nutritionRecipe.img.length) ? (
                    <Styled.Thumbnail
                        source={nutritionRecipe.img}
                    // auto
                    />
                ) : null}
                <Styled.Shadow />
                <Styled.Title>
                    {nutritionRecipe.title}
                </Styled.Title>
            </Styled.ThumbnailWrapper>
            <Styled.Description>
                {nutritionRecipe.description}
            </Styled.Description>
        </Styled.Wrapper>
    )
}

export default RecipeHead
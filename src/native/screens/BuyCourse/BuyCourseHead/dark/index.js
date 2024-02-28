import React from "react";
import Styled from "./styles";

const BuyCourseHead = ({ course = {} } = {}) => {
    return (
        <Styled.Wrapper>
            <Styled.ThumbnailWrapper>
                {(course.img && course.img.length) ? (
                    <Styled.Thumbnail
                        source={course.img}
                    />
                ) : null}
                <Styled.Shadow />
                <Styled.Title>
                    {course.title}
                </Styled.Title>
            </Styled.ThumbnailWrapper>
            <Styled.Description>
                {course.fullDescription ? course.fullDescription : course.description}
            </Styled.Description>
        </Styled.Wrapper>
    )
}

export default BuyCourseHead
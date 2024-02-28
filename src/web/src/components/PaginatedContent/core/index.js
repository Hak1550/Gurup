import React, { Fragment } from "react"
import Logic from  "../logic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import {
    PaginatedContentWrap,
    PaginatedContentList,
    Pagination,
    NumbersPaginationWrap,
    NumbersPaginationPrev,
    NumbersPaginationItem,
    NumbersPaginationNext,
    NumbersPaginationItemDots
} from "../styles"
import {range} from "utils";


const NumbersPagination = ({current = 5, toPage, pages = 10}) => {
    let pagesRange;
    if(current === 1)
        pagesRange = pages > 3 ? range(1,3) : range(1,pages);
    else if (current === pages) {
        pagesRange = pages > 3 ? range(pages - 2,pages) : range(1,pages);
    } else {
        pagesRange = pages > 3 ? range(current-1, current + 1) : range(1,pages);
    }
    return (
        <NumbersPaginationWrap>
            {current !== 1 && (current - 1 !== 0)
                ? (
                    <NumbersPaginationPrev onClick = {() => toPage(current-1)}>
                        <FontAwesomeIcon icon={faLongArrowAltLeft}/>
                    </NumbersPaginationPrev>

                )
                : null
            }
            {(!range(1,2).includes(current)) && pages > 3
                ? (
                    <Fragment>
                        <NumbersPaginationItem onClick = {() => toPage(1)}>1</NumbersPaginationItem>
                        <NumbersPaginationItemDots>...</NumbersPaginationItemDots>
                    </Fragment>
                )
                : null
            }
            {pagesRange.map(number => {
                return number === current
                    ? (<NumbersPaginationItem active>{number}</NumbersPaginationItem>)
                    : (<NumbersPaginationItem onClick = {() => toPage(number)}>{number}</NumbersPaginationItem>)
            })}
            {(!range(pages-1,pages).includes(current)) && pages > 3
                ? (
                    <Fragment>
                        <NumbersPaginationItemDots>...</NumbersPaginationItemDots>
                        <NumbersPaginationItem onClick = {() => toPage(pages)}>{pages}</NumbersPaginationItem>
                    </Fragment>
                )
                : null
            }

            {current !== pages && ((current + 1) <= pages)
                ? (
                    <NumbersPaginationNext onClick = {() => toPage(current+1)}>
                        <FontAwesomeIcon icon={faLongArrowAltRight}/>
                    </NumbersPaginationNext>

                )
                : null
            }
        </NumbersPaginationWrap>
    );
};
const PaginatedContent = ({renderItem, loading, current, pages, toPage, renderPlaceholder, placeholderNumber, paginationType, items = []}) => {
    let placeholders = [];
    for (let i = 0; i < 10; i++){
        if(renderPlaceholder){
            placeholders.push(renderPlaceholder());
        }
    }

    return (
        <PaginatedContentWrap>
            <PaginatedContentList>
                {loading ? placeholders : items.map(renderItem)}
            </PaginatedContentList>
            {pages > 1 && (
                <Pagination>
                    {paginationType === "numbers" && (
                        <NumbersPagination pages = {pages} toPage = {toPage} current = {current}/>
                    )}
                </Pagination>
            )}
        </PaginatedContentWrap>
    );
};


export default Logic(PaginatedContent);

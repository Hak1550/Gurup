import styled, {css} from 'styled-components'
import {config} from "styles/variables"

export const PaginatedContentWrap = styled.div`

`;

export const PaginatedContentList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	grid-gap: 27px;
`;

export const Pagination = styled.div`
  padding-top: 25px;
  padding-bottom: 15px;  
`;

export const NumbersPaginationWrap = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0 -5px;
`;

export const NumbersPaginationItem = styled.li`
  margin: 0 5px;
  color: ${({ theme }) => theme.$textColor};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.$accent};
  }
  ${({active}) => active && css`
    color: ${({ theme }) => theme.$additionColor};
    background-color: ${({ theme }) => theme.$accent};
    :hover {
      color: ${({ theme }) => theme.$additionColor};
    }
  `}
`;

export const NumbersPaginationItemDots = styled(NumbersPaginationItem)`
    cursor: initial;
`;

export const NumbersPaginationPrev = styled(NumbersPaginationItem)`

`;

export const NumbersPaginationNext = styled(NumbersPaginationItem)`

`;

import styled from 'styled-components'

export const Image = styled.div`
	width: 100%;
    height: 31rem;
	background-image: url('${prop => prop.img}');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`
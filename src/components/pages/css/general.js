import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
`

export const Col = styled.div`
  flex: ${(props) => props.size};
`

export const Line = styled.hr`
  border-top: 1px solid gold;
  margin-bottom: 20px;
`

export const TextContainer = styled.div`
  background: #111519;
  margin-right: 10px;
  margin-top: 50px;
  margin-left: 50px;
`

export const Description = styled.p`
  font-size: 15px;
  font-family: 'Saira', sans-serif;
  letter-spacing: 1px;
  word-spacing: 3px;
  line-height: 22px;
`

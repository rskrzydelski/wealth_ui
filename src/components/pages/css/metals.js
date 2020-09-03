import styled from 'styled-components'

export const MetalItem = styled.div`
  margin: 10px;
  font-family: Courgette, cursive;
  border-radius: 10px;
  border: 1px solid gold;
  max-width: 20vw;
  &:hover {
      background: black;
  }
`

export const Space = styled.div`
  margin-top: 50px;
`

export const DelButton = styled.button`
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 10px;
  background: red;
`

export const ListTitle = styled.h1`
  margin: 10px;
  text-align: center;
  font-size: 1vw;
  font-family: Courgette, cursive;
`

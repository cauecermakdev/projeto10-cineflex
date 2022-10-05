import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    /*Aqui vai meu CSS*/

    * {
  box-sizing: border-box;
  --cor-fundo: #FB6B6B;
  --cor-fundo-card: #FFFFD4;
  --cor-nao-lembrei: #FF3030;
  --cor-quase-nao-lembrei: #FF922E;
  --cor-zap: #2FBE34;
  --preto: #333333;
}



body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color:var(--cor-fundo);
}



`;

export default GlobalStyle;
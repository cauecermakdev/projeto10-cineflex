
import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
import dataFilm from "../dataSelectedFilm";
import {Link} from "react-router-dom"

export default function Success() {
    return (
        <ContainerSucess>
            <GlobalStyle></GlobalStyle>
            <Titulo color="#247A6B">Pedido feito com sucesso!</Titulo>

            <div className="box">
                <Titulo2 color="#293845">Filme e sessão</Titulo2>
                <p>{dataFilm.filmName}</p>
                <p>{dataFilm.date}</p>
            </div>

            <div className="box">
                <Titulo2 color="#293845">Ingressos</Titulo2>
                {dataFilm.arraySeatsReserved.map((seat) => <p> Assento {seat}</p>)}
            </div>

            <div className="box">
                <Titulo2 color="#293845">Comprador</Titulo2>
                <p>Nome: {dataFilm.name}</p>
                <p>CPF: {dataFilm.cpf}</p>
            </div>

            <Link to="/" className="centerFlex">
                <button>Voltar pra Home</button>
            </Link>
        </ContainerSucess>


    );
};


const Titulo = styled.h1`
    padding: 50px;
    font-size:24px;
    font-weight:700;
    color:${props => props.color};
    margin:auto auto;
    letter-spacing: 0.04em;
    text-align:center;
`

const Titulo2 = styled(Titulo)`
    padding:20px 20px 10px 29px;
    margin:0px;
    text-align:left;
`

const ContainerSucess = styled.div`
    display:flex;
    flex-direction:column;
    
    p{
        color:#293845;
        font-weight:400;
        margin-left:29px;
        font-size:22px;
        line-height: 26px;

    }
    
    .box{
        margin-bottom:30px;
    }
    .box p{
        background-color:white;
    }

        
    button{
        padding:10px 20px;
        background-color:#E8833A;
        color:white;
        font-size:18px;
        border:0px;
        border-radius:4px;
        margin:70px auto 70px auto;
        width:225px;

    }
`


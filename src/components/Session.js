import { Link } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import React from "react";
import dataFilm from "../dataSelectedFilm";



export default function Session() {
    const { sessionID } = useParams();

    const [session, setSession] = useState();
    const [seatClickedArray, setSeatClickedArray] = useState([]);
    const [clikedOnInavaible, setClikedOnInavaible] = useState(false);
    const [CPF, setCPF] = useState("");
    const [name, setName] = useState("");
    /*     const [form, setForm] = React.useState({
            ids: seatClickedArray,
            name: '',
            cpf: ''
          });
     */

    function saveData(session) {
        console.log("aqui",session)
        dataFilm.arraySeatsReserved = seatClickedArray;
        dataFilm.name = name;
        dataFilm.cpf = CPF;
        /* dataFilm.posterURL = session.movie.posterURL; */
        console.log("aqui",session)
        
        console.log("array final", dataFilm);

    }



    function seatClicked(assento) {

        console.log("ASSENTO.name", assento.name);
        console.log("ASSENTO", assento);
        if (assento.isAvailable == true) {
            const arrayNovo = [...seatClickedArray, assento.name];
            setSeatClickedArray(arrayNovo);
            setClikedOnInavaible(false);

            console.log("assentos clicados");
            console.log(arrayNovo);
        }

        if (!assento.isAvailable) {
            setClikedOnInavaible(true);
            return;
        }

    }


    function seatColor(assento) {
        /* console.log(seatClickedArray.includes(assento.name)); */

        if (seatClickedArray.includes(assento.name)) {
            return "#1AAE9E";
        }

        if (assento.isAvailable) {
            return "#C3CFD9";
        } else {
            return "#FBE192"
        }

    }

    /*   function handleFormName (e) {
          const name = e.target.value;
          setForm({
            ...form,
            [e.target.name]: e.target.value,
          }) 
        }
  
      function handleFormCPF (e) {
          console.log(e.target.value);
          
          setForm({
            ...form,
            [e.target.cpf]: e.target.value,
          }) 
        } */

    function reservarAssentoSubmit(event) {
        /*         console.table(form);
                console.table(seatClickedArray);
         */

        console.log({
            ids: seatClickedArray,
            name: name,
            cpf: CPF
        });

        event.preventDefault(); // impede o redirecionamento


        const requisicao = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {
            ids: seatClickedArray,
            name: name,
            cpf: CPF
        });

        requisicao.then((res) => console.log(res));
        requisicao.catch((error) => console.log(error))

    }


    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);


        promise.then((res) => {
            console.log("Sessions")
            console.log(res.data);
            setSession(res.data);
        })

        promise.catch((error) => {
            console.log(error);
        })

    }, []);

    if (session === undefined) {
        return <img key={1} alt="loading" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
    }

    return (
        <>
            <GlobalStyle></GlobalStyle>
            <Titulo> Selecione o(s) assento(s) </Titulo>
            <Erro clikedOnInavaible={clikedOnInavaible} >{clikedOnInavaible ? <p> Assento indisponível. Clique em um assento disponível.</p> : ""}</Erro>
            <Seats>
                {session.seats.map((assento, i) =>
                    <Round key={i} seat={assento} seatClickedArray={seatClickedArray} color={seatColor(assento)} onClick={() => seatClicked(assento)}>
                        {assento.name}
                    </Round>
                )}
            </Seats>
            <CaptionSeats>
                <div>
                    <RoundCaption className="round" background="#1AAE9E" borderColor="#0E7D71"></RoundCaption>
                    <p>Selecionado</p>
                </div>
                <div>
                    <RoundCaption className="round" background="#C3CFD9" borderColor="#7B8B99"></RoundCaption>
                    <p>Disponível</p>
                </div>
                <div>
                    <RoundCaption className="round" background="#FBE192" borderColor="#F7C52B"></RoundCaption>
                    <p>indisponível</p>
                </div>
            </CaptionSeats>

            <Form onSubmit={(e) => reservarAssentoSubmit(e)}>
                <InputsContainer>

                    <label htmlFor="name">Nome do comprador:
                        <input name="name" type="text" placeholder="Digite seu nome..." onChange={e => setName(e.target.value)} value={name}></input>
                    </label>
                    <label htmlFor="cpf">CPF do comprador:
                        <input name="cpf" type="text" placeholder="Digite seu CPF..." onChange={e => setCPF(e.target.value)} value={CPF}></input>
                    </label>
                </InputsContainer>


                <Link to="/sucesso" className="centerFlex" onClick={(session)=>saveData(session)}>
                    <Button type="submit">Reservar assento(s)</Button>
                </Link>

            </Form>

            <footer>
                <div>
                    <img src={session.movie.posterURL}></img>
                </div>
                <div>
                    <p>{session.movie.title}</p>
                    <p>{session.day.weekday} - {session.name}</p>
                </div>
            </footer>
        </>
    );
};

const Form = styled.form`
    display:flex;
    justify-content:center;
    flex-direction:column;
`

const Button = styled.button`
    margin:50px auto 30px auto;
    background-color:#E8833A;
    width:225px;
    height:42px;
    border-radius:3px;
    color: white;
    font-size:18px;
    border:0px;
    
`

const InputsContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    font-size:18px;
    padding:0px 24px;
    
    label{
        margin-top:7px;
    }

    input{
        margin:10px 0px;
        font-size:18px;
        height:51px;
        width:100%;
        background-color:#FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        padding-left:16px;
    }
`

/* const Footer = styled.div`
    height:117px;
    width:100%;
    background-color:#9EADBA;
    display:flex;
    align-items:center;
    
    img{
        width:48px;
        height:72px;
        padding:8px;
        background-color:white;
        border-radius:2px;
        margin-left:10px;
    }

    p{
        color:#293845;
        font-size:26px;
        margin-left:14px;
        font-weight:300;
    }
` */

const Erro = styled.div`
    margin: 0px auto 10px auto; 
    background-color:#FF5722;
    color:white;
    padding:5px 10px;
    border-radius:3px;
    display:${props => !props.clikedOnInavaible ? "none" : ""}
`

const RoundCaption = styled.div`
    
        background-color:${props => props.background};
        border: 1px solid ${props => props.borderColor};
        width:26px;
        height:26px;
        border-radius:30px;
        margin:10px;
    
`

const CaptionSeats = styled.h1`
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:40px;
    
    div{
        margin:10px 20px;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
    }

`

const Titulo = styled.h1`
    padding: 50px;
    font-size:24px;
    font-weight:400;
    color:#293845;
    margin:auto auto;
    text-align:center;
`

const Round = styled.div`
    width:26px;
    height:26px;
    /* background-color:${props => props.seatClickedArray.includes(props.seat.id) && props.seat.isAvailable ? "#1AAE9E" : props.color}; */
    background-color:${props => props.color};
    border-radius:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:7px;
    font-size:11px;
`
const Seats = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    padding:0px 24px;
    justify-content:center;
    
`
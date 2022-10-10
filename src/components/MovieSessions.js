import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios"
import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { Link } from 'react-router-dom'
import dataFilm from "../dataSelectedFilm";

export default function MovieSessions() {
    const [movieSessions, setMovieSessions] = useState();
    const { movieId } = useParams();
    

    function saveData(date, time) {
        dataFilm.time = time;
        dataFilm.date = date;
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`)

        promise.then((res) => {
/*             console.log("MovieSessions")
            console.log(res.data); */
            setMovieSessions(res.data);
        }
        )
    }, [movieId]);

    if (movieSessions === undefined) {
        return <img key={1} alt="loading" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
    }


    return (
        <ContainerMovieSessions>
            <GlobalStyle></GlobalStyle>
            <Titulo> Selecione o horário </Titulo>
            {movieSessions.days.map((session, i) =>
                <div key={i}>
                    <p>{session.weekday} - {session.date}</p>
                    {session.showtimes.map((time,i) =>
                        <Link key = {i} to={`/sessao/${time.id}`} onClick={() => saveData(session.date, time.name)}>
                            <button>{time.name}</button>
                        </Link>
                    )}
                </div>
            )}

           <footer>
                <div>
                    <img alt = "imgFooter" src={movieSessions.posterURL}></img>
                </div>
                <div>
                    <p>{movieSessions.title}</p>
                </div>
            </footer> 
        </ContainerMovieSessions>

    );

};


const Titulo = styled.h1`
    padding: 50px;
    font-size:24px;
    font-weight:400;
    color:#293845;
    margin:auto auto;
    
`

const ContainerMovieSessions = styled.div`
    margin-left:24px;
    display:flex;
    flex-direction:column;
    align-items:start;

    p{
        font-size:20px;
        font-weight:300;
    }
    
    button{
        padding:10px 20px;
        background-color:#E8833A;
        color:white;
        font-size:18px;
        border:0px;
        border-radius:4px;
        margin:20px 8px 20px 0px;
    }
`
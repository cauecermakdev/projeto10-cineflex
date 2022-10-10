import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import dataFilm from "../dataSelectedFilm";

/*

export default function Lista() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        const requisicao = axios.get("http://...");

        requisicao.then(resposta => {
            setItems(resposta.data.items);
        });
    }, []);

    if(items === null) {
        return <img src="loading.gif" />;
    }

    return (
        <ul>
            {items.map(item => <li>{item}</li>)}
        </ul>
    );
}
 */


export default function AllMovies(params) {

    const [movies, setMovies] = useState([]);

    function saveData(film){
   
        dataFilm.filmName = film.title;
        console.log(dataFilm);

    }

    useEffect(() => {
        const requisicao = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        requisicao.then(resposta => {
            console.log(resposta.data);
            setMovies(resposta.data);
        });
    }, []);


    if (movies.length === 0) {
        return <img key={1} alt="loading" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
    }


    return (
        <>
            <GlobalStyle />

            <Titulo> Selecione o filme </Titulo>

            <ContainerAllmovies>
                {movies.map((item, i) =>
                    <Link to={`/filme/${item.id}`} key={item.id} onClick={()=>saveData(item)}>
                        <ContainerCardsMovies>
                            <li>
                                <img src={item.posterURL} key={item.id} alt='img filme'>
                                </img>
                            </li>
                        </ContainerCardsMovies>
                    </Link>
                )}
            </ContainerAllmovies>
        </>

    );
};


const Titulo = styled.h1`
    margin: 50px;
    font-size:24px;
    font-weight:400;
    color:#293845;
    text-align:center;
`

const ContainerCardsMovies = styled.div`
    width:129px;
    /* height:193px; */
    border-radius:9px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    display:flex;
    align-items:center;
    justify-content:center;
    margin:11px 30px;
    
    img{
        object-fit: cover;
        padding:8px;
        width:100%;
    }
`

const ContainerAllmovies = styled.ul`
    width:100%;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
`
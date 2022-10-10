import React from "react";

import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Session from "./components/Session";
import MovieSessions from "./components/MovieSessions";
import AllMovies from "./components/AllMovies";
import Success from "./components/Success";


export default function App() {
    

    return (
        <BrowserRouter>
            <Menu />
            <ContainerPage>
                <Routes>
                    <Route path="/" element={<AllMovies />} />
                    <Route path="/filme/:movieId" element={<MovieSessions />} />
                    <Route path="/sessao/:sessionID" element={<Session />} />
                    <Route path="/sucesso" element={< Success />}/>
                </Routes>
            </ContainerPage>
        </BrowserRouter>

    );

}

const ContainerPage = styled.div`
    display:flex;
    flex-direction:column;
    
`
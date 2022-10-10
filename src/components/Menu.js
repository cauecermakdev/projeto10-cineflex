import styled from "styled-components";

export default function Menu(params) {
    return(
        <NavBar>
            CINEFLIX
        </NavBar>
    );
};


const NavBar = styled.div`
    width:100%;
    height:67px;
    background-color: #C3CFD9;
    color:#E8833A;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:34px;
`
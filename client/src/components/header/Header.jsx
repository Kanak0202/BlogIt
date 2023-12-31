import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
    background: white;
    color: #000;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a{
        padding:20px;
        color: inherit;
        text-decoration:none;
    }
`;

const Header = ()=>{
    return (
        <div>
            <Component>
                <Container>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login">Logout</Link>
                </Container>
            </Component>
        </div>
    )
}

export default Header;
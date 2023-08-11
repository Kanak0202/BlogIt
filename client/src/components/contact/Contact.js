import {Box,Typography,styled, Button} from "@mui/material";


const Container = styled(Box)`
    margin:100px 100px;
    text-align:center;
`;


const Heading = styled(Typography)`
    font-size:100px;
    color:black;
`;



const ButtonLearn = styled(Button)`
  color:black;
  background:#C4C5CB;
  margin:50px 20px;
`; 

const ContactUs = ()=>{
    

    return(
        <Container>
        <Heading>Share with us</Heading>
            <div className="contactForm">
                <input type="text" className="userInput" placeholder="Name" name="name" ></input>
                <input type="email" className="userInput" placeholder="Email" name="email"></input>
                <input type="text" className="userInput" placeholder="Country" name="country" ></input>
                <input type="text" className="userInput" placeholder="City" name="city"></input>
                <textarea  className="userQuery" rows={5} placeholder="Your query" name="query"></textarea>
                <br />
                <ButtonLearn variant="contained">Contact Us</ButtonLearn>
            </div>
        </Container>

    );
}

export default ContactUs;
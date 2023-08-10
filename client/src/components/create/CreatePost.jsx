import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect, useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";

import { API } from "../../service/api";

const Container = styled(Box)(({theme})=>({
    margin:'50px 100px',
    [theme.breakpoints.down('md')]:{
      margin:0
    }
  }));

const Image = styled('img')({
    width:"100%",
    height:"50vh",
    objectFit:"cover"
});

const StyledFormControl = styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
`;

const StyledInputBase = styled(InputBase)`
    flex: 1;
    margin:0 30px;
    font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border: none;
    &:focus-visible{
        outline: none;
    }
`;

const initialPost = {
    title:'',
    description:'',
    picture:'',
    username:'',
    category:'',
    createdDate: new Date()
}

//pseudo class

const CreatePost = ()=>{
    const [post, setPost] = useState(initialPost);
    
    const [file, setFile] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const url= post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    const {account} = useContext(DataContext);
    // console.log({account});
    // console.log(location);

    useEffect(()=>{
        const getImage = async ()=>{
            if(file){
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                //API call for uploading image
                const response = await API.uploadFile(data);//Saves photo
                post.picture = response.data;
            }
        }
        getImage();
       post.category = location.search?.split('=')[1] || 'All';
    //    console.log(post.category);
       post.username = account.username;
    },[file])

    const handleChange = (e)=>{
        setPost({...post, [e.target.name]:e.target.value});
    }

    const savePost = async()=>{
       const response = await API.createPost(post);
       if(response.isSuccess){
        navigate('/');
       }
    }

    return (
        <Container>
            <Image src={url} alt="banner" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <AddCircleIcon fontSize="large" color="action"/>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                <StyledInputBase placeholder="Title" onChange={(e)=>handleChange(e)} name="title"/>
                <Button variant="contained" onClick={()=>savePost()}>Publish</Button>
            </StyledFormControl>
            <TextArea minRows={5} placeholder="Tell your story" onChange={(e)=>handleChange(e)} name="description"/>
        </Container>
        
    );
}

export default CreatePost;
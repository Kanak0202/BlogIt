import { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";
import {API} from "../../../service/api.js";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

//components
import Post from "./Post.jsx";


const Posts = ()=>{

    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async()=>{
            let response = await API.getAllPosts({category: category || '' });
            if(response.isSuccess){
                setPosts(response.data);
            }
        }
        fetchData();
    },[category])

    const viewPost = (id)=>{
        navigate(`/details/${id}`);
    }

    return (
        <>
            {
                posts && posts.length>0 ? posts.map(post=>{
                    return(
                        <Grid key={post._id} item lg={3} sm={4} xs={12} onClick={()=>viewPost(post._id)}>
                            {/* <Link to={`/details/${post._id}`} style={{textDecoration:"none", color:"inherit"}}> */}
                                <Post post={post}/>
                            {/* </Link> */}
                        </Grid>
                         );
            } )
            :
            <Box style={{color:"#878787", margin:'30px 80px', fontSize:'18'}}>
                Whoops...No blogs to display
            </Box>
            }
        </>
    );
}

export default Posts;
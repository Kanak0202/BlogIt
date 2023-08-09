import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { API } from "../../service/api.js";

const DetailView = () => {
  const [post, setPost] = useState({});
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        console.log(id);
      let response = await API.getPostById(id); // Use the 'id' variable here
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]); // Include 'id' in the dependency array

  return (
    <Box>
      <img src={url} alt="blog" />
    </Box>
  );
};

export default DetailView;

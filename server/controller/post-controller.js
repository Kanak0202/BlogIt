
import Post from "../model/post.js";

export const createPost = async(request, response)=>{
    try{
        const post = await new Post(request.body);
        post.save();

        return response.status(200).json('post saved successfully');
    }catch(error){
        return response.status(500).json(error);
    }
}

export const getAllPosts = async(request, response)=>{
    let category = request.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({category: category});
        }else{
            posts = await Post.find({});
        }
        

        return response.status(200).json(posts);
    }catch(error){
        return response.status(500).json({msg: error.message});
    }
}

export const getPost = async(request, response)=>{
    try{
        // console.log(request.params.id);
        const post = await Post.findById(request.params.id);
        // console.log(post);
        return response.status(200).json(post);
    }catch(error){
        return response.status(500).json({msg: error.message});
    }
}

export const updatePost = async(request, response)=>{
    try{
        const post = await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg:"Post not found"})
        }
        await Post.findByIdAndUpdate(request.params.id, {$set: request.body}); //$set-->To replace, #addToSet-->To append
        return response.status(200).json({msg:"Post update successfully"});
    }catch(error){
        return response.status(500).json({error:error.message});
    }
}

export const deletePost = async(request, response)=>{
    try{
        const post = await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg: 'post not found'});
        }
        await post.deleteOne();
        return response.status(200).json({msg:"Delete successful"});
    }catch(error){
        return response.status(500).json({error: error.message});
    }
}
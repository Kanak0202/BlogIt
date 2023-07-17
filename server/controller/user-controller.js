import User from "../model/user.js";


export const signupUser = async (request, response)=>{
    try{
        const user = request.body;
        // console.log(typeof(user));
        const newUser = new User(user);
        // console.log(newUser);
        await newUser.save();
        console.log(newUser);
        return response.status(200).json({msg:"Signup successful"});
    }catch(error){
        return response.status(500).json({msg:"Error while signing up the user"});
    }
}
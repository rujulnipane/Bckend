import {User} from '../models/user.js';
import bcrypt from 'bcrypt';
import {sendCookie} from '../utils/features.js';

 export const login = async (req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({
            success: false,
            message: "Invalid email or Password", 
        });
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(404).json({
            success: false,
            message: "Invalid Password", 
        });
    }
    sendCookie(user,res,`Welcome ${user.name}`,200);
 }

export const logout = (req,res) => {
    res.status(200).cookie("token","",{ expires: new Date(Date.now())}).json({
        success:true,
        sameSite: process.env.NODE_ENV === "Development"? "lax": "none",
        secure:process.env.NODE_ENV === "Development"?false:true ,
    })
}

export const register =  async (req,res)=>{
    const { name, email, password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(404).json({
            success: false,
            message: "User already exists", 
        });
    }

    const hashedpass = await bcrypt.hash(password,10);
    user = await User.create({
        name,
        email,
        password: hashedpass,
    })
    sendCookie(user,res,"Registered successfully");   
}

export const getProfile = (req,res)=>{
    return res.status(200).json({
        success: true,
        user:req.user, 
    });
}
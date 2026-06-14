//import user model
import User from "../models/user.js";
import jwt from "jsonwebtoken";
//import bcrypt
import bcrypt from "bcryptjs";
//register controller
export const register = async (req, res) => {
    try {
        //get data from frontend
        const { name,email,password,role } = req.body;
        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"user already exists"});

        }
        //encrypt password
        const hashedpassword = await bcrypt.hash(password,10);
        //save new user to db
        const newUser = await User.create({
            name,
            email,
            password:hashedpassword,
            role,
        });
        //send success response
        res.status(201).json({message:"user registered successfully",user:{id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
        }
});
    }
    catch (error) {
        res.status(500).json({message:error.message});
}
};

//login user
 export const Login = async (req, res) => {
    try {
        const { email,password } = req.body;
        //find user
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not found"});

        }
        //compare password
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({message:"invalid credentials"});

        }
        //generate jwt
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
        //RESPONSE
        res.status(200).json({message:"login successful",token,user: { 
            id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role
    }
});

}
catch (error) {
    res.status(500).json({message:error.message});

}
};
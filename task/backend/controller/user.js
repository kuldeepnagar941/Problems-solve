const User = require('../models/user');
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
const secret="abcdefgh";

exports.userSignUp = async(req,res)=>{
    console.log(`>>>>>>>req.body>>>>>>>`,req.body);
    const {email, password,name,dateOfBirth} = req.body
    
    const salt = bcrypt.genSaltSync(10);
    console.log(`>>>>>>>salt,salt>>>>>>>`,salt);
 
    const hash = bcrypt.hashSync(password, salt); 
  
    console.log(`>>>>>hash>>>>>>>>.`,hash);
      
    if(!(email && password && name && dateOfBirth)){
        return res.status(400).json({message:"all Feild are requird"})
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User already exists"})
    }
    const data = {email,name,dateOfBirth,password:hash}
    const user = new User(data)
    await user.save();
    res.status(201).json(user)
}


exports.userLogin = async(req,res)=>{
    const {email, password} = req.body  
console.log(`>>req.body>>>>>login>>>>`,req.body);

    if(!(email && password)){
        return res.status(400).json({message:"all Feild are requird"})
    }

    const existingUser = await User.findOne({email})
    console.log(`>>>>>>>>>>>existingUser>>>>>>>>>`,existingUser);

    if(!(existingUser)){
        return res.status(400).json({message:"User not found"})
    }

    console.log(`>>>>>>>>>>>>.existingUser.password`,existingUser);
    console.log(`>>>>>>password>>>>>..`,password);
    
    
    const match = await bcrypt.compare(password, existingUser.password);
    console.log(`>>>>>>>>>match>>>>>>>>`,match);
    
        if(!match){
        return res.status(400).json({message:"Invalid password"})
    }
    const token = jwt.sign({id:existingUser._id},secret
        , { expiresIn: '1d' }
    );
    // console.log(`>>>>>>token>>>>>>>>>>>`,token);
    
    res.json({token,existingUser})
}


exports.getAllUser = async(req,res)=>{
    const user = await User.find();
    res.status(201).json(user)
}



exports.deleteUser = async(req,res)=>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    res.status(201).json(user)
}

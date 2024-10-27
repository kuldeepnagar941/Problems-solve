const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = "kuldeepsdfoiujhfc"


exports.createUser = async(req,res)=>{
    const data = req.body
    console.log(req.body)
    const{email} =req.body
    const existinguser = await User.findOne({email})
    if(existingTeacher){
        return res.status(400).json({Message:" user is already exist"})
    }
    const user = new User(data)
    await user.save()
    res.status(201).json(data)

}


exports.getAllUser = async(req,res)=>{
    const user = await User.find();
    res.status(201).send(user)
}

exports.getOneUser = async(req,res)=>{
    const id = req.params.id
    const User = await User.findById(id)
    
    if(!(user)){
        res.status(400).json({massege:"user not exist"})
    }
    res.status(201).json(user)
}

exports.updateUser = async(req,res)=>{
    const id = req.params.id
    const data = req.body
    const user = await User.findByIdAndUpdate(id,data)
    res.status(201).json(user)
}

exports.deleteUser = async(req,res)=>{
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    res.status(201).json(user)
}







// sign UP user 
exports.userSignup = async (req, res) => {
    const data = req.body
    console.log(data)
    const { name, email, password, phone, role } = req.body;

    if (!name) {return res.status(400).json({ error: "Name is required!" })}
    if (!email) {return res.status(400).json({ error: "email is required!" });}
    if (!password) {return res.status(400).json({ error: "password is required!" });}
    if (!phone) {return res.status(400).json({ error: "phone is required!" });}
    if (!role) {return res.status(400).json({ error: "role is required!" });}

    const existinguser = await User.findOne({ email });
    if (existinguser) {
        console.log("user already exist, please login !!");
       return res.status(400).json({
            message: "user already exist, please login !!"
        })
    }

    
    const salt = bcrypt.genSaltSync(10); 
    const hash = bcrypt.hashSync(password, salt); 

    console.log(data)
    const result = { name, email, password : hash, phone, role }
    const newUser = new User(result);
    await newUser.save();
    res.status(201).json({
        success: true,
        message: "user created successfully !",
        newUser
    })

}


// Log in user 
exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('>>>>>>>bdy>>>',req.body)

    if (!email) {return res.status(400).json({ error: "email is required!" });}
    if (!password) {return res.status(400).json({ error: "password is required!" });}

    const existinguser = await User.findOne({ email });
    console.log(">>>existinguser>>>>>e",existinguser)
    if (!existinguser) {
        return res.status(400).json({
            message: "user not registered, please signUp !!"
        })
    }
    
    const match = await bcrypt.compare(password, existinguser.password)
    console.log(">>match>>>.",match)
    if (!match) {
        return res.status(400).json({ message: "invalid password !" })
    }

    const token = jwt.sign({ id: existinguser._id }, secret, { expiresIn: "7d" });
    console.log('token>>>', token);

    return res.status(200).json({ message: "Login successful!", User: existinguser ,token});
}
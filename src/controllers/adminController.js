const Admin = require("../model/adminModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "suraj_r@@@@#$890"

// Register Admin
const register = async (req, res) => {

    const {admin_first_name,admin_last_name,email,password,experiment_name,description,difficulty_level,main_image,materials_list,safety_precautions,instructions} = req.body
    try{
        const exitstingAdmin = await Admin.findOne({email:email});
        if(exitstingAdmin){
            return res.status(400).json({message: "Admin already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await Admin.create({
            admin_first_name: admin_first_name,
            admin_last_name: admin_last_name,
            email: email,
            password: hashPassword,
            experiment_name : experiment_name,
            description : description,
            difficulty_level : difficulty_level,
            main_image : main_image,
            materials_list : materials_list,
            safety_precautions : safety_precautions,
            instructions : instructions

        })

        const token = jwt.sign({email: result.email,id : result._id}, SECRET_KEY);
        res.status(201).json({admin: result, token});
       
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Something went to wrong"});
    }
};

// Login Admin
const login = async (req, res) => {

    const {email, password} = req.body;
    try {

        const exitstingAdmin = await Admin.findOne({email:email});
        if(!exitstingAdmin){
            return res.status(404).json({message: "Admin not found"});
        }

        const matchPassword = await bcrypt.compare(password, exitstingAdmin.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went to wrong"});
    }
};


// Get All admins
const allAdmins = async (req, res) => {
    try {
        const Admins = await Admin.find();
        res.json(Admins);
      } catch (error) {
        res.json({ message: error });
      } 
};


module.exports = {
    register,
    login,
    allAdmins
  }
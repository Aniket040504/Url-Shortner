//for login sign
const User=require("../models/user");

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("/");
}

async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user) 
        return res.render('login', { 
    error: "Invalid UserName or password"
});
    return res.redirect("/");
    
}
module.exports={
    handleUserSignup,
    handleUserLogin,
}
// import asyncHandler from 'express-async-handler'
// import bcrypt from "bcryptjs"
// import jwt from 'jsonwebtoken'
// import User from '../models/userModel.js'

// const generateToken=(id)=> {
//     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
// }


// export const registerUser = asyncHandler(async(req, res) => {
//     const {general, account, history} = req.body;

//     const userExists= await User.findOne({'general.email': general.email})


//     if(userExists){
//         res.status(400);
//         throw new Error('User already exist')
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(general.password, salt);

//     const user = await User.create({
//         general:{...general, password:hashedPassword},
//         account,
//         history,
//     });

//     if(user){
//         res.status(201).json({
//             _id:user._id,
//             email:user.general.email,
//             token: generateToken(user._id),

//         });
//     }else{
//         res.status(400);
//         throw new Error("Invalid user data");
//     }
// })

// export const loginUser= asyncHandler(async(req, res) => {
//     const {email, password} = req.body;

//     const user = await User.findOne({ 'general.email': email});

//     if(user && (await bcrypt.compare(password, user.general.password))){
//         res.json({
//             _id: user._id,
//             email: user.general.email,
//             token: generateToken(user._id)
//         });
//     }else {
//         res.status(400);
//         throw new Error('invalid email or password')
//     }
// });

// export const getUserProfile = asyncHandler(async(req, res) => {
//     const user = await User.findById(req.user._id);
//     if(user){
//         res.json(user);
//     }else{
//         res.status(404)
//         throw new Error('User not found')
//     }
// })


// export const updateUserProfile = asyncHandler(async(req, res) => {
//     const user = await User.findById(req.user.id);

//     if(user){
//         user.general = {...req.body.general} || user.general;
//         user.account = {...req.body.account} || user.account;
//         user.history = req.body.history || user.history;

//         const updatedUser = await user.save()
//         res.json(updatedUser)
//     }else{
//         res.status(404)
//         throw new Error('user not found');
//     }
// });


// export const becomeMinister = asyncHandler(async(req, res) => {
//     const user = await User.findById(req.user._id);

//     if(user){
//         user.isMinister = true;
//         user.ministerDetails={
//             ...req.body.ministerDetails,
//         }
//         const updatedUser= await user.save();
//         res.json(updatedUser);
//     }else{
//         res.status(404)
//         throw new Error("user not found")
//     }
// })
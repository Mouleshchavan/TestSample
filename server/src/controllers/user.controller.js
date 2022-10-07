const express = require("express");
const User = require("../module/user.module");
const router = express.Router();

router.get("/get", async (req, res) => {
 const limit = req.query.limit || 10;
 const page = req.query.page || 1;
 const skip=(page-1)*limit
 try {
  const users = await User.find().limit(limit).skip(skip);
  return res.status(200).send(users);
 } catch (error) {
  return res.status(500).send(error)
 }
})


router.post("/create", async(req,res) => {
 try {
  const user = await User.create(req.body);
  return res.status(200).send(user);
 } catch (error) {
  return res.status(500).send(error)
 }
})


// edit user
router.patch("/edit/:id", async (req, res) => {
 try {
  const isUser = await User.findById(req.params.id);
  if (!isUser)
   return res.status(400).send({ error: "user not found, please provide currect userId" })
  
  const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
  return res.status(200).send(user);
 } catch (error) {
  return res.status(500).send(error)
 }
})

// delete user
router.delete("/delete/:id", async (req, res) => {
 try {
  const isUser = await User.findById(req.params.id);
  if (!isUser)
   return res.status(400).send({ error: "user not found, please provide currect userId" })
  
  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(200).send(user);
 } catch (error) {
  return res.status(500).send(error)
 }
})

// get single user by id
router.get("/single/:id", async(req, res) => {
 try {
  const user = await User.findById(req.params.id);
  if (!user)
   return res.status(401).send({ error: "user not found please provide valid user id" })
  return res.status(200).send(user)
 } catch (error) {
  return res.status(500).send(error)
 }
})

module.exports = router;
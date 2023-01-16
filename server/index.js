const express=require("express");

const mongoose=require("mongoose")
const app = express();
const cors =require("cors")

//using middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


// creating and connecting data base 
mongoose.connect(
  "mongodb://localhost:27017/resgister",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);
const userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = new mongoose.model("User", userschema);




//define route 


app.post("/signup",(req,res)=>{
    const { name, email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        res.send({ message: "User already registerd" });
      } else {
        const user = new User({
          name,
          email,
          password
        });
        user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully Registered, Please login now." });
          }
        })
      }
    })
    
   
})
app.post("/login",(req,res)=>{
   const { email, password } = req.body;
   User.findOne({ email: email }, (err, user) => {
     if (user) {
       if (password === user.password) {
         res.send({ message: "Login Successfull", user: user });
       } else {
         res.send({ message: "Password didn't match" });
       }
     } else {
       res.send({ message: "User not registered" });
     }
   });
})



app.listen(1213,()=>{
    console.log("server running at 1213")
});
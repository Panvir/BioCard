const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv=require('dotenv');
dotenv.config();
const userRouter=require("./routes/userRoute");

//tnke front end ch jo 5173 port a oh 500 to data post kr ske
const cors=require('cors');
app.use(cors());

//inbuilt middleware for json data
app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000,(err)=>{
        if(err) console.log(err);
        console.log("running successfully at",process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

  //router lyi
app.use(userRouter);



app.get("/", (req, res) => {
  res.send("api running");
});

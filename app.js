const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Listing = require("./models/listing")
const mongo_url = "mongodb://localhost:27017/airbnb";
async function main() {
        await mongoose.connect(mongo_url);
}
main().then(() => {
    console.log("connected to DB")
})
    .catch((err) => {
        console.log(err)
    })
app.get("/", (req, res) => {
    res.status(200).send("hello airbnb");
});

// app.get("/listing", async (req,res)=>{
//     const newListing = new Listing({
//         title:"fort",
//         description:"good fort",
//         price :1200,
//         location:"Thane",
//         country : "India"

//     })
//  await  newListing.save();
//  console.log("sample  was saved")
// }) 

app.listen(port, (err,data) => {  
        console.log(`Server is listening on ${port}`);
});



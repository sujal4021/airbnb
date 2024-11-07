const express = require("express");
const app = express();
const ejs = require("ejs")
const path = require("path")
const mongoose = require("mongoose");
const port = 3000;
const methodOverRide = require("method-override") 
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

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverRide("_method"));
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




// index route 
app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({})
    res.render("listings/index", { allListing })
})


// new route 

app.get("/listings/new",(req,res)=>{
res.render("listings/new")
})




// show route 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    res.render("listings/show", { listing })
})




app.post("/listings" , async(req,res)=>{
    const newListings =  new Listing (req.body.listing);
    await  newListings.save();
    res.redirect("/listings")
})

// edit route 
app.get("/listings/:id/edit", async (req,res)=>{
    let { id } = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit" ,{listing})
})



// update route 

app.put("/listings/:id", async(req,res)=>{
    let { id } = req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})



app.delete("/listings/:id", async(req,res)=>{
    let { id } = req.params
   let deletedList = await Listing.findByIdAndDelete(id)
   console.log(deletedList)
    res.redirect("/listings")
})


app.listen(port, (err, data) => {
    console.log(`Server is listenings on ${port}`);
});


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://localhost:27017/airbnb";

async function main() {
    await mongoose.connect(mongo_url);
}

const InitDB = async () => {        
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("data was initialized");
    }

main()
    .then(() => {
        console.log("connected to DB");
        return InitDB();
    })
    
    .catch((err) => {
        console.log("Failed to connect to DB:", err);
    });
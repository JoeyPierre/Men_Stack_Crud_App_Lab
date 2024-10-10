
const plantSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    image: String,
})
const Plant = mongoose.model("Plant", plantSchema)
module.exports = Plant

const dotenv = require("dotenv");
dotenv.config(); 
  

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

const Plants = require("./models/plant.js");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/plants/new", (req, res) => {
  res.render("plants/new.ejs");
});

app.post("/plants", (req, res) => {
   Plants.create(req.body);
  res.redirect("/plants");
});

app.get("/plants", async (req, res) => {
  const allPlants = await Plant.find();
  res.render("plantss/index.ejs", { fruits: allPlants });
});

app.get("/plantss/:plantId", async (req, res) => {
  const foundPlant = await Fruit.findById(req.params.plantId);
  
  res.render("Plants/show.ejs", { plant: foundPlant });
});

app.delete("/plants/:plantId", async (req, res) => {
  await Plant.findByIdAndDelete(req.params.plantId);
  res.redirect("/plants");
});

app.get("/plants/:plantId/edit", async (req, res) => {
  const foundPlant = await Fruit.findById(req.params.plantId);
  res.render("plants/edit.ejs", {
    Plant: foundPlant,
  });
});

app.put("/Plants/:plantId", async (req, res) => {
  

  await plant.findByIdAndUpdate(req.params.PlantId, req.body);

  res.redirect(`/plants/${req.params.fruitId}`);
}); 

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
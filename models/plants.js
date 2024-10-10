const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    image: String,
});

const Plant = mongoose.model("plants", plantSchema);

module.exports = Plant;


const mongoose = require ("mongoose")
const express = require ("express")
const plantSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    image: String,
})
const Plant = mongoose.model("Plant", plantSchema)
module.exports = Plant
app.listen(3000 )
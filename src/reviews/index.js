// + CRUD for Reviews ( /reviews GET, POST, DELETE, PUT)
const express = require("express")

const fs = require("fs")
const path = require("path")
const router = express.Router()
const uniqid = require("uniqid")

const reviewPath = path.join(__dirname, "reviews.json")//krijon rrugen per tek students.json


router.get("/", (req, res) => {

    const fileContentAsBuffer = fs.readFileSync(reviewPath)//lexon te dhenen e students.json
    const fileContent = JSON.parse(fileContentAsBuffer.toString())
    res.send(fileContent)
})


router.get("/:id", (req, res) => {
    const fileContentAsBuffer = fs.readFileSync(reviewPath)
    const reviewArray = JSON.parse(fileContentAsBuffer.toString())

    const singleReview = reviewArray.filter((review) => review.id === req.params.id)
    //filtron reviewArray dhe shfaq vetem ato te dhena  qe jane te njejta me req.params.id

    res.send(singleReview)
})


router.post("/", (req, res) => {
    const newMovie = { ...req.body, id: uniqid() }
    const fileContentAsBuffer = fs.readFileSync(moviePath)//lexon te dhenen e students.json
    const movieArray = JSON.parse(fileContentAsBuffer.toString())

    movieArray.push(newMovie)
    fs.writeFileSync(moviePath, JSON.stringify(movieArray))
    res.status(201).send(req.body)
})

router.delete("/:id", (req, res) => {
    const fileContentAsBuffer = fs.readFileSync(reviewPath)//lexon te dhenen e students.json
    const reviewArray = JSON.parse(fileContentAsBuffer.toString())

    const newListOfReviews = reviewArray.filter((review) => review.id !== req.params.id)

    fs.writeFileSync(reviewPath, JSON.stringify(newListOfReviews))
    res.send(newListOfReviews)
})


router.put("/:id", (req, res) => {
    const fileContentAsBuffer = fs.readFileSync(reviewPath)
    const reviewArray = JSON.parse(fileContentAsBuffer.toString())

    const newListOfReviews = reviewArray.filter((review) => review.id !== req.params.id)

    const review = req.body
    review.id = req.params.id

    newListOfReviews.push(review)
    fs.writeFileSync(reviewPath, JSON.stringify(newListOfReviews))
    res.send("ok")


})

module.exports = router
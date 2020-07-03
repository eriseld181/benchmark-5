const express = require("express")

const fs = require("fs")
const path = require("path")
const router = express.Router()
const uniqid = require("uniqid")

const moviePath = path.join(__dirname, "movies.json")//krijon rrugen per tek students.json

//merr tere studentet
router.get("/", (req, res) => {
    //console.log("get")
    const fileContentAsBuffer = fs.readFileSync(moviePath)//lexon te dhenen e students.json
    const fileContent = JSON.parse(fileContentAsBuffer.toString())
    res.send(fileContent)
})

//merr vetem studentet me ane te ID
router.get("/:id", (req, res) => {
    const fileContentAsBuffer = fs.readFileSync(moviePath)
    const movieArray = JSON.parse(fileContentAsBuffer.toString())

    const singleMovie = movieArray.filter(movie => movie.id === req.params.id)
    //filtron movieArray dhe shfaq vetem ato te dhena  qe jane te njejta me req.params.id

    res.send(singleMovie)
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
    const fileContentAsBuffer = fs.readFileSync(moviePath)//lexon te dhenen e students.json
    const movieArray = JSON.parse(fileContentAsBuffer.toString())

    const newListOfMovies = movieArray.filter((movie) => movie.id !== req.params.id)

    fs.writeFileSync(moviePath, JSON.stringify(newListOfMovies))
    res.send(newListOfMovies)
})


router.put("/:id", (req, res) => {
    const fileContentAsBuffer = fs.readFileSync(moviePath)//lexon te dhenen e students.json
    const movieArray = JSON.parse(fileContentAsBuffer.toString())

    const newListOfMovies = movieArray.filter((movie) => movie.id !== req.params.id)

    const movie = req.body
    movie.id = req.params.id

    newListOfMovies.push(movie)
    fs.writeFileSync(moviePath, JSON.stringify(newListOfMovies))
    res.send("ok")


})

module.exports = router
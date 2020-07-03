const express = require("express")
const fs = require("fs")
const path = require("path")
const router = express.Router()
const uniqid = require("uniqid")
const { check, validationResult } = require("express-validator")



const readFile = (fileName) => {
    const buffer = fs.readFileSync(path.join(__dirname, fileName))
    return JSON.parse(buffer.toString())
}



router.get("/", (req, res) => {

    const movieDB = readFile("reviews.json")
    if (req.query && req.query.title) {
        const filteredMovies = movieDB.filter(
            (movie) => movie.hasOwnProperty(title) && movie.title === req.query.title
        )
        res.send(filteredMovies)
    } else { res.send(movieDB) }

    res.send(fileContent)
})


router.get("/:imdbID", (req, res) => {
    const movieDB = readFile("reviews.json")
    const singleMovie = movieDB.filter(movie => movie.imdbID === req.params.imdbID)
    res.send(singleMovie)
})



router.post("/",
    [
        check("Title")
            .isLength({ min: 5 })
            .exists()
            .withMessage("insert a title with min 5 characters")
    ]
    , (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let err = new Error()
                err.message = errors
                err.httpStatusCode = 400
                next(err)
            }
            const movieDB = readFile("reviews.json")
            const newMovie = { ...req.body, createdAt: new Date(), id: uniqid() }

            movieDB.push(newMovie)

            fs.writeFileSync(path.join(__dirname, "reviews.json"), JSON.stringify(movieDB))
            res.status(201).send(newMovie)
        } catch (error) {

        }

    })

router.delete("/:imdbID", (req, res) => {
    const movieDB = readFile("reviews.json")
    const newListOfMovies = movieDB.filter(movie => movie.imdbID !== req.params.imdbID)

    fs.writeFileSync(path.join(__dirname, "reviews.json"), JSON.stringify(newListOfMovies))
    res.send(newListOfMovies)
})


router.put("/:imdbID", (req, res) => {
    const movieDB = readFile("reviews.json")
    const newListOfMovies = movieDB.filter(movie => movie.imdbID !== req.params.imdbID)
    const modifiedMovie = { ...req.body, imdbID: req.params.imdbID }
    newListOfMovies.push(modifiedMovie)
    fs.writeFileSync(path.join(__dirname, "reviews.json"), JSON.stringify(newListOfMovies))
    res.send(newListOfMovies)
})

module.exports = router
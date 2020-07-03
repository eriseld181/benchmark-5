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

    const movieDB = readFile("movies.json")
    if (req.querry && req.querry.title) {
        const filteredMovies = movieDB.filter(
            (movie) => movie.hasOwnProperty(title) && movie.title === req.query.title
        )
        res.send(filteredMovies)
    } else { res.send(movieDB) }

    res.send(fileContent)
})


router.get("/:imdbID", (req, res) => {
    const movieDB = readFile("movies.json")
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
            const movieDB = readFile("movies.json")
            const newMovie = { ...req.body }//createdAt: new Date(), uniqid()

            movieDB.push(newMovie)

            fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(movieDB))
            res.status(201).send(newMovie)
        } catch (error) {

        }

    })

router.delete("/:imdbID", (req, res) => {
    const movieDB = readFile("movies.json")
    const newListOfMovies = movieDB.filter(movie => movie.imdbID !== req.params.imdbID)

    fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newListOfMovies))
    res.send(newListOfMovies)
})


router.put("/:imdbID", (req, res) => {
    const movieDB = readFile("movies.json")
    const newListOfMovies = movieDB.filter(movie => movie.imdbID !== req.params.imdbID)
    const modifiedMovie = { ...req.body, imdbID: req.params.imdbID }
    newListOfMovies.push(modifiedMovie)
    fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newListOfMovies))
    res.send(newListOfMovies)
})

module.exports = router
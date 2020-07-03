const express = require("express")
const router = require("../movies")

const roter = express.Router()

router.get("/problems", (req, res) => {
    throw new Error("error from problematicRouter.js")
})

router.get("/anotherproblem", (req, res, next) => {
    let err = ("I cannot find it")
    throw new Error("error from problematicRouter.js")
    err.httptatusCode = 404
    next(err)
})

router.get("/forbidden", (req, res, next) => {
    let err = ("I cannot find it")
    throw new Error("forbidden error")
    err.httptatusCode = 404
    next(err)
})
module.exports = router
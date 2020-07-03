const express = require("express")
const MovieRoutes = require("./movies")
const MovieRoutes2 = require("./movies/index2")
const ReviewRoutes = require("./reviews")
const ReviewRoutes2 = require("./reviews/index2")
const listEndpoints = require("express-list-endpoints")
const { notFoundHandler, unauthorized, forbiddenHandler, catchAllHandler } = require("./errorHandling.js")
const problematicRoutes = require("./problematicRoutes")
const server = express()
const port = process.env.PORT
const cors = require("cors")

server.use(cors())
server.use(express.json())
server.use("/movies", MovieRoutes)
server.use("/movies2", MovieRoutes2)

server.use("/reviews", ReviewRoutes)
server.use("/reviews2", ReviewRoutes2)
server.use("/problems", problematicRoutes)

//Error Handlers
server.use(notFoundHandler)
server.use(unauthorized)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))

server.listen(port, () => { console.log(`server is running at port ${port}`) })
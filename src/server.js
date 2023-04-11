const express = require("express")
const app = express()


app.use("/books", express.static("books"))
app.use("/", express.static("anotherroute"))
app.use("/music", express.static("music"))
app.use("/music/gigs", express.static("music/gigs.html"))
app.use("/art", express.static("art"))
app.use("/about", express.static("about"))

app.listen(5001, () => console.log("server is listening")) 

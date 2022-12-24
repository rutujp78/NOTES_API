const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT || 5000;
const MongoUrl = process.env.MONGODB_URL;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(MongoUrl, {})
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        console.log(`Connected to http://localhost:${process.env.PORT}`);
    })
})

app.get("/", (req, res) => {
    res.send("Note API From DarkRaider")
})

app.use("/users", userRouter);
app.use("/note", noteRouter);
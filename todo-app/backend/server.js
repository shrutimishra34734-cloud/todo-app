const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();



app.use(cors());

app.use(express.json());



mongoose.connect(
    "mongodb://127.0.0.1:27017/todoapp"
)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((error) => {

    console.log(error);

});



app.use(
    "/api/todos",
    require("./routes/todos")
);



app.listen(5000, () => {

    console.log(
        "Server Running On Port 5000"
    );

});
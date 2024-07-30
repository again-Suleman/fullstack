const express = require('express')
const app = express()
const dotenv =  require('dotenv');
dotenv.config();


require("./startup/routes")(app);

// Testing Response
app.use('/', (req, res)=>{
    res.status(200).send('The project is under construction')
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server runing on port ${PORT}`)
} )
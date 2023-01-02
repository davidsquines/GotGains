const dbConnect = require("./db/dbConnect")
const express = require('express')
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
const corsOptions = {
    origin:'*', 
    credentials:true,  
    optionSuccessStatus:200,
}
const exerciseRoutes = require('./routes/exercises')
const userRoutes = require('./routes/users')
const routineRoutes = require('./routes/routines')
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/api/exercises',exerciseRoutes); 
app.use('/api/user', userRoutes)
app.use('/api/routines', routineRoutes)



const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`App listening on port ${port}`);
    console.log('Press Ctrl+C to quit.');
});
app.get( '/ping', (req,res) => {
    res.json({message:"pong"});
})
dbConnect();


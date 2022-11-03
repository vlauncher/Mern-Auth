const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();



app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));
app.use(cors());

const usersRouter = require('./routes/usersRoutes');

app.use('/auth',usersRouter);
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT}`);
});
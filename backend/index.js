const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');

const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')

const cors = require('cors');

const app = express()


const PORT = process.env.PORT;

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MONGODB connected successfully"))
.catch((error) => console.log(error))

app.use(bodyParser.json());

app.use("/vendor", vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => {
    console.log(`server started and running at http://localhost:${PORT}`)
})

app.use('/', (req, res) => {
    res.send("welcome SKHT foods")
})
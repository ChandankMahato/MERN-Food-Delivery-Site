const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

//routes
const adminAuthRoutes = require('./routes/admin/admin.auth');
const userAuthRoutes = require('./routes/user.auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const path = require('path');
const initialDataRoutes = require('./routes/admin/initialData');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');
const adminOrderRoute = require('./routes/admin/order.routes');
const initialdata = require('./routes/initialdata');
const bannerRoutes = require('./routes/banner');
const feedbackRoutes = require('./routes/feedback');

//environment variable or we can say constant
env.config();
app.use(compression({
    level: 6,
    threshold: 1,
}));


//mongodb connection
//mongodb+srv://root:<password>@cluster0.lkbiy.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.lkbiy.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(()=>{
    console.log('Database connected');
});

//middleware
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api', adminAuthRoutes);
app.use('/api', userAuthRoutes);
app.use('/api',categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', addressRoutes);
app.use('/api',orderRoutes);
app.use('/api', adminOrderRoute);
app.use('/api', initialdata);
app.use('/api',bannerRoutes);
app.use('/api', feedbackRoutes);


if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, '../front_end/build')));

    app.get('/*', function(req, res){
        res.sendFile(path.join(__dirname, '../front_end/build', 'index.html'));
    });
}

const PORT = process.env.PORT || 2000;
//listen on port ####
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

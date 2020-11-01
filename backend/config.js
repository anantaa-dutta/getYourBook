//require("@babel/register")({
 // presets: [ "@babel/preset-react"]
//});

import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 3005,
    MONGODB_URL: 'mongodb+srv://ad123:ad123@cluster0.99ucl.mongodb.net/getYourBook?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}

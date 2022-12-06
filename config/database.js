/*
    Student Name : Ronald JR Ombao
    ID#: 301213219
    Date: October 8, 2022
*/
const mongoose = require('mongoose');

let connectionURI = "mongodb+srv://COMP228_F22_sh_32:COMP228_F22_sh_32@clusterzero.tkn6o0q.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

module.exports = () => {
    mongoose.connect(connectionURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(
            () => {
                console.log('Connected!');
            },
            err => {
                process.exit();
            }
        )
}
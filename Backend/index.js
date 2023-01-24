const express  =  require("express")
const mongoose = require("mongoose")
const app = express()
mongoose.set('strictQuery', false);

app.use(express.urlencoded({ extended: false }));
app.use(express.json(/*{limit:'50mb'}*/));
var cors = require('cors');
app.use(cors());
const productSchema = new mongoose.Schema({
    name : 'string',
    size : 'string'
})
const login = mongoose.model("login" ,productSchema )
const connectDB = async () => 
{
    try{
     mongoose.connect('mongodb://localhost:27017/Login', { useNewUrlParser: true })
    const fruit = new login({
        name: "mac",
        size: "23"
    });
    // const data = await login.find()

    // console.warn(data)
    
    
    // fruit.save();
    console.log("Conected");
}
catch(e){
    console.error(e)

}
    
     
}
connectDB()
app.post('/form', (req, res) => {
    const newForm = new login(req.body);
    console.log(newForm);
    console.log("Data inside post");
    console.log(req.body);
    
    newForm.save()
        .then(form => {
            res.json({ message: 'Form submitted successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});
app.listen(4000)

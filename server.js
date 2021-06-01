const express = require('express');
const cors = require('cors');
require('dotenv').config()
const superagent = require('superagent');

const app = express()
app.use(cors())

// chack Point:
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new', {useNewUrlParser: true, useUnifiedTopology: true});
// creating the schema and the schema modal :
const Characters = new mongoose.Schema({
    name: String,
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
    },
    gender:String,
    img:String,
    psiPowersName:[{
        name:String
    }
    ],
  });

const myModal = mongoose.model('new', Characters);
// **************************************************************************

const PORT = process.env.PORT || 3666;

app.get('/', function (req, res) {
    res.send('Hello World')
  })

// endPoint and a fonction to to request data from the API, model it and consume it in the frontend:

app.get('/get-characters', function (req, res) {
    superagent.get('https://psychonauts-api.herokuapp.com/api/characters').then(data=>{
        const array = data.body.map(newData => new NewCharacter (newData));
        res.send(array);
    })
})

// a class for creating new data from the API:
class NewCharacter {
    constructor(data){
        this.name=data.name
        this.gender=data.gender
        this.img=data.img
        // this.psiPowersName=data.psiPowers.name
        // this.psiPowers=data.psiPowers
    }
}
// **************************************************************************

// end point and a function for posting data in the favorite page:

app.post('/favorite', function (req, res) {
    const {name,gender,img} = req.body;
    const slug = name.toLowerCase().split(' ').join('-');
    myModal.find({slug:slug},(error,data)=>{
        if(data.length>0){res.send('data exist')}
        else{
            const newData = new myModal({
                name:name,
                slug:slug,
                gender:gender,
                img:img
            })
            newData.save();
            res.send('data saved');
        }
    })
})
// **************************************************************************

// end point and a function for getting data in the favorite page from the data base:

app.get('/favorite', function (req, res) {
    myModal.find({},(error,data)=>{
        res.send(data);
    })
});
// **************************************************************************

// end point and a function for deleting data in the favorite page from the data base:

app.delete('/favorite:slug', function (req, res) {
   const slug = req.params.slug;
   myModal.remove({slug:slug},(error,data)=>{
       if(error)
       {res.send(error)}
       else{
           myModal.find({},(error,data)=>{
               res.send(data);
           })
       }
   })
});
// **************************************************************************

// end point and a function for updating data in the favorite page from the data base:

app.put('/favorite:slug', function (req, res) {
    const slug = req.params.slug;
    const {name,gender}= req.body;
    myModal.find({slug:slug},(error,data)=>{
        if(error)
        {res.send(error)}
        else{
            data[0].name=name;
            data[0].gender=gender;
            data[0].save();
            myModal.find({},(error,data)=>{
                res.send(data);
            })
        }
    })
 });
 // **************************************************************************

  app.listen(PORT, console.log(PORT));
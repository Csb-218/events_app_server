const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.PROJECT0_URI;

//Connecting to server
app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`server listening on ${port}`); 
});

//connecting to database
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db = client.db('event_app');
const all_events_collection = db.collection('all_events');
const events_collection = db.collection('event_catagories');



const connectToDatabase = async () => {
  try {
    await client.connect({});
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  }
}

//Home
app.get('/', (req, res) => {
    res.send('hello world')
  })

//routers
// const Events = require('./routers/events');
// const allEvents = require('./routers/all_events');

 app.get('/allevents' , async(req, res) => {
  try {

    await connectToDatabase();
    result =  all_events_collection.find();
    const result_array =[];
    await result.forEach(doc => result_array.unshift(doc));
    res.json(result_array);

  }catch(e){
    console.log(e);
  }
  // } finally {
  //   // await client.close();
  //   // console.log('database connection closed');
  
});

app.post('/allevents/add',async(req, res) => {
  try{
    await connectToDatabase();
    email = req.body.email;
    event_id = req.body.event;
    const query = {id:event_id}
    const updateEmail = {$push:{emails_registered:email}}
    const result = await all_events_collection.updateOne(query,updateEmail)
    console.log(result);
    res.json(result);
  }
  catch(e){console.log(e);} 
  // finally {
  //   // client.close();
  // }
});

 app.get('/events' ,async(req, res) => {
  try {

    await connectToDatabase();
    result =  events_collection.find();
    const result_array =[];
    await result.forEach(doc => result_array.unshift(doc));
    res.json(result_array);

  }catch(e){
    console.log(e);}
  // } finally {
  //   // await client.close();
  //   // console.log('database connection closed');
  // }
});

app.get('/events/add',(req, res) => {
  res.send('About birds')
});




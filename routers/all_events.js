const express = require('express')
const router = express.Router()
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.PROJECT0_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db = client.db('event_app');
const collection = db.collection('all_events');

const connectToDatabase = async () => {
    try {
      await client.connect({});
    } catch (err) {
      console.error(`Error connecting to the database: ${err}`)
    }
  }


  // middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})

// define the home page route
router.get('/', async(req, res) => {
  try {

    await connectToDatabase();
    result =  collection.find();
    const result_array =[];
    await result.forEach(doc => result_array.unshift(doc));
    res.json(result_array);

  }catch(e){
    console.log(e);
  } finally {
    await client.close();
    console.log('database connection is s closed ');
  }
});

   

// define the about route
router.post('/add', async(req, res) => {
  try{
    await connectToDatabase();
    email = req.body.email;
    event_id = req.body.event;
    const query = {id:event_id}
    const updateEmail = {$push:{emails_registered:email}}
    const result = await collection.updateOne(query,updateEmail)
    console.log(result);
    res.json(result);
  }
  catch(e){console.log(e);} 
  finally {
    client.close();
  }
})

module.exports = router;

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



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
     
    //mycode
    const db =  client.db('event_app');
    const all_Events = db.collection('all_events');
    const event_catagories = db.collection('event_catagories');

    const filter = {city:'barelona',city:'Lonon'}
    const updateDoc = {$set:{city:'Barcelona'},$set:{city:'London'}}
    const rename = {$rename:{"descrption":"description"}}

    const result  = await all_Events.updateMany({},rename);
    console.log(result);


    //insertion of data
    // const {events_categories,allEvents} = require('./data.json');
    // const result1 = await all_Events.insertMany(allEvents);
    // const result2 = await event_catagories.insertMany(events_categories);
    // console.log(result1, result2);


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




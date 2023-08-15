
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



 const connect = async() => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch{
    error => console.log("An error occurred while connecting",error);
  }
}

 const disconnect = async() =>{
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.close();
      console.log("You successfully disconnected from MongoDB!");
    } catch{
      error => console.log("An error occurred while disconnecting",error);
    }
  }

//connect().catch(console.dir);

module.exports = connect;
module.exports = disconnect;
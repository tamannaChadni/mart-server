const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;

// Use middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());  // Uncomment if you plan to handle JSON request bodies


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://moon:345678@atlascluster.qwfel.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

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

    const productCollection = client.db('prodcutDB').collection('product');

  app.get('/product',async(req,res)=>{
    const cursor = productCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Define routes
app.get('/', (req, res) => {
  res.send('hello');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

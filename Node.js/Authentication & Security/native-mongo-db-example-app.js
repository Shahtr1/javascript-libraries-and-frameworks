const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "fruitsDB";
const fruitsCollectionName = "fruits";
let fruitsCollection;
async function run() {
  try {
    const database = client.db(dbName);
    const collectionExists = await database
      .listCollections({ name: fruitsCollectionName })
      .hasNext();

    console.log("collectionExists", collectionExists);
    if (collectionExists)
      fruitsCollection = await database.collection(fruitsCollectionName);
    else
      fruitsCollection = await database.createCollection(fruitsCollectionName);
    console.log("Connected to Database!");

    const fruitsData = [
      { name: "Apple", score: 8, review: "Great fruit" },
      { name: "Orange", score: 6, review: "Kinda sour" },
      { name: "Banana", score: 9, review: "Great stuff!" },
    ];

    await fruitsCollection.insertMany(fruitsData);
    console.log(`3 documents were inserted`);

    const query = { name: "Apple" };

    const options = {
      // // sort returned documents in ascending order by title (A->Z)
      // sort: { title: 1 },
      // // Include only the `title` and `imdb` fields in each returned document
      // projection: { _id: 0, title: 1, imdb: 1 },
    };

    const cursor = fruitsCollection.find(query, options);

    if ((await fruitsCollection.estimatedDocumentCount()) === 0) {
      console.log("No documents found!");
    }

    await cursor.forEach(console.log);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

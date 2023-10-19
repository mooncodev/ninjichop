/**
 * https://app.netlify.com/sites/lnp-3948298/settings/identity#notifications
 * Can be triggered on 'signup', 'validate', 'login' identity events
 */
const { MongoClient, ServerApiVersion } = require('mongodb');

const uriAtlas = "mongodb+srv://eqmsadmin1:n85qPyVx7wVSmHPW@eqms-serverless.jy5zh.mongodb.net/ecal-db?retryWrites=true&w=majority";
// const uriAtlas = "mongodb+srv://frogeadmin22:x5wCOlap6iWpQoKG@serverlessfrogespresso1.qaftp.mongodb.net/FrogeSLMDB?retryWrites=true&w=majority";
const client = new MongoClient(uriAtlas, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  console.log('identity-validate ev body: ' ,data)
  const { user } = data;


  try{
    const database = client.db("lnp-db");
    const collection = database.collection("users");

    //make sure this user does not yet exist
    const filter = { email };
    const cursor = await collection.find(filter)


    const data = JSON.parse(event.body);
    // perform actions on the collection object
    const result = await collection.insertOne(data)

    return { statusCode: 200, body: "success" }

    const docs = await cursor.toArray();

    //todo anything
    return { statusCode: 200, body: "success" }

  }catch(err){
    console.log('Catch!' ,err)
    return { statusCode: 502, body: JSON.stringify(err) }
  }
}

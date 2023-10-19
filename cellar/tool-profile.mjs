import axios from 'axios';
const { MongoClient, ServerApiVersion } = require('mongodb');
import * as constants from '../.constants.mjs';
import fs from 'fs-extra';
//https://www.mongodb.com/developer/how-to/atlas-serverless-quick-start/
const atlasURI = "mongodb+srv://eqmsadmin1:n85qPyVx7wVSmHPW@eqms-serverless.jy5zh.mongodb.net/ecal-db?retryWrites=true&w=majority";
// const uriAtlas = "mongodb+srv://frogeadmin22:x5wCOlap6iWpQoKG@serverlessfrogespresso1.qaftp.mongodb.net/FrogeSLMDB?retryWrites=true&w=majority";
const client = new MongoClient(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


exports.handler = async (event, context) => {
  const database = client.db("ecal-db");
  const collection = database.collection("tools");
  const params = event.queryStringParameters

  const {
    id
  } = params;
  const noFilter = {};
  console.log('id: ',id);
  const filter = { toolId: id };

  try{
    // perform actions on the collection object

    const cursor = await collection.find(filter)
    const docs = await cursor.toArray();

    if (!docs.length) {console.log("No documents found!");}

    // replace console.dir with your callback to access individual elements

    return {
      statusCode: 200,
      headers: { 'Content-Type':'application/json'} ,
      body: JSON.stringify({ tools: docs })
    }

  }
  catch(err){
    console.log('Catch!' ,err)
    return { statusCode: 502, body: JSON.stringify(err) }
  }
  // finally {
  //   await client.close();
  // }

}

/*
getAllTools(sortBy, sortDirection, pageNumber, pageSize) {
  return __awaiter(this, void 0, void 0, function* () {
    let postsCount = yield posts_repository_1.postCollection.countDocuments({});
    let posts = yield posts_repository_1.postCollection.find({})
    .sort({ [sortBy]: sort(sortDirection) })
    .skip(skipped(pageNumber, pageSize))
    .limit(+pageSize)
    .toArray();
    let outPosts = posts.map((posts) => {
      return {
        id: posts._id.toString(),
        title: posts.title,
        shortDescription: posts.shortDescription,
        content: posts.content,
        blogId: posts.blogId,
        blogName: posts.blogName,
        createdAt: posts.createdAt
      };
    });
    let pageCount = Math.ceil(+postsCount / +pageSize);
    let outputPosts = {
      pagesCount: pageCount,
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: postsCount,
      items: outPosts
    };
    return outputPosts;
  });
},
*/

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
  console.log('ev body: ' ,event.body)

  const data = JSON.parse(event.body ||'{}');
  const {
    limit=5,
    page=1,
    sort={ toolId: 1 },
    projection={
      toolId:1,
      toolStatus:1,
      description:1,
      modelNumber:1,
      serialNumber:1,
      calibrationType:1,
      inServiceDate:1,
      toolImageS3FN:1,
      comments:1,
      calibratedOnDate:1,
      calibratedDueDate:1,
      calibIvalNumber:1,
      calibIvalType:1,
      conditionReceived:1,
      calibrationAgent:1,
      certificateNumber:1,
      calibrationAttachmentS3FN:1,
    }
  } = params;
  const skip = (page-1) * limit;
  // query for movies that have a runtime less than 15 minutes
  const noFilter = {};
  const filter = { runtime: { $lt: 15 } };

  try{
    // perform actions on the collection object
    // print a message if no documents were found
    const numDocs = await collection.countDocuments({});
    const numPages = numDocs / limit;

    const cursor = await collection.find(noFilter, {
      limit, skip,
      sort, projection,
    })
    const docs = await cursor.toArray();

    if (!docs.length) {console.log("No documents found!");}

    // replace console.dir with your callback to access individual elements
    await docs.forEach(console.dir);

    return {
      statusCode: 200,
      headers: { 'Content-Type':'application/json'} ,
      body: JSON.stringify({ tools: docs, numDocs, numPages })
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

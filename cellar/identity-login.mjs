/**
 * https://docs.netlify.com/functions/functions-and-identity/
 * Triggered when an Identity user logs in with Netlify Identity.
 */



exports.handler = async (event, context, callback) => {
  console.log('identity-login ev body: ' ,event.body)

  try{

    //todo anything
    return { statusCode: 200, body: "success" }

  }catch(err){
    console.log('Catch!' ,err)
    return { statusCode: 502, body: JSON.stringify(err) }
  }
}

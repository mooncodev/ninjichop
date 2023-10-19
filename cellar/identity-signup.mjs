/**
 * https://docs.netlify.com/functions/functions-and-identity/
 * Triggered when an Identity user signs up with Netlify Identity
 * and confirms their email address. Note that this fires for email+password signups only,
 * not for signups using external providers such as Google or GitHub.
 */


exports.handler = async (event, context, callback) => {
  console.log('identity-signup ev body: ' ,event.body)
  try{
    //todo anything
    return { statusCode: 200, body: "success" }

  }catch(err){
    console.log('Catch!' ,err)
    return { statusCode: 502, body: JSON.stringify(err) }
  }
}

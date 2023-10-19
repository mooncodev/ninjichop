import { Link, useLoaderData } from "react-router-dom";
import { VFlex, VFlexCC } from './bits/UtilityTags.js';
import StoreFront from "./StoreFront/StoreFront";

export default function PgNotFound({...props}) {
  return (
    <VFlexCC w='100vw' h='100vh'>

      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to='/'>Home</Link>
      {/*<Link to='/docs'>Docs</Link>*/}
    </VFlexCC>
  )
}

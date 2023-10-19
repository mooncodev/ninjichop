import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  ListItem,
  SimpleGrid,
  Spinner,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { HFlexCC, S, VFlex, VFlexCC } from './bits/UtilityTags.js';
import {format} from 'date-fns';
import { breakpoints } from '../theme/foundations/breakpoints.js';
import { useAuth } from '../services/useAuth.js';

export default function PgWalletHistory() {
  const lnpUserInfo = useAuth(s=>s.lnpUserInfo)
  const [data, setData] = useState({});
  const fetchTool = async ()=>{
    const response = await fetch(`http://localhost:3002/api/get-lnp-user-info`)
    .then(async (r)=> {
      const json = await r.json();
      return json.message
    });
    if(response.tools!=null && response.tools.length){
      setData(response.tools[0]);
    }
  }
  useEffect(() => {

  }, []);

  return (<>
    <Heading>Wallet History</Heading>
    <VFlex w={{sm:'96%',md:'90%',lg:breakpoints.md}} alignSelf={'center'}>
      <Heading>{data.toolId}</Heading>
      <SimpleGrid columns={1} spacing='20px' >
      </SimpleGrid>

  </VFlex>
  </>);
}

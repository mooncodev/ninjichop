import {Box, Flex, Grid, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text,} from '@chakra-ui/react';
import React from 'react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from "../services/useAuth";
import {MdConstruction} from "react-icons/md";
import {HFlexSC, VFlexCS} from "./bits/UtilityTags";
import {useAppStore} from "../services/useAppStore";
import TbDesigner from "./TbDesigner";
import TbSettings from "./TbSettings";
import LivePreview from "./LivePreview/LivePreview";
import TbSubscriptions from "./TbSubscriptions";

export default function PgDash() {
  // const nav = useNavigate()
  // const user = useAuth(s=>s.user)
  const dashTabIdx = useAppStore(s=>s.dashTabIdx)

  const handleTabsChange = (index) => {
    useAppStore.setState({dashTabIdx:index})
  }
  return (
    // <Flex flexDirection="column" flexGrow='1' pt="75px">

    <>
        {/* <BogGlobalStats/> */}

      {/*<Heading>Dashboard</Heading>*/}
      {/*<HFlexSC gap={4}>*/}
      {/*  <VFlexCS border='1px' borderRadius={4}><MdConstruction/><Text>$1000</Text><Box>Total Amount</Box></VFlexCS>*/}
      {/*  <VFlexCS border='1px' borderRadius={4}><MdConstruction/><Text>$1000</Text><Box>Total Amount</Box></VFlexCS>*/}
      {/*  <VFlexCS border='1px' borderRadius={4}><MdConstruction/><Text>$1000</Text><Box>Total Amount</Box></VFlexCS>*/}
      {/*  <VFlexCS border='1px' borderRadius={4}><MdConstruction/><Text>$1000</Text><Box>Total Amount</Box></VFlexCS>*/}
      {/*</HFlexSC>*/}
      <Tabs index={dashTabIdx} onChange={handleTabsChange}>
        <TabList>
          <Tab>Designer</Tab>
          <Tab>Admin</Tab>
          <Tab>Subscription</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={[1,2,4]}>
            <TbDesigner/>
          </TabPanel>
          <TabPanel p={[1,2,4]}>
            <TbSettings/>
          </TabPanel>
          <TabPanel p={[1,2,4]}>
            <TbSubscriptions/>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <LivePreview/>
      {/*{user && (*/}
      {/*  <Box sx={{border:'1px solid black', borderRadius:'6px', p:'5px'}}>*/}
      {/*    {Object.entries(user).map(([kk,vv],i,a)=>(<Box key={i}>{kk}: {JSON.stringify(vv)}</Box>))}*/}
      {/*  </Box>*/}
      {/*)}*/}

    </>
  );
}

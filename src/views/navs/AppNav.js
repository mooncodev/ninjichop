import {
  Avatar, Badge, Box, Button, Center,
  Grid, GridItem, IconButton, Image, Link,
  Menu, MenuButton, MenuDivider, MenuItem, MenuList,
  Portal, useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import {HFlex, VFlexCC} from '../bits/UtilityTags.js';
import {NavLink, Outlet, useLocation, useNavigate,} from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
// import { useAtom } from 'jotai';
// import { appNavDrawerOpenAtom } from '../../services/atoms.js';
import BrandLogoTitle from "assets/title-caps.svg";
import BrandLogo from "assets/logos/brand-logo.svg";
// import { CISVG_FrogeNavBack } from '../../assets/Brand.js';
import {appState, useAppStore} from '../../services/useAppStore.js';
import {ExternalLinkIcon, HamburgerIcon} from '@chakra-ui/icons';
import {authState, useAuth} from '../../services/useAuth.js';
import AuthModal from '../auth/AuthModal.js';
import {createBrowserHistory} from "history";
import {clientOrigin} from "../../data/constants";
import {adminRoutes} from "../../App";

const history = createBrowserHistory();

export default function AppNav(props) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(`loc: `, location);
  const isAuthenticated = useAuth(s=>s.isAuthenticated)
  const user = useAuth(s=>s.user)
  const isWindowScrolled = useAppStore(s=>s.isWindowScrolled)
  const isAppMainScrolled = useAppStore(s=>s.isAppMainScrolled)
  const isPublicRoute = adminRoutes.indexOf(location.pathname)<0
  const isAdminRoute = adminRoutes.indexOf(location.pathname)>-1
  const isMobile = useBreakpointValue({base:true, md:false})
  const toggleAppNavDrawer=()=>appState().set_appNavDrawerOpen(!appState().appNavDrawerOpen)

  const sxFixedBar = {zIndex:'1000',position:"fixed", w:'100vw', h:'75px', top:"0", left:"0", right:"0",}
  const sxNavBtn = {
    cursor:'pointer',
    color: 'global.bg',
    bgColor: 'gray.300',
    h: '2.5rem', w: '2.5rem',
    borderRadius: '7px',
    _hover: { bgColor: 'gray.500', },
  }

  const Brand = ({...rest})=>(
    <Image src={BrandLogoTitle} sx={{ //...abs(0,null,null,0),
      h:['30px','36px','40px'],mt:'15px',ml:'10px',w:'auto', mr:'auto', cursor:'pointer'
    }} onClick={()=>{navigate('/')}} {...rest}/>
  );

  const PublicHandleLink = ({...rest})=> user.publicHandle && (
    <Link as={NavLink} isExternal to={`${clientOrigin}/sf/${user.publicHandle}`} mr={3} color='gray.550' {...rest}>
      <Badge style={{textTransform:'lowercase'}} _hover={{bgColor:'gray.50'}} variant='outline' colorScheme='telegram'>
        https://kmerchant.com/sf/{user.publicHandle}
      </Badge>
    </Link>
  );

  const PitchDeckLink = ({...rest})=>(
      <Link href='downloads/CoinStarz Pitchdeck 1.83.docx.pdf' isExternal mr={3} {...rest}>
        Pitch Deck <ExternalLinkIcon mt={-1}/>
      </Link>
  );
  const DashboardLink = ({...rest})=>(
    <Link as={NavLink} to="/dash" mr={3} color='gray.550' {...rest}>Dashboard</Link>
  );
  const AuthButtons = ({...rest})=>(<HFlex {...rest}>
    <Button variant='solidBlue' w='fit-content' onClick={()=>{
      // useAppStore.getState().set_authModalIsOpen(true, 'login')
      useAppStore.setState({loginPageInitTab:'login'});
      navigate('/login');
    }} {...rest}>Log in</Button>
    <Button variant='solidBlue' w='fit-content' ml={2} onClick={()=>{
      // useAppStore.getState().set_authModalIsOpen(true, 'signup')
      useAppStore.setState({loginPageInitTab:'signup'})
      navigate('/login')
    }} {...rest}>Sign up</Button>
  </HFlex>
  );
  const UserMenu = ({...rest})=>(
    <Menu >
      <MenuButton
        as={IconButton} aria-label='User Menu'
        sx={{ ...sxNavBtn, borderRadius:'50px',mt:'4px',justifySelf:'flex-end' }}
        icon={<FaUserCircle/>} {...rest}
      />
      <MenuList>
        <Center fontSize={12}>Logged in as:</Center>
        <Center>
          <Avatar size={'lg'} src={user.image}/>
        </Center>
        <VFlexCC sx={{maxWidth: '200px',
          wordBreak: 'break-all',
          textAlign: 'center',
          margin: '0 auto'}}>
          <Box>{user.email}</Box>
          <Box>{user.name}</Box>
        </VFlexCC>
        <MenuDivider />
        <MenuItem onClick={()=>{
          useAppStore.setState({dashTabIdx:1})
          navigate('/dash')
        }}>Account Settings</MenuItem>
        <MenuItem onClick={()=>{
          authState()._logout().then()
          navigate('/')
        }}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
  const HamburgerButton = ({...rest})=>(
    <Center id="AppMenuIcon" sx={sxNavBtn} onClick={toggleAppNavDrawer} {...rest}>
      <HamburgerIcon boxSize={5}/>
    </Center>
  );


  return (<>
      <Portal>
        <Box sx={{...sxFixedBar, transition:'opacity ease 0.8s',
          opacity: (isAdminRoute ? (isAppMainScrolled ? '1':'0') : isWindowScrolled ? '1':'0'), bgColor:'black'}}
        />
        <Grid id="__AppNavbar" sx={{
           ...sxFixedBar, justifyContent:'flex-end', pr:'12px', alignItems:'center',
        }}
              templateAreas={useBreakpointValue({
                base: `"brand user"
                       "links links"`,
                md: `"brand links user"`,
              })}
              templateColumns={useBreakpointValue({
                base: '1fr auto',
                md: 'auto 1fr auto',
              })}
              // w={useBreakpointValue({
              //   base: 'auto',
              //   md: 'auto',
              // })}
        >
          <Brand gridArea={'brand'}/>
          <GridItem area={'links'} justifySelf='flex-end'>
            {/*{isPublicRoute && <PitchDeckLink/>}*/}
            {isAuthenticated && isPublicRoute && (<DashboardLink/>)}
            {isAuthenticated && isAdminRoute && (<PublicHandleLink/>)}
          </GridItem>
          {isAuthenticated && (<UserMenu gridArea={'user'}/>)}
          {/*{isMobile && isAdminRoute && (*/}
          {/*  <HamburgerButton/>*/}
          {/*)}*/}
          {!isAuthenticated && location.pathname !=='/login' && (<AuthButtons gridArea={'user'}/>)}
        </Grid>
      </Portal>
      <AuthModal/>
      <Outlet/>

    </>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {width,height};
}

import {useEffect, useState} from "react";
import {authState, useAuth} from "../../services/useAuth";
import {HFlex, VFlex} from "../bits/UtilityTags";
import {Badge, Box, Button, Input} from "@chakra-ui/react";

const createStationDef = (newIdx)=>({
  stationName:`Station ${newIdx}`, accessPIN: '0000', online: false,
})

const StationManager = ()=>{
  const userStationDefs = useAuth(s=>s.user.stationDefs)
  const [stationDefs, setStationDefs] = useState([])
  const [statusMsg, setStatusMsg] = useState('')

  useEffect(()=>{
    setStationDefs(userStationDefs)
  },[userStationDefs])

  function handleSave() {
    useAuth.getState()._updatePaths({"stationDefs":stationDefs})
    .then((res)=>{
      if(res && res.success){
        useAuth.getState()._getUser().then((res)=>{
          // setStationDefs(res.stationDefs)
        });
        setStatusMsg('Saved!')
      }else{
        if(res && res.error && res.error.includes('contains a duplicate value')){
          setStatusMsg(`Couldn't save. Station Name / Access PIN pairings must be unique.`)
        }else{
          setStatusMsg(`Couldn't save. Please try again.`)
        }
      }
      setTimeout(()=>{setStatusMsg('')},5000)
    }).catch()
  }
  function handleCancel() {
    useAuth.getState()._getUser().then((res)=>{
      // setStationDefs(res.stationDefs)
    });
    setStatusMsg('Reverted changes!')
    setTimeout(()=>{setStatusMsg('')},5000)
  }


  return (
    <VFlex gap={3}>
      <HFlex align='center'>
        <Badge ml='24px' textAlign='center'>Station Name</Badge>
        <Badge ml='86px' textAlign='center'>Access PIN</Badge>
      </HFlex>
      {stationDefs.map((v,i) =>{

        return (<HFlex key={i} align='center'>
          <Badge w='24px' textAlign='center'>{i+1}</Badge>
          <Input w='180px' value={stationDefs[i].stationName} onChange={(e)=>{
            setStationDefs(prevStationDefs =>{
              const newStationDefs = [...prevStationDefs];
              newStationDefs[i] = {...newStationDefs[i], stationName: e.target.value};
              return newStationDefs
            })
          }}/>
          <Input w='76px' value={stationDefs[i].accessPIN} onChange={(e)=>{
            setStationDefs(prevStationDefs =>{
              const newStationDefs = [...prevStationDefs];
              newStationDefs[i] = {...newStationDefs[i], accessPIN: e.target.value};
              return newStationDefs
            })
          }}/>
          {i>0 && (
            <Button w={8} textAlign='center' onClick={()=>{
              setStationDefs(prevStationDefs => {
                return prevStationDefs.filter((_, index) => index !== i);
              })
            }}>-</Button>
          )}
        </HFlex>)
      })}
      <Button size='xs' variant='outlineBlue' onClick={()=>{
        setStationDefs(prevStationDefs => {
          const newIdx = prevStationDefs.length+1
          const newLog = createStationDef(newIdx)
          return  [...prevStationDefs, newLog]
        })
      }}>Add Station</Button>

      <HFlex gap={1}>
        <Button variant='solidBlue' onClick={handleSave}>Save Station Config</Button>
        <Button w={28} size='xs' textAlign='center' onClick={handleCancel}>Discard Changes</Button>
      </HFlex>
      {statusMsg && (<Box color={statusMsg==='Saved!'?'green':'red'}>{statusMsg}</Box>)}
    </VFlex>
  )
}

export default StationManager

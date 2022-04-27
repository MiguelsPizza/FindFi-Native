import { View, Text } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper';
import WifiListItem from './WifiListItem';
import WifiManager from 'react-native-wifi-reborn';



// const optionsPerPage = [2, 3, 5];



const WifiList = () => {
  const [networks, setNetworks] = React.useState([]);
  let counter = 0;

  const getNetworks = async () => {
    WifiManager.loadWifiList()
      .then(newList => {
        setNetworks(newList);
        // console.log(newList)
      });
  }



  React.useEffect(() => {
    setInterval(() => getNetworks(), 500);
  }, []);
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Available Networkds</DataTable.Title>
        <DataTable.Title numeric>Signal Quality</DataTable.Title>
      </DataTable.Header>

      {networks.length > 0 && networks.map((listItem) => {
        const level = listItem.level;
        const ssid = listItem.SSID;
        return <WifiListItem key={counter++} level={level} ssid={ssid} />
      })}

    </DataTable>
  )
}

export default WifiList;
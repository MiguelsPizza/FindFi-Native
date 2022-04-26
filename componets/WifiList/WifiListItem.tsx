import {View, Text} from 'react-native'
import React from 'react'
import {DataTable} from 'react-native-paper';

interface networkInfo {
  ssid: string,
  level: string,
}


const WifiListItem: React.FC<networkInfo> = ({ssid, level}) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{ssid}</DataTable.Cell>
      <DataTable.Cell numeric>{level}</DataTable.Cell>
    </DataTable.Row>
  )
}

export default WifiListItem;
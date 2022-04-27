import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper';

interface networkInfo {
  ssid: string,
  level: string,
}



const WifiListItem: React.FC<networkInfo> = ({ ssid, level }) => {
  const [ssidColor, setSsidColor] = React.useState<string>('green');
  const styles = StyleSheet.create({
    ssidText: {
      color: ssidColor,
    },
  });

  const getBackgroundColor = React.useCallback((valuePre) => {
    let color;
    let value = (100 - Math.abs(valuePre)) *2;

    if (value === 0) {
      color = '';
    } else if (value >= 1 && value < 80) {
      color = "red";
    } else if (value >= 80 && value < 90) {
      color = "orange";
    } else if (value >= 90 && value < 100) {
      color = "yellow";
    } else if (value >= 100) {
      color = "green";
    }
    setSsidColor(color);
  }, [level]);

  React.useEffect(() => {
    getBackgroundColor(level);
  }, [level, getBackgroundColor]);
  return (
    <DataTable.Row>
      <DataTable.Cell>
        <Text style={styles.ssidText}>
          {ssid}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell numeric>{level}</DataTable.Cell>
    </DataTable.Row>
  )
}



export default WifiListItem;
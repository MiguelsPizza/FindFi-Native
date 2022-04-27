import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Banner } from 'react-native-paper';

import WifiManager from 'react-native-wifi-reborn';



// const optionsPerPage = [2, 3, 5];



const Proximeter = ({currentNetwork}) => {
  const [visible, setVisible] = React.useState(true);

  const [signalStrength, setSignalStrength] = React.useState(currentNetwork.level);
  const [current, setNetworks] = React.useState([]);
  let counter = 0;

  const updateNetwork = async () => {
    WifiManager.getCurrentSignalStrength().then(strength => {
      setSignalStrength(strength);
      // console.log(strength);
    });
  }
  const [ssidColor, setSsidColor] = React.useState<string>('green');
  const styles = StyleSheet.create({
    container: {
      backgroundColor: ssidColor,
    },
  });


  const getBackgroundColor = () => {
    let color;
    let r = 255;
    let g = 0;
    let b = 0;
    let value = Math.abs((100+signalStrength)* 5);
    console.log(value)
    if (value === NaN) {
      color = "white";
    } else if (value >= 1 && value < 255) {
      color = `rgb(255, ${value}, 0)`;
    } else if (value >= 255 && value < 510) {
      color = `rgb(${255 - value + 255}, 255, 0)`;
    } else if (value >= 510) {
      color = `rgb(0, 255, ${value - 510})`;
    }
    setSsidColor(color);
  };


  React.useEffect(() => {
    getBackgroundColor();
  }, [signalStrength]);



  React.useEffect(() => {
    setInterval(() => updateNetwork(),100);
  }, []);
  return (
    <View style={styles.container}>
    <Banner
    style={styles.container}
      visible={visible}
      actions={[
        {
          label: 'Hide',
          onPress: () => setVisible(false),
        },
      ]}
>
    <Text style={styles.container}>{signalStrength}</Text>

    </Banner>
    </View>
  )
}

export default Proximeter;
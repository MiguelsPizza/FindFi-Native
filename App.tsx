/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import WifiList from './componets/WifiList/WifiList';
import Proximeter from './componets/Proximeter/Proximeter';
import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import { PermissionsAndroid } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const App = () => {
  const [wifiList, setWifiList] = React.useState([]);
  const [currentNetwork, setCurrentNetwork] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState(false);
  const getPerssion = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      //console.log('wifi');
      setIsConnected(true);
      WifiManager.loadWifiList().then(newList => {
        setWifiList(newList);
        console.log(newList);
      });
      WifiManager.getCurrentSignalStrength().then(strength => {
        setCurrentNetwork(strength);
        console.log(strength);
      });



    } else {
      // Permission denied
      //console.log('denied');
    }
  };

  React.useEffect(() => {
    getPerssion();
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  if (!!PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
            <Proximeter currentNetwork={currentNetwork} />
            <WifiList wifiList={wifiList} currentNetwork={currentNetwork}/>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={backgroundStyle}>
        <Text>
          Please enable location permission
        </Text>
      </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

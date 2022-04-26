import {Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import React from 'react';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'tomato',
//     accent: 'yellow',
//   },
// };


export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import MyStack from './SRC/Screens/Navigation/MyStack';
import configurestore from './Redux/Store/store';

const App = () => {
  const store = configurestore();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
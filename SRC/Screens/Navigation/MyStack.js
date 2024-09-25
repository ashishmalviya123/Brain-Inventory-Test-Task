import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import Bottom from './Bottom';
import Checkout from '../main/Checkout';

const Stack = createNativeStackNavigator();
const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>

            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
            <Stack.Screen
                name="Bottom"
                component={Bottom}
            />
            <Stack.Screen
                name="Checkout"
                component={Checkout}
            />
        </Stack.Navigator>
    )
}

export default MyStack

const styles = StyleSheet.create({})
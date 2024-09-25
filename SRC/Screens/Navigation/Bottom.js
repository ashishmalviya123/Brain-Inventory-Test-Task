import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../main/Home';
import MyCart from '../main/MyCart';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { color } from '../../Component/BaseColor';
const Tab = createBottomTabNavigator();
const Bottom = () => {

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: color.base,
                borderTopLeftRadius: 18, borderTopRightRadius: 18,
                width: '100%', alignSelf: 'center',
            },
        }}>
            <Tab.Screen name={"Home"} component={Home} options={{
                unmountOnBlur: true,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        // position: 'absolute',
                        // backgroundColor:
                    }}>
                        <FontAwesome5 name="home" size={20} color={focused ? 'yellow' : color.IconColor} />
                    </View>
                )

            }} />
            <Tab.Screen name={"MyCart"} component={MyCart} options={{
                unmountOnBlur: true,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        // position: 'absolute',
                    }}>
                        <Entypo name="shopping-cart" size={20} color={focused ? 'yellow' : color.IconColor} />
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

export default Bottom

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { color } from './BaseColor'

const Rating = ({ ratings }) => {
    return (
        <View style={{ flexDirection: 'row', gap:3 }}>
            {ratings >= 1 ?
                <Ionicons name='star' size={18} color={color.yellow} />
                :
                <Ionicons name='star-outline' size={18} color={color.base} />
            }
            {ratings >= 2 ?
                <Ionicons name='star' size={18} color={color.yellow} />
                :
                <Ionicons name='star-outline' size={18} color={color.base} />
            }
            {ratings >= 3 ?
                <Ionicons name='star' size={18} color={color.yellow} />
                :
                <Ionicons name='star-outline' size={18} color={color.base} />
            }
            {ratings >= 4 ?
                <Ionicons name='star' size={18} color={color.yellow} />
                :
                <Ionicons name='star-outline' size={18} color={color.base} />
            }
            {ratings >= 5 ?
                <Ionicons name='star' size={18} color={color.yellow} />
                :
                <Ionicons name='star-outline' size={18} color={color.base} />
            }

        </View>
    )
}

export default Rating

const styles = StyleSheet.create({})
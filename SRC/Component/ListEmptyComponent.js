import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListEmptyComponent = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '25%' }}>
            <Text style={{ fontSize: 14, color: '#000', textAlign: 'center', padding: 12, }}>No Data</Text>
        </View>
    )
}

export default ListEmptyComponent

const styles = StyleSheet.create({})
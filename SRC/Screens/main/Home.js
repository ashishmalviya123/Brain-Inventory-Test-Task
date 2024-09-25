import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { products } from '../../Component/StaticData';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/Action/main/CardAction';
import Rating from '../../Component/Rating';
import { color } from '../../Component/BaseColor';
import ListEmptyComponent from '../../Component/ListEmptyComponent';
import ShowToast from '../../Component/ShowToast';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Home = () => {
    const dispatch = useDispatch()
    const currentItems = products.slice(0, 10);
    
    const [userName, setuserName] = useState('')
    const [currentData, setCurrentData] = useState(currentItems)

    useEffect(() => {
        UserDetails()
    }, [])

    const UserDetails = async () => {
        const detail = await AsyncStorage.getItem('signUpDetails')
        const storedCredentials = detail != null ? JSON.parse(detail) : null;
        setuserName(storedCredentials?.username)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.FlatListCardContainer}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ justifyContent: 'center' }}>
                        {item.category == 'smartphones' ? <Image source={require('../../Assets/Images/mobile.jpeg')} style={{ width: WIDTH / 4, height: HEIGHT / 5, }} />
                            : <Image source={require('../../Assets/Images/laptop.jpeg')} style={{ width: WIDTH / 4, height: HEIGHT / 9, }} />}
                    </View>
                    <View style={{ width: '70%', padding: 12 }}>
                        <Text style={styles.title}>Category : {item.category}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.title}>Price : {item.price}/-</Text>
                        <Text style={styles.title}>Brand : {item.brand}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 6, right: 2 }}>
                            <Text style={styles.title}>Ratings : </Text>
                            <Rating ratings={item.rating} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            dispatch(addToCart(item));
                            ShowToast('Added');
                        }} style={styles.addCartContainer}>
                            <Text style={styles.addCartContainerTxt}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.discountConatiner}>
                    <Text style={styles.discountConatinertxt}>{item.discountPercentage}% Off</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.HeaderTxtContainer}>
                <Text style={styles.headerMiddleTxt} >Welcome {userName} </Text>
            </View>
            <FlatList
                data={currentData ? currentData : products}
                contentContainerStyle={{ paddingBottom: '20%' }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                initialNumToRender={10}
                keyExtractor={(item, index) => {
                    return index.toString();
                }}
                ListEmptyComponent={<ListEmptyComponent />}
                ListFooterComponent={() => {
                    return (<>
                        {currentData && <TouchableOpacity style={styles.LoadDataContainer}
                            onPress={() => { setCurrentData('') }} activeOpacity={0.9} >
                            <Text style={styles.LoadDataContainerTxt}>Load more</Text>
                        </TouchableOpacity>}
                    </>)
                }}
            />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#fff' },
    HeaderTxtContainer: { backgroundColor: color.base, padding: '4%', alignSelf: 'center', width: "100%", borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
    headerMiddleTxt: { color: "#fff", fontSize: 16, bottom: 3, textTransform: 'capitalize', fontWeight: "600", textAlign: 'center', },
    LoadDataContainer: { width: '60%', alignSelf: 'center', padding: 10, borderRadius: 15, alignItems: 'center', marginTop: "8%" },
    LoadDataContainerTxt: { color: '#000', width: '80%', textAlign: 'center', fontWeight: '700', fontSize: 16 },
    FlatListCardContainer: { backgroundColor: '#fff', elevation: 12, borderRadius: 12, padding: 12, margin: 12, width: '95%', alignSelf: 'center' },
    addCartContainer: { borderRadius: 6, backgroundColor: color.yellow, padding: 4, marginTop: 12 },
    addCartContainerTxt: { color: '#000', textAlign: 'center', fontWeight: '700', paddingHorizontal: 6 },
    discountConatiner: { backgroundColor: 'green', position: 'absolute', bottom: 0, padding: 8, borderTopRightRadius: 16 },
    discountConatinertxt: { fontSize: 14, color: '#fff', fontWeight: '900' },
    title: { color: '#000', fontWeight: '800', textTransform: 'capitalize' }
})
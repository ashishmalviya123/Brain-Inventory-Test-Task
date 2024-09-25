import { StatusBar, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { products } from '../../Component/StaticData';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../Redux/Action/main/CardAction';
import Rating from '../../Component/Rating';
import { color } from '../../Component/BaseColor';
import ListEmptyComponent from '../../Component/ListEmptyComponent';
import ShowToast from '../../Component/ShowToast';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width


const MyCart = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state?.CardReducer?.items);
    const [userName, setuserName] = useState('')

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
                        {item.category == 'smartphones' ? <Image source={require('../../Assets/Images/mobile.jpeg')} style={styles.MobileImage} />
                            : <Image source={require('../../Assets/Images/laptop.jpeg')} style={styles.lapTopImages} />}
                    </View>
                    <View style={styles.cardsDetailContainer}>
                        <Text style={styles.title}>Category : {item.category}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.title}>Price : {item.price}/-</Text>
                        <Text style={styles.title}>Brand : {item.brand}</Text>
                        <View style={styles.RatingsContainer}>
                            <Text style={styles.title}>Ratings : </Text>
                            <Rating ratings={item.rating} />
                        </View>
                        <View style={styles.cardFooterButtons}>
                            <TouchableOpacity onPress={() => navigation.navigate('Checkout', { item: item })} style={styles.BuyNowContainer}>
                                <Text style={styles.BuyNowTxt}>Buy now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { dispatch(removeFromCart(item.id)); ShowToast('Removed'); }} style={styles.RemoveCartConatiner}>
                                <Text style={styles.RemoveCartTxt}>Remove to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.discountPercentageContainer}>
                    <Text style={styles.discountPercentageContainertxt}>{item.discountPercentage}% Off</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.HeaderContainer}>
                <Text style={styles.HeaderTxt} >My Cart </Text>
            </View>
            <FlatList
                data={cartItems}
                contentContainerStyle={{ paddingBottom: '20%' }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                initialNumToRender={10}
                keyExtractor={(item, index) => {
                    return index.toString();
                }}
                ListEmptyComponent={<ListEmptyComponent />}
                ListFooterComponent={() => {
                    return (
                        <>
                            {cartItems.length > 10 ? <TouchableOpacity style={styles.loadMoreContainer}
                                onPress={() => signUp()} activeOpacity={0.9} >
                                <Text style={styles.loadMoreContainertxt}>Load more</Text>
                            </TouchableOpacity> : null}
                        </>

                    )
                }}
            />
        </View>
    )
}

export default MyCart

const styles = StyleSheet.create({
    HeaderContainer: { backgroundColor: color.base, padding: '4%', alignSelf: 'center', width: "100%", borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
    HeaderTxt: { color: "#fff", fontSize: 16, bottom: 3, textTransform: 'capitalize', fontWeight: "600", textAlign: 'center', },
    MobileImage: { width: WIDTH / 4, height: HEIGHT / 5, },
    lapTopImages: { width: WIDTH / 4, height: HEIGHT / 9, },
    loadMoreContainer: { width: '60%', alignSelf: 'center', padding: 10, borderRadius: 15, alignItems: 'center', marginTop: "8%" },
    FlatListCardContainer: { backgroundColor: '#fff', elevation: 12, borderRadius: 12, padding: 12, margin: 12, width: '95%', alignSelf: 'center' },
    loadMoreContainertxt: { color: '#000', width: '80%', textAlign: 'center', fontWeight: '700', fontSize: 16 },
    discountPercentageContainer: { backgroundColor: 'green', position: 'absolute', bottom: 0, padding: 8, borderTopRightRadius: 16 },
    discountPercentageContainertxt: { fontSize: 14, color: '#fff', fontWeight: '900' },
    cardsDetailContainer: { width: '70%', padding: 12 },
    BuyNowContainer: { borderRadius: 6, backgroundColor: color.yellow, padding: 4, marginTop: 12 },
    BuyNowTxt: { color: '#000', textAlign: 'center', fontWeight: '700', paddingHorizontal: 6 },
    RemoveCartConatiner: { borderRadius: 6, backgroundColor: color.yellow, padding: 4, marginTop: 12 },
    RemoveCartTxt: { color: '#000', textAlign: 'center', fontWeight: '700', paddingHorizontal: 6 },
    cardFooterButtons: { flexDirection: 'row', justifyContent: 'space-between' },
    RatingsContainer: { flexDirection: 'row', marginTop: 6, right: 2 },
    title: { color: '#000', fontWeight: '800', textTransform: 'capitalize' }
})
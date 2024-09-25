import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, Image, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { products } from '../../Component/StaticData';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../Redux/Action/main/CardAction';
import Rating from '../../Component/Rating';
import { color } from '../../Component/BaseColor';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ShowToast from '../../Component/ShowToast';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Checkout = ({ navigation, ...props }) => {
    const [item, setitem] = useState(props?.route?.params?.item)
    const [quantity, setQuantity] = useState(1)
    const decrementCount = (id) => {
        if (quantity > 0) { setQuantity(quantity - 1); }
    };

    const confirmation = () => {
        Alert.alert(
            'Are you sure',
            'You want to place your order',
            [{
                text: 'Cancel', style: 'cancel',
                onPress: () => { },
            }, {
                text: 'Yes',
                onPress: () => { ShowToast('Your order is placed successfully'); navigation.goBack() },
            },],
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackArrow}>
                    <AntDesign name='leftcircle' size={26} color={'#ffff'} />
                </TouchableOpacity>
                <Text style={styles.headerMiddleTxt} >Detail</Text>
            </View>
            <View>
                <View style={styles.cardContainer}>
                    <View style={{ gap: 12 }}>
                        <View style={styles.imageConatiner}>
                            {item.category == 'smartphones' ? <Image source={require('../../Assets/Images/mobile.jpeg')} style={{ width: WIDTH / 4, height: HEIGHT / 5, }} />
                                : <Image source={require('../../Assets/Images/laptop.jpeg')} style={{ width: WIDTH / 2, resizeMode: 'contain', height: HEIGHT / 6, }} />}
                        </View>
                        <View style={{ width: '100%', padding: 12 }}>
                            <Text style={styles.title}>Category : {item.category}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.title}>Price : {item.price}/-</Text>
                            <Text style={styles.title}>Brand : {item.brand}</Text>
                            <Text style={styles.title}>Description : {item.description}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 6, right: 2 }}>
                                <Text style={styles.title}>Ratings : </Text>
                                <Rating ratings={item.rating} />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={{ borderRadius: 6, marginTop: 12 }}>
                                    <Text style={{ color: '#000', textAlign: 'center', fontWeight: '700', }}>Quantity : </Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', alignSelf: 'center' }}>
                                    <TouchableOpacity onPress={() => decrementCount(item.id)} style={{ borderRadius: 6, backgroundColor: color.yellow, marginTop: 12 }}>
                                        <Text style={{ color: '#000', alignSelf: 'center', fontWeight: '700', paddingHorizontal: 8, top: 2 }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ textAlign: 'center', color: '#000', top: 5, alignSelf: 'center' }}>{quantity <= 0 ? 1 : quantity}</Text>
                                    <TouchableOpacity onPress={() => { setQuantity(quantity + 1) }} style={{ borderRadius: 6, backgroundColor: color.yellow, padding: 4, marginTop: 12 }}>
                                        <Text style={{ color: '#000', textAlign: 'center', fontWeight: '700', paddingHorizontal: 6 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.TotalAmountContainer}>
                                    <Text>Total {quantity <= 1 ? props?.route?.params?.item?.price : props?.route?.params?.item?.price * quantity}/-</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.discountConatiner}>
                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: '900' }}>{item.discountPercentage}% Off</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => confirmation()} style={styles.FooterBtn}>
                <Text style={{ color: '#000', textAlign: 'center', fontWeight: '700', paddingHorizontal: 6 }}>Buy Now (COD)</Text>
            </TouchableOpacity>
            <Text style={styles.terms}>Terms and conditions apply</Text>
        </View>
    )
}

export default Checkout

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#fff' },
    headerContainer: { backgroundColor: color.base, padding: '4%', alignSelf: 'center', width: "100%", borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
    headerBackArrow: { zIndex: 1, position: 'absolute', top: 0, margin: 12, bottom: 0, justifyContent: 'center', alignContent: 'center', alignItems: 'center' },
    headerMiddleTxt: { color: "#fff", fontSize: 16, bottom: 3, textTransform: 'capitalize', fontWeight: "600", textAlign: 'center', },
    cardContainer: { backgroundColor: '#fff', elevation: 12, borderRadius: 12, padding: 12, margin: 12, width: '95%', alignSelf: 'center' },
    imageConatiner: { justifyContent: 'center', alignSelf: 'center' },
    TotalAmountContainer: { position: 'absolute', right: 0, top: 15, alignSelf: 'center' },
    FooterBtn: { width: '90%', alignSelf: 'center', position: 'absolute', bottom: '5%', borderRadius: 16, backgroundColor: color.yellow, padding: 12, marginTop: 12 },
    terms: { color: '#000', textAlign: 'center', position: 'absolute', bottom: 0, right: 0, left: 0, bottom: 12 },
    discountConatiner: { backgroundColor: 'green', position: 'absolute', top: 0, padding: 8, borderBottomRightRadius: 16 },
    title: { color: '#000', fontWeight: '800', textTransform: 'capitalize' },
    centeredView: { backgroundColor: 'red', position: 'absolute', bottom: 0 }

})
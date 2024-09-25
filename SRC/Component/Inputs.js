import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { color } from './BaseColor'

const { width, height } = Dimensions.get('window');

const Inputs = ({ Title, value, onChangeText, editable, placeholder, showPass, eyeEvent, secureTextEntry, keyboardType, multiline, maxLength, hide, editProfile, OnlyInputFiled, passwordTitle, PasswordValue, PassSecureTextEntry, setPassSecureTextEntry, OnChangePassValue }) => {
    return (
        <View style={{ alignSelf: 'center', width: '100%' }}>
            {OnlyInputFiled &&
                <>
                    <View>
                        <Text style={styles.title}>{Title}</Text>
                        <View style={{ borderRadius: 12, borderWidth: 1, borderColor: '#000', backgroundColor: 'grey' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <MaterialIcon name='email' size={20} color={'#fff'} />
                                </View>
                                <TextInput style={{ width: '75%', color: '#fff', fontSize: 15 }} placeholderTextColor={'#fff'}
                                    value={value}
                                    onChangeText={onChangeText}
                                    placeholder={placeholder}
                                    secureTextEntry={secureTextEntry}
                                    keyboardType={keyboardType}
                                    maxLength={maxLength}
                                    multiline={multiline}
                                    editable={editable}
                                />
                            </View>
                        </View>
                    </View>
                </>
            }

            {hide &&
                <View style={{ width: '100%', alignSelf: 'center' }}>
                    <View style={{}}>
                        <Text style={styles.title}>{passwordTitle}</Text>
                        <View style={{ borderRadius: 12, borderWidth: 1, borderColor: '#000', backgroundColor: 'grey' }}>
                            <View style={{ flexDirection: 'row', margin: '1%', justifyContent: 'space-evenly' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Entypo name='lock' size={20} color={'#fff'} />
                                </View>
                                <TextInput style={{ width: '65%', color: '#fff', fontSize: 15 }} placeholderTextColor={'#fff'}
                                    value={PasswordValue} onChangeText={OnChangePassValue}
                                    placeholder={placeholder}
                                    secureTextEntry={PassSecureTextEntry}
                                    autoCapitalize={'none'}
                                />
                                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={eyeEvent}
                                    activeOpacity={0.9}>
                                    {showPass === true ?
                                        <Entypo name='eye-with-line' size={20} color={'#fff'} />
                                        :
                                        <Entypo name='eye' size={20} color={'#fff'} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }

        </View>
    )
}

export default Inputs

const styles = StyleSheet.create({
    input: {
        height: 40, margin: 12, borderWidth: 1,
        borderRadius: 4, padding: 10,
    },
    title: { fontSize: 16, width: 280, color: "#000", fontWeight: '900', marginBottom: "2%" }
})
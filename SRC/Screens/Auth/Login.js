import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Inputs from '../../Component/Inputs'
import ShowToast from '../../Component/ShowToast'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {

    //Login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [securePass, setSecurePass] = useState(true)
    const [signPage, setSignPage] = useState(true)

    // SignUp
    const [signUpName, setSignUpName] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [SignUpphoneNo, setSignUpPhoneNo] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpSecurePass, setSignUpSecurePass] = useState(true)
    const [signConfirmPass, setSignConfirmPass] = useState('')
    const [signUpsecureConfirmPass, setSignUpSecureConfirmPass] = useState(true)

    const handleLogin = async () => {
        let detail = await AsyncStorage.getItem('signUpDetails')
        const storedCredentials = detail != null ? JSON.parse(detail) : null;
        if (email == '' && password == '') {
            ShowToast('Enter username or password.');
        } else if (storedCredentials?.userEmail === email && storedCredentials?.userPassword === password) {
            ShowToast('Login Successful');
            navigation.navigate('Bottom')
        } else {
            ShowToast('Invalid username or password.');
        }
    }

    const validateEmail = (inputEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputEmail.trim()) {
            ShowToast('Email is required');
        } else if (!emailRegex.test(inputEmail)) {
            ShowToast('Invalid email format');
        } else { }
    };

    const saveSignUpDetails = async (details) => {
        try {
            const jsonValue = JSON.stringify(details);
            await AsyncStorage.setItem('signUpDetails', jsonValue);
            ShowToast('Account created successfully!');
            setSignPage(true)

        } catch (e) {
            console.error('Failed to save sign-up details:', e);
        }
    };

    const signUp = async () => {
        validateEmail(signUpEmail);
        if (signUpName === '' || signUpEmail === '' || SignUpphoneNo === '') {
            ShowToast('Please Enter Name, Email and Phone Number')
        } else if (!validateEmail) {
            ShowToast('Invalid Email')
        } else if (SignUpphoneNo.length < 10) {
            ShowToast('Invalid Phone Number')
        } else if (signUpPassword == '') {
            ShowToast('Password is required')
        } else if (signConfirmPass == '') {
            ShowToast('Confirm Password is required')
        } else if (signUpPassword !== signConfirmPass) {
            ShowToast('Password and Confirm Password does not match')
        } else {
            const signUpData = {
                username: signUpName,
                userEmail: signUpEmail,
                userPhone: SignUpphoneNo,
                userPassword: signConfirmPass,
            };
            saveSignUpDetails(signUpData);
            console.log(signUpData, 'signUpData');
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#857a7a', opacity: 4 }}>

            {/* Login Page */}
            {signPage ?
                <View style={{ width: '95%', padding: '5%', alignSelf: 'center', borderRadius: 16, backgroundColor: '#fff', elevation: 12, }}>
                    <View>
                        <Text style={{ textAlign: 'center', color: '#000', fontWeight: '800', fontSize: 18 }}>Login</Text>
                    </View>
                    <View style={{ gap: 12 }}>
                        <Inputs placeholder={'Enter Email'} value={email} onChangeText={(txt) => setEmail(txt)} OnlyInputFiled={true} Title={'Email'} />
                        <Inputs placeholder={'Enter Password'} hide={true} value={password} OnChangePassValue={(txt) => setPassword(txt)} passwordTitle={'Password'} PassSecureTextEntry={securePass}
                            showPass={securePass} eyeEvent={() => setSecurePass(!securePass)}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: 'blue', width: '100%', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: "8%" }}
                        onPress={() => handleLogin()} activeOpacity={0.9} >
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSignPage(false)} style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 12 }}>
                        <Text style={{ color: '#000', fontWeight: '800', fontSize: 16, letterSpacing: 1 }}>Create new account</Text>
                    </TouchableOpacity>
                </View>
                :
                //  Sign Page
                <View style={{ width: '95%', padding: '5%', alignSelf: 'center', borderRadius: 16, backgroundColor: '#fff', elevation: 12, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ gap: 12 }}>
                            <View>
                                <Text style={{ textAlign: 'center', color: '#000', fontWeight: '800', fontSize: 18 }}>Sign Up</Text>
                            </View>
                            <Inputs placeholder={'Enter Full Name'} value={signUpName} onChangeText={(txt) => setSignUpName(txt)} OnlyInputFiled={true} Title={'Name'} />
                            <Inputs placeholder={'Enter Email'} value={signUpEmail} onChangeText={(txt) => setSignUpEmail(txt)} OnlyInputFiled={true} Title={'Email'} />
                            <Inputs placeholder={'Enter Mobile Number'} value={SignUpphoneNo} onChangeText={(txt) => setSignUpPhoneNo(txt)} OnlyInputFiled={true} Title={'Phone'} maxLength={10} keyboardType={'numeric'} />
                            <Inputs placeholder={'Create Password'} hide={true} value={signUpPassword} OnChangePassValue={(txt) => setSignUpPassword(txt)} PassSecureTextEntry={signUpSecurePass} showPass={signUpSecurePass} eyeEvent={() => setSignUpSecurePass(!signUpSecurePass)} passwordTitle={'Password'} />
                            <Inputs placeholder={'Enter Confirm Password'} hide={true} value={signConfirmPass} OnChangePassValue={(txt) => setSignConfirmPass(txt)} PassSecureTextEntry={signUpsecureConfirmPass} showPass={signUpsecureConfirmPass} eyeEvent={() => setSignUpSecureConfirmPass(!signUpsecureConfirmPass)} passwordTitle={'Confirm password'} />
                            <TouchableOpacity style={{ backgroundColor: 'blue', width: '100%', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: "8%" }}
                                onPress={() => signUp()} activeOpacity={0.9} >
                                <Text style={{ color: 'white', width: '80%', textAlign: 'center', fontWeight: '700', fontSize: 16 }}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSignPage(true)} style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 12 }}>
                                <Text style={{ color: '#000', fontWeight: '800', fontSize: 16, letterSpacing: 1 }}>Continue with login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            }
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    input: { height: 40, margin: 12, borderWidth: 1, borderRadius: 4, padding: 10, },
    title: { fontSize: 16, width: 280, color: "#000", fontWeight: '900', marginBottom: "2%" }
})
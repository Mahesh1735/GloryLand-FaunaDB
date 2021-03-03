import React, { useState, useEffect, useContext}from 'react';
import PropTypes from 'prop-types'
import { TextInput, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import colors from "../config/colors";
import Appbutton from "../components/Appbutton"
import AppTextInput from "../components/AppTextInput"
import { useQuery, useMutation, gql, useLazyQuery } from "@apollo/client";
import { and } from 'react-native-reanimated';
import AuthContext from '../auth/context';

const Login = ( {navigation} ) => {

    const [pno, setpno] = useState("");
    const authContext = useContext(AuthContext);
    


    const QUERY_USER = 
    gql`query FindUserByphone_no($phone_no: String="9182314190"){
      findUserByphone_no(phone_no: $phone_no){
        _id
        first_name
        last_name
        email
        phone_no
      }
    }`;

    const [getUser, { loading, data }] = useLazyQuery(QUERY_USER);


    if (loading){
        return (
            <SafeAreaView style={styles.background}>
            <Image style={styles.logo} source={require("../assets/name.jpg")}/>
            <Appbutton title='Loading...' color ='secondary' />
            </SafeAreaView>
        )
    };
    
    if(typeof(data) !== 'undefined'){
        if (data.findUserByphone_no !== null) {
            console.log(data.findUserByphone_no);
            authContext.setUser(data.findUserByphone_no);
            navigation.navigate("Explore");
        } else {
            alert("User Not found! Please Register");
            navigation.navigate("Register");
        }
    };
    

    return (
        <SafeAreaView style={styles.background}>
            <Image style={styles.logo} source={require("../assets/name.jpg")}/>
            <AppTextInput placeholder='Phone Number' onChangeText={text => setpno(text)} />
            <Appbutton title='LogIn' color ='secondary' onPress = {() => {
                getUser({ variables: { phone_no: pno } });
                
            // navigation.navigate("Explore");
            }}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width : "60%",
      position: 'relative',
      top : 10,
      resizeMode : 'contain',
    },
  });

export default Login

import React, { useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import colors from "../config/colors";
import Appbutton from "../components/Appbutton"
import AppTextInput from "../components/AppTextInput"
import { useQuery, useMutation, gql } from "@apollo/client"
import AuthContext from '../auth/context';


const Register = ({navigation}) => {

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [pno, setpno] = useState("");
    const [email, setemail] = useState("")

    const authContext = useContext(AuthContext);

    const ADD_USER = gql`
    mutation CreateUser($email: String = "", $first_name: String = "", $last_name: String = "", $phone_no: String = ""){
      createUser(data :{
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
        phone_no: $phone_no
      }){
        _id
      }
    }`;

    const[addUser, {data, loading}] = useMutation(ADD_USER);

    if (loading){
      return (
          <SafeAreaView style={styles.background}>
          <Image style={styles.logo} source={require("../assets/name.jpg")}/>
          <Appbutton title='Loading...' color ='secondary' />
          </SafeAreaView>
      )
    };

    console.log(data);

    if(typeof(data) !== 'undefined'){
        navigation.navigate("Login");
        alert("Registered! Please Login now")
    };

    return (
        <SafeAreaView style={styles.background}>
            <Image style={styles.logo} source={require("../assets/name.jpg")}/>
            <AppTextInput placeholder='First Name' onChangeText={text => setfname(text)} />
            <AppTextInput placeholder='Last Name' onChangeText={text => setlname(text)} />
            <AppTextInput placeholder='Phone Number' onChangeText={text => setpno(text)} />
            <AppTextInput placeholder='E-Mail' onChangeText={text => setemail(text)} />
            <Appbutton title='Register' color ='secondary' onPress = {() => {addUser({
                variables : {
                    email: email,
                    first_name: fname,
                    last_name: lname,
                    phone_no: pno
                }
            });
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

export default Register


import React, { useState, useEffect, useContext}from 'react';
import PropTypes from 'prop-types'
import { TextInput, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import colors from "../config/colors";
import Appbutton from "../components/Appbutton"
import AppTextInput from "../components/AppTextInput"
import { useQuery, useMutation, gql } from "@apollo/client";
import AuthContext from '../auth/context';


const Addform = ({ navigation, route }) => {
    
    const [area, setArea] = useState(0);
    const [suvNo, setSuvNo] = useState('0');

    const { user } = useContext(AuthContext);

    const ADD_PLOT = gql`
    mutation CreatePlot($long: Float!, $lat: Float!, $ara: Float!, $oby: ID!, $sun: String!){
      createPlot(data: {
        Latitude:$lat,
        longitude:$long,
        area: $ara,
        owned_by: {connect: $oby},
        survey_number: $sun
      }){
        _id
      }
    }
    `;

    const[addPlot, {data}] = useMutation(ADD_PLOT);

    return (
        <SafeAreaView style={styles.background}>
            <Image style={styles.logo} source={require("../assets/name.jpg")}/>
            <AppTextInput placeholder='Area (in sq.ft.)' onChangeText={text => setArea(Number(text))} />
            <AppTextInput placeholder='Survey Number' onChangeText={text => setSuvNo(text)} />
            <Appbutton title='Submit' color ='secondary' onPress = {() => {addPlot({
                variables : {
                    long: route.params.region.longitude,
                    lat: route.params.region.latitude,
                    ara: area,
                    oby: user._id,
                    sun: suvNo
                }
            });
            navigation.navigate("Explore");
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

export default Addform

import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import colors from "../config/colors";
import Appbutton from "../components/Appbutton"

function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.background}>
            <Image style={styles.logo} source={require("../assets/name.jpg")}/>
            <Appbutton title='Login' color ='whites' onPress = {() => {navigation.navigate("Login");}}/>
            <Appbutton title='Register' color ='secondary' onPress = {() => {navigation.navigate("Register");}}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width : "90%",
    position: "absolute",
    top : 250,
    resizeMode : 'contain',
    // margin : 10,
    // borderWidth: 2,
    // borderColor: colors.secondary,
  },
});

export default WelcomeScreen;
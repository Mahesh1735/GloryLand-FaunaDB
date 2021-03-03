import React from 'react';
import PropTypes from 'prop-types'
import { TextInput, View, StyleSheet } from 'react-native'
import colors from "../config/colors";


function AppTextInput({...props}) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} {...props}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.whites,
        borderRadius: 25,
        flexDirection: "row",
        width: '90%',
        padding: 15,
        marginVertical: 10
    },
    textInput : {
        fontSize: 18
    }
})

export default AppTextInput;
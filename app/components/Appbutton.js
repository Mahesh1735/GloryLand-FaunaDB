import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';
import color from '../config/colors'
function Appbutton({title, color, onPress}) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor : colors[color]}]} onPress={onPress}>
        <View>
            <Text style = {styles.text}>{title}</Text>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        borderRadius : 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding : 15,
        width: '90%',
        marginVertical : 30,
    },
    text: {
        color: colors.primary,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: "bold"
    }
})

export default Appbutton;
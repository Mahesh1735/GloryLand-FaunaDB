import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import Explore from './app/screens/Explore';
import Register from './app/screens/Register';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Addform from './app/screens/Addform';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/screens/Login';
import AuthContext from './app/auth/context';
// fnAEDTvZejACARRuJG8zc5peZI3yB4eHDC_tbXSc
const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${"fnAEDTvZejACARRuJG8zc5peZI3yB4eHDC_tbXSc"}`,
  },
  cache: new InMemoryCache(),
})

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
    <Stack.Screen name="Register" component={Register}/>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Explore" component={Explore}/>
    <Stack.Screen name="Addform" component={Addform}/>
  </Stack.Navigator>
);



export default function App() {
  const [user, setUser] = useState();
  
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>{
        <ApolloProvider client={client}>
          <StackNavigator/>
        </ApolloProvider>
      }</NavigationContainer>
    </AuthContext.Provider>);
}
import React, { useState, useEffect}from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { useQuery, useMutation, gql } from "@apollo/client";
import Appbutton from "../components/Appbutton"
import colors from "../config/colors";

export default function Explore({ navigation }) {

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  });

  const [markers, setMarkers] = useState([]);
  const [adding, setAdding] = useState(false);

  const GET_MARKERS = gql`
  query AllPlots{
    allPlots{
      data{
        area
        Latitude
        longitude
        survey_number
        owned_by{
          first_name
          last_name
          phone_no
        }
      }
    }
  }
  `;
  const {loading, error, data, refetch} = useQuery( GET_MARKERS);
  useEffect(() => {
    setMarkers(loading? []: data.allPlots.data);
  }, [data]);
  

  const getLocation = async () => {
    const {granted} = await Location.requestPermissionsAsync();
    console.log(granted);
    if (!granted) return;
    const {coords:{latitude, longitude}} = await Location.getLastKnownPositionAsync();
    setRegion({latitude, longitude, latitudeDelta: 0.009, longitudeDelta: 0.009});
  }

  const getMarkers = async () => {
    const {granted} = await refetch();
    if (!granted) return;
  }

  useEffect(() => {
    getLocation();
  }, [])
  
  useEffect(() => {
    getMarkers();
  }, [region])

  return (
    <SafeAreaView  style={styles.container}>
      <MapView style={styles.map} region={region}
      onRegionChangeComplete={region => setRegion(region)}
      mapType={"hybrid"} showsUserLocation={true} showsMyLocationButton={true} showsCompass={true}>

        {markers.map((marker, index) => (
          <Marker
            key = {index}
            coordinate={{ latitude : marker.Latitude , longitude : marker.longitude }}
          ><Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.name}>{marker.owned_by.first_name} {marker.owned_by.last_name}</Text>
              <Text>{marker.area} sq.ft. </Text>
              <Text>{marker.owned_by.phone_no}</Text>
              {/* <Image 
                style={styles.image}
                source={require('../assets/banners/food-banner1.jpg')}
              /> */}
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
        </Marker>
        ))}
        { adding ?
          <Marker 
          coordinate={{ latitude : region.latitude , longitude : region.longitude }}
          pinColor = {colors.secondary}
          >
            
          </Marker>
          : <Circle
          center ={{ latitude : region.latitude , longitude : region.longitude }}
          radius = {0}
          />
        }
      </MapView>
      <Appbutton title= { adding? 'Confirm':'Add Plot'} color ='secondary' 
      onPress={() => {
        setAdding(!adding)
        if (adding) {
          navigation.navigate("Addform", {region : region});
        }
        }}/>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: colors.whites,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 5,
    // width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.whites,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  }
});
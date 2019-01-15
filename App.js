/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoding';
import FakeMarker from './map-marker.png';

Geocoder.init('Your Api Key');

export default class App extends Component {

  constructor (props) {
    super(props);
    this.state={address:null ,region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0070,
      longitudeDelta: 0.0085,
    },marker:{latlng:{
      latitude: 37.78825,
      longitude: -122.4324,
    }}
     }
    }

  openSearchModal() {
   RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
   // alert(JSON.stringify(place));
   let myregion = {latitude:place.latitude,longitude:place.longitude,latitudeDelta:0.0922,longitudeDelta:0.0421};
   this.setState({region:myregion});

  //  let mymarker = {latlng:{
  //   latitude: place.latitude,
  //   longitude: place.longitude,
  // }};
  // this.setState({marker:mymarker});

   this.setState({name:place.name});
   this.setState({address:place.address});
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  // onUserPinDragEnd = (e) =>{
  //   let mye=e.nativeEvent.coordinate;
  
  //  Geocoder.from(mye.latitude,mye.longitude)
  //  .then(json => {
  //    let addressComponent = json.results[0].formatted_address;
  //    this.setState({name:''});
  //    this.setState({address:addressComponent});
  //  })
  //  .catch(error => console.warn(error));
  // }

  onChange = (e) => {
   // alert(JSON.stringify(e));
    this.setState({region:e});

    Geocoder.from(e.latitude,e.longitude)
     .then(json => {
       let addressComponent = json.results[0].formatted_address;
       this.setState({name:''});
       this.setState({address:addressComponent});
     })
     .catch(error => console.warn(error));
 
  }

 

  
  render() {
    return (
      <View style={styles.container}>
      <View style={{height:40,borderWidth:1,borderColor:'grey',margin:10,borderRadius:5,justifyContent:'center'}}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text style={{marginLeft:10}}>Search</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
   
    <MapView style={styles.map} region={this.state.region} onRegionChangeComplete={this.onChange}>
  {/* <Marker centerOffset
   // draggable
    coordinate={this.state.marker.latlng}
   // title={this.state.marker.title}
    //description={this.state.marker.description}
   // onDragEnd={this.onUserPinDragEnd}
    /> */}
</MapView>


  </View>

  <View style={{position:'absolute',bottom:'50%',width:'100%',alignItems:'center'}}>
  <Image source={FakeMarker} style={{width:50,height:50}} />
  </View>

  {this.state.address!=null ?

  <View style={{position:'absolute',bottom:'70%',borderWidth:1,borderColor:'grey',margin:10,borderRadius:5,backgroundColor:'white',padding:20}}>

  <Text style={{color:'black',fontSize:15}}>{this.state.name} {this.state.address}</Text>

  </View> : null }
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
   // alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 
});

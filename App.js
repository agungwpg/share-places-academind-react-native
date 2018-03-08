import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: [] 
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position =>{
      this.setState({
        userLocation:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
      fetch('https://forevent-595c0.firebaseio.com/places.json',{
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    },err => console.log(err));
  }
  getUserPlacesHandler = () =>{
    fetch('https://forevent-595c0.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes =>{
        const placesArray = [];
        for(const key in parsedRes){
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        this.setState({
          usersPlaces: placesArray
        });
      })
      .catch(err => console.log(err));
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Button title="Get user places"
          onPress={this.getUserPlacesHandler}
          
          />
         </View>
        <FetchLocation onGetLocation={this.getLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} userPlaces={this.state.usersPlaces} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

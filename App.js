/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'black'}}>
          Traffic Cam App
        </Text>
        <Button
          onPress= { () => navigate("Cameras") }
          title="CAMERAS"
          color="#008080"
          />
      </View>
    );
  }
}

export default class App extends Component {
  render () {
    return <NavigationApp />;
  }
}



const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Cameras: { screen: CameraScreen },
});


class CameraScreen extends Component {

  static navigationOptions = {
    title: 'Cameras',
  };

  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }


  fetchData = async () => {
    const response = await fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
    const json = await response.json();
    this.setState({ data: json.Features });
  };

  cameraType(camera) {
      if(camera.Type == 'wsdot'){
            return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;
      }else{            
			return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
      }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={ ({item}) =>
            <View style={styles.textM}>
             <Image
                source = {{ uri: this.cameraType(item.Cameras[0]) }}
                style = {{height: 230, margin: 2}}
                />

              <Text style={{fontSize: 18, color: 'blue'}}>
                {`${item.Cameras[0].Description}`}
              </Text>
            </View>

          }
         />
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
	alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  textM: {
    marginBottom: 20
  },
});


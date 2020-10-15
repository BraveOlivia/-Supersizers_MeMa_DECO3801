import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Button,
} from "react-native";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: 0,
      supperssNotification: "OFF",
    }
  }

  backgroundColorOnPress = () => {
    this.setState({
      backgroundColor: Math.floor(Math.random() * 10) + 1
    })
  }

  suppressNotificationOnPress = () => {
    if (this.state.supperssNotification == "OFF") {
      this.setState({
        supperssNotification: "ON"
      })
    } else {
      this.setState({
        supperssNotification: "OFF"
      })
    }
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <ImageBackground
        source={require("../assets/BackgroundOrange.png")}
        style={styles.backgroundImage}
        >
          <View style={styles.settingItems}>
            <Text>Change Background Color</Text>
            <Button
              title={this.state.backgroundColor}
              onPress={this.backgroundColorOnPress}
            />
          </View>
          <View style={styles.settingItems}>
            <Text>Suppress Notifications</Text>
            <Button
              title={this.state.supperssNotification}
              onPress={this.suppressNotificationOnPress}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "flex-start",
    },

    settingItems: {
      backgroundColor: "#ffffff",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 10,
      borderRadius: 5,
    },  
  });
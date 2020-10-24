import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Button,
} from "react-native";
import { fb, Fire } from "../src/firebase/APIKeys";
import {getBackgroundImage} from "../components/images";

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: 5,
    }
    this.readData();
  }

  readData() {
    fb.database()
      .ref("response/" + this.user._id + "/backgroundColor")
      .once("value", (dataSnapShot) => {
        var tempColor = dataSnapShot.val();
        this.setState({ backgroundColor: tempColor });
      });
  }

  get user() {
    return {
      //   name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  backgroundColorOnPress = () => {
    var color = Math.floor(Math.random() * 7) + 1;
    this.updateBackgroundColor(color);
    this.setState({
      backgroundColor: color
    })
  }

  updateBackgroundColor(color) {
    fb.database()
    .ref("response/" + this.user._id)
    .update({
      backgroundColor: color,
    })
    .then(() => {
      console.log("Background Color Changed");
    })
    .catch((error) => {
      console.log(error);
    });
  } 

  signOutPress = () => {
    fb.auth().signOut();
  };

  // suppressNotificationOnPress = () => {
  //   if (this.state.supperssNotification == "OFF") {
  //     this.setState({
  //       supperssNotification: "ON"
  //     })
  //   } else {
  //     this.setState({
  //       supperssNotification: "OFF"
  //     })
  //   }
  // }

  render() {
    const background = getBackgroundImage(this.state.backgroundColor);
    return(
      <View style={{ flex: 1 }}>
        <ImageBackground
        source={background}
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
            <Text>Sign Out</Text>
            <Button
              title={"Sign Out"}
              onPress={this.signOutPress}
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
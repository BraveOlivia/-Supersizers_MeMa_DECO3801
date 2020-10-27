import React, { Component } from "react";
import { StyleSheet, ImageBackground, Text, View, Button } from "react-native";
import { inlineStyles } from "react-native-svg";
import { getBackgroundImage } from "../components/images";
import { fb, Fire } from "../src/firebase/APIKeys";

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: 0,
      supperssNotification: "OFF",
    };
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
      _id: Fire.shared.uid,
    };
  }

  //Occurs when signout is pressed;
  signOutPress = () => {
    fb.auth().signOut();
  };

  backgroundColorOnPress = () => {
    // Iterate over 1 to 7
    if (this.state.backgroundColor != 7) {
      this.updateBackgroundColor(this.state.backgroundColor + 1);
      this.setState((state) => {
        return { backgroundColor: state.backgroundColor + 1 };
      });
    } else {
      this.updateBackgroundColor(1);
      this.setState({ backgroundColor: 1 });
    }
  };

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

  suppressNotificationOnPress = () => {
    if (this.state.supperssNotification == "Turn Off") {
      this.setState({
        supperssNotification: "Turn On",
      });
    } else {
      this.setState({
        supperssNotification: "Turn Off",
      });
    }
  };

  render() {
    const background = getBackgroundImage(this.state.backgroundColor);
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={background} style={styles.backgroundImage}>
          <View style={styles.btnContainer}>
            <View style={styles.settingItems}>
              <Text style={styles.bodyText}>Change Background Color</Text>
              <Button
                style={styles.bodyText}
                title={"Change"}
                onPress={this.backgroundColorOnPress}
              />
            </View>
            <View style={styles.settingItems}>
              <Text style={styles.bodyText}>Notifications</Text>
              <Button
                style={styles.bodyText}
                title={this.state.supperssNotification}
                onPress={this.suppressNotificationOnPress}
              />
            </View>

            <View style={styles.settingItems}>
              <Text style={styles.bodyText}>Sign Out</Text>
              <Button
                style={styles.bodyText}
                title={"Sign Out"}
                onPress={this.signOutPress}
              />
            </View>
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

  btnContainer: {
    flex: 1,
    marginTop: 20,
  },

  settingItems: {
    marginTop: 15,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
    height: 40,
  },

  bodyText: {
    fontSize: 16,
  },

  btnText: {
    fontSize: 16,
  },
});

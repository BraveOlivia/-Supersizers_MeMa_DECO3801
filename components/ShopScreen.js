// Homescreen.js

import React, { Component } from "react";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faDollarSign,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <FontAwesomeIcon icon={faHome} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faDollarSign} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faCogs} size={30} color={"grey"} />
        </View>

        <View style={styles.avatarContainer}>
          <Text style={styles.avatarDialogue}>hello this is shop page.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    flex: 1,
    flexDirection: "column",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  avatarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  footMenu: {
    flex: 0.1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
    flexDirection: "column",
    margin: 30,
    padding: 1,
    marginBottom: "10%",
  },

  menurow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  avatar: {
    width: "50%",
    height: "50%",
    margin: 50,
  },

  avatarDialogue: {
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    borderWidth: 0.5,
    borderRadius: 5,
    width: 250,
    padding: 10,
    marginTop: "20%",
    justifyContent: "center",
  },

  emotionStatus: {
    flex: 1.2,
    width: 250,
    backgroundColor: "lightgreen",
    justifyContent: "center",
  },

  healthStatus: {
    margin: 5,
    flex: 1.2,
    width: 250,
    backgroundColor: "orange",
    justifyContent: "center",
  },
});

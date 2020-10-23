import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { fb, Fire } from "../src/firebase/APIKeys";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  createAppContainer,
} from "@react-navigation/stack";

var baseCurrency = 0;
var userid = Fire.shared.user._id;

function readData() {
  fb.database()
    .ref("response/" + userid + "/currency")
    .once("value", (dataSnapShot) => {
      baseCurrency = dataSnapShot.val();
    });
}

const Header = (props) => {
  readData();
  return (
    <View style={styles.header}>
      <FontAwesome style={styles.iconStyle} name="home" />
      <MaterialIcons style={styles.iconStyle} name="settings" />
      <Text style={styles.pageTitle}> {props.pageName} </Text>
      <Text style={styles.myCurrency}>${baseCurrency}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 25,
    color: "white",
    borderColor: "#FF9933",
    borderRadius: 1,
    textAlign: "center",
    position: "relative",
  },

  iconStyle: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    margin: 10,
    position: "relative",
  },

  myCurrency: {
    fontSize: 25,
    color: "white",
    textAlign: "right",
    position: "absolute",
    right: 0,
    margin: 10,
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { fb, Fire } from "../src/firebase/APIKeys";
import * as firebase from 'firebase';
var baseCurrency = 0;
var userid = null;
// ()=>readData();
function readData() {
  firebase.database()
    .ref("response/" + userid + "/currency")
    .once("value", (dataSnapShot) => {
      baseCurrency = dataSnapShot.val();
    });
}

const Header = ({props, pageName}) => {
  userid = Fire.shared.user._id;
  readData();
  return (
    <View style={styles.header}>
      <FontAwesome 
        style={styles.iconStyle} 
        name="home" 
        onPress={() => props.navigation.navigate("Home")}/>
      <MaterialIcons 
        style={styles.iconStyle} 
        name="settings" 
        onPress={() => props.navigation.navigate("Settings")}/>
      <Text style={styles.pageTitle}> {pageName} </Text>
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

import { StatusBar } from "expo-status-bar";
import React from "react";
import Home from "./app/screens/Home";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";

export default function App() {
  console.log("App Executed");
  return <Home />;
  // Android does not support Alert.prompt
  // Leave this feature for now
  // <View style={styles.startContainer}>
  //   <Button
  //     color="fuchsia"
  //     title="Start"
  //     onPress={() => Alert.prompt("Enter names", "Please Enter your name")}
  //   />
  // </View>
}

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
});

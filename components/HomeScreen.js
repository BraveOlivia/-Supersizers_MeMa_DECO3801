// Homescreen.js
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  createAppContainer,
} from "@react-navigation/stack";

export default class Homescreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.avatarContainer}>
          <Text>G'day, staying healthy?</Text>
          <Image
            style={styles.avatar}
            source={require("../app/assets/avatar.png")}
          />
          <Button
            color="fuchsia"
            title="Feed Avatar"
            onPress={() => Alert.alert("Avatar:", "Thank you!")}
          />
          <StatusBar style="auto" />
        </View>

        <View style={styles.menuContainer}>
          <Button
            title="QuestPage"
            onPress={() => this.props.navigation.navigate("Quest")}
          />
          <Button
            title="Nutritional Tips"
            onPress={() => console.log("Nutritional Tips Button Pressed")}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              title="Socialise"
              onPress={() => console.log("Socialise Button Pressed")}
            />
            <Button
              title="Setting"
              onPress={() => console.log("Setting Button Pressed")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    flex: 1.5,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  avatar: {
    width: 175,
    height: 175,
  },
});

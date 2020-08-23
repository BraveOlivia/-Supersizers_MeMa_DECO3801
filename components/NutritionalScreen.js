import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default class NutritionalScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Nutritional Tips Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

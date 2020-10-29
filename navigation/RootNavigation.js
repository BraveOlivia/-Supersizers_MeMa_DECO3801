import { Notifications } from "expo";
import React, { Component } from "react";
import LogInScreen from "../components/auth/LogInScreen";
import SignUpScreen from "../components/auth/SignUpScreen";
import ForgotPasswordScreen from "../components/auth/ForgotPasswordScreen";
import { HomeScreen } from "../components/ScreenComponents";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
//This is the root navigator to navigate across registering features
export default class RootNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="Main" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

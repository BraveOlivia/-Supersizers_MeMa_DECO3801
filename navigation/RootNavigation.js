import { Notifications } from "expo";
import React, { Component } from "react";
import LogInScreen from "../components/auth/LogInScreen";
import SignUpScreen from "../components/auth/SignupScreen";
import ForgotPasswordScreen from "../components/auth/ForgotPasswordScreen";
import { HomeScreen } from "../components/ScreenComponents";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
// {
//   Login: { screen: LogInScreen },
//   Signup: { screen: SignUpScreen },
//   ForgotPassword: { screen: ForgotPasswordScreen },

//   Main: { screen: HomeScreen },
// },
// {
//   navigationOptions: () => ({
//     headerTitleStyle: {
//       fontWeight: "normal",
//     },
//   }),
// }

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

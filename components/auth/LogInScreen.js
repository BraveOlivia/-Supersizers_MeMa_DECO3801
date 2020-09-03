import React, { Component } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import * as firebase from "firebase";

export default class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {},
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  onCreateAccountPress = () => {
    // NavigationActions.navigate("SignUp");
    var navActions = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "SignUp" })],
    });
    this.props.navigation.dispatch(navActions);
  };

  onForgotPasswordPress = () => {
    var navActions = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "ForgotPassword" })],
    });
    this.props.navigation.dispatch(navActions);
  };
  render() {
    return (
      <View style={{ paddingTop: 50, alignItems: "center" }}>
        <Text>Login</Text>

        <TextInput
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={this.state.email}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={{ paddingTop: 10 }} />

        <TextInput
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button title="Login" onPress={this.onLoginPress} />
        <Button
          title="Create account..."
          onPress={() => this.props.navigation.navigate("Signup")}
        />
        <Button
          title="Forgot Password..."
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        />
      </View>
    );
  }
}

// const style = StyleSheet.create({});

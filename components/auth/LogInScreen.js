import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import * as firebase from "firebase";

export default class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }
  onLoginPress = () => {
    if (this.state.email.length === "" && this.state.password.length === "") {
      Alert.alert("Enter details to signin!");
      return;
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          () => {
            this.setState({
              isLoading: false,
              email: "",
              password: "",
            });
          },
          (error) => {
            Alert.alert(error.message);
            return;
          }
        );
    }
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
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/BackgroundOrange.png")}
            style={styles.backgroundImage}
          >
            <Text>Login</Text>

            <TextInput
              style={styles.inputStyle}
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
              style={styles.inputStyle}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Button
              style={styles.loginText}
              title="Login"
              containerStyle={{ paddingTop: 10 }}
              onPress={this.onLoginPress}
            />
            <Button
              style={styles.loginText}
              title="Create account..."
              onPress={() => this.props.navigation.navigate("Signup")}
            />
            <Button
              style={styles.loginText}
              title="Forgot Password..."
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
            />
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
} from "react-native";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

// This is the forgot password screen in case users forget their password
export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  //Reset password pressed
  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert("Password reset email has been sent.");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };
  //Return to login screen
  onBackToLoginPress = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/BackgroundOrange.png")}
          style={styles.backgroundImage}
        >
          <Text style={styles.HeadingText}>Forgot Password</Text>

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

          <View style={styles.SignInButtons}>
            <Button
              style={styles.loginText}
              title="Reset Password"
              onPress={this.onResetPasswordPress}
            />
            <Button
              style={styles.loginText}
              title="Back to Login..."
              onPress={this.onBackToLoginPress}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "65%",
    marginBottom: 10,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    textAlign: "center",
  },
  loginText: {
    color: "#990000",
    marginTop: 20,
    textAlign: "center",
    flexDirection: "column",
    backgroundColor: "#FFE5CC",
    borderRadius: 5,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
    width: 150,
    height: 30,
    flexDirection: "column",
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
  HeadingText: {
    fontSize: 30,
    fontWeight: "500",
    color: "#990000",
    textAlign: "center",
    marginBottom: 40,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#990000",
    textAlign: "center",
  },
  customBtnBG: {
    backgroundColor: "#FFE5CC",
    borderRadius: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    width: 100,
    height: 40,
    flexDirection: "column",
  },
  SignInButtons: {
    margin: 20,
    alignItems: "center",
    alignContent: "center",
  },
});

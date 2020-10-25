import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
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
            <Text style={styles.HeadingText}>Login</Text>

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
            <View style={styles.SignInButtons}>
              <TouchableOpacity
                style={styles.loginText}
                onPress={() => this.onLoginPress()}
                containerStyle={{ paddingTop: 10 }}
              >
                <Text style={styles.customBtnText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginText}
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                <Text style={styles.customBtnText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginText}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.customBtnText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
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
    width: "85%",
    marginBottom: 10,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#FFFFFF",
    borderBottomWidth: 5,
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
    fontSize: 16,
    fontWeight: "400",
    color: "#990000",
    textAlign: "center",
    marginBottom: 20,
  },
  customBtnBG: {
    backgroundColor: "#FFE5CC",
    borderRadius: 5,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
    width: 100,
    height: 30,
    flexDirection: "column",
  },
  SignInButtons: {
    alignItems: "center",
    alignContent: "center",
  },
});

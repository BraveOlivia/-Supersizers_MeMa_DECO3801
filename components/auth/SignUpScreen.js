import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

//Retrieve the avatar template from firebase
function readUserTemplate(uid) {
  firebase
    .database()
    .ref("response/1/")
    .once("value", (dataSnapShot) => {
      var key = dataSnapShot.val();
      createNewUser(uid, key);
    });
}

// Create a new response user data storing from the existing template
function createNewUser(index, content) {
  return new Promise(function (resolve, reject) {
    let key;
    if (index != null) {
      key = index;
    } else {
      key = firebase.database().ref().push().key;
    }
    let dataToSave = content;
    // console.log(dataToSave);
    firebase
      .database()
      .ref("/response/" + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//This is the SignUp page where user can register new accounts
export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  }

  //Signup button pressed
  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          readUserTemplate(firebase.auth().getUid());
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };
  //Return back to login
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
          <Text style={styles.HeadingText}>Sign Up</Text>
          <TextInput
            title="Signup"
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

          <View style={{ paddingTop: 10 }} />

          <TextInput
            style={styles.inputStyle}
            value={this.state.passwordConfirm}
            onChangeText={(text) => {
              this.setState({ passwordConfirm: text });
            }}
            placeholder="Password (confirm)"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.loginText}
            onPress={this.onSignupPress}
          >
            <Text style={styles.customBtnText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginText}
            onPress={this.onBackToLoginPress}
          >
            <Text style={styles.customBtnText}>Back to Login</Text>
          </TouchableOpacity>

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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#990000",
    textAlign: "center",
  },
  loginText: {
    color: "#990000",
    marginTop: 30,
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
    alignSelf: "center",
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
    marginBottom: 20,
  },
});

import React, { Component, useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import * as firebase from "firebase";
import {fb, Fire} from '../../src/firebase/APIKeys';

function readUserTemplate(uid) {
  let key;
  firebase.database()
    .ref("/userData/1")
    .once("value", (dataSnapShot) => {
      key = dataSnapShot.val();
      console.log(key);
      createNewUser(uid, key);
    });
}

// Update tip after the tip has been read
function createNewUser(index, content) {
  return new Promise(function (resolve, reject) {
    let key;
    if (index != null) {
      key = index;
    } else {
      key = firebase.database().ref().push().key;
    }
    let dataToSave = content;
    console.log(dataToSave);
    fb.database()
      .ref("/userData/" + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
    readUserTemplate = readUserTemplate.bind(this);
  }

  get user() {
    return {
      //   name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

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

  // Update tip after the tip has been read
  // createNewUser = (index, id, name, tip, type, reward, complete) => {
  //   return new Promise(function (resolve, reject) {
  //     let key;
  //     if (id != null) {
  //       key = id;
  //     } else {
  //       key = fb.database().ref().push().key;
  //     }
  //     let dataToSave = {
  //       tipID: key,
  //       tipName: name,
  //       complete: complete,
  //       tipReward: reward,
  //       tip: tip,
  //       tipType: type,
  //     };
  //     console.log(dataToSave);
  //     fb.database()
  //       .ref("/response/nutritionalTips/" + index)
  //       .update(dataToSave)
  //       .then((snapshot) => {
  //         resolve(snapshot);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // };

  onBackToLoginPress = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={{ paddingTop: 50, alignItems: "center" }}>
        <Text>Signup</Text>
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

        <View style={{ paddingTop: 10 }} />

        <TextInput
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={this.state.passwordConfirm}
          onChangeText={(text) => {
            this.setState({ passwordConfirm: text });
          }}
          placeholder="Password (confirm)"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button title="Signup" onPress={this.onSignupPress} />

        <Button title="Back to Login" onPress={this.onBackToLoginPress} />
      </View>
    );
  }
}

const style = StyleSheet.create({});

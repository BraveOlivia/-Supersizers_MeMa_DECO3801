import React, { Component } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { NavigationContainer } from "@react-navigation/native";
import { APIKeys } from "../src/firebase/APIKeys";

export default class ChatScreen extends Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: Fire.uid,
      name: this.props.navigation.state.params.name,
    };
  }

  componentDidMount() {
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }

  componentWillMount() {
    Fire.off();
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.send}
        user={this.user}
      />
    );

    if (Platform.OS == "android") {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={30}
          enabled
        >
          {chat}
        </KeyboardAvoidingView>
      );
    }

    return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
  },
  backrgoundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});

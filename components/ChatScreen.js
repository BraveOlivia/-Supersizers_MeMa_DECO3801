// @flow
import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { StyleSheet, View } from "react-native";
import { fb, Fire } from "../src/firebase/APIKeys";
//This is the Chat Forum where users can share their thoughts and hack
export default class ChatScreen extends React.Component {
  state = {
    messages: [],
  };
  //Getting user ID
  get user() {
    return {
      //   name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.shared.send}
          user={this.user}
        />
      </View>
    );
  }

  componentDidMount() {
    Fire.shared.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
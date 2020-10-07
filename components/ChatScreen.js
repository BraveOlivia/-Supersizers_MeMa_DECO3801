// @flow
import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { StyleSheet } from "react-native";
import { Fire } from "../src/firebase/APIKeys";

// type Props = {
//   name?: string,
// };

export default class ChatScreen extends React.Component {
  //   static navigationOptions = ({ navigation }) => ({
  //     title: (navigation.state.params || {}).name || "Chat!",
  //   });
  state = {
    messages: [],
  };

  get user() {
    return {
      //   name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
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

// // import React, { Component } from "react";
// // import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
// // import { GiftedChat } from "react-native-gifted-chat";
// // import { NavigationContainer } from "@react-navigation/native";
// // import { createStackNavigator } from "@react-navigation/stack";
// // import { Fire, fb } from "../src/firebase/APIKeys";

// // export default class ChatScreen extends Component {
// //   state = {
// //     messages: [],
// //   };

// //   get user() {
// //     return {
// //       _id: Fire.uid,
// //       name: this.props.navigation.state.params.name,
// //     };
// //   }

// //   componentDidMount() {
// //     Fire.get((message) =>
// //       this.setState((previous) => ({
// //         messages: GiftedChat.append(previous.messages, message),
// //       }))
// //     );
// //   }

// //   componentWillMount() {
// //     Fire.off();
// //   }

// //   render() {
// //     const chat = (
// //       <GiftedChat
// //         messages={this.state.messages}
// //         onSend={Fire.send}
// //         user={this.user}
// //       />
// //     );

// //     if (Platform.OS == "android") {
// //       return (
// //         <KeyboardAvoidingView
// //           style={{ flex: 1 }}
// //           behavior="padding"
// //           keyboardVerticalOffset={30}
// //           enabled
// //         >
// //           {chat}
// //         </KeyboardAvoidingView>
// //       );
// //     }

// //     return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
// //   }
// // }
// =======
//       _id: Fire.uid,
//       name: this.props.navigation.state.params.name,
//     };
//   }

//   componentDidMount() {
//     Fire.get((message) =>
//       this.setState((previous) => ({
//         messages: GiftedChat.append(previous.messages, message),
//       }))
//     );
//   }

//   componentWillMount() {
//     Fire.off();
//   }

//   render() {
//     const chat = (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={Fire.send}
//         user={this.user}
//       />
//     );

//     if (Platform.OS == "android") {
//       return (
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior="padding"
//           keyboardVerticalOffset={30}
//           enabled
//         >
//           {chat}
//         </KeyboardAvoidingView>
//       );
//     }

//     return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
//   }
// }

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

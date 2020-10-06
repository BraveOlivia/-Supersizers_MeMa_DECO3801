// Homescreen.js

import React, { Component, useState } from "react";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import CheckBox from "react-native-check-box";

import * as firebase from "firebase";

import {
  faHome,
  faDollarSign,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { fb } from "../src/firebase/APIKeys";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      avatarCurrency: 0,
      items: {},
    };
  }

  componentDidMount() {
    fb.database.ref("response/shop").on("value", (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let shopitems = { ...data };
      console.log(data);
      this.setState({
        items: shopitems,
      });
    });
    fb.database.ref("response/currency").on("value", (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      console.log(data);
      this.setState({
        avatarCurrency: data,
      });
    });
  }

  render() {
    let itemKeys = Object.keys(this.state.items);

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Text>Your currency: {this.state.avatarCurrency}</Text>
        </View>

        <View>
          {itemKeys.length > 0 ? (
            itemKeys.map((key) => (
              <ShopItem key={key} id={key} shopItem={this.state.items[key]} />
            ))
          ) : (
            <Text>No character to unlock</Text>
          )}
        </View>
      </View>
    );
  }
}

const ShopItem = ({ shopItem: { price: itemprice, done }, id }) => {
  const [doneState, setDone] = useState(done);

  const onCheck = () => {
    setDone(!doneState);
    fb.database.ref("response/shop").update({
      [id]: {
        price: itemprice,
        bought: !doneState,
      },
    });
    Alert.alert("Congrats, a new character unlocked!");
  };

  // style check box after clicking
  return (
    <View style={styles.itemContainer}>
      <Image
        style={styles.avatar}
        source={require("../assets/avatar/avatar_2.png")}
      />

      <Button title="buy" onPress={onCheck} disabled={doneState} />
      <Text style={[styles.buyText, { opacity: doneState ? 0.2 : 1 }]}>
        Price: {itemprice}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    flex: 1,
    flexDirection: "column",
  },

  itemContainer: {
    height: 230,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },

  avatarContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: "18%",
    height: "26%",
    alignItems: "center",
  },

  buyText: {
    textAlign: "center",
  },
});

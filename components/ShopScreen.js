// Homescreen.js

import Icon from "react-native-vector-icons/Ionicons";
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Button,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { fb } from "../src/firebase/APIKeys";
import images from "../components/images";

var baseCurrency = 500;

// function displayChracter(data) {
//   if (data === 0) {
//     console.log("000000 test reach here");
//     return images.character0;
//     // <View key={0} style={styles.itemContainer}>
//     //   <Text>Text msg - 000 </Text>
//     //   <Image style={styles.avatar} source={images.character0} />
//     //   {/* <Text style={styles.text}>Price: {item["price"]}</Text> */}
//     //   <Button title="buy" disabled={true} />
//     // </View>
//   } else if (data === 1) {
//     console.log("********test reach here");
//     return (
//       <View key={1} style={styles.itemContainer}>
//         <Text>Text msg - 111</Text>
//         <Image style={styles.avatar} source={images.character1} />
//         <Text style={styles.text}>Price: {item["price"]}</Text>
//         <Button title="buy" disabled={true} />
//       </View>
//     );
//   } else if (data === 2) {
//     return (
//       <View key={2} style={styles.itemContainer}>
//         <Image style={styles.avatar} source={images.character2} />
//         <Text style={styles.text}>Price: {item["price"]}</Text>
//         <Button title="buy" disabled={true} />
//       </View>
//     );
//   } else if (data === 3) {
//     return (
//       <View key={3} style={styles.itemContainer}>
//         <Image style={styles.avatar} source={images.character3} />
//         <Text style={styles.text}>Price: {item["price"]}</Text>
//         <Button title="buy" disabled={true} />
//       </View>
//     );
//   }
// }

function OwnedTab() {
  const [read, allReads] = useState([]);
  useEffect(() => {
    const readRef = fb.database().ref("/response/shop");
    const OnLoadingListener = readRef.on("value", (snapshot) => {
      allReads([]);
      snapshot.forEach(function (childSnapshot) {
        allReads((read) => [...read, childSnapshot.val()]);
      });
    });

    return () => {
      readRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          {read.map(function (item, index) {
            if (item["bought"]) {
              if (item["img"] === 0) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character0} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="Set"
                      disabled={false}
                      onPress={() => setAvatar(item, index)}
                    />
                  </View>
                );
              } else if (item["img"] === 1) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character1} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="Set"
                      disabled={false}
                      onPress={() => setAvatar(item, index)}
                    />
                  </View>
                );
              } else if (item["img"] === 2) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character2} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="Set"
                      disabled={false}
                      onPress={() => setAvatar(item, index)}
                    />
                  </View>
                );
              } else if (item["img"] === 3) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character3} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="Set"
                      disabled={false}
                      onPress={() => setAvatar(item, index)}
                    />
                  </View>
                );
              }
            }
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
OwnedTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-mail-open" : "md-mail-open"}
      color={tintColor}
      size={25}
    />
  ),
};

const recordBuying = (index, buy, imgUrl, itemPrice) => {
  return new Promise(function (resolve, reject) {
    let data = {
      bought: buy,
      img: imgUrl,
      price: itemPrice,
    };
    fb.database()
      .ref("/response/shop/" + index)
      .update(data)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function completeBuying(price) {
  baseCurrency = baseCurrency - price;
  fb.database()
    .ref("response/")
    .update({
      currency: baseCurrency,
    })
    .then(() => {
      console.log("Success buying");
    })
    .catch((error) => {
      console.log(error);
    });
}

function confirmShopping(item, index) {
  Alert.alert(
    "Are you sure?",
    "Unlock this avatar with $" + item["price"],
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          completeBuying(item["price"]);
          recordBuying(index, !item["bought"], item["img"], item["price"]);
        },
      },
    ],
    { cancelable: false }
  );
}

function setAvatar(item, index) {
  Alert.alert(
    "Are you sure?",
    "Raise this avatar on home page",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("hello olivia, you reached here");
          updataAvatar(index);
          // completeBuying(index);
        },
      },
    ],
    { cancelable: false }
  );
}

function updataAvatar(data) {
  console.log("print out the avatar index: " + data);
  fb.database()
    .ref("response/")
    .update({
      character: data,
    })
    .then(() => {
      console.log("Success buying");
    })
    .catch((error) => {
      console.log(error);
    });
}

function ShopTab() {
  const [unbought, allUnbought] = useState([]);

  useEffect(() => {
    const unboughtRef = fb.database().ref("/response/shop");
    const OnLoadingListener = unboughtRef.on("value", (snapshot) => {
      allUnbought([]);
      snapshot.forEach(function (childSnapshot) {
        // console.log(childSnapshot.val());
        allUnbought((unbought) => [...unbought, childSnapshot.val()]);
      });
    });

    return () => {
      unboughtRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          {unbought.map(function (item, index) {
            if (!item["bought"]) {
              if (item["img"] === 0) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character0} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="buy"
                      disabled={false}
                      onPress={() => confirmShopping(item, index)}
                    />
                  </View>
                );
              } else if (item["img"] === 1) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character1} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="buy"
                      disabled={false}
                      onPress={() => confirmShopping(item, index)}
                    />
                  </View>
                );
              } else if (item["img"] === 2) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character2} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="buy"
                      disabled={false}
                      onPress={() => confirmShopping(item, index)}
                    />
                  </View>
                );
              } else if (item["img"] === 3) {
                return (
                  <View key={item["img"]} style={styles.itemContainer}>
                    <Image style={styles.avatar} source={images.character3} />
                    <Text style={styles.text}>Price: {item["price"]}</Text>
                    <Button
                      title="buy"
                      disabled={false}
                      onPress={() => confirmShopping(item, index)}
                    />
                  </View>
                );
              }
            }
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
ShopTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-mail-unread" : "md-mail-unread"}
      color={tintColor}
      size={25}
    />
  ),
};

const Tab = createMaterialTopTabNavigator(
  {
    Shop: ShopTab,
    Owned: OwnedTab,
  },
  {
    tabBarOptions: {
      activeTintColor: "black",
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: "#FF9933",
      },
    },
  }
);
const AppIndex = createAppContainer(Tab);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarCurrency: 0,
      items: {},
    };
  }

  componentDidMount() {
    fb.database()
      .ref("response/shop")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let shopitems = { ...data };
        console.log(data);
        this.setState({
          items: shopitems,
        });
      });
    fb.database()
      .ref("response/currency")
      .on("value", (querySnapShot) => {
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
        <ImageBackground
          source={require("../assets/BackgroundOrange.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.avatarContainer}>
            <Text>Your currency: {this.state.avatarCurrency}</Text>
          </View>
          <AppIndex />
        </ImageBackground>
      </View>
    );
  }
}

const ShopItem = ({ shopItem: { price: itemprice, done }, id }) => {
  const [doneState, setDone] = useState(done);

  const onCheck = () => {
    setDone(!doneState);
    fb.database()
      .ref("response/shop")
      .update({
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
        source={require("../assets/avatar/character3.png")}
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

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  itemContainer: {
    height: 230,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },

  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: "30%",
    height: "50%",
    alignItems: "center",
  },

  buyText: {
    textAlign: "center",
  },
});

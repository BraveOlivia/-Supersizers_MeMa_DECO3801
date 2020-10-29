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
import { fb, Fire } from "../src/firebase/APIKeys";
import { images, getBackgroundImage } from "../components/images";
import Header from "../components/Header";

var baseCurrency = 100;
var userid = Fire.shared.user._id;

//Owned items tab
function OwnedTab() {
  const [read, allReads] = useState([]);
  useEffect(() => {
    const readRef = fb.database().ref("response/" + userid + "/shop");
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
            //Iterate items in the shop.
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
      name={focused ? "ios-basket" : "md-basket"}
      color={tintColor}
      size={25}
    />
  ),
};

//Change the status of bought in firebase
const recordBuying = (index, buy, imgUrl, itemPrice) => {
  return new Promise(function (resolve, reject) {
    let data = {
      bought: buy,
      img: imgUrl,
      price: itemPrice,
    };
    fb.database()
      .ref("response/" + userid + "/shop/" + index)
      .update(data)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//reduce currency in firebase
function completeBuying(price) {
  baseCurrency = baseCurrency - price;
  fb.database()
    .ref("response/" + userid + "/")
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

// Pop up window to check with buying or not
function confirmBuying(item, index) {
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
          if (baseCurrency >= item["price"]) {
            completeBuying(item["price"]);
            recordBuying(index, !item["bought"], item["img"], item["price"]);
          } else {
            Alert.alert("Sorry, you can't afford this item.");
          }
        },
      },
    ],
    { cancelable: false }
  );
}

// Pop up window to confirm set the avatar on home page
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

//Upload the chosen avatar data in firebase
function updataAvatar(data) {
  console.log("print out the avatar index: " + data);
  fb.database()
    .ref("response/" + userid + "/")
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

// Tab of shop to choose items to buy
function ShopTab() {
  const [unbought, allUnbought] = useState([]);

  useEffect(() => {
    const unboughtRef = fb.database().ref("/response/" + userid + "/shop");
    const OnLoadingListener = unboughtRef.on("value", (snapshot) => {
      allUnbought([]);
      snapshot.forEach(function (childSnapshot) {
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
                      onPress={() => confirmBuying(item, index)}
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
                      onPress={() => confirmBuying(item, index)}
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
                      onPress={() => confirmBuying(item, index)}
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
                      onPress={() => confirmBuying(item, index)}
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
    <Icon name={focused ? "ios-cart" : "md-cart"} color={tintColor} size={25} />
  ),
};

//Top navigator menu
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
        backgroundColor: "transparent",
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
    if (!fb.apps.length) {
      fb.initializeApp(ApiKeys.FirebaseConfig);
    }
    this.readData();
  }

  readData() {
    userid = Fire.shared.user._id;
    fb.database()
      .ref("response/" + userid + "/currency")
      .once("value", (dataSnapShot) => {
        baseCurrency = dataSnapShot.val();
      });
    fb.database()
      .ref("response/" + userid + "/backgroundColor")
      .once("value", (dataSnapShot) => {
        var tempColor = dataSnapShot.val();
        this.setState({ backgroundColor: tempColor });
      });
  }

  componentDidMount() {
    fb.database()
      .ref("response/" + userid + "/shop")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let shopitems = { ...data };
        this.setState({
          items: shopitems,
        });
      });
    fb.database()
      .ref("response/" + userid + "/currency")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        this.setState({
          avatarCurrency: data,
        });
      });
  }

  render() {
    const background = getBackgroundImage(this.state.backgroundColor);
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.backgroundImage}>
          <Header
            props={this.props}
            pageName="Avatar Shop"
            baseCurrency={this.state.avatarCurrency}
          />
          <AppIndex />
        </ImageBackground>
      </View>
    );
  }
}

/*  STYLESHEET  */
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

  text: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
  },
});

//NutritionScreen.js

import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import React, { Component, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { fb, Fire } from "../src/firebase/APIKeys";
import * as firebase from "firebase";
import { getBackgroundImage } from "../components/images";
import Header from "../components/Header";

var baseHealth = 0;
var baseStatus = 0;
var baseCurrency = 0;
var userid = Fire.shared.user._id;
() => readData();
//Fetching data from Firebase console
function readData() {
  firebase
    .database()
    .ref("response/" + userid + "/avatarHealth")
    .once("value", (dataSnapShot) => {
      baseHealth = dataSnapShot.val();
    });
  firebase
    .database()
    .ref("response/" + userid + "/avatarStatus")
    .once("value", (dataSnapShot) => {
      baseStatus = dataSnapShot.val();
    });
  firebase
    .database()
    .ref("response/" + userid + "/currency")
    .once("value", (dataSnapShot) => {
      baseCurrency = dataSnapShot.val();
    });
}
//Read Nutritional Tip Tab
function ReadTab() {
  const [read, allReads] = useState([]);
  useEffect(() => {
    const readRef = firebase
      .database()
      .ref("response/" + userid + "/nutritionalTips");
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
          {read.map(function (item) {
            if (item["complete"]) {
              return (
                <TouchableOpacity
                  key={item["tipID"]}
                  style={styles.textContainer}
                >
                  {/* <Text style={styles.text}>Type: {item["tipType"]}</Text> */}
                  <Text style={styles.taskTitle}>{item["tipName"]}</Text>
                  <Text style={styles.text}>Description: {item["tip"]}</Text>
                  <Text style={styles.rewardText}>
                    +{item["tipReward"]["shopCurrency"]}{" "}
                    <FontAwesome name="dollar" size={20} color="orange" />
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
ReadTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-mail-open" : "md-mail-open"}
      color={tintColor}
      size={25}
    />
  ),
};

// Update tip after the tip has been read
const submitTip = (id, name, tip, type, reward, complete) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (id != null) {
      key = id;
    } else {
      key = fb.database().ref().push().key;
    }
    let dataToSave = {
      tipID: key,
      tipName: name,
      complete: complete,
      tipReward: reward,
      tip: tip,
      tipType: type,
    };
    console.log(dataToSave);
    fb.database()
      .ref("response/" + userid + "/nutritionalTips/" + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//Updating completed tip towards the avatar stats
function completeTips(rewardHealth) {
  baseHealth += rewardHealth["avatarHealth"];
  baseStatus += rewardHealth["avatarStatus"];
  baseCurrency += rewardHealth["shopCurrency"];
  this.setState((state, props) => ({
    baseHealth: this.state.baseHealth + rewardHealth["avatarHealth"],
    baseCurr: this.state.baseCurr + rewardHealth["shopCurrency"],
    baseStatus: this.state.baseStatus + rewardHealth["avatarStatus"],
  }));
  fb.database()
    .ref("response/" + userid + "/")
    .update({
      avatarHealth: baseHealth,
      avatarStatus: baseStatus,
      currency: baseCurrency,
    })
    .then(() => {
      console.log("Read a nutritional tip. Congrats!");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Reading Alert to verify if the tip is read.
function reading(item) {
  Alert.alert(
    item["tipName"],
    item["tip"],
    [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          completeTips(item["tipReward"]);
          submitTip(
            item["tipID"],
            item["tipName"],
            item["tip"],
            item["tipType"],
            item["tipReward"],
            !item["complete"]
          );
        },
      },
    ],
    { cancelable: false }
  );
}
//Unread Nutritional Tips
function UnreadTab() {
  const [unread, allUnreads] = useState([]);
  useEffect(() => {
    const unreadRef = firebase
      .database()
      .ref("/response/" + userid + "/nutritionalTips/");
    const OnLoadingListener = unreadRef.on("value", (snapshot) => {
      allUnreads([]);
      snapshot.forEach(function (childSnapshot) {
        allUnreads((unread) => [...unread, childSnapshot.val()]);
      });
    });
    return () => {
      unreadRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          {unread.map(function (item) {
            if (!item["complete"]) {
              return (
                <TouchableOpacity
                  key={item["tipID"]}
                  style={styles.textContainer}
                  onPress={() => reading(item)}
                >
                  {/* <Text style={styles.text}>Type: {item["tipType"]}</Text> */}
                  <Text style={styles.taskTitle}>{item["tipName"]}</Text>
                  <Text style={styles.text}>Description: {item["tip"]}</Text>
                  <Text style={styles.rewardText}>
                    +{item["tipReward"]["shopCurrency"]}{" "}
                    <FontAwesome name="dollar" size={20} color="orange" />
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
UnreadTab.navigationOptions = {
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
    Unread: UnreadTab,
    Read: ReadTab,
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

export default class NutritionalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseHealth: 0,
      baseStatus: 0,
      baseCurr: 0,
      backgroundColor: 5,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    () => this.readData();
    completeTips = completeTips.bind(this);
    reading = reading.bind(this);
  }
  //Fetching Data from Firebase console
  readData() {
    console.log("reading data in nutritional tip " + userid);
    fb.database()
      .ref("response/" + userid + "/avatarHealth")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        baseHealth = temp;
        this.setState({ baseHealth: temp });
      });
    fb.database()
      .ref("response/" + userid + "/avatarStatus")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        baseStatus = temp;
        this.setState({ baseStatus: temp });
      });
    fb.database()
      .ref("response/" + userid + "/currency")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        baseCurrency = temp;
        this.setState({ baseCurr: temp });
      });
    fb.database()
      .ref("response/" + userid + "/backgroundColor")
      .once("value", (dataSnapShot) => {
        var tempColor = dataSnapShot.val();
        this.setState({ backgroundColor: tempColor });
      });
  }

  componentDidMount() {
    userid = Fire.shared.user._id;
    this.readData();
    readData();
    fb.database()
      .ref("response/" + userid + "/currency")
      .on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        this.setState({
          baseCurr: data,
        });
      });
  }

  handleCurrency = () => {
    return <Text style={{ fontSize: 25, color: "white" }}>{baseCurrency}</Text>;
  };

  render() {
    const background = getBackgroundImage(this.state.backgroundColor);
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={background} style={styles.backgroundImage}>
          <Header
            props={this.props}
            pageName="Home"
            baseCurrency={this.state.baseCurr}
          />
          <AppIndex />
        </ImageBackground>
      </View>
    );
  }
}

{
  /*  STYLESHEET  */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5F7EB2",
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "white",
    alignItems: "center",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  text: {
    color: "#4f603c",
    fontSize: 14,
    margin: 3,
  },

  taskCard: {
    flex: 5,
    backgroundColor: "#FFE5CC",
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    justifyContent: "center",
  },

  taskDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rewardPoint: {
    fontSize: 20,
    color: "darkblue",
  },

  taskbody: {
    flex: 1,
    fontSize: 14,
  },

  taskDone: {
    borderColor: "#737373",
    backgroundColor: "darkgrey",
  },

  header: {
    flexDirection: "row",
  },

  tabs: {
    flex: 1,
    backgroundColor: "#D3E3F6",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
  },

  taskTitle: {
    fontSize: 20,
    margin: 5,
  },

  rewardText: {
    margin: 5,
    fontSize: 20,
    textAlign: "right",
    alignSelf: "flex-end",
    fontWeight: "400",
  },
});

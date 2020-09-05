//NutritionScreen.js

import Icon from "react-native-vector-icons/Ionicons";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import tipData from "../assets/data/tip.json";

function ReadTab() {
  return (
    <View>
      {tipData["Nutritional Tips"].map(function (item) {
        if (item.hasRead) {
          return (
            <TouchableOpacity key={item.id} style={styles.textContainer}>
              <Text style={styles.text}>Title: {item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.reward}</Text>
            </TouchableOpacity>
          );
        }
      })}
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

function UnreadTab() {
  return (
    <View>
      {tipData["Nutritional Tips"].map(function (item) {
        if (!item.hasRead) {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.textContainer}
              // onPress={alert("hello world")}
            >
              <Text style={styles.text}>Title: {item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.reward}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}
UnreadTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "progress-check" : "progress-check"}
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
      activeTintColor: "white",
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: "#5F7EB2",
      },
    },
  }
);
const AppIndex = createAppContainer(Tab);

export default class NutritionalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#5F7EB2" }}>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={styles.header}>
          {/*  PAGE TITLE  */}
          <FontAwesome
            style={{ marginLeft: 15 }}
            name="home"
            size={30}
            color="white"
          />
          <FontAwesome
            style={{ marginLeft: 25 }}
            name="question-circle"
            size={30}
            color="white"
          />
          <Text
            style={{
              marginLeft: 20,
              textDecorationLine: "underline",
              fontSize: 25,
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {" "}
            Nutritional Tips{" "}
          </Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 30 }}
            name="circle-expand"
            size={30}
            color="white"
          />
          <Text style={{ fontSize: 25, color: "white" }}>102</Text>
        </View>
        <AppIndex />
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
    backgroundColor: "#d9f9b1",
    alignItems: "center",
  },
  text: {
    color: "#4f603c",
    fontSize: 20,
  },
  taskCard: {
    flex: 5,
    backgroundColor: "#fff",
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
  taskTitle: {
    fontSize: 20,
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
});
//         {/*  TABS  */}
//         <View className="NutritionPage">
//           <Tabs
//             tabsProps={{
//               style: {
//                 textAlign: "left",
//               },
//             }}
//             activeTab={{
//               id: "tab1",
//             }}
//           >
//             <View style={styles.tabs}>
//               <Tabs.Tab id="tab1" title="Unread">
//                 <View>
//                   <DataTable>
//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         5
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         [ Task Desceiption : hubvcouehbv hwivoiebuvberu
//                         oibrberoivb reboi1rbiv1bre oboiogiv1uerbgo vi1
//                         rogiv1broigub 1oribgo1i rbgoivu1bro ]
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         6
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         [ Task Desceiption : hubvcouehbv hwivoiebuvberu oiboivb
//                         reboi1rbiv1bre ov1rbogigo v1rgboirbgovi1 rogiv1broigub
//                         1oribgo1i rbgoivu1br ]
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         6
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         [ Task Desceiption : hubvcouehbv hwivoiebuvberu oiboivb
//                         reboi1rbiv1bre ov1rbogigo v1rgboirbgovi1 rogiv1broigub
//                         1oribgo1i rbgoivu1br ]
//                       </Text>
//                     </DataTable.Row>
//                   </DataTable>
//                 </View>
//               </Tabs.Tab>

//               <View></View>
//               <Tabs.Tab style={{ color: "#FFFFFF" }} id="tab2" title="Read">
//                 <View>
//                   <DataTable>
//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         7
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
//                         idwefcvwdch bwihbwb wiufebf whebf eoiwbc
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         8
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
//                         idwefcvwdch bwihbwb wiufebf whebf eoiwbc
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title style={{ fontWeight: "bold" }} numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         20
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
//                         idwefcvwdch bwihbwb wiufebf whebf eoiwbc
//                       </Text>
//                     </DataTable.Row>
//                   </DataTable>
//                 </View>
//               </Tabs.Tab>
//             </View>
//           </Tabs>
//         </View>
//       </View>

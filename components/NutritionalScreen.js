//NutritionScreen.js

{
  /* 
dependencies installed: 1. npm install @feuer/react-tabs
                        2. npm install react-native-paper
*/
}

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "@feuer/react-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

export default class NutritionalScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        {/*  ICONS  */}
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
            style={{ marginLeft: 15 }}
            name="home"
            size={30}
            color="white"
          />
          <FontAwesome
            style={{ marginLeft: 20 }}
            name="question-circle"
            size={30}
            color="white"
          />
          <MaterialCommunityIcons
            style={{ marginLeft: 470, paddingRight: 10 }}
            name="circle-expand"
            size={30}
            color="white"
          />
          <Text style={{ fontSize: 25 }}>102</Text>
        </View>

        {/*  PAGE TITLE  */}
        <Text
          style={{
            textDecorationLine: "underline",
            fontSize: 25,
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {" "}
          Nutritional Tips{" "}
        </Text>

        {/*  TABS  */}
        <View className="NutritionPage">
          <Tabs
            tabsProps={{
              style: {
                textAlign: "left",
              },
            }}
            activeTab={{
              id: "tab1",
            }}
          >
            <View style={styles.tabs}>
              <Tabs.Tab id="tab1" title="Unread">
                <View>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>[Tip Name]</DataTable.Title>
                      <DataTable.Title numeric>
                        Type : [Tip Type]
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        Reward :{" "}
                        <MaterialCommunityIcons
                          name="circle-expand"
                          size={10}
                          color="black"
                        />
                        5
                      </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <Text>
                        [ Task Desceiption : hubvcouehbv hwivoiebuvberu
                        oibrberoivb reboi1rbiv1bre oboiogiv1uerbgo vi1
                        rogiv1broigub 1oribgo1i rbgoivu1bro ]
                      </Text>
                    </DataTable.Row>

                    <DataTable.Header>
                      <DataTable.Title>[Tip Name]</DataTable.Title>
                      <DataTable.Title numeric>
                        Type : [Tip Type]
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        Reward :{" "}
                        <MaterialCommunityIcons
                          name="circle-expand"
                          size={10}
                          color="black"
                        />
                        6
                      </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <Text>
                        [ Task Desceiption : hubvcouehbv hwivoiebuvberu oiboivb
                        reboi1rbiv1bre ov1rbogigo v1rgboirbgovi1 rogiv1broigub
                        1oribgo1i rbgoivu1br ]
                      </Text>
                    </DataTable.Row>

                    <DataTable.Header>
                      <DataTable.Title>[Tip Name]</DataTable.Title>
                      <DataTable.Title numeric>
                        Type : [Tip Type]
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        Reward :{" "}
                        <MaterialCommunityIcons
                          name="circle-expand"
                          size={10}
                          color="black"
                        />
                        6
                      </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <Text>
                        [ Task Desceiption : hubvcouehbv hwivoiebuvberu oiboivb
                        reboi1rbiv1bre ov1rbogigo v1rgboirbgovi1 rogiv1broigub
                        1oribgo1i rbgoivu1br ]
                      </Text>
                    </DataTable.Row>
                  </DataTable>
                </View>
              </Tabs.Tab>

              <View></View>
              <Tabs.Tab style={{ color: "#FFFFFF" }} id="tab2" title="Read">
                <View>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>[Tip Name]</DataTable.Title>
                      <DataTable.Title numeric>
                        Type : [Tip Type]
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        Reward :{" "}
                        <MaterialCommunityIcons
                          name="circle-expand"
                          size={10}
                          color="black"
                        />
                        7
                      </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <Text>
                        Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
                        idwefcvwdch bwihbwb wiufebf whebf eoiwbc
                      </Text>
                    </DataTable.Row>

                    <DataTable.Header>
                      <DataTable.Title>[Tip Name]</DataTable.Title>
                      <DataTable.Title numeric>
                        Type : [Tip Type]
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        Reward :{" "}
                        <MaterialCommunityIcons
                          name="circle-expand"
                          size={10}
                          color="black"
                        />
                        8
                      </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <Text>
                        Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
                        idwefcvwdch bwihbwb wiufebf whebf eoiwbc
                      </Text>
                    </DataTable.Row>

                    <DataTable.Header>
                      <DataTable.Title>[Tip Name]</DataTable.Title>
                      <DataTable.Title numeric>
                        Type : [Tip Type]
                      </DataTable.Title>
                      <DataTable.Title style={{ fontWeight: "bold" }} numeric>
                        Reward :{" "}
                        <MaterialCommunityIcons
                          name="circle-expand"
                          size={10}
                          color="black"
                        />
                        20
                      </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <Text>
                        Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
                        idwefcvwdch bwihbwb wiufebf whebf eoiwbc
                      </Text>
                    </DataTable.Row>
                  </DataTable>
                </View>
              </Tabs.Tab>
            </View>
          </Tabs>
        </View>
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

  tabs: {
    flex: 1,
    backgroundColor: "#D3E3F6",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
  },
});

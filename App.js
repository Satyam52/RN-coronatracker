import React from "react";
import { AppLoading } from "expo";
import {
  Container,
  Text,
  View,
  Header,
  Title,
  Body,
  Left,
  Right,
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalScreen from "./components/Screens/Global";
import RegionScreen from "./components/Screens/Region";
import AboutScreen from "./components/Screens/About";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const Tab = createBottomTabNavigator();

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Global") {
                iconName = "md-globe";
              } else if (route.name === "Region") {
                iconName = "ios-person";
              } else if (route.name === "About") {
                iconName = "ios-information-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          lazy
          initialRouteName="Global"
        >
          <Tab.Screen name="Global" component={GlobalScreen} />
          <Tab.Screen
            options={{ title: "Regional" }}
            name="Region"
            component={RegionScreen}
          />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

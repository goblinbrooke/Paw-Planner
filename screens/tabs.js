import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 10,
                    backgroundColor: "transparent",
                    borderRadius: 10,
                    height: 90,
                    },
                }}
                >
            </Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style = {{alignItems: 'flex-end', justifyContent: 'flex-end', top: 10}}>
                        <Image
                            source={require("../assets/Illustration4.png")}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tint: focused ? "white" : "black",
                            }}
                        />
                        <Text style={{color: focused ? "white" : "black", fontSize: 12}}>
                        💗HOME💗
                        </Text>
                    </View>
                ),
                }}  
                /> 
            </NavigationContainer>     
    ); 
};

export default Tabs;
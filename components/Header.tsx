import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { Colors } from "@/constants/Colors";

export default class Header extends Component {
  render() {
    return (
      <View>
        <Text style={styles.header}>Breath Timers</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    color: Colors.white,
  },
});

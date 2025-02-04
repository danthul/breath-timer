import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/Header";
import BreathingCircle from "@/components/BreathingCircle";
import { Colors } from "@/constants/Colors";
import DurationButtonsBar from "./DurationButtonsBar";

export default function Container() {
  return (
    <View style={styles.container}>
      <Header />
      <DurationButtonsBar />
      <View style={styles.mainContainer}>
      <BreathingCircle /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charcoal,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    color: Colors.white,
    paddingTop: 50,
  },
  mainContainer: {
    backgroundColor: Colors.charcoal,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    color: Colors.white,
  },
});

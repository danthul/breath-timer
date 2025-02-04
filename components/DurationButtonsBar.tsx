import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { ArrowCircleUp, ArrowCircleDown } from "phosphor-react-native";
import { Colors } from "@/constants/Colors";
import { useBreathingStore } from "./hooks/useBreathingStore";

const ButtonText = ({ children }: { children: any }) => (
  <Text style={styles.buttonLabel}>{children}</Text>
);

const DurationButtonsBar = () => {
  const stage = useBreathingStore((state) => state.stage);
  const totalMinutes = useBreathingStore((state) => state.totalMinutes);
  const inhaleDuration = useBreathingStore(
    (state) => state.inhaleDurationSeconds
  );
  const holdDuration = useBreathingStore((state) => state.holdDurationSeconds);
  const exhaleDuration = useBreathingStore(
    (state) => state.exhaleDurationSeconds
  );
  const setInhaleDuration = useBreathingStore(
    (state) => state.setInhaleDuration
  );
  const setHoldDuration = useBreathingStore((state) => state.setHoldDuration);
  const setExhaleDuration = useBreathingStore(
    (state) => state.setExhaleDuration
  );
  const [selectedValue, setSelectedValue] = React.useState("option1");
  const setTotalMinutes = useBreathingStore((state) => state.setTotalMinutes);
  const disabled = stage !== "Start";
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ButtonText>Inhale</ButtonText>
        <View style={{ opacity: disabled ? 0.5 : 1 }}>
          <TouchableOpacity
            onPress={() => setInhaleDuration(inhaleDuration + 1)}
            disabled={disabled}
          >
            <ArrowCircleUp size={32} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
        <Text style={styles.secondsText}>{inhaleDuration.toString()}</Text>
        <View style={{ opacity: disabled ? 0.5 : 1 }}>
          <TouchableOpacity
            onPress={() => setInhaleDuration(Math.max(1, inhaleDuration - 1))}
            disabled={disabled}
          >
            <ArrowCircleDown size={32} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <ButtonText>Hold</ButtonText>
        <View style={{ opacity: disabled ? 0.5 : 1 }}>
          <TouchableOpacity
            onPress={() => setHoldDuration(holdDuration + 1)}
            disabled={disabled}
          >
            <ArrowCircleUp size={32} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
        <Text style={styles.secondsText}>{holdDuration.toString()}</Text>
        <View style={{ opacity: disabled ? 0.5 : 1 }}>
          <TouchableOpacity
            onPress={() => setHoldDuration(Math.max(0, holdDuration - 1))}
            disabled={disabled}
          >
            <ArrowCircleDown size={32} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <ButtonText>Exhale</ButtonText>
        <View style={{ opacity: disabled ? 0.5 : 1 }}>
          <TouchableOpacity
            onPress={() => setExhaleDuration(exhaleDuration + 1)}
            disabled={disabled}
          >
            <ArrowCircleUp size={32} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
        <Text style={styles.secondsText}>{exhaleDuration.toString()}</Text>
        <View style={{ opacity: disabled ? 0.5 : 1 }}>
          <TouchableOpacity
            onPress={() => setExhaleDuration(Math.max(1, exhaleDuration - 1))}
            disabled={disabled}
          >
            <ArrowCircleDown size={32} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DurationButtonsBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  box: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 170,
    gap: 13,
    borderColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 5,
  },
  buttonLabel: {
    color: Colors.white,
    marginTop: 5,
    fontSize: 16,
  },
  secondsText: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "400",
    width: "100%",
    maxWidth: "100%",
    flex: 1,
    color: Colors.white,
  },
});

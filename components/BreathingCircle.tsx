import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  Text,
  Vibration,
  View,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/Colors";
import { StateTypes, useBreathingStore } from "./hooks/useBreathingStore";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react-native";

const BreathingCircle = () => {
  const smallCicleSize = 0.75;
  const largeCircleSize = 1.5;
  const maxSize = 200;
  const scaleAnim = useRef(new Animated.Value(smallCicleSize)).current; // Start at normal size
  const stage = useBreathingStore((state) => state.stage);
  const setStage = useBreathingStore((state) => state.setStage);
  const isBreathing = useRef(false);
  const totalMinutes = useBreathingStore((state) => state.totalMinutes);
  const setTotalMinutes = useBreathingStore((state) => state.setTotalMinutes);
  const inhaleDuration = useBreathingStore(
    (state) => state.inhaleDurationSeconds
  );
  const holdDuration = useBreathingStore((state) => state.holdDurationSeconds);
  const exhaleDuration = useBreathingStore(
    (state) => state.exhaleDurationSeconds
  );
  const [timeRemaining, setTimeRemaining] = useState(totalMinutes * 60 * 1000);

  let animation: Animated.CompositeAnimation;
  let timer: NodeJS.Timeout;
  const vibrate = (style: "inhale" | "exhale" | "hold") => {
    Vibration.cancel();
    switch (style) {
      case "inhale":
        Vibration.vibrate([10], true);
        break;
      case "exhale":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "hold":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        break;
      default:
        break;
    }
  };

  const exhale = () => {
    setStage("Exhale");
    vibrate("exhale");
    animation = Animated.timing(scaleAnim, {
      toValue: smallCicleSize, // Shrink
      duration: exhaleDuration * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });
    animation.start(() => {
      if (!isBreathing.current) return;
      inhale();
    });
  };

  const hold = () => {
    setStage("Hold");
    vibrate("hold");
    animation = Animated.timing(scaleAnim, {
      toValue: largeCircleSize, // Expand
      duration: holdDuration * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });
    animation.start(() => {
      if (!isBreathing.current) return;
      exhale();
    });
  };

  const inhale = () => {
    setStage("Inhale");
    vibrate("inhale");
    animation = Animated.timing(scaleAnim, {
      toValue: largeCircleSize, // Expand
      duration: inhaleDuration * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    });
    animation.start(() => {
      if (holdDuration) {
        if (!isBreathing.current) return;
        hold();
      } else {
        if (!isBreathing.current) return;
        exhale();
      }
    });
  };
  const startTimer = () => {
    timer = setInterval(() => {
      setTimeRemaining((prev) => {
        console.log("in timer", prev);
        if (prev <= 0 || isBreathing.current === false) {
          clearInterval(timer);
          if (isBreathing.current) {
            stop();
          }
          return prev;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  const stop = () => {
    isBreathing.current = false;
    clearInterval(timer);
    setTimeRemaining(totalMinutes * 60 * 1000);
    if (animation) animation.stop();
    scaleAnim.setValue(1);
    setStage("Start");
    Vibration.cancel();
  };

  const toggleBreathing = () => {
    if (isBreathing.current) {
      stop();
    } else {
      isBreathing.current = true;
      startTimer();
      inhale();
    }
  };

  let minutes = Math.floor(timeRemaining / (60 * 1000));
  let seconds = Math.floor((timeRemaining - minutes * 60 * 1000) / 1000);

  React.useEffect(() => {
    setTimeRemaining(totalMinutes * 60 * 1000);
  }, [totalMinutes]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleBreathing}>
        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ scale: scaleAnim }],
                width: maxSize,
                height: maxSize,
                borderRadius: maxSize / 2, // Keeps it circular
              },
            ]}
          ></Animated.View>
          <Text style={styles.stageText}>{stage}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.totalMinutesContainer}>
        <View style={{ opacity: isBreathing.current ? 0 : 1 }}>
          <TouchableOpacity
            onPress={() => setTotalMinutes(totalMinutes + 1)}
            disabled={isBreathing.current}
          >
            <ArrowCircleUp size={40} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
        <Text style={styles.timer}>
          {minutes || 0}:{seconds.toString().padStart(2, "0")}
        </Text>
        <View style={{ opacity: isBreathing.current ? 0 : 1 }}>
          <TouchableOpacity
            onPress={() => setTotalMinutes(Math.max(1, totalMinutes - 1))}
            disabled={isBreathing.current}
          >
            <ArrowCircleDown size={40} color={Colors.white} weight="bold" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#86BBD8",
  },
  circleContainer: {
    marginBottom: 20,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  stageText: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.white,
    position: "absolute",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.white,
  },
  totalMinutesContainer: {
    gap: 10,
    alignItems: "center",
  },
});

export default BreathingCircle;

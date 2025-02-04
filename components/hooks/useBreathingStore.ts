import { create } from "zustand";

export type StateTypes = "Start" | "Inhale" | "Hold" | "Exhale";

type State = {
  stage: StateTypes;
  setStage: (stage: StateTypes) => void;
  emptyStore: () => void;
  setInhaleDuration: (duration: number) => void;
  inhaleDurationSeconds: number;
  setHoldDuration: (duration: number) => void;
  holdDurationSeconds: number;
  setExhaleDuration: (duration: number) => void;
  exhaleDurationSeconds: number;
  setTotalMinutes: (minutes: number) => void;
  totalMinutes: number;
};

const initialStore = {
  stage: "Start" as StateTypes,
  inhaleDurationSeconds: 4,
  exhaleDurationSeconds: 6,
  holdDurationSeconds: 2,
  totalMinutes: 2,
};

export const useBreathingStore = create<State>()(
  // devtools(set => ({
  (set) => ({
    ...initialStore,
    setStage: (stage: StateTypes) => set((state) => ({ ...state, stage })),
    setInhaleDuration: (inhaleDuration: number) =>
      set((state) => ({ ...state, inhaleDurationSeconds: inhaleDuration })),
    setHoldDuration: (holdDuration: number) =>
      set((state) => ({ ...state, holdDurationSeconds: holdDuration })),
    setExhaleDuration: (exhaleDuration: number) =>
      set((state) => ({ ...state, exhaleDurationSeconds: exhaleDuration })),
    setTotalMinutes: (totalMinutes: number) => {
      console.log("totalMinutes", totalMinutes);
      return set((state) => ({ ...state, totalMinutes }));
    },
    emptyStore: () => set((state) => ({ ...state, ...initialStore })),
  })
);

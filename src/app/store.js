import { createSlice, configureStore } from "@reduxjs/toolkit";

const qualitySlice = createSlice({
  name: "quality",
  initialState: { quality: false },
  reducers: {
    toggleQuality(state) {
      state.quality = !state.quality;
    },
  },
});

const showControlsSlice = createSlice({
  name: "controls",
  initialState: { controls: false },
  reducers: {
    toggleControls(state) {
      state.controls = !state.controls;
    },
  },
});

const videoPlayingSlice = createSlice({
  name: "playing",
  initialState: { playing: true },
  reducers: {
    togglePlaying(state) {
      state.playing = !state.playing;
    },
    setPlayingFalse(state) {
      state.playing = false;
    },
  },
});

const store = configureStore({
  reducer: {
    quality: qualitySlice.reducer,
    controls: showControlsSlice.reducer,
    playing: videoPlayingSlice.reducer,
  },
});

export const qualityAction = qualitySlice.actions;
export const showControlsAction = showControlsSlice.actions;
export const videoPlayingAction = videoPlayingSlice.actions;

export default store;

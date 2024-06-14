import React, { createContext, useReducer } from "react";
import { musicContextActions } from "../constants/MusicContextActions";

const initialState = {
  trackId: null,
  trackName: null,
  trackAuthor: null,
  trackImage: null,
  trackUrl: null,
  trackVolume: 70,
  trackPrevVolume: 70,
  isPlaying: true,
  isLoading: true,
};

export const StateTrackContext = createContext(initialState);
export const DispatchTrackContext = createContext(() => {});

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case musicContextActions.setTrack:
        return {
          ...state,
          trackId: action.payload.trackId,
          trackName: action.payload.trackName,
          trackAuthor: action.payload.trackAuthor,
          trackImage: action.payload.trackImage,
        };

      case musicContextActions.setTrackUrl:
        return {
          ...state,
          trackUrl: action.payload.trackUrl,
        };

      case musicContextActions.setVolume:
        return {
          ...state,
          trackVolume: action.payload.trackVolume,
          trackPrevVolume: action.payload.trackPrevVolume,
        };

      case musicContextActions.setNewVolume:
        return {
          ...state,
          trackVolume: action.payload.trackVolume,
        };

      case musicContextActions.setIsPlaying:
        return {
          ...state,
          isPlaying: action.payload.isPlaying,
        };

      case musicContextActions.setIsLoading:
        return {
          ...state,
          isLoading: action.payload.isLoading,
        };

      default:
        return state;
    }
  }, initialState);

  return (
    <DispatchTrackContext.Provider value={dispatch}>
      <StateTrackContext.Provider value={state}>
        {children}
      </StateTrackContext.Provider>
    </DispatchTrackContext.Provider>
  );
};

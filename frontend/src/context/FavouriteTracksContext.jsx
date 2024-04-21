import React, { createContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { favouriteTracksContextActions } from "../constants/FavouriteTracksContextActions";

const initialState = {
  favouriteTracks: [],
};

export const StateFavouriteTracksContext = createContext(initialState);
export const DispatchFavouriteTracksContext = createContext(() => {});

function reducer(state, action) {
  switch (action.type) {
    case favouriteTracksContextActions.addFavouriteTrack: {
      return {
        favouriteTracks: [...state.favouriteTracks, action.payload],
      };
    }

    case favouriteTracksContextActions.deleteFavouriteTrack: {
      const newFavouriteTracks = state.favouriteTracks.filter(
        (item) => item.idTrack !== action.payload
      );

      return {
        favouriteTracks: newFavouriteTracks,
      };
    }

    default:
      return state;
  }
}

export const FavouriteTracksProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage(
    initialState,
    "favouriteTracks"
  );

  const [state, dispatch] = useReducer(reducer, favourites);

  const dispatchAndSave = (action) => {
    dispatch(action);
    setFavourites((prevState) => reducer(prevState, action));
  };

  return (
    <DispatchFavouriteTracksContext.Provider value={dispatchAndSave}>
      <StateFavouriteTracksContext.Provider value={state}>
        {children}
      </StateFavouriteTracksContext.Provider>
    </DispatchFavouriteTracksContext.Provider>
  );
};

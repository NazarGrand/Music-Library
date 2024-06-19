import React, { createContext, useReducer, useEffect } from "react";
import { favouriteTracksContextActions } from "../constants/FavouriteTracksContextActions";
import { getFavouriteTrackIds } from "../services/FavouriteTracksService";

const initialState = {
  favouriteTracks: [],
};

export const StateFavouriteTracksContext = createContext(initialState);
export const DispatchFavouriteTracksContext = createContext(() => {});

function reducer(state, action) {
  switch (action.type) {
    case favouriteTracksContextActions.setFavouriteTracks: {
      return {
        favouriteTracks: action.payload,
      };
    }

    default:
      return state;
  }
}

export const FavouriteTracksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getFavouriteTracks = async () => {
    try {
      const { data: favouriteTracks } = await getFavouriteTrackIds();

      dispatch({
        type: favouriteTracksContextActions.setFavouriteTracks,
        payload: favouriteTracks,
      });
    } catch (error) {
      console.error("Error fetching favourite tracks:", error);
    }
  };

  useEffect(() => {
    getFavouriteTracks();
  }, []);

  return (
    <DispatchFavouriteTracksContext.Provider value={dispatch}>
      <StateFavouriteTracksContext.Provider value={state}>
        {children}
      </StateFavouriteTracksContext.Provider>
    </DispatchFavouriteTracksContext.Provider>
  );
};

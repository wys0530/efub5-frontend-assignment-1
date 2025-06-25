import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const usePlaylistStore = create(
  devtools(
    persist(
      (set, get) => ({
        playlist: [],
        playlistTitle: "나의 플레이리스트",

        addTrack: (track) => {
          const exists = get().playlist.some((t) => t.id === track.id);
          if (!exists) {
            set(
              (state) => ({
                playlist: [...state.playlist, track],
              }),
              undefined,
              "playlist/addTrack"
            );
          }
        },

        removeTrack: (id) => {
          set(
            (state) => ({
              playlist: state.playlist.filter((t) => t.id !== id),
            }),
            undefined,
            "playlist/removeTrack"
          );
        },

        clearPlaylist: () => {
          set({ playlist: [] }, undefined, "playlist/clearPlaylist");
        },

        setPlaylistTitle: (newTitle) => {
          set(
            { playlistTitle: newTitle },
            undefined,
            "playlist'setPlaylistTitle"
          );
        },
      }),
      { name: "playlistStore" }
    ),
    { name: "playlistStoreDevtools" }
  )
);

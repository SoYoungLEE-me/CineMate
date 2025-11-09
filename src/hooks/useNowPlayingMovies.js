import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchNowPlayingMovies = () => {
  return api.get(`/movie/now_playing`);
};

export const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-NowPlaying"],
    queryFn: fetchNowPlayingMovies,
    select: (result) => {
      return result.data;
    },
  });
};

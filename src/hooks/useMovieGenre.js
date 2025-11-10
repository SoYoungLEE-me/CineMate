import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchMovieGenre = () => {
  return api.get(`/genre/movie/list`);
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenre,
    select: (result) => {
      return result.data.genres;
    },
    staleTime: 300000, //5분정도
  });
};

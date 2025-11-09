import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`);
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => {
      return result.data;
    },
  });
};

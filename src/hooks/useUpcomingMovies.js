import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => {
      return result.data;
    },
  });
};

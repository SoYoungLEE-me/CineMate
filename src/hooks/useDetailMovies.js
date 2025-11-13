import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchDetailMovies = ({ queryKey }) => {
  const [, id] = queryKey;
  return api.get(`/movie/${id}`);
};

export const useDetailMoviesQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: fetchDetailMovies,
    select: (result) => {
      return result.data;
    },
  });
};

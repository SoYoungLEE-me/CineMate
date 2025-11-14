import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchDetailMovies = ({ queryKey }) => {
  const [, id] = queryKey;
  return api.get(`/movie/${id}`, {
    params: {
      append_to_response: "release_dates,credits,keywords,similar,reviews",
    },
  });
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

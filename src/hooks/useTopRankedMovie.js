import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchTopRankedMovie = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRankedMovieQuery = () => {
  return useQuery({
    queryKey: ["top-movie"],
    queryFn: fetchTopRankedMovie,
    select: (result) => {
      return result.data;
    },
  });
};

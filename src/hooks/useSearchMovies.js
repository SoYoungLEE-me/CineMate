import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchSearchMovies = ({ queryKey }) => {
  const [, keyword] = queryKey;
  return keyword
    ? api.get(`/search/movie?query=${keyword}`)
    : api.get(`/movie/popular`);
};

export const useSearchMoviesQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ["movie-search", keyword],
    queryFn: fetchSearchMovies,
    select: (result) => {
      return result.data;
    },
  });
};

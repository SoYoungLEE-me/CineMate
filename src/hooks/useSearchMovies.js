import api from "../utils/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchSearchMovies = ({ queryKey }) => {
  const [, keyword, page] = queryKey;
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMoviesQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page],
    queryFn: fetchSearchMovies,
    select: (result) => {
      return result.data;
    },
    keepPreviousData: true, //페이지 전환 시 깜빡임 줄일 수 있음
  });
};

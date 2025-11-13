import api from "../utils/api.js";

import { useQuery } from "@tanstack/react-query";

const fetchSearchMovies = ({ queryKey }) => {
  const [
    ,
    { keyword, page, sortOption, yearRange, ratingRange, selectedGenres },
  ] = queryKey;

  const currentYear = new Date().getFullYear();

  const params = {
    page,

    sort_by: sortOption || "popularity.desc",

    "vote_average.gte": ratingRange?.[0] ?? 0,

    "vote_average.lte": ratingRange?.[1] ?? 10,

    "primary_release_date.gte": `${yearRange?.[0] ?? 1950}-01-01`,

    "primary_release_date.lte": `${yearRange?.[1] ?? currentYear}-12-31`,
  };

  if (selectedGenres && selectedGenres.length > 0) {
    params.with_genres = selectedGenres.join(",");
  }

  // 검색어가 있으면 search API 사용

  if (keyword && keyword.trim() !== "") {
    return api.get(`/search/movie`, {
      params: {
        query: keyword,

        page,
      },
    });
  }

  // 검색어 없으면 discover API로 필터링 적용

  return api.get(`/discover/movie`, { params });
};

export const useSearchMoviesQuery = ({
  keyword = "",

  page = 1,

  sortOption = "popularity.desc",

  yearRange = [1970, new Date().getFullYear()],

  ratingRange = [0.0, 10.0],

  selectedGenres = [],
}) => {
  return useQuery({
    queryKey: [
      "movie-search",

      { keyword, page, sortOption, yearRange, ratingRange, selectedGenres },
    ],

    queryFn: fetchSearchMovies,

    select: (result) => {
      return result.data;
    },
  });
};

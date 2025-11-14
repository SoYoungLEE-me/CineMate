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
      const data = result.data;

      // 검색 API면 여기서 정렬 및 필터링

      if (keyword.trim() !== "") {
        const items = data.results || [];

        const yearMin = yearRange[0];
        const yearMax = yearRange[1];

        const ratingMin = parseFloat(ratingRange[0]);
        const ratingMax = parseFloat(ratingRange[1]);

        //연도 필터
        let filtered = items.filter((m) => {
          const year = m.release_date ? Number(m.release_date.slice(0, 4)) : 0;
          return year >= yearMin && year <= yearMax;
        });

        //평점 필터
        filtered = filtered.filter(
          (m) => m.vote_average >= ratingMin && m.vote_average <= ratingMax
        );

        //장르 필터
        if (selectedGenres.length > 0) {
          filtered = filtered.filter((m) =>
            m.genre_ids?.some((id) => selectedGenres.includes(id))
          );
        }

        //정렬
        filtered.sort((a, b) => {
          switch (sortOption) {
            case "popularity.desc":
              return b.popularity - a.popularity;
            case "release_date.desc":
              return (
                new Date(b.release_date || "1900") -
                new Date(a.release_date || "1900")
              );
            case "vote_average.desc":
              return b.vote_average - a.vote_average;
            default:
              return 0;
          }
        });

        //검색 API는 page 를 클라이언트에서 나눠주기
        const startIdx = (page - 1) * 20;
        const paged = filtered.slice(startIdx, startIdx + 20);

        return {
          ...data,
          results: paged,
          total_pages: Math.ceil(filtered.length / 20),
        };
      }

      // 검색어 없으면 기존 discover 흐름 유지
      return data;
    },
  });
};

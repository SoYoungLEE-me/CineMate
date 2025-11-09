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
      const today = new Date().toISOString().split("T")[0];

      // API 결과(result.data.results)를 순회하며 영화의 'release_date'가 오늘이거나 오늘 이후인 것만 필터
      const upcomingOnly = result.data.results.filter(
        (movie) => movie.release_date >= today
      );

      // 필터링된 배열(upcomingOnly)을 results에 담아 반환
      return { ...result.data, results: upcomingOnly };
    },
  });
};

import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchMovieVideos = ({ queryKey }) => {
  const [, id] = queryKey;
  return api.get(`/movie/${id}/videos`);
};

export const useMovieVideosQuery = (id) => {
  return useQuery({
    queryKey: ["movie-videos", id],
    queryFn: fetchMovieVideos,
    select: (result) => result.data.results,
    enabled: !!id,
  });
};

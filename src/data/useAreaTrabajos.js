import useSWR from "swr";
import API from "./index";

export const useAreaTrabajos = () => {
    const { data, error, mutate } = useSWR("/areas", API.fetcher);

    return {
        areas: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
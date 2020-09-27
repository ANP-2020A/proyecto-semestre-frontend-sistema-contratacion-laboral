import useSWR from "swr";
import API from "./index";

export const useExpLista = () => {
    const { data, error, mutate } = useSWR("/experiencias", API.fetcher);

    return {
        experiencias: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
import useSWR from "swr";
import API from "./index";

export const useEstudiosLista = () => {
    const { data, error, mutate } = useSWR("/estudios", API.fetcher);

    return {
        estudios: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
import useSWR from "swr";
import API from "./index";

export const useOfertaLista = () => {
    const { data, error, mutate } = useSWR("/ofertas", API.fetcher);

    return {
        ofertas: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
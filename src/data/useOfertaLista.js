import useSWR from "swr";
import API from "./index";

export const useOfertaLista = () => {
    const { data, error, mutate,postulante } = useSWR("/ofertas", API.fetcher);


    return {
        ofertas: data && data.data,
        interns: postulante && postulante.data.postulantes,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
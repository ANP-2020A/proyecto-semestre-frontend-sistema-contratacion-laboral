import React, { useState } from "react";
import API from "../data";
import { translateMessage } from "../utils/translateMessage";
import OfertaLista from "../components/OfertaLista";
import ArticleForm from "../components/ArticleForm";
import { Button, message, Skeleton, Row, Col } from "antd";
import { useAuth } from "../providers/Auth";
import { useAreaTrabajos } from "../data/useAreaTrabajos";
import ShowError from "../components/ShowError";
import { mutate } from "swr";

/**
 * Fetch Articles from DB
 */
export const fetchArticles = async () => {
    // console.log( `Show data fetched. Articles: ${ JSON.stringify( articles ) }` );

    return await API.get("/ofertas");
};

/**
 * Articles list page
 * @param props
 * @constructor
 */
const Ofertas = (props) => {
    const [visible, setVisible] = useState(false);
    const areasTrabajos = useAreaTrabajos();

    const auth = useAuth();

    console.log("categories", areasTrabajos);

    /**
     * Executed after the form is submitted
     * Fetches all the articles and refreshes the list
     * Closes the modal
     */
    const afterCreate = async () => {
        try {
            // show skeleton
            await mutate(
                "/ofertas",
                async (ofertas) => {
                    return { data: [{}, ...ofertas.data] };
                },
                false
            );

            await mutate("/ofertas");
            setVisible(false); // close the modal
        } catch (error) {
            console.error(
                "You have an error in your code or there are Network issues.",
                error
            );

            message.error(translateMessage(error.message));
        }
    };

    return (
        <div>
            {auth.isAuthenticated && (
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Nuevo oferta
                </Button>
            )}

            <ArticleForm
                categories={areasTrabajos.areas}
                visible={visible}
                update={false}
                onSubmit={afterCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
            <OfertaLista areas={areasTrabajos.areas} />
        </div>
    );
};

export default Ofertas;
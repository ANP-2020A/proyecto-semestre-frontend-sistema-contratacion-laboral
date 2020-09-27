import React, { useState } from "react";
import API from "../data";
import { translateMessage } from "../utils/translateMessage";
import ExpLista from "../components/ExpLista";
import ArticleForm from "../components/ArticleForm";
import { Button, message, Skeleton, Row, Col } from "antd";
import { useAuth } from "../providers/Auth";
//import { useAreaTrabajos } from "../data/useAreaTrabajos";
import ShowError from "../components/ShowError";
import { mutate } from "swr";

/**
 * Fetch Articles from DB
 */
export const fetchArticles = async () => {
    // console.log( `Show data fetched. Articles: ${ JSON.stringify( articles ) }` );

    return await API.get("/experiencias");
};

/**
 * Articles list page
 * @param props
 * @constructor
 */
const Experiencias = (props) => {
    const [visible, setVisible] = useState(false);
    //const areasTrabajos = useAreaTrabajos();

    const auth = useAuth();

    //console.log("categories", areasTrabajos);

    /**
     * Executed after the form is submitted
     * Fetches all the articles and refreshes the list
     * Closes the modal
     */
    const afterCreate = async () => {
        try {
            // show skeleton
            await mutate(
                "/articles",
                async (articles) => {
                    return { data: [{}, ...articles.data] };
                },
                false
            );

            await mutate("/articles");
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
                    Agregar experiencia
                </Button>

            )}
            <div>
                <ExpLista />
            </div>
        </div>
    );
};

export default Experiencias;
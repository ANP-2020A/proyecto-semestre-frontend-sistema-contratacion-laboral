import React, {useEffect, useState} from "react";
import {Skeleton, Card, Col, Row, Radio, Typography, Button, Pagination} from "antd";
import Routes from "../constants/routes";
import {Link} from "react-router-dom";
import {useOfertaLista} from "../data/useOfertaLista";
import ShowError from "./ShowError";

const {Text} = Typography;

const OfertaLista = (props) => {
    const {ofertas, isLoading, isError, mutate} = useOfertaLista();
    // const [ articles, setArticles ] = useState( props.articles );

    useEffect(() => {
        //   console.log( 'props.articles', props.articles );
        //   setArticles( props.articles );
        console.log(props.ofertas);
    }, []);

    const handleChangeCategory = (e) => {
        // setArticles( props.articles.filter( ( article ) => e.target.value === 'all' || article.category_data.id ===
        // e.target.value ) );
    };

    if (isLoading) {
        return (
            <Row justify="center" gutter={30}>
                {[...new Array(9)].map((_, i) => (
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        <div style={{textAlign: "center"}}>
                            <Skeleton.Image style={{width: 200}}/>
                            <Card title="" extra="" cover="" loading/>
                        </div>
                    </Col>
                ))}
            </Row>
        );
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }

    const onChange = () => {
        //page.links
    }

    return (
        <>
            {props.areas && (
                <Row justify="center">
                    <Col>
                        <Radio.Group
                            defaultValue="all"
                            buttonStyle="solid"
                            onChange={handleChangeCategory}
                        >
                            <Radio.Button value="all">Todas</Radio.Button> )
                            {props.areas.map((area, index) => (
                                <Radio.Button value={area.id} key={index}>
                                    {area.area_trabajo}
                                </Radio.Button>
                            ))}
                        </Radio.Group>
                    </Col>
                </Row>
            )}
            <Row justify="center" gutter={30}>
                {ofertas.map((oferta, i) => (
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        {oferta.titulo_oferta ? (
                            <Card
                                title={oferta.titulo_oferta}
                                extra={
                                    <Link to={Routes.OFERTA_ID.replace(":id", oferta.id)}>
                                        Más
                                    </Link>
                                }
                                cover={

                                    <img
                                        alt={oferta.title}
                                        src={oferta.image}
                                    />


                                }
                            >
                                <Text type="primary"><strong>Fecha de publicacion:</strong> {oferta.fecha_publicacion}
                                </Text>
                                <p> {oferta.descripcion_oferta}</p>
                                <Button type="primary" htmlType="submit">Postularme</Button>
                            </Card>
                        ) : (
                            <div style={{textAlign: "center"}}>
                                <Skeleton.Image style={{width: 200}}/>
                                <Card title="" extra="" cover="" loading/>
                            </div>
                        )}
                    </Col>
                ))}
            </Row>
            {
                <Pagination defaultCurrent={1} total={50} onChange={onChange}/>
            }

        </>
    );
};
export default OfertaLista;
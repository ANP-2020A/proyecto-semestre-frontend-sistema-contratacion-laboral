import React, {useEffect, useState} from "react";
import {Skeleton, Card, Col, Row, Radio, Typography, Button, Table} from "antd";
import Routes from "../constants/routes";
import {Link} from "react-router-dom";
import {useExpLista} from "../data/useExpLista";
import ShowError from "./ShowError";

const {Text} = Typography;

const OfertaLista = (props) => {
    const {experiencias, isLoading, isError, mutate} = useExpLista();
    // const [ articles, setArticles ] = useState( props.articles );

    useEffect(() => {
        //   console.log( 'props.articles', props.articles );
        //   setArticles( props.articles );
        console.log(props.experiencias);
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

    const columns = [
        {title: 'Empresa', dataIndex: 'empresa', key: 'empresa'},
        {title: 'Direccion', dataIndex: 'direccion', key: 'direccion'},
        {title: 'Fecha Inicio', dataIndex: 'fechaInicio', key: 'fechaInicio'},
        {title: 'Fecha Finalización', dataIndex: 'fechaFinalizacion', key: 'fechaFinalizacion'},
        {title: 'Postulante', dataIndex: 'postulante', key: 'postulante'},
        //{title: 'Area Trabajo', dataIndex: 'areatrabajo', key: 'areatrabajo'},
        {
            title: 'Acción',
            dataIndex: '',
            key: 'x',
            render: () => <a>Delete</a>,
        },
    ];

    return (
        <>

            <Row justify="center" gutter={30}>
                {
                    experiencias.map((experiencia, i) => (
                        <Table
                            key={i}

                            columns={columns}
                            expandable={{
                                expandedRowRender: record => <p style={{margin: 0}}>{record.areatrabajo}</p>,
                                //rowExpandable: record => record.name !== 'Not Expandable',
                            }}
                            dataSource={[
                                {
                                    key: experiencia.id,
                                    empresa: experiencia.nombre_empresa,
                                    direccion: experiencia.lugar_trabajo,
                                    fechaInicio: experiencia.fecha_inicio,
                                    fechaFinalizacion: experiencia.fecha_finalizacion,
                                    postulante: experiencia.nombre_postulante,
                                    areatrabajo: experiencia.area_trabajo,
                                }
                            ]}
                        />
                        /**<Card
                         title={experiencia.nombre_empresa}
                         extra={
                                        <Link to={Routes.ARTICLE_ID.replace(":id", experiencia.id)}>
                                            Detaslles
                                        </Link>
                                    }

                         cover={
                                        <img
                                            alt={experiencia.area_trabajo}
                                        />
                                    }
                         >
                         <Text type="secondary">{oferta.created_at}</Text>
                         <p> {oferta.descripcion_oferta}</p>
                         <Button type="primary" htmlType="submit">Postularme</Button>
                         </Card>**/
                    ))}
            </Row>
        </>
    );
};
export default OfertaLista;
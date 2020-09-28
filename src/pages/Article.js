import React from 'react';
import CommentsList from '../components/CommentsList';
import {useArticle} from '../data/useArticle';
import ShowError from '../components/ShowError';
import withAuth from '../hocs/withAuth';
import {useParams} from 'react-router-dom';
import {useOfertaLista} from '../data/useOfertaLista';
import {Row, Skeleton, List, Avatar} from 'antd';
import LinkOutlined from "@ant-design/icons/lib/icons/LinkOutlined";

const ArticlePage = () => {
    let {id} = useParams();
    const oferta = useArticle(id);

    return (
        <>
            {
                oferta.isLoading
                    ? <div>Cargando...</div>
                    : oferta.isError
                    ? <ShowError error={oferta.isError}/>
                    : <>
                        <h1 className='title'>
                            Oferta: {oferta.oferta.titulo_oferta}
                        </h1>
                        <p>{oferta.oferta.descripcion_oferta}</p>

                        <h3 className='title'>
                            Publicado: {oferta.oferta.fecha_publicacion} Empresa: {oferta.oferta.empresa.empresa}
                        </h3>

                        <h2>Para postular realiza el test de ingreso</h2>
                        <a href={oferta.oferta.link_google_forms}>Pulsa aquí <LinkOutlined/></a>
                        <Row>
                            <img
                                title={oferta.oferta.title}
                                src={oferta.oferta.image}
                            />

                        </Row>
                        {
                            oferta.oferta.postulantes.map((postulante) => (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {
                                            title: postulante.postulante_id
                                        }
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            ))
                        }
                    </>
            }
        </>
    );

};

export default withAuth(ArticlePage);

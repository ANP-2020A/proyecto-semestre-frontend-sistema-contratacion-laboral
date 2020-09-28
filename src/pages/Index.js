import React from 'react';
import Routes from '../constants/routes';
import Navigation from '../components/Navigation';
import 'antd/dist/antd.css';

import {Card, Col, Row} from 'antd';
import {Carousel} from 'antd';
import OfertaLista from '../components/OfertaLista';
import {useOfertaLista} from '../data/useOfertaLista';
import ShowError from '../components/ShowError';
import imageninicio from '../images/imageninicio.PNG'
import imagen1 from '../images/imagen1.PNG'
import imagen2 from '../images/imagen2.PNG'
import imagen3 from '../images/imagen3.PNG'
import postulante from '../images/postulante.PNG'
import empresa from '../images/empresa.PNG'
import {Link} from "react-router-dom";
import {useAuth} from "../providers/Auth";

const HomePage = () => {

    const {Meta} = Card;

    const ofertas = useOfertaLista();

    const {isAuthenticated} = useAuth();
    const contentStyle = {
        height: '450px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <>
            <h1 className='page-title'> BIENVENIDOS</h1>
            <h2 className='subtitulo'>Crea, comparte y almacena tu curriculum</h2>


            <Carousel autoplay style={{marginLeft: '160px', height: '500px', width: '800px'}}>
                <div>
                    <h3 style={contentStyle}><img className='imageninicio' src={imageninicio}/></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img className='imagen1' src={imagen1}/></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img className='imagen2' src={imagen2}/></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img className='imagen3' src={imagen3}/></h3>
                </div>
            </Carousel>


            <div className="site-card-wrapper">
                {
                    isAuthenticated
                        ? '' :
                        <Row gutter={16}>
                            <Col span={14}>
                                <Card
                                    hoverable
                                    style={{width: 260, marginLeft: 180}}
                                    cover={<Link to={Routes.LOGIN}><img className='postulante' src={postulante}
                                                                        alt='Profe a Tiempo' height={50}/></Link>}
                                >
                                    <Meta title="JobFTrue" description="Ecuentra tu empleo"/>
                                </Card>
                            </Col>
                            <Col span={5}>
                                <Card hoverable
                                      style={{width: 260, marginLeft: 22}}
                                      cover={<Link to={Routes.LOGINEMPRESA}><img className='empresa' src={empresa}
                                                                                 alt='Profe a Tiempo'
                                                                                 height={50}/></Link>}
                                >
                                    <Meta title="JobFTrue" description="Empresa"/>
                                </Card>
                            </Col>
                        </Row>
                }
            </div>

            {
                isAuthenticated
                    ? '' :
                    <Row>
                        <p className='t1'>Encuentra tu empleo</p>
                        <p className='t2'>Empresa</p>
                    </Row>

            }
            <h1 className='t3'>LISTA DE OFERTAS</h1>
            {
                ofertas.isLoading
                    ? 'Cargando...'
                    : ofertas.isError
                    ? <ShowError error={ofertas.isError}/>
                    : <OfertaLista ofertas={ofertas.ofertas}/>
            }
        </>
    );
};


export default HomePage;

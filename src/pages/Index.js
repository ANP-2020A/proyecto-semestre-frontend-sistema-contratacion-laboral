import React from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import logo from '../images/logo.PNG'
import OfertaLista from '../components/OfertaLista';
import { useOfertaLista } from '../data/useOfertaLista';
import ShowError from '../components/ShowError';
import imageninicio from '../images/imageninicio.PNG'
import imagen1 from '../images/imagen1.PNG'
import imagen2 from '../images/imagen2.PNG'
import imagen3 from '../images/imagen3.PNG'
import postulante from '../images/postulante.PNG'
import empresa from '../images/empresa.PNG'

const HomePage = () => {
  const ofertas = useOfertaLista();

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


        <Carousel autoplay style={{ marginLeft:'160px', height:'500px', width:'800px'}}>
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

        <a href='http://localhost:3000/ingreso' rel='noopener noreferrer' target='_blank'>
            <img className='postulante' src={ postulante } alt='Profe a Tiempo' height={ 50 } />
        </a>

        <a href='http://localhost:3000/ingreso' rel='noopener noreferrer' target='_blank'>
            <img className='empresa' src={ empresa } alt='Profe a Tiempo' height={ 50 } />
        </a>

        <p className='t1'>Encuentra tu empleo</p>
        <p className='t2'>Empresa</p>




      <h1 className='t3'>LISTA DE OFERTAS</h1>
      {
        ofertas.isLoading
          ? 'Cargando...'
          : ofertas.isError
          ? <ShowError error={ ofertas.isError } />
          : <OfertaLista articles={ ofertas.articles } />
      }
    </>
  );
};


export default HomePage;

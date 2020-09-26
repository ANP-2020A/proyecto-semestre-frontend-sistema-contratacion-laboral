import React from 'react';
import OfertaLista from '../components/OfertaLista';
import { useOfertaLista } from '../data/useOfertaLista';
import ShowError from '../components/ShowError';

const HomePage = () => {
  const ofertas = useOfertaLista();

  return (
    <>
      <h1 className='page-title'>
        <a href='https://es.reactjs.org/'>React</a> boilerplate con{" "}
        <a href='https://ant.design/docs/react/introduce'>Antd</a>
      </h1>

      <p>Este es el contenido de la página principal.</p>

      <h2>Lista de Artículos</h2>
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

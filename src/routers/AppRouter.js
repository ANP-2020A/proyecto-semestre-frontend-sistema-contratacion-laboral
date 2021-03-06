import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Routes from '../constants/routes';
import NotFoundPage from '../pages/NotFoundPage';
import Loading from '../components/Loading';

/**
 * El módulo loadable (https://loadable-components.com/docs/code-splitting/)
 * Permite dividir los componentes en diferentes "bundles" (archivos js compilados)
 * de esta manera la aplicación puede ir cargando los compoenentes bajo demanda.
 * Solo cargará los componentes que sean utilizados por el usuario.
 *
 * Esto acelera la carga de la aplicación ya que de lo contrario tendríamos un solo
 * bundle de gran tamaño y el navegador demoraría en descargarlo para renderizar la aplicación.
 *
 * @type {{fallback: JSX.Element}}
 */
const loadableOptions = { fallback: <Loading /> };

const AsyncHome = loadable( () => import( '../pages/Index' ), loadableOptions );
const AsyncLogin = loadable( () => import( '../pages/Login' ), loadableOptions );
const AsyncRegister = loadable( () => import( '../pages/Register' ), loadableOptions );
const AsyncPrivate = loadable( () => import( '../pages/Private' ), loadableOptions );
const AsyncExperiencia = loadable( () => import( '../pages/Experiencias' ), loadableOptions );
const AsyncEstudios = loadable( () => import( '../pages/Estudios' ), loadableOptions );
const AsyncArticles = loadable( () => import( '../pages/Ofertas' ), loadableOptions );
const AsyncArticle = loadable( () => import( '../pages/Article' ), loadableOptions );
const AsyncAbout = loadable( () => import( '../pages/About' ), loadableOptions );
const AsyncLogout = loadable( () => import( '../pages/Logout' ), loadableOptions );
const AsyncLoginEmpresa = loadable( () => import( '../pages/LoginEmpresa' ), loadableOptions );
const AsyncLogoutEmpresa = loadable( () => import( '../pages/LogoutEmpresa' ), loadableOptions );
const AsyncRegisterEmpresa = loadable( () => import( '../pages/RegisterEmpresa' ), loadableOptions );

/**
 * Este es el componente que se encarga de renderizar el componente adecuado
 * de acuerdo a la ruta en la que se encuentra el navegador.
 * <Switch> https://reactrouter.com/web/api/Switch
 * <PublicRoute> Utilizado para las páginas que son accesibles por todos los usuarios.
 * <PrivateRoute> Utilizado para lás páginas que son protegidas,
 *                este componente valida si existe una sesión activa.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AppRouter = () => (
  <Switch>
    <PublicRoute exact path={ Routes.HOME } component={ AsyncHome } />
    <PublicRoute path={ Routes.LOGIN } component={ AsyncLogin } />
    <PublicRoute path={ Routes.LOGINEMPRESA } component={ AsyncLoginEmpresa } />
    <PublicRoute path={ Routes.REGISTER } component={ AsyncRegister } />
    <PublicRoute path={ Routes.REGISTEREMPRESA } component={ AsyncRegisterEmpresa } />
    <PublicRoute path={ Routes.OFERTAS } component={ AsyncArticles } />
    <PublicRoute path={ Routes.ABOUT } component={ AsyncAbout } />


    <PrivateRoute path={ Routes.PRIVATE } component={ AsyncPrivate } />
    <PrivateRoute path={ Routes.PERFIL } component={ AsyncPrivate } />
    <PrivateRoute path={ Routes.EXPERIENCIAS } component={ AsyncExperiencia } />
    <PrivateRoute path={ Routes.ESTUDIOS } component={ AsyncEstudios } />
    <PrivateRoute path={ Routes.OFERTA_ID } component={ AsyncArticle } />
    <PrivateRoute path={ Routes.LOGOUT } component={ AsyncLogout } />
    <PrivateRoute path={ Routes.LOGOUTEMPRESA } component={ AsyncLogoutEmpresa } />

    <Route component={ NotFoundPage } />
  </Switch>
);

export default AppRouter;

import React from 'react';
import { Layout, Row, Col, Button, Popover,Divider,Space,Card } from 'antd';
import imagen4 from '../images/imagen4.PNG'
import empresa from "../images/empresa.PNG";
const AboutPage = () => (
  <>
       <Row className='second-part'>
              <Col span={24}>
                  <h1 style={{color:"yellow", fontSize:'30px'}} >Quienes Somos</h1>
                  <img className='imagen4' src={ imagen4 } width={500} height={250} />

                  <h3 style={{fontSize:'30px', color:"yellow"}}>¡Buscas Trabajo!
                  </h3>
                  <h3 style={{fontSize:'20px'}}>
                      En la actualidad encontrar un trabajo se ha vuelto un reto
                      para la mayoria de personas en especial para los jovenes que
                      recien se graduan ya sea por falta de experiencia o porque
                      no tienen los suficientes conocimientos, este sitio web te ayudara
                      en la busqueda de tu trabajo ideal aun cuando no tengas experiencia
                      basicamente este sitio web esta diseñado para esto dar oportunidad a
                      jovenes que recien se graduan de ingresar al campo laboral
                  </h3>
              </Col>
          </Row>
          <Row justify='center' className='second-part'>
              <h1 style={{color:"yellow"}}>Equipo de Trabajo</h1>
          </Row>
          <Row justify='center' className='second-part'>
              <table className="team">
                  <tr>
                      <th></th>
                  </tr>
                  <tr>
                      <th></th>
                      <Card title="ANDRES PROAÑO" >
                          <div >
                             <p>juan.proano01@epn.edu.ec</p>
                          </div>
                      </Card>
                      <td></td>
                      <td>
                          <Card title="BRYAN OLIVARES" >
                              <div >
                                  <p>bryan.olivares@epn.edu.ec</p>
                              </div>
                          </Card>
                      </td>
                  </tr>
                  <tr>
                      <th></th>
                      <td></td>
                      <td>
                          <Card title="EDUARDO CAIZA" >
                              <div >
                                  <p>jefferson.caiza@epn.edu.ec</p>
                              </div>
                          </Card>
                      </td>
                  </tr>
                  <tr>
                      <th></th>
                  </tr>

              </table>
              <Row className='second-part'>
                  <Col span={24}>
                      <h1 style={{fontSize:'30px'}}>Misión</h1>
                      <h3 style={{fontSize:'20px'}}>
                          La mision de JobFTrue es facilitar la busqueda de trabajo sin que esto dependa de
                          la experiencia laboral que tengan los jovenes recien graduados

                      </h3>
                  </Col>
                  <Col span={24}>
                      <h1 style={{fontSize:'30px'}}>Visión</h1>
                      <h3 style={{fontSize:'20px'}}>
                         Llegar a ser un sitio web reconocido principalmente para la obtencion de un trabajo
                          para los diferentes jovenes recien graduados

                      </h3>
                  </Col>
              </Row>



          </Row>







  </>
);

export default AboutPage;

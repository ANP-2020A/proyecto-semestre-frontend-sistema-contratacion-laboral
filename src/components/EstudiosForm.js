import React, {useState} from 'react';
import {Modal, Form, Input, message, Upload, Select, DatePicker, Space} from 'antd';
import {translateMessage} from '../utils/translateMessage';
import API from '../data/index';
import ErrorList from './ErrorList';
import {PlusOutlined} from '@ant-design/icons';
import {mutate} from 'swr';

const {Option} = Select;

function getBase64(file, callback) {
    console.log('file', file);
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

const EstudiosForm = ({
                     visible,
                     update,
                     onSubmit,
                     onCancel,
                     categories
                 }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    /**
     * onCreate article
     * Called when the user clicks on button to create article
     * @param values
     */
    const onCreate = async values => {
        console.log('Received values of form: ', values);

        form.validateFields()
            .then(async (values) => {
                console.log('values', values);
                setIsSaving(true);

                // use form data to be able to send a file to the server
                const data = new FormData();
                data.append('institucion', values.institucion);
                data.append('nivel', values.nivel);
                data.append('nivel_ingles', values.nivel_ingles);
                data.append('fecha_inicio', fechaInicio);
                data.append('fecha_finalización', fechaFin);
                //data.append( 'empresa_id', values.category_id );

                try {
                    await API.post('/estudios', data); // post data to server
                    form.resetFields();
                    setFileList([]);
                    setImageUrl(null);
                    setIsSaving(false);
                    onSubmit();
                } catch (e) {
                    setIsSaving(false);

                    const errorList = e.error && <ErrorList errors={e.error}/>;
                    message.error(<>{translateMessage(e.message)}{errorList}</>);
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };

    const onUpdate = async values => {
        console.log('Received values of form: ', values);

        form.validateFields()
            .then(async (values) => {
                try {
                    await API.put('/estudios', values); // post data to server
                    form.resetFields();
                    onSubmit();
                } catch (error) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );

                    message.error(translateMessage(error.message));
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };

    // const handleChangePhoto = info => {
    //   getBase64( info.file, imageUrl => setImageUrl( imageUrl ) );
    // };


    function onChange(date, dateString) {
        console.log(date, dateString);
        setFechaInicio(dateString)

    }

    function onChange1(date, dateString) {
        console.log(date, dateString);
        setFechaFin(dateString)

    }

    return (
        <Modal
            visible={visible}
            title='Agrega una registro academico'
            okText='Crear'
            confirmLoading={isSaving}
            cancelText='Cancelar'
            onCancel={onCancel}
            onOk={!update
                ? onCreate
                : onUpdate}
        >
            <Form
                form={form}
                layout='vertical'
                name='form_in_modal'
            >
                <Form.Item
                    name='institucion'
                    label='Institución'
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa una institución'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='nivel'
                    label='Nivel de estudio'
                    rules={[
                        {
                            required: true,
                            message: 'Seleciona un nivel de estudio'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Nivel de ingles"
                    >
                        <Option value="Primaria">Primaria</Option>
                        <Option value="Secundaria">Secundaria</Option>
                        <Option value="Instiuto">Instiuto</Option>
                        <Option value="Universitario">Universitario</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='nivel_ingles'
                    label='Nivel de ingles'
                    rules={[
                        {
                            required: true,
                            message: 'Selecciona un nivel de ingles'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Nivel de ingles"
                    >
                        <Option value="Basico">Basico</Option>
                        <Option value="Intermedio">Intermedio</Option>
                        <Option value="Avanzado">Avanzado</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='fecha_inicio'
                    label='Fecha de inicio'
                    rules={[
                        {
                            required: true,
                            message: 'Elige la fecha de inicio del estudio'
                        }
                    ]}>
                    <DatePicker onChange={onChange} />
                </Form.Item>
                <Form.Item
                    name='fecha_finalización'
                    label='Fecha'
                    rules={[
                        {
                            required: true,
                            message: 'Elige la fecha de graduación'
                        }
                    ]}>
                    <DatePicker onChange={onChange1} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EstudiosForm;

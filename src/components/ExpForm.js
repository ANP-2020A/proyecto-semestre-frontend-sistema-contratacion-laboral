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

const ExpForm = ({
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
                data.append('nombre_empresa', values.area_trabajo);
                data.append('area_trabajo', values.area_trabajo);
                data.append('lugar_trabajo', values.lugar_trabajo);
                data.append('fecha_inicio', fechaInicio);
                data.append('fecha_finalización', fechaFin);
                //data.append( 'empresa_id', values.category_id );

                try {
                    await API.post('/experiencias', data); // post data to server
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
                    await API.put('/experiencias', values); // post data to server
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
            title='Agrega una experiencia'
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
                    name='nombre_empresa'
                    label='Empresa'
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa un empresa'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='area_trabajo'
                    label='Area de trabajo'
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa una area de trabajo'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='lugar_trabajo'
                    label='Dirección'
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa una direccion del trabajo'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name='fecha_inicio'
                    label='Fecha de inicio'
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa una fecha de inicio del trabajo'
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
                            message: 'Ingresa una fecha de finalizacion del trabajo'
                        }
                    ]}>
                <DatePicker onChange={onChange1} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ExpForm;

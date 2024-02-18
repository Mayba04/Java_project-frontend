import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Row, Upload } from "antd";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import http_common from "../../http_common";
import { ICategoryCreate } from "../create/type";

const EditCategoryPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [form] = Form.useForm<ICategoryCreate>();

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const response = await http_common.get(`/api/categories/${id}`);
                form.setFieldsValue(response.data);
            } catch (error) {
                console.error("Помилка при отриманні даних з API:", error);
            }
        };

        if (id) {
            fetchDataFromApi();
        }
    }, [id, form]);

    const onHandlerSubmit = async (values: ICategoryCreate) => {
        try {
            await http_common.put(`/api/categories/${id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/');
        } catch(ex) {
            console.log("Exception update category", ex);
        }
    }

    return (
        <>
            <h1>Редагувати категорію</h1>
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onHandlerSubmit}
                      layout={"vertical"}
                      style={{
                          minWidth: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          padding: 20,
                      }}
                >

                    <Form.Item
                        label={"Назва"}
                        name={"name"}
                        htmlFor={"name"}
                        rules={[
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 3, message: "Довжина поля 3 символи"}
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label={"Опис"}
                        name={"description"}
                        htmlFor={"description"}
                        rules={[
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 10, message: "Довжина поля 10 символів"}
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        label={"image"}
                        name={"image"}
                        htmlFor={"image"}
                        rules={[
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 1, message: "Довжина поля 11 символів"}
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>
                    

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Зберегти зміни
                        </Button>
                        <Link to={"/"}>
                            <Button style={{margin: 10}} htmlType="button">
                                Скасувати
                            </Button>
                        </Link>
                    </Row>
                </Form>
            </Row>
        </>
    );
}

export default EditCategoryPage;

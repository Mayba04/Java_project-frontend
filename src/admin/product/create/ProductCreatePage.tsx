import {Button, Form, Input, Row, Select, Upload} from "antd";
import { PlusOutlined} from '@ant-design/icons';
import type {UploadChangeParam} from 'antd/es/upload';
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {ICategoryName, IProductCreate} from "../type.ts"
import http_common from "../../../http_common";
import {IUploadedFile} from "../type.ts";
import {useEffect, useState} from "react";
const ProductCreatePage = () => {
    const [categories, setCategories] = useState<ICategoryName[]>([]);
    const navigate = useNavigate();

    const [form] = Form.useForm<IProductCreate>();

    useEffect(() => {
        http_common.get("/api/categories")
            .then(resp => {
                // Переконайтесь, що ви зберігаєте масив категорій
                setCategories(resp.data.content);
            })
            .catch(error => {
                console.error("Failed to load categories", error);
                setCategories([]); // Встановлюйте порожній масив у випадку помилки
            });
    }, []);

    const onSubmit = async (values: IProductCreate) => {
        console.log("data", values);
        try {
            await http_common.post("/api/products", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    
                },
            });
            navigate('/admin/product');
        }
        catch(ex) {
            console.log("Exception create category", ex);
        }
    }

    const categoriesData = categories?.map(item => ({label: item.name, value: item.id}));

    return (
        <>
            <h1>Add Product</h1>
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onSubmit}
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
                        label="Name"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 3, message: 'Name must have at least 3 symbols!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        htmlFor="price"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 3, message: 'Name must have at least 3 symbols!'},
                        ]}
                    >
                        <Input autoComplete="price"/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'It is a required field!'},
                            {min: 10, message: 'Name must have at least 10 symbols!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        label="Категорія"
                        name="category_id"
                        htmlFor="category_id"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Select
                            placeholder="Оберіть категорію: "
                            options={categoriesData}
                        />
                    </Form.Item>
                    <Form.Item
                        name="files"
                        label="Images"
                        valuePropName="files"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList as IUploadedFile[];
                            return image.map(x=> x.originFileObj);
                        }}
                        rules={[{required: true, message: 'Choose image for category!'}]}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={10}
                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Add
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() =>{ navigate('/')}}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Row>
        </>
    )
}

export default ProductCreatePage;
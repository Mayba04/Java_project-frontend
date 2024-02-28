// ProductListPage.tsx
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { List, Card } from 'antd';
import http_common from '../../http_common';
import { IProductItem } from '../type'; // Замініть '../type' на відповідний шлях до вашого type.ts
import {Button} from "antd";
const ProductListPage = () => {
    const [products, setProducts] = useState<IProductItem[]>([]);

    useEffect(() => {
        // Отримайте дані про продукти з API
        http_common.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <Link to={"/product/create"}>
                <Button type="primary" style={{margin: '5px'}}>
                    ADD +
                </Button>
            </Link>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={products}
                renderItem={product => (
                    <List.Item>
                        <Card title={product.name}>
                            <p>{product.description}</p>
                            <p>Price: {product.price}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ProductListPage;

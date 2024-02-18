import { Button } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import http_common from "../../http_common";

interface CategoryType {
    id: number;
    name: string;
    description: string;
    image: string;
}

const CategoryListPage = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    const fetchDataFromApi = async () => {
        try {
            const response = await http_common.get("/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Помилка при отриманні даних з API:", error);
        }
    };

    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button size={"large"}>Додати</Button>
            </Link>

            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <strong>ID:</strong> {category.id}<br />
                        <strong>Name:</strong> {category.name}<br />
                        <strong>Description:</strong> {category.description}<br />
                        {category.image && (
                            <>
                                <strong>Image:</strong>{" "}
                                <img src={`http://localhost:8080/uploading/150_${category.image}`} alt={category.name} style={{ maxWidth: "100px" }} />
                                <br />
                            </>
                        )}
                        <Button type="primary" size="small">
                            <Link to={`/category/edit/${category.id}`}>Редагувати</Link>
                        </Button>{" "}
                        <Button type="default" size="small">
                            Видалити
                        </Button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CategoryListPage;

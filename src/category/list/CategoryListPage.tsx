import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import http_common from "../../http_common";

interface CategoryType {
  id: number;
  name: string;
  description: string;
  image: string;
}

const CategoryListPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showDeleteConfirm = (categoryId: number) => {
    setCategoryIdToDelete(categoryId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      if (categoryIdToDelete !== null) {
        await http_common.delete(`/api/categories/${categoryIdToDelete}`);
        fetchDataFromApi();
      }
    } catch (ex) {
      console.error("Exception during category deletion", ex);
    } finally {
      setIsModalVisible(false);
      setCategoryIdToDelete(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCategoryIdToDelete(null);
  };

  return (
    <>
      <h1>Список категорій</h1>
      <Link to={"/category/create"}>
        <Button size={"large"}>Додати</Button>
      </Link>

      <ul>
        {categories.map((category) => (
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
            <Button type="default" size="small" onClick={() => showDeleteConfirm(category.id)}>
              Видалити
            </Button>
            <hr />
          </li>
        ))}
      </ul>

      <Modal
        title="Підтвердіть видалення"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Ви впевнені, що хочете видалити цю категорію?</p>
      </Modal>
    </>
  );
};

export default CategoryListPage;

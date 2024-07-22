import axios from "axios";
const baseUrl = "https://localhost:7000";

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Product/getall`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const createProduct = async (
  cost,
  weight,
  quantity,
  description,
  name,
  categoryID
  //categoryName
) => {
  try {
    let newFormData = new FormData();
    newFormData.append("Cost", cost);
    newFormData.append("Weight", weight);
    newFormData.append("Quantity", quantity);
    newFormData.append("Description", description);
    newFormData.append("Name", name);
    newFormData.append("CategoryID", categoryID);
    // newFormData.append("Category.ID", categoryID);
    // newFormData.append("Category.Name", categoryName);
    const response = await axios.post(
      `${baseUrl}/api/Product/create`,
      newFormData
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const updateProduct = async (
  id,
  cost,
  weight,
  quantity,
  description,
  name,
  categoryID
) => {
  try {
    let newFormData = new FormData();
    newFormData.append("Cost", cost);
    newFormData.append("Weight", weight);
    newFormData.append("Quantity", quantity);
    newFormData.append("Description", description);
    newFormData.append("Name", name);
    newFormData.append("CategoryID", categoryID);
    const response = await axios.patch(
      `${baseUrl}/api/Product/update/${id}`,
      newFormData
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/Product/delete/${id}`);
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

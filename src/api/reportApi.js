import axios from "axios";
const baseUrl = "https://localhost:7000";

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const getTotalRevenue = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Order/get-total-revenue`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const getRevernueByCategory = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/Category/getAllRevenuebyCategory`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const getAllOrderDetail = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/OrderDetail/getall`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

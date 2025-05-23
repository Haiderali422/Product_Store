import axios from "axios";


const Product_URL = process.env.REACT_APP_API_PRODUCT_URL;
const Category_URL = process.env.REACT_APP_API_CATEGORY_URL;

export  const fetchCategory  = async () => {
    const response = await axios.get(`${Category_URL}`)
    return response.data;
}

export const SelectedCategory = async (selectedCategory) => {
    const response = await axios.get(`${Category_URL}?type=${selectedCategory}`);
    return response.data;

}


export  const FetchProduct  = async () => {
    const response = await axios.get(`${Product_URL}`)
    return response.data;
}


export  const FetchSingleProduct  = async (id) => {
    const response = await axios.get(`${Product_URL}/${id}`)
    return response.data;
}
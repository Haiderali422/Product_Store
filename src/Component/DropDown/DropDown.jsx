import React from 'react';
import './DropDown.css'
import {useState , useEffect} from "react";
import Pagination from "../Pagination/Pagination";
import { useCart } from "../../Context/CartContext";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";

const DropDown = () => {

    let [currentPage, setCurrentPage] = useState(1);
    const {state , dispatch} = useCart();
    const { products, categories, selectedCategory, isLoading  } = state;


    const itemsPerPage = 10;
    const currentData = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <select
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
                value= {selectedCategory}
            >
                <option value="all">All Products</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                ))}
            </select>

                <>
                    {currentData.length > 0 ? (
                        <div style={{ marginTop: '20px' } } className='App'>
                            {currentData.map(product => (
                                   <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p>No products found.</p>
                    )}
                </>


            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={products.length}
                itemsPerPage={itemsPerPage}
            />

        </>
    );
};

export default DropDown;

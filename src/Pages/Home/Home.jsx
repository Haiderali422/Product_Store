import React from 'react';
import {useState , useEffect} from "react";
import Pagination from "../../Component/Pagination/Pagination";
import { useCart } from "../../Context/CartContext";
import ProductCard from "../../Component/ProductCard/ProductCard";
import Loader from "../../Component/Loader/Loader";
import DropDown from "../../Component/DropDown/DropDown";



const Home = () => {

    let [currentPage, setCurrentPage] = useState(1);
    const {state } = useCart();
    const { products,  selectedCategory, isLoading  } = state;

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
            <DropDown/>

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

export default Home;

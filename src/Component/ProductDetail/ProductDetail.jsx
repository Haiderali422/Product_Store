import  { useEffect } from 'react';
import './ProductDetail.css';
import { useParams , Link } from 'react-router-dom';
import placeholder from "../../assests/placeholder.png";
import Button from "../Button/Button";
import { useCart } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import {FetchSingleProduct} from "../../Nerwork/NetworkApi"
import {
    ADD_TO_CART,
    DECREMENT_QUANTITY,
    INCREMENT_QUANTITY,
    SET_SINGLE_PRODUCT,
    SET_LOADING, REMOVE_FROM_CART,
} from "../../Context/action";

const ProductDetail = () => {
    const { state, dispatch } = useCart();
    const { products, isLoading } = state;
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            dispatch({ type: SET_LOADING, payload: true });

            try {
                const res = FetchSingleProduct(id)
                console.log("response from single" , res.data);
                dispatch({ type: SET_SINGLE_PRODUCT, payload: res.product });
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                dispatch({ type: SET_LOADING, payload: false });
            }
        };

        fetchProduct();
    }, [id, dispatch]);

    if (isLoading) return <Loader />;

    const product = products?.find(p => p.id === parseInt(id));
    if (!product) return <p className="product-not-found">Product not found.</p>;

    const imageSrc = product.image || placeholder;

    return (

        <>
            <div className="back-arrow-container">
                <Link to={`/`}>
                    <Button text={"← Back to Home"}/>
                </Link>
            </div>
            <div className="product-detail-container">

                <div className="product-detail-card">
                    <div className="product-image-wrapper">
                        <img
                            className="product-detail-image"
                            src={imageSrc}
                            alt={product.title}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = placeholder;
                            }}
                        />
                    </div>

                    <div className="product-detail-content">
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-brand"><strong>Brand:</strong> {product.brand}</p>
                        <p className="product-category"><strong>Category:</strong> {product.category?.toUpperCase()}</p>
                        <p className="product-description"><strong>Description:</strong> {product.description}</p>
                        <p className="product-model"><strong>Model:</strong> {product.model}</p>
                        <p className="product-color"><strong>Color:</strong> {product.color}</p>
                        <p className="product-price"><strong>Price:</strong> ${product.price}</p>
                        <p className="product-discount"><strong>Discount:</strong> {product.discount}%</p>

                        <div className="product-action-buttons">
                            <Button
                                text="-"
                                onClick={() => dispatch({ type: DECREMENT_QUANTITY, payload: product.id })}
                            />
                            { state.items.length > 0 ?  <Button text='🗑️Remove' onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: product.id })} />
                                :    <Button
                                    text="🛒 Add to cart"
                                    onClick={() => dispatch({ type: ADD_TO_CART, payload: product })}
                                />

                            }

                            <Button
                                text="+"
                                onClick={() => dispatch({ type: INCREMENT_QUANTITY, payload: product.id })}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProductDetail;

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout'
import { getProducts } from '../../redux/features/product/productSlice';
import ProductList from '../../components/product/productList/ProductList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {   
    dispatch(getProducts());
    
    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);


  return (
    <>
      <ProductList products={products} isLoading={isLoading} />
    </>
  );
}

export default Dashboard;
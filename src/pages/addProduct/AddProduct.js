import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/productForm/ProductForm'
import Loader from "../../components/loader/Loader"
import '../../components/product/addProduct.scss';
import {
  createProduct,
  selectIsLoading,
} from '../../redux/features/product/productSlice';

const initialState = {
  name: '',
  code: '',
  category: '',
  quantity: '',
  hold_quantity: '',
  price: '',
  purchase_price: '',
  description:'Nice Product',
};

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState('');

    const isLoading = useSelector(selectIsLoading);

    const { name, code ,category, price, quantity, hold_quantity,purchase_price } = product;

    const [modal, setModal] = useState(false);

    const toggleModal = () =>{
      setModal(!modal)
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const saveProduct = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('code', code);
      formData.append('category', category);
      formData.append('quantity', Number(quantity));
      formData.append('hold_quantity', Number(hold_quantity));
      formData.append('price', price);
      formData.append('purchase_price', purchase_price);
      formData.append('description', description);
      formData.append('image', productImage);

      console.log(...formData);

      await dispatch(createProduct(formData));

      navigate('/');
    };
  return (
    <div className='modal'>
      <div className='overlay'>
        <div className='modal-content'>
          {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getProduct,
  updateProduct,
  getProducts,
  selectProduct,
} from '../../../redux/features/product/productSlice';
import './ProductDetail.scss';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import Button from 'react-bootstrap/Button';
import ProductForm from '../../productForm/ProductForm';

const AdjustStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const [select, setSelect] = useState(true);
  const productEdit = useSelector(selectProduct);
  const [adjustment, setAdjustment] = useState(0);
  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getProduct(id));
    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ''
    );
  }, [productEdit]);

  const handleValueChange = (event) => {
    const inputValue = parseInt(event.target.value);
    setAdjustment(inputValue);
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'quantity') {
  //     // Handle quantity radio button actions
  //     const currentQuantity = product?.quantity;

  //     if (value === 'increase') {
  //       setProduct({ ...product, quantity: currentQuantity + adjustment });
  //     } else if (value === 'decrease') {
  //       setProduct({ ...product, quantity: currentQuantity - adjustment });
  //     }
  //   } else {
  //     // Handle other input changes
  //     setProduct({ ...product, [name]: value });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product?.name);
    formData.append('code', product?.code);
    formData.append('category', product?.category);
    if(select){
      let newQ = parseInt(product.quantity,10) + adjustment;
      formData.append('quantity', newQ.toString());
    }
    else{
      let newQ = parseInt(product.quantity, 10) - adjustment;
      
      formData.append('quantity', newQ.toString());
    }
    formData.append('hold_quantity', product?.hold_quantity);
    formData.append('price', product?.price);
    formData.append('purchase_price', product?.purchase_price);
    formData.append('description', description);
    if (productImage) {
      formData.append('image', productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());

    navigate('/');
  };

  return (
    <div className="product-detail">
      <h3 className="--mt">Adjust Stock Quantity</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; Current Stock : </b> {product.quantity}
            </p>
            <form>
              <div className="newdiv">
                <input type="radio" id="add" name="one" value="increase" />
                <label className="container" for="add">
                  Add(+)
                </label>
                <input type="radio" id="reduce" name="one" value="decrease" />
                <label
                  className="container"
                  for="reduce"
                  onClick={() => setSelect(!select)}
                >
                  Reduce(-)
                </label>
              </div>

              <br></br>
              <input
                type="number"
                value={adjustment}
                className="ip"
                onChange={handleValueChange}
                placeholder="Enter Value"
              />
              <Link to={'/'}>
                <Button
                  className="save"
                  variant="outline-primary"
                  onClick={saveProduct}
                >
                  Save
                </Button>{' '}
              </Link>
              <Link to={'/'}>
                <Button className="cancel" variant="outline-secondary">
                  Cancel
                </Button>{' '}
              </Link>
              <br />
            </form>
          </div>
        )}
      </Card>
      <div style={{ display: 'none' }}>
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
  );
};

export default AdjustStock;

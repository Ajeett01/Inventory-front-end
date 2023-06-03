import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/features/product/productSlice';
import './ProductDetail.scss';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdjustStock = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProduct(id));

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

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
              <input type="radio" id="add" value="HTML" name="one" />
              <label className="container" for="add">
                Add(+)
              </label>
              <input type="radio" id="reduce" value="CSS" name="one" />
              <label className="container" for="reduce">
                Reduce(-)
              </label>
              <br></br>
              <Form.Control type="text" placeholder=" Enter Value" />
              <Link to={'/'}><Button className="cancel" variant="outline-secondary">
                Cancel
              </Button>{' '}</Link>
              <Link to={'/'}><Button className="save" variant="outline-primary">
                Save
              </Button>{' '}</Link>
              
              <br />
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdjustStock;

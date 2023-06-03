import { BrowserRouter, Routes, Route} from "react-router-dom"
//import Dashboard from "./pages/dashboard/Dashboard";
import AddProduct from "./pages/addProduct/AddProduct";
import Layout from "./components/layout/Layout";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import EditProduct from "./pages/editProduct/EditProduct";
import AdjustStock from "./components/product/adjustStock/adjustStock";

function App() {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route
          path="/edit-product/:id"
          element={
            <Layout>
              <EditProduct />
            </Layout>
          }
        />
        <Route
          path="/adjust-stock/:id"
          element={
            <Layout>
              <AdjustStock />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

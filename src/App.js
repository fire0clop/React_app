import './static/image.css';
import Header_markt from './components/header/header';
import Features from './components/features/features';
import ProductForm from './components/ProductForm/Productform';
import HeroImage from "./static/image/hero_image.jpg";
import ProductList from "./components/ProductForm/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductCards from "./components/Product/ProductCard"
import Contact from  "./components/contact/contact"
import Footer from "./components/footer/Footer";
import ProductDescription from "./components/features/description_features";
import QuestionForm from "./components/contact/question_form";
import SectionsProduct from "./components/features/sections_product"
import Catalog from "./components/Product/Catalog";
import ProductPage from "./components/Product/ProductPage";
function App() {
    return (
        <Router>
            <div className="app-container">
                <Header_markt/>
                <img src={HeroImage} alt="1" className="full-width-image" />
                <Features />
                <Routes>
                    <Route path="/" element={
                        <>
                            <ProductDescription />
                            <SectionsProduct />
                            {/*<ProductCards />*/}
                        </>
                    } />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/product-form" element={<ProductForm />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/contacts" element={
                        <>
                            <Contact />
                            <QuestionForm/>
                        </>
                    } />
                    <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
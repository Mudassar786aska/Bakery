import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Shield, Truck, Award, Users, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-bakery-primary via-bakery-accent to-bakery-primary flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bakery-primary/20 to-transparent animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white z-10">
          <div className="max-w-3xl">
            <h1 className="font-playfair text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-bakery-secondary">Mr Bakers</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              Fresh baked goods made with love and the finest ingredients. 
              Experience the taste of tradition in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center bg-white text-bakery-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-bakery-secondary hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-bakery-primary transition-all duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-bakery-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-bakery-dark mb-4">Why Choose Mr Bakers?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We're committed to delivering exceptional quality and service in everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-bakery-primary to-bakery-accent text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Star className="h-10 w-10" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-bakery-dark">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">Only the finest ingredients go into our baked goods, ensuring exceptional taste every time</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Clock className="h-10 w-10" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-bakery-dark">Fresh Daily</h3>
              <p className="text-gray-600 leading-relaxed">Baked fresh every morning for maximum taste and quality you can trust</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-bakery-dark">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">Safe and secure payment processing with multiple convenient options</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Truck className="h-10 w-10" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-bakery-dark">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Quick and reliable delivery to bring fresh baked goods to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold text-bakery-dark mb-6">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover our most popular baked goods, carefully crafted by our skilled bakers using traditional techniques and premium ingredients
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-bakery-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-bakery-accent hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View All Products
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-bakery-primary to-bakery-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">5+</h3>
                <p className="text-bakery-light">Years of Excellence</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">1000+</h3>
                <p className="text-bakery-light">Happy Customers</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Heart className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">24+</h3>
                <p className="text-bakery-light">Product Varieties</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Star className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">4.9</h3>
                <p className="text-bakery-light">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-bakery-secondary via-bakery-light to-white">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-5xl font-bold text-bakery-dark mb-6">
            Ready to taste perfection?
          </h2>
          <p className="text-bakery-accent text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust Mr Bakers for their daily bread and special occasions. 
            Experience the difference that quality ingredients and traditional baking methods make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-bakery-primary text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-bakery-accent hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Shopping
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center border-2 border-bakery-primary text-bakery-primary px-10 py-5 rounded-lg font-bold text-xl hover:bg-bakery-primary hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
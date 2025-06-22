import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="font-playfair text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-bakery-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-bakery-accent transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-3xl font-bold text-bakery-dark mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  
                  <div className="flex-1 ml-4">
                    <h3 className="font-playfair text-lg font-semibold text-bakery-dark">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.product.description}</p>
                    <p className="text-bakery-primary font-bold mt-1">
                      PKR {item.product.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="font-playfair text-xl font-bold text-bakery-dark mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>PKR {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold text-bakery-dark">
                  <span>Total:</span>
                  <span>PKR {total.toLocaleString()}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full bg-bakery-primary text-white py-3 rounded-md font-semibold hover:bg-bakery-accent transition-colors mt-6 block text-center"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/products"
                className="w-full border border-bakery-primary text-bakery-primary py-3 rounded-md font-semibold hover:bg-bakery-primary hover:text-white transition-colors mt-3 block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    
    // Add a small delay for better UX
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <button 
          onClick={handleLike}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute top-3 left-3 bg-bakery-primary text-white px-2 py-1 rounded-full text-xs font-bold">
          Fresh
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.9)</span>
        </div>
        
        <h3 className="font-playfair text-xl font-bold text-bakery-dark mb-3 line-clamp-1 group-hover:text-bakery-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-bakery-primary">
              PKR {product.price.toLocaleString()}
            </span>
            <div className="text-xs text-gray-500 mt-1">
              {product.category}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isAdding
                ? 'bg-green-500 text-white scale-105'
                : 'bg-bakery-primary text-white hover:bg-bakery-accent hover:scale-105 hover:shadow-lg'
            }`}
          >
            <ShoppingCart className={`h-4 w-4 ${isAdding ? 'animate-bounce' : ''}`} />
            <span>{isAdding ? 'Added!' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
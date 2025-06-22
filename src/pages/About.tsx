import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-bakery-dark mb-4">
            About Mr Bakers
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Founded with a passion for creating exceptional baked goods, Mr Bakers has been serving 
            our community with love, dedication, and the finest ingredients.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-bakery-dark mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Mr Bakers was born from a simple dream - to create the perfect bakery where quality, 
                tradition, and innovation come together. Under the leadership of our owner, 
                <strong className="text-bakery-dark"> Mudassar Ullah</strong>, we've built a reputation 
                for excellence that spans across the community.
              </p>
              <p>
                Every morning, our skilled bakers arrive before dawn to begin the day's work. Using 
                time-honored techniques passed down through generations, combined with modern precision, 
                we craft each product with meticulous attention to detail.
              </p>
              <p>
                From our signature breads to our elaborate celebration cakes, every item that leaves 
                our ovens represents our commitment to quality and our love for the craft of baking.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
              alt="Bakery interior"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-bakery-secondary rounded-lg p-8 mb-16">
          <h2 className="font-playfair text-3xl font-bold text-bakery-dark text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-bakery-primary text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2 text-bakery-dark">Quality First</h3>
              <p className="text-gray-600">We never compromise on the quality of our ingredients or our craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="bg-bakery-primary text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2 text-bakery-dark">Community Focus</h3>
              <p className="text-gray-600">We're proud to serve our community and be part of your special moments</p>
            </div>
            <div className="text-center">
              <div className="bg-bakery-primary text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2 text-bakery-dark">Tradition</h3>
              <p className="text-gray-600">Honoring time-tested recipes while embracing innovation</p>
            </div>
            <div className="text-center">
              <div className="bg-bakery-primary text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2 text-bakery-dark">Made with Love</h3>
              <p className="text-gray-600">Every product is crafted with passion and attention to detail</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl font-bold text-bakery-dark mb-6">Our Mission</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg mb-6">
              At Mr Bakers, our mission is to bring joy to every table through exceptional baked goods. 
              We believe that food has the power to bring people together, create memories, and make 
              ordinary moments extraordinary.
            </p>
            <p className="text-gray-600 text-lg">
              Whether you're celebrating a special occasion or simply treating yourself to something 
              delicious, we're here to make your experience memorable with products that exceed your 
              expectations every time.
            </p>
          </div>
        </div>

        {/* Owner Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-bakery-dark mb-6">Meet Our Owner</h2>
          <div className="max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-bakery-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">MU</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-bakery-dark mb-2">Mudassar Ullah</h3>
            <p className="text-bakery-primary font-semibold mb-4">Founder & Owner</p>
            <p className="text-gray-600">
              With years of experience in the baking industry and a passion for culinary excellence, 
              Mudassar Ullah founded Mr Bakers with the vision of creating a bakery that would set 
              new standards for quality and service. His dedication to perfection and commitment to 
              customer satisfaction continues to drive our success today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
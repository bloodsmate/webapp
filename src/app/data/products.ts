export interface Product {
  id: number;
  name: string;
  price: number;
  discountPercentage?: number;
  images: string[];
  description: string;
  sizes: string[];
  stock: number;
  gender: 'Men' | 'Women' | 'Unisex';
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic White Tee',
    price: 24.99,
    discountPercentage: 10,
    images: [
      'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg',
      'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg',
      'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg',
    ],
    description: 'A timeless classic white t-shirt that goes with everything. Made from 100% organic cotton for ultimate comfort and sustainability.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 50,
    gender: 'Unisex',
    category: 'T-Shirts',
  },
  {
    id: 2,
    name: 'Vintage Black Tee',
    price: 29.99,
    images: [
      'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg',
      'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg',
      'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg',
    ],
    description: 'A sleek black t-shirt with a vintage feel. Perfect for any casual occasion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 40,
    gender: 'Unisex',
    category: 'T-Shirts',
  },
  {
    id: 3,
    name: 'Women\'s Graphic Print Tee',
    price: 34.99,
    discountPercentage: 15,
    images: [
      '/placeholder.svg?height=600&width=400&text=Graphic+Front',
      '/placeholder.svg?height=600&width=400&text=Graphic+Back',
      '/placeholder.svg?height=600&width=400&text=Graphic+Side',
    ],
    description: 'Express yourself with our unique graphic print design. Made with eco-friendly inks.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30,
    gender: 'Women',
    category: 'Graphic Tees',
  },
  {
    id: 4,
    name: 'Men\'s Striped Navy Tee',
    price: 27.99,
    images: [
      '/placeholder.svg?height=600&width=400&text=Striped+Front',
      '/placeholder.svg?height=600&width=400&text=Striped+Back',
      '/placeholder.svg?height=600&width=400&text=Striped+Side',
    ],
    description: 'Classic navy stripes for a nautical-inspired look. Perfect for summer days.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 35,
    gender: 'Men',
    category: 'T-Shirts',
  },
  {
    id: 5,
    name: 'Heather Gray Tee',
    price: 26.99,
    images: [
      '/placeholder.svg?height=600&width=400&text=Gray+Front',
      '/placeholder.svg?height=600&width=400&text=Gray+Back',
      '/placeholder.svg?height=600&width=400&text=Gray+Side',
    ],
    description: 'Soft and comfortable heather gray t-shirt for everyday wear. Versatile and stylish.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    gender: 'Unisex',
    category: 'T-Shirts',
  },
  {
    id: 6,
    name: 'Neon Green Tee',
    price: 31.99,
    discountPercentage: 5,
    images: [
      '/placeholder.svg?height=600&width=400&text=Neon+Front',
      '/placeholder.svg?height=600&width=400&text=Neon+Back',
      '/placeholder.svg?height=600&width=400&text=Neon+Side',
    ],
    description: 'Stand out from the crowd with this bold neon green tee. Perfect for parties and festivals.',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 25,
    gender: 'Unisex',
    category: 'T-Shirts',
  },
];


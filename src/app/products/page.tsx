'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Product, products } from '../data/products';

function Breadcrumb() {
  return (
    <nav className="main-content flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <Link href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Products</Link>
          </div>
        </li>
      </ol>
    </nav>
  )
}

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [cart, setCart] = useState<{ id: number; size: string }[]>([]);

  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
  const allGenders = Array.from(new Set(products.map((p) => p.gender)));

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size));
      const matchesGender =
        selectedGenders.length === 0 || selectedGenders.includes(product.gender);
      return matchesSearch && matchesSize && matchesGender;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, selectedSizes, selectedGenders]);

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const addToCart = (productId: number, size: string) => {
    setCart((prevCart) => [...prevCart, { id: productId, size }]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Our Products"
        description="Browse our collection of high-quality t-shirts"
        canonical="/products"
      />
      <div className="mb-8">
        <Breadcrumb />
      </div>
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="space-y-6">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
            />
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => handleSizeChange(size)}
                    />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Gender</h3>
              <div className="grid grid-cols-2 gap-2">
                {allGenders.map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gender-${gender}`}
                      checked={selectedGenders.includes(gender)}
                      onCheckedChange={() => handleGenderChange(gender)}
                    />
                    <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Product Image with Hover Effect */}
                <div className="relative">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
                    />
                    <Image
                      src={product.images[1]} // Second image for hover effect
                      alt={product.name}
                      width={300}
                      height={300}
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>
                </div>
                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mb-3">${product.price.toFixed(2)}</p>
                </div>
                {/* Quick View Section */}
                <div
                  className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h4 className="text-lg font-bold mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-300 mb-4">
                    ${product.price.toFixed(2)}{' '}
                    {product.discountPercentage > 0 && (
                      <span className="ml-2 text-green-400">-{product.discountPercentage}%</span>
                    )}
                  </p>
                  <p className="text-sm mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={size}
                        disabled={product.stock[index] === 0}
                        onClick={() => addToCart(product.id, size)}
                        className={`relative px-4 py-2 rounded-lg text-sm font-semibold ${
                          product.stock[index] === 0
                            ? 'bg-gray-500 cursor-not-allowed text-gray-300 relative'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {size}
                        {product.stock[index] === 0 && (
                          <span
                            className="absolute inset-0 flex items-center justify-center text-red-600 text-xl font-bold"
                          >
                            X
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

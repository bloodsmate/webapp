'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import SEO from '../components/SEO';
import { Product, Stock } from '../data/products';
import { allSizes, allGenders } from '../data/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from '../redux/cartSlice';
import { toast } from '../hooks/use-toast';
import Filters from '../components/ProductFilters';
import productNotFound from "@/app/assets/product_not_found.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';

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
  );
}

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null);
  const [selectedSizesByProduct, setSelectedSizesByProduct] = useState<Map<number, string>>(new Map());

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mainImageRef = useRef<Map<number, string>>(new Map());

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSize =
          selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size));
        const matchesGender =
          selectedGenders.length === 0 || selectedGenders.includes(product.gender);
        const matchesAvailability =
          selectedAvailability === null || product.inStock === (selectedAvailability ? true : false);
        return matchesSearch && matchesSize && matchesGender && matchesAvailability;
      });
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [products, searchTerm, selectedSizes, selectedGenders, selectedAvailability]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getStockQuantity = (product: Product, size: string): number => {
    const stockItem = product.stock.find((item: Stock) => item.size === size);
    return stockItem ? stockItem.quantity : 0;
  };

  const handleSizeSelection = (productId: number, size: string) => {
    setSelectedSizesByProduct((prev) => new Map(prev).set(productId, size));
  };

  const getSelectedSizeForProduct = (productId: number) => {
    return selectedSizesByProduct.get(productId) || null;
  };

  const handleAddToCart = (product: Product) => {
    const selectedSize = getSelectedSizeForProduct(product.id);
    if (!selectedSize) {
      toast({
        title: "Size not selected",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      image: mainImageRef.current.get(product.id) || product.images[0],
      discountPrice: (product.discountPercentage && product.discountPercentage > 0) ? discountedPrice(product) : 0,
    }));
    toast({
      title: "Added to cart",
      description: `${product.name} (Size: ${selectedSize}) added to cart!`,
    });
  };

  const discountedPrice = (product: Product) => {
    return product.discountPercentage
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : product.price;
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div></div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <SEO
        title="Our Products"
        description="Browse our collection of high-quality t-shirts"
        canonical="/products"
      />
      <div className="mb-8">
        <Breadcrumb />
      </div>
      <h1 className="text-3xl font-bold mb-8">Collection</h1>

      {/* Mobile Filter Buttons */}
      <div className="md:hidden flex justify-between mb-4">
        <Button onClick={toggleDropdown} className="flex items-center gap-2">
          <Menu className="w-4 h-4" /> Filters
        </Button>
        <Button onClick={toggleSidebar} className="flex items-center gap-2">
          <Menu className="w-4 h-4" /> Advanced Filters
        </Button>
      </div>

      {/* Sidebar Filter for Mobile */}
      <div className={`fixed inset-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden mt-16`}>
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedGenders={selectedGenders}
          setSelectedGenders={setSelectedGenders}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          allSizes={allSizes}
          allGenders={allGenders}
          isMobile={true}
          onClose={toggleSidebar}
        />
      </div>

      {/* Dropdown Filter for Mobile */}
      {isDropdownOpen && (
        <div className="mb-4">
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
            allSizes={allSizes}
            allGenders={allGenders}
            isMobile={true}
            onClose={toggleDropdown}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block w-full md:w-80">
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
            allSizes={allSizes}
            allGenders={allGenders}
          />
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <Image
                src={productNotFound}
                alt="No products found"
                width={300}
                height={300}
                className="mx-auto"
              />
              <p className="text-gray-500 mt-4">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentProducts.map((product) => {
                const mainImage = mainImageRef.current.get(product.id) || product.images[0];
                const selectedSize = getSelectedSizeForProduct(product.id);

                return (
                  <div
                    key={product.id}
                    className="relative bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                    style={{ minHeight: '500px' }}
                  >
                    {/* Product Image with Hover Effect */}
                    <div className="relative">
                      <Link href={`/products/${product.id}`} prefetch={false}>
                        <Image
                          src={mainImage}
                          alt={product.name}
                          width={300}
                          height={600}
                          className="w-full h-96 object-cover transition-transform duration-300 transform group-hover:scale-105"
                        />
                      </Link>

                      {/* Discount Price Tag */}
                      {(product.discountPercentage > 0) && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                          Save {product.discountPercentage}%
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-gray-900 transition-colors">
                        {product.name}
                      </h3>

                      {/* Product Color */}
                      {product.color && (
                        <p className="text-sm text-gray-500 mb-2">Color: {product.color}</p>
                      )}

                      {/* Stock Status */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-sm font-semibold ${
                            product.inStock ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-center gap-2 mb-3">
                        {product.discountPercentage && product.discountPercentage > 0 ? (
                          <>
                            <p className="text-base md:text-lg text-gray-500 font-semibold">
                              LKR {discountedPrice(product)}
                            </p>
                            <p className="text-sm md:text-base text-gray-400 line-through">LKR {product.price.toFixed(2)}</p>
                          </>
                        ) : (
                          <p className="text-base md:text-lg text-gray-500 font-semibold">LKR {product.price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>

                    {/* Quick View Section */}
                    <div
                      className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <h4 className="text-lg font-bold mb-2">{product.name}</h4>

                      {/* Price Section */}
                      <div className="flex items-center gap-2 mb-4">
                        {product.discountPercentage && product.discountPercentage > 0 ? (
                          <>
                            <p className="text-gray-300 font-semibold">
                              LKR {discountedPrice(product)}
                            </p>
                            <p className="text-sm text-gray-400 line-through">LKR {product.price.toFixed(2)}</p>
                            {/* <span className="ml-2 text-green-400 font-semibold">Save {product.discountPercentage}%</span> */}
                          </>
                        ) : (
                          <p className="text-gray-300 font-semibold">LKR {product.price.toFixed(2)}</p>
                        )}
                      </div>

                      {/* Image Slider */}
                      <div className="mb-4">
                        <div className='relative'>
                          <Swiper
                            modules={[Navigation]}
                            spaceBetween={10}
                            slidesPerView={5}
                            navigation={{
                              nextEl: '.swiper-button-next',
                              prevEl: '.swiper-button-prev',
                            }}
                            breakpoints={{
                              320: {
                                slidesPerView: 4,
                              },
                              640: {
                                slidesPerView: 4,
                              },
                              1024: {
                                slidesPerView: 4,
                              },
                              1500: {
                                slidesPerView: 5,
                              },
                            }}
                          >
                            {product.images.map((image, index) => (
                              <SwiperSlide key={index}>
                                <div
                                  className="w-16 h-16 cursor-pointer border-2 border-transparent hover:border-gray-900 rounded-lg overflow-hidden"
                                  onClick={() => {
                                    mainImageRef.current.set(product.id, image);
                                    setSelectedSizesByProduct((prev) => new Map(prev).set(product.id, null));
                                  }}
                                >
                                  <Image
                                    src={image}
                                    alt={`${product.name} - ${index + 1}`}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          {/* Custom Navigation Arrows */}
                          <div className="swiper-button-prev absolute left-0 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                            <ChevronLeft className="w-6 h-6 text-gray-900" />
                          </div>
                          <div className="swiper-button-next absolute right-0 bottom-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                            <ChevronRight className="w-6 h-6 text-gray-900" />
                          </div>
                        </div>
                      </div>

                      {/* Size Selection */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelection(product.id, size)}
                            className={`relative px-4 py-2 rounded-lg text-sm font-semibold border border-white ${
                              getStockQuantity(product, size) === 0
                                ? 'bg-gray-500 cursor-not-allowed text-gray-300 relative'
                                : selectedSize === size
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-700 hover:bg-gray-900 text-white'
                            }`}
                            disabled={getStockQuantity(product, size) === 0}
                          >
                            {size}
                            {getStockQuantity(product, size) === 0 && (
                              <span
                                className="absolute inset-0 flex items-center justify-center text-red-600 text-xl font-bold"
                              >
                                X
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg"
                        disabled={!selectedSize || !product.inStock} // Disable if out of stock
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
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
      )}
    </div>
  );
}
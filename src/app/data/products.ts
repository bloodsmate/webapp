export interface Stock {
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  stock: Stock[];
  color: string;
  inStock: boolean;
  gender: "Men" | "Women" | "Unisex";
  category: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export const products: Product[] = [
  {
    "id": 2,
    "name": "Classic Cotton T-Shirt",
    "description": "A comfortable and stylish cotton t-shirt for everyday wear.",
    "price": 29.99,
    "discountPercentage": 10,
    "color": "white",
    "images": ["https://res.cloudinary.com/midefulness/image/upload/v1739572241/BloodsMate/temp/ACH_5502_yhf279.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572240/BloodsMate/temp/ACH_5553_eigzq6.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572239/BloodsMate/temp/ACH_5509_n11ozi.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572239/BloodsMate/temp/ACH_5520_k4vjc2.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572237/BloodsMate/temp/ACH_5500_yowljw.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572235/BloodsMate/temp/ACH_5560_wpu9kp.jpg"],
    "sizes": [
        "S",
        "M",
        "L",
        "XL"
    ],
    "stock": [
        {
            "size": "S",
            "quantity": 0
        },
        {
            "size": "M",
            "quantity": 36
        },
        {
            "size": "L",
            "quantity": 30
        },
        {
            "size": "XL",
            "quantity": 10
        }
    ],
    "inStock": true,
    "gender": "Unisex",
    "category": "T-Shirts",
    "categoryId": 2,
    "createdAt": "2025-02-11T07:34:23.000Z",
    "updatedAt": "2025-02-13T21:34:47.000Z"
  },
  {
    "id": 3,
    "name": "Classic Cotton T-Shirt",
    "description": "A comfortable and stylish cotton t-shirt for everyday wear.",
    "price": 19.99,
    "discountPercentage": 10,
    "color": "white",
    "images": ["https://res.cloudinary.com/midefulness/image/upload/v1739572241/BloodsMate/temp/ACH_5502_yhf279.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572240/BloodsMate/temp/ACH_5553_eigzq6.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572239/BloodsMate/temp/ACH_5509_n11ozi.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572239/BloodsMate/temp/ACH_5520_k4vjc2.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572237/BloodsMate/temp/ACH_5500_yowljw.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572235/BloodsMate/temp/ACH_5560_wpu9kp.jpg"],
    "sizes": [
        "S",
        "M",
        "L",
        "XL"
    ],
    "stock": [
        {
            "size": "S",
            "quantity": 0
        },
        {
            "size": "M",
            "quantity": 40
        },
        {
            "size": "L",
            "quantity": 30
        },
        {
            "size": "XL",
            "quantity": 8
        }
    ],
    "inStock": true,
    "gender": "Unisex",
    "category": "T-Shirts",
    "categoryId": 2,
    "createdAt": "2025-02-11T07:41:54.000Z",
    "updatedAt": "2025-02-13T21:34:47.000Z"
  },
  {
    "id": 4,
    "name": "Classic Cotton T-Shirt",
    "description": "A comfortable and stylish cotton t-shirt for everyday wear.",
    "price": 19.99,
    "discountPercentage": 10,
    "color": "white",
    "images": ["https://res.cloudinary.com/midefulness/image/upload/v1739572241/BloodsMate/temp/ACH_5502_yhf279.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572240/BloodsMate/temp/ACH_5553_eigzq6.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572239/BloodsMate/temp/ACH_5509_n11ozi.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572239/BloodsMate/temp/ACH_5520_k4vjc2.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572237/BloodsMate/temp/ACH_5500_yowljw.jpg","https://res.cloudinary.com/midefulness/image/upload/v1739572235/BloodsMate/temp/ACH_5560_wpu9kp.jpg"],
    "sizes": [
        "S",
        "M",
        "L",
        "XL"
    ],
    "stock": [
        {
            "size": "S",
            "quantity": 0
        },
        {
            "size": "M",
            "quantity": 40
        },
        {
            "size": "L",
            "quantity": 30
        },
        {
            "size": "XL",
            "quantity": 20
        }
    ],
    "inStock": true,
    "gender": "Unisex",
    "category": "T-Shirts",
    "categoryId": 2,
    "createdAt": "2025-02-11T15:06:12.000Z",
    "updatedAt": "2025-02-11T15:06:12.000Z"
  }
]


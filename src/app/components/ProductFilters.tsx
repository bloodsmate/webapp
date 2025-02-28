'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { X } from 'lucide-react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[] | ((prev: string[]) => string[])) => void; // Allow function or value
  selectedGenders: string[];
  setSelectedGenders: (genders: string[] | ((prev: string[]) => string[])) => void; // Allow function or value
  selectedAvailability: boolean | null;
  setSelectedAvailability: (availability: boolean | null | ((prev: boolean | null) => boolean | null)) => void; // Allow function or value
  allSizes: string[];
  allGenders: string[];
  isMobile?: boolean;
  onClose?: () => void; // For mobile close functionality
}

export default function Filters({
  searchTerm,
  setSearchTerm,
  selectedSizes,
  setSelectedSizes,
  selectedGenders,
  setSelectedGenders,
  selectedAvailability,
  setSelectedAvailability,
  allSizes,
  allGenders,
  isMobile = false,
  onClose,
}: FiltersProps) {
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev: string[]) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev: string[]) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const handleAvailabilityChange = (availability: boolean) => {
    setSelectedAvailability((prev: boolean | null) =>
      prev === availability ? null : availability
    );
  };

  return (
    <div className={`bg-white p-6 shadow-lg border border-gray-100 ${isMobile ? 'w-full' : 'w-full md:w-80'}`}>
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <Button onClick={onClose} variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <div className="space-y-8">
        {/* Search Input */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Search</h3>
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-200 focus:border-gray-900 focus:ring-gray-900 rounded-lg"
          />
        </div>
        {/* Size Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Size</h3>
          <div className="grid grid-cols-3 gap-3">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedSizes.includes(size)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {/* Gender Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Gender</h3>
          <div className="grid grid-cols-2 gap-3">
            {allGenders.map((gender) => (
              <button
                key={gender}
                onClick={() => handleGenderChange(gender)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedGenders.includes(gender)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
        {/* Availability Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Availability</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAvailabilityChange(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedAvailability === true
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              In Stock
            </button>
            <button
              onClick={() => handleAvailabilityChange(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedAvailability === false
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Out of Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
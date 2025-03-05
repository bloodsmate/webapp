import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { checkAuth } from '@/app/redux/authSlice';
import { updateShippingDetails } from '@/app/redux/userSlice';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import TailwindLoader from '@/app/components/TailwindLoader';
import { toast } from '@/app/hooks/use-toast';

interface ShippingAddressFormData {
    shippingAddress: string;
    city: string;
    zipCode: string;
    phone: string;
}
  
interface Errors {
    shippingAddress?: string;
    city?: string;
    zipCode?: string;
    phone?: string;
}

const ShippingAddress = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<ShippingAddressFormData>({
    shippingAddress: user?.shippingAddress || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    phone: user?.phone || '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  useEffect(() => {
    if (token && !user?.id) {
      dispatch(checkAuth());
    }
  }, [token, user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.shippingAddress) newErrors.shippingAddress = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip Code is required';
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must start with 0 and contain exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (user?.id) {
      try {
        await dispatch(
          updateShippingDetails({ userId: user.id, ...formData })
        ).unwrap();
        toast({
            title: "Shipping address updated successfully!",
            variant: "success"
        })
      } catch (error) {
        toast({
            title: "Failed to update shipping address.",
            variant: "destructive"
        })
      }
    }
  };

  if (loading) {
    return <TailwindLoader />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="shippingAddress">Address</Label>
          <Input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
          />
          {errors.shippingAddress && <p className="text-red-500 text-sm">{errors.shippingAddress}</p>}
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <Button type="submit">Save Address</Button>
      </form>
    </div>
  );
};

export default ShippingAddress;
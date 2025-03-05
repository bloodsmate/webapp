import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { checkAuth } from '@/app/redux/authSlice';
import { updateAccountDetails } from '@/app/redux/userSlice';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import TailwindLoader from '@/app/components/TailwindLoader';
import { toast } from '@/app/hooks/use-toast';

const AccountDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [accountFormData, setAccountFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [passwordFormData, setPasswordFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  useEffect(() => {
    if (token && !user?.id) {
      dispatch(checkAuth());
    }
  }, [token, user, dispatch]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountFormData({ ...accountFormData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData({ ...passwordFormData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateAccountForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!accountFormData.name) newErrors.name = 'Name is required';
    if (!accountFormData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountFormData.email)) {
      newErrors.email = 'Invalid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (passwordFormData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (passwordFormData.password !== passwordFormData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAccountForm()) return;

    if (user?.id) {
      try {
        await dispatch(
          updateAccountDetails({
            userId: user.id,
            name: accountFormData.name,
            email: accountFormData.email,
            password: '', // No password update here
          })
        ).unwrap();
        toast({
            title: "Account details updated successfully!",
            variant: "success"
        })
      } catch (error) {
        toast({
            title: "Failed to update account details.",
            variant: "destructive"
        })
      }
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    if (user?.id) {
      try {
        await dispatch(
          updateAccountDetails({
            userId: user.id,
            name: user.name, // Keep existing name
            email: user.email, // Keep existing email
            password: passwordFormData.password,
          })
        ).unwrap();
        toast({
            title: "Password updated successfully!",
            variant: "success"
        })
        setPasswordFormData({ password: '', confirmPassword: '' }); // Clear password fields
      } catch (error) {
        toast({
            title: "Failed to update password.",
            variant: "destructive"
        })
      }
    }
  };

  if (loading) {
    return <TailwindLoader />;
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Account Details</h2>

      {/* Account Details Form */}
      <form onSubmit={handleAccountSubmit} className="space-y-4 mb-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={accountFormData.name}
            onChange={handleAccountChange}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={accountFormData.email}
            onChange={handleAccountChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <Button type="submit">Update Account</Button>
      </form>

        <div className="p-8 border border-black shadow-sm ">
        <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

        {/* Password Update Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
            <Label htmlFor="password">New Password</Label>
            <Input
                type="password"
                id="password"
                name="password"
                value={passwordFormData.password}
                onChange={handlePasswordChange}
                required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordFormData.confirmPassword}
                onChange={handlePasswordChange}
                required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <Button type="submit">Update Password</Button>
        </form>
        </div>
    </div>
  );
};

export default AccountDetails;
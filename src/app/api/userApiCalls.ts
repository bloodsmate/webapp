import { publicAuthRequest } from "../data/requestMethods";
import { userLogin, userRegistration } from '../types/user'

interface ApiResponse {
    data: any;
    loading: boolean;
    error: string | null;
}

export const userRegister = async (userDetails: userRegistration): Promise<ApiResponse> => {
    let loading = true;
    let error: string | null = null;
    let data: any = [];

    try {
        const res = await publicAuthRequest.post(`/auth/register`, userDetails);
        loading = false;
        data = res.data;
        return { data, loading, error };
    } catch (err) {
        console.error(err);
        loading = false;
        error = err instanceof Error ? err.message : "An unknown error occurred in user registration";
        return { data, loading, error };
    }
};

export const userSignIn = async (userDetails: userLogin): Promise<ApiResponse> => {
    let loading = true;
    let error: string | null = null;
    let data: any = [];

    try {
        const res = await publicAuthRequest.post(`/auth/login`, userDetails);
        loading = false;
        data = res.data;
        console.log(res.data);
        return { data, loading, error };
    } catch (err) {
        console.error(err);
        console.log("Error");
        loading = false;
        error = err instanceof Error ? err.message : "An unknown error occurred in user registration";
        return { data, loading, error };
    }
};
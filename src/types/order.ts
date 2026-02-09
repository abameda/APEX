export type PaymentMethod = 'vodafone_cash' | 'instapay' | 'telda';

export type OrderStatus = 'pending' | 'approved' | 'rejected';

export interface Order {
    id: string;
    email: string;
    name: string;
    phone: string;
    business_name?: string;
    payment_method: PaymentMethod;
    screenshot_url: string;
    status: OrderStatus;
    download_count: number;
    max_downloads: number;
    download_token?: string;
    download_expires_at?: string;
    watermarked_file_url?: string;
    created_at: string;
    updated_at: string;
    approved_at?: string;
    approved_by?: string;
}

export interface CreateOrderRequest {
    email: string;
    name: string;
    phone: string;
    business_name?: string;
    payment_method: PaymentMethod;
    screenshot: File;
}

export interface PaymentInfo {
    method: PaymentMethod;
    label: string;
    number: string;
    icon: string;
    color: string;
    instructions: string;
}

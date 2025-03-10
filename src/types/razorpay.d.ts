interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string; // Added this property
  handler: (response: any) => void;
  prefill?: {
    email?: string;
  };
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
}

interface Razorpay {
  new (options: RazorpayOptions): {
    open: () => void;
  };
}

interface Window {
  Razorpay: Razorpay;
}
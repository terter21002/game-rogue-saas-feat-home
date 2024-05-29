'use client';

import { Elements } from '@stripe/react-stripe-js';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@ui/components/ui/button';
import { toast } from 'sonner';
import { stripeConfig } from '@/config/const';
import { createDonation } from '@/request/donate';
import { useDonate } from '@/store/use-donate';
const stripeApiKey = loadStripe(stripeConfig.publishKey);

export default function DonatePage(): JSX.Element {
  return (
    <Elements stripe={stripeApiKey} options={{ appearance: { theme: 'night' } }}>
      <Donate />
    </Elements>
  );
}

export function Donate(): JSX.Element {
  const stripe = useStripe();
  const elements = useElements();
  const { setDonate } = useDonate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<null | undefined> => {
    e.preventDefault();
    const cardElement = elements?.getElement('card');

    try {
      if (!stripe || !cardElement) return null;

      const response = await createDonation(1 * 100);

      await stripe.confirmCardPayment(response, {
        payment_method: { card: cardElement },
      });
      toast.success('Payment successful');
      setDonate(true);
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  return (
    <form onSubmit={void onSubmit}>
      <div className="border-1 rounded-md border-[#0D1526] p-2">
        <CardElement
          options={{
            style: {
              base: {
                color: '#FFF',
              },
            },
          }}
        />
      </div>
      <Button type="submit" className="mt-4">
        Proceed
      </Button>
    </form>
  );
}

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@ui/components/ui/button';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { stripeConfig } from '@/config/const';
import { createSubscription } from '@/request/subscription';

const stripeApiKey = loadStripe(stripeConfig.publishKey);
export default function CheckoutPage(): JSX.Element {
  return (
    <Elements
      stripe={stripeApiKey}
      options={{ appearance: { theme: 'night', labels: 'floating' } }}
    >
      <Checkout />
    </Elements>
  );
}

export function Checkout(): JSX.Element {
  const stripe = useStripe();
  const elements = useElements();
  const { username } = useParams<{ username: string }>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const cardElement = elements?.getElement('card');

    try {
      if (!stripe || !cardElement) return;
      const client_secret = await createSubscription(username);

      await stripe.confirmCardPayment(client_secret, {
        payment_method: { card: cardElement },
      });
      toast.success('Payment successful');
      window.location.reload();
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
        Submit
      </Button>
    </form>
  );
}

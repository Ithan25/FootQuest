import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is missing. Add it to your .env.local file.\n" +
          "Get your key from https://dashboard.stripe.com/apikeys"
      );
    }
    _stripe = new Stripe(key, { typescript: true });
  }
  return _stripe;
}

/**
 * Convenience alias – use `stripe` in API routes where the key is guaranteed
 * to exist at runtime, or call `getStripe()` for the same effect.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return Reflect.get(getStripe(), prop);
  },
});


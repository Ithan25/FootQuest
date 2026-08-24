import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Use a direct Supabase admin client for the webhook
// because we can't use cookie-based auth here (Stripe sends the request)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Use service role key if available, otherwise fall back to anon key
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  try {
    switch (event.type) {
      // ─── Checkout completed → activate Golden Ball ───
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;

        if (userId) {
          await supabase
            .from("utilisateur")
            .update({
              role: "golden_ball",
              stripe_customer_id: session.customer as string,
            })
            .eq("id", userId);

          console.log(`[Stripe] Golden Ball activated for user ${userId}`);
        }
        break;
      }

      // ─── Subscription cancelled → revert to basic ───
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.supabase_user_id;

        if (userId) {
          await supabase
            .from("utilisateur")
            .update({ role: "basic" })
            .eq("id", userId);

          console.log(`[Stripe] Golden Ball deactivated for user ${userId}`);
        } else {
          // Fallback: find user by stripe_customer_id
          const customerId = subscription.customer as string;
          await supabase
            .from("utilisateur")
            .update({ role: "basic" })
            .eq("stripe_customer_id", customerId);

          console.log(
            `[Stripe] Golden Ball deactivated for customer ${customerId}`
          );
        }
        break;
      }

      // ─── Invoice payment failed → optionally handle ───
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn(
          `[Stripe] Payment failed for customer ${invoice.customer}`
        );
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("[Stripe] Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

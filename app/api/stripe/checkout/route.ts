import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Check if user already has a Stripe customer ID stored
    const { data: profile } = await supabase
      .from("utilisateur")
      .select("role, stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (profile?.role === "golden_ball") {
      return NextResponse.json(
        { error: "Tu es déjà Golden Ball !" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Reuse existing Stripe customer or create a new one
    let customerId = profile?.stripe_customer_id as string | null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      // Store the customer ID (ignore error if column doesn't exist yet)
      await supabase
        .from("utilisateur")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/shop?success=true`,
      cancel_url: `${appUrl}/shop?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}

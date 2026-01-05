import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = { runtime: 'edge' };

export default async function handler(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const payload = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    console.log('Betaling ontvangen:', event.data.object.id);
  }

  return NextResponse.json({ received: true });
}

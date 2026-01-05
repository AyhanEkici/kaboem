import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = { runtime: 'edge' };

export default async function handler(req: NextRequest) {
  const formData = await req.formData();
  const PRICING: Record<string, number> = {
    onepager: 19900,
    webshop: 49900,
    cms: 29900,
    multilang: 9900,
    seo: 4900,
    domain: 1500
  };

  let total = 7900; // setup
  const lineItems = [{ price_ { currency: 'eur', product_data: { name: 'Platform Setup' }, unit_amount: 7900 }, quantity: 1 }];

  for (const [key, price] of Object.entries(PRICING)) {
    if (formData.get(key) === 'true') {
      total += price;
      lineItems.push({
        price_ {
          currency: 'eur',
          product_ { name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) },
          unit_amount: price
        },
        quantity: 1
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'bancontact', 'ideal'],
    line_items: lineItems,
    success_url: `${process.env.SITE_URL}/bedankt`,
    cancel_url: `${process.env.SITE_URL}`
  });

  return NextResponse.redirect(session.url, 303);
}
import { config } from './config';
export function paymentConfigured(){return Boolean(config.paymentUrl)}
export function paymentRedirectUrl(orderNumber:string, token:string){ if(!config.paymentUrl) return null; const u=new URL(config.paymentUrl); u.searchParams.set('order',orderNumber); u.searchParams.set('token',token); u.searchParams.set('callback',config.callbackUrl); return u.toString(); }
// IMPORTANT: This function intentionally does NOT fake verification. Implement the gateway's official server-to-server Verify API here after its credentials are supplied.
export async function verifyPayment(_authority:string,_amountCents:number){ if(!process.env.PAYMENT_API_KEY || !process.env.PAYMENT_SECRET || !process.env.PAYMENT_MERCHANT_ID) throw new Error('Payment verification is not configured.'); return false; }

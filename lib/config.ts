export const config = {
  paymentUrl: process.env.PAYMENT_URL || '',
  callbackUrl: process.env.CALLBACK_URL || 'http://localhost:3000/api/payment/callback',
  supportEmail: process.env.SUPPORT_EMAIL || '',
  telegramUrl: process.env.TELEGRAM_URL || '',
  whatsappUrl: process.env.WHATSAPP_URL || '',
  reservationMinutes: Number(process.env.RESERVATION_MINUTES || 15)
};

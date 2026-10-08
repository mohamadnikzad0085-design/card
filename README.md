# VirtualCard
فروشگاه واقعی کارت مجازی با Next.js + Prisma + SQLite.

## نکته امنیتی مهم
اطلاعات واقعی کارت در هیچ فایل Frontend، HTML، JavaScript یا LocalStorage قرار نگرفته است. موجودی در Database نگهداری می‌شود. تابع Verify عمداً بدون اتصال به API رسمی درگاه موفقیت جعلی ایجاد نمی‌کند.

## 1) نصب و اجرا
نیاز: Node.js 20 یا جدیدتر.

```bash
npm install
cp .env.example .env
```
فایل `.env` را باز کنید و `AUTH_SECRET` را با یک رشته تصادفی طولانی عوض کنید.

سپس:
```bash
npm run db:push
npm run db:seed
npm run dev
```
سایت: `http://localhost:3000`

## 2) Backend
Backend داخل همان Next.js است و API Routeهای داخل `app/api` مسئول سفارش، پرداخت، احراز هویت و تحویل هستند.

## 3) Database
پایگاه داده SQLite است. `npm run db:push` جداول را می‌سازد. برای تولید می‌توانید بعداً PostgreSQL را جایگزین کنید.

## 4) تنظیم درگاه
در `.env`:
- `PAYMENT_URL=` لینک درگاه
- `PAYMENT_API_KEY=` کلید API محرمانه
- `PAYMENT_MERCHANT_ID=` شناسه پذیرنده
- `PAYMENT_SECRET=` کلید محرمانه
- `CALLBACK_URL=` آدرس Callback عمومی

فقط گذاشتن `PAYMENT_URL` کافی نیست؛ برای تأیید واقعی باید API رسمی Verify همان درگاه در `lib/payment.ts` پیاده‌سازی شود. تا آن زمان سایت پرداخت را موفق اعلام نمی‌کند.

## 5) وارد کردن کارت موجودی
بعد از ساخت محصول، این دستور را اجرا کنید:
```bash
npm run inventory:add
```
اطلاعات کارت در ترمینال وارد و مستقیماً در Database ذخیره می‌شود؛ آن را داخل کد یا Frontend ننویسید.

## 6) افزودن محصول
محصول‌ها در جدول `products` هستند. برای نسخه اولیه یک محصول با شناسه `virtual-visa-5` توسط seed ساخته می‌شود. برای پنل مدیریت واقعی، می‌توانید API مدیریت محصولات را پشت احراز هویت مدیر اضافه کنید.

## 7) تست پرداخت
بدون درگاه واقعی، تست موفقیت پرداخت ممکن نیست و این پروژه عمداً موفقیت جعلی ندارد. برای تست کامل باید sandbox درگاه را وصل و Verify API آن را در `lib/payment.ts` پیاده کنید.

## 8) استقرار روی هاست
برای Production بهتر است PostgreSQL استفاده شود و Environment Variables روی هاست تنظیم شوند. سپس:
```bash
npm install
npm run build
npm start
```
HTTPS الزامی است. `.env` و Database حاوی اطلاعات کارت را هرگز داخل GitHub commit نکنید.

## قسمت‌هایی که من باید بعداً تنظیم کنم
1. **لینک درگاه:** `.env` → `PAYMENT_URL`
2. **کلیدهای API:** `.env` → `PAYMENT_API_KEY`, `PAYMENT_MERCHANT_ID`, `PAYMENT_SECRET`
3. **Callback:** `.env` → `CALLBACK_URL`
4. **پشتیبانی:** `.env` → `SUPPORT_EMAIL`, `TELEGRAM_URL`, `WHATSAPP_URL`
5. **اطلاعات کارت موجودی:** فقط با `npm run inventory:add` و فقط در Database.

## ساختار
- `app/` صفحات و API
- `components/` اجزای رابط
- `lib/` منطق امنیت، پرداخت، موجودی و Database
- `prisma/schema.prisma` ساختار Database
- `scripts/add-inventory.ts` ورود امن کارت موجودی
- `.env.example` تنظیمات محرمانه

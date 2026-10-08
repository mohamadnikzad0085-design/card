import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main() {
  await db.product.upsert({
    where: { id: 'virtual-visa-5' },
    update: {},
    create: { id:'virtual-visa-5', name:'کارت مجازی', description:'کارت مجازی برای خریدهای آنلاین با تحویل امن پس از تأیید پرداخت.', priceCents:500, currency:'USD', type:'VISA' }
  });
  console.log('Product ready. No real card data was inserted.');
}
main().finally(()=>db.$disconnect());

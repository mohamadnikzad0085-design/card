import { PrismaClient } from '@prisma/client';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const db = new PrismaClient();
async function main(){
  const rl=createInterface({input,output});
  const product=await db.product.findFirst({where:{active:true}}); if(!product) throw new Error('No active product. Run npm run db:seed first.');
  const cardType=await rl.question('Card type: '); const cardNumber=await rl.question('Card number: '); const holderName=await rl.question('Holder name: '); const expiryDate=await rl.question('Expiry (MM/YY): '); const cvv=await rl.question('CVV: ');
  await db.inventoryCard.create({data:{productId:product.id,cardType,cardNumber,holderName,expiryDate,cvv}}); console.log('Secure inventory card added.'); rl.close();
}
main().catch(e=>{console.error(e.message);process.exit(1)}).finally(()=>db.$disconnect());

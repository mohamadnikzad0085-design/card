import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'CHANGE_ME');
export async function setSession(userId:string){ const token=await new SignJWT({userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('30d').sign(secret); (await cookies()).set('vc_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*30}); }
export async function getUserId(){ const token=(await cookies()).get('vc_session')?.value; if(!token)return null; try{return (await jwtVerify(token,secret)).payload.userId as string}catch{return null} }
export async function clearSession(){(await cookies()).delete('vc_session');}

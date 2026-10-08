import crypto from 'node:crypto';
export function randomToken(){return crypto.randomBytes(32).toString('hex')}
export function hashToken(v:string){return crypto.createHash('sha256').update(v).digest('hex')}
export function orderNumber(){return 'VC-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomBytes(3).toString('hex').toUpperCase()}

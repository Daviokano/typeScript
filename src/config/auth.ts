// @config/auth.ts
import type { SignOptions } from 'jsonwebtoken'

// (opcional) garantir que variáveis .env foram carregadas
// import 'dotenv/config'

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set')
}
if (!JWT_EXPIRES_IN) {
  throw new Error('JWT_EXPIRES_IN is not set')
}

export default {
  jwt: {
    secret: JWT_SECRET as string, // agora é string pura
    // casamos o tipo com o que o jsonwebtoken aceita
    expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
  },
}

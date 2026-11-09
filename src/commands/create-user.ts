import { parseArgs } from 'node:util';
import { hash } from '@node-rs/argon2';
import { z } from 'zod';
import { prisma } from '../db/prisma.js';
import { randomBytes } from 'node:crypto';

// Lit les arguments : npm run user:create -- admin@test.fr monmotdepasse --admin
const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: { admin: { type: 'boolean', default: false } },
});

const [email, password] = positionals;

if (!email || !password) {
  console.error('Usage : npm run user:create -- <email> <mot_de_passe> [--admin]');
  process.exit(1);
}

const result = z.email().safeParse(email);
if (!result.success) {
  console.error("Invalid email address");
  process.exit(1);
}

const hashed = await hash(password);

try {
  const found = await prisma.user.findUnique({ where: { email: email } });
  if (found !== null) {
    console.error("Email already used");
    process.exitCode = 1;
  }

  await prisma.user.create({ data: {
    email: email,
    password: hashed,
    roles: values.admin ? 'admin' : 'user',
    apiKey: randomBytes(32).toString('hex'),
  } })

  console.log(`Création de ${email}, admin : ${values.admin}`);
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message); 
  } else {
    console.error(e);
  }
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

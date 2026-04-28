import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.record.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();
  const adminPassword = await bcrypt.hash('Admin123', 10);
  const memberPassword = await bcrypt.hash('Member123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@library.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  const member1 = await prisma.user.create({
    data: {
      name: 'Anna Zheng',
      email: 'anna@library.com',
      password: memberPassword,
      role: 'MEMBER'
    }
  });

  const member2 = await prisma.user.create({
    data: {
      name: 'Claire Jackson',
      email: 'claire@library.com',
      password: memberPassword,
      role: 'MEMBER'
    }
  });

  // Books
  const book1 = await prisma.book.create({
    data: {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      published_year: 1925,
      status: 'AVAILABLE'
    }
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      published_year: 1960,
      status: 'AVAILABLE'
    }
  });

  const book3 = await prisma.book.create({
    data: {
      title: '1984',
      author: 'George Orwell',
      published_year: 1949,
      status: 'BORROWED'
    }
  });

  const book4 = await prisma.book.create({
    data: {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      published_year: 1813,
      status: 'AVAILABLE'
    }
  });

  const book5 = await prisma.book.create({
    data: {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      published_year: 1937,
      status: 'BORROWED'
    }
  });

  const book6 = await prisma.book.create({
  data: {
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    published_year: 1943,
    status: 'AVAILABLE'
  }
});

  const book7 = await prisma.book.create({
    data: {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      published_year: 1951,
      status: 'AVAILABLE'
    }
  });

  const book8 = await prisma.book.create({
    data: {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      published_year: 1932,
      status: 'AVAILABLE'
    }
  });

  const book9 = await prisma.book.create({
    data: {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      published_year: 1988,
      status: 'BORROWED'
    }
  });

  const book10 = await prisma.book.create({
    data: {
      title: 'Gone with the Wind',
      author: 'Margaret Mitchell',
      published_year: 1936,
      status: 'AVAILABLE'
    }
  });

  // Anna's records
  await prisma.record.create({
    data: {
      user_id: member1.id,
      book_id: book3.id,
      borrow_date: new Date('2026-01-10'),
      status: 'BORROWED'
    }
  });

  await prisma.record.create({
    data: {
      user_id: member1.id,
      book_id: book5.id,
      borrow_date: new Date('2026-04-01'),
      status: 'BORROWED'
    }
  });

  await prisma.record.create({
    data: {
      user_id: member1.id,
      book_id: book1.id,
      borrow_date: new Date('2025-11-01'),
      return_date: new Date('2025-11-15'),
      status: 'RETURNED'
    }
  });

  await prisma.record.create({
    data: {
      user_id: member1.id,
      book_id: book7.id,
      borrow_date: new Date('2024-12-05'),
      return_date: new Date('2024-12-23'),
      status: 'RETURNED'
    }
  });

  // Claire's records
  await prisma.record.create({
    data: {
      user_id: member2.id,
      book_id: book9.id,
      borrow_date: new Date('2026-04-10'),
      status: 'BORROWED'
    }
  });

  await prisma.record.create({
    data: {
      user_id: member2.id,
      book_id: book2.id,
      borrow_date: new Date('2023-10-01'),
      return_date: new Date('2023-10-14'),
      status: 'RETURNED'
    }
  });

  await prisma.record.create({
    data: {
      user_id: member2.id,
      book_id: book4.id,
      borrow_date: new Date('2023-12-01'),
      return_date: new Date('2023-12-18'),
      status: 'RETURNED'
    }
  });

  await prisma.record.create({
    data: {
      user_id: member2.id,
      book_id: book6.id,
      borrow_date: new Date('2024-01-20'),
      return_date: new Date('2024-02-05'),
      status: 'RETURNED'
    }
  });

  console.log('Seed data created successfully!');
  console.log('-----------------------------------');
  console.log('Admin:   admin@library.com  / Admin123');
  console.log('Member1: anna@library.com   / Member123');
  console.log('Member2: claire@library.com / Member123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
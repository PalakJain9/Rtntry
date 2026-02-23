import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided email and optional name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: 'test@example.com'
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: 'Test User'
 *     responses:
 *       200:
 *         description: The created user object.
 *       400:
 *         description: Email is required.
 *       500:
 *         description: Internal server error.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    // Create tables if they don't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255)
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        image VARCHAR(255),
        slug VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await db.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [email, name]
    );
    const newUser = result.rows[0];

    return NextResponse.json(newUser);
  } catch (error) {
    console.error('[USERS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

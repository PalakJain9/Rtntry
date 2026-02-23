import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Create blogs table if it doesn't exist
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

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const offset = (page - 1) * limit;

    // Get total count of blogs
    const countResult = await db.query('SELECT COUNT(*) as total FROM blogs');
    const total = parseInt(countResult.rows[0].total);

    // Get paginated blogs
    const result = await db.query(
      'SELECT * FROM blogs ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const blogs = result.rows.map(blog => ({
      slug: blog.slug,
      title: blog.title,
      body: blog.body,
      image: blog.image,
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs: total,
        blogsPerPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error('[GET_BLOGS]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { slug, image } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Update blog image
    const result = await db.query(
      'UPDATE blogs SET image = $1 WHERE slug = $2 RETURNING *',
      [image, slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    const updatedBlog = {
      slug: result.rows[0].slug,
      title: result.rows[0].title,
      body: result.rows[0].body,
      image: result.rows[0].image,
    };

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('[UPDATE_BLOG]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

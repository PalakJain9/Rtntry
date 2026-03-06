import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    console.log('Starting blogs API call...');
    
    // Test database connection first
    await db.query('SELECT 1');
    console.log('Database connection successful');

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
    console.log('Table check complete');

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '15')));
    const offset = (page - 1) * limit;

    // Get total count of blogs
    const countResult = await db.query('SELECT COUNT(*) as total FROM blogs');
    const total = parseInt(countResult.rows[0].total);
    console.log(`Found ${total} total blogs`);

    // Get paginated blogs
    const result = await db.query(
      'SELECT slug, title, body, image, created_at FROM blogs ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    console.log(`Retrieved ${result.rows.length} blogs for page ${page}`);

    const blogs = result.rows.map((blog: any) => ({
      slug: blog.slug,
      title: blog.title,
      body: blog.body,
      image: blog.image || '/JOURNAL.png', // Fallback image
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = {
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs: total,
        blogsPerPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    };

    console.log('Sending response:', JSON.stringify(response, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error('[GET_BLOGS] Full error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      code: (error as any)?.code,
      detail: (error as any)?.detail
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
        blogs: [],
        pagination: null
      },
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

    const updatedBlog: any = {
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

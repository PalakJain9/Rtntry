import { Pool } from 'pg';

let pool: Pool | null = null;
let isConnected = false;

const initializePool = () => {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('❌ DATABASE_URL environment variable is not set');
      throw new Error('DATABASE_URL is required');
    }
    
    console.log('🔗 Initializing Neon database connection...');
    
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
};

const testConnection = async (): Promise<boolean> => {
  try {
    const testPool = initializePool();
    await testPool.query('SELECT 1');
    isConnected = true;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    isConnected = false;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('🔌 Database connection test failed:', errorMessage);
    console.error('🔗 DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'NOT SET');
    return false;
  }
};

export const db = {
  query: async (text: string, params?: any[]) => {
    const start = Date.now();
    
    // Test connection on first query
    if (pool === null) {
      await testConnection();
    }
    
    // If not connected, throw error instead of silent fallback
    if (!isConnected) {
      console.error('🔄 Database offline - cannot execute query');
      throw new Error('Database connection failed. Please check DATABASE_URL environment variable.');
    }
    
    try {
      const currentPool = initializePool();
      const result = await currentPool.query(text, params);
      const duration = Date.now() - start;
      console.log(`✅ Query success in ${duration}ms`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Query failed after ${duration}ms:`, errorMessage);
      
      // Mark as disconnected and throw error
      isConnected = false;
      console.error('❌ Query failed, marking connection as lost');
      throw new Error(`Database query failed: ${errorMessage}`);
    }
  },
  
  // Manual reconnection attempt
  reconnect: async () => {
    console.log('🔄 Attempting to reconnect to database...');
    return await testConnection();
  },
  
  end: () => {
    if (pool) {
      pool.end();
      pool = null;
      isConnected = false;
    }
  },
};







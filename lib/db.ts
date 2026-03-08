import { Pool } from 'pg';

let pool: Pool | null = null;
let isConnected = false;

const initializePool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('sslmode=require') ? undefined : {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    });
  }
  return pool;
};

const testConnection = async (): Promise<boolean> => {
  try {
    const testPool = initializePool();
    await testPool.query('SELECT 1');
    isConnected = true;
    return true;
  } catch (error) {
    isConnected = false;
    console.log('🔌 Database connection test failed:', error instanceof Error ? error.message : 'Unknown error');
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
    
    // If not connected, return empty results without errors
    if (!isConnected) {
      console.log('🔄 Database offline - returning empty results');
      if (text.includes('SELECT') && text.includes('blogs')) {
        return { 
          rows: text.includes('COUNT(*)') ? [{ total: 0 }] : [],
          rowCount: 0
        };
      }
      if (text.includes('CREATE TABLE')) {
        return { rows: [], rowCount: 0 };
      }
      // For other queries, return empty result
      return { rows: [], rowCount: 0 };
    }
    
    try {
      const currentPool = initializePool();
      const result = await currentPool.query(text, params);
      const duration = Date.now() - start;
      console.log(`✅ Query success in ${duration}ms`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      console.error(`❌ Query failed after ${duration}ms:`, error instanceof Error ? error.message : 'Unknown error');
      
      // Mark as disconnected and return empty results
      isConnected = false;
      
      if (text.includes('SELECT') && text.includes('blogs')) {
        return { 
          rows: text.includes('COUNT(*)') ? [{ total: 0 }] : [],
          rowCount: 0
        };
      }
      
      if (text.includes('CREATE TABLE')) {
        return { rows: [], rowCount: 0 };
      }
      
      return { rows: [], rowCount: 0 };
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







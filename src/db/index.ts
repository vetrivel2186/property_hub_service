import postgres from 'postgres';
import {drizzle} from 'drizzle-orm/postgres-js';
import {env} from "../config/env.js";
const queryClient  = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient);


export async function checkDbConnection(): Promise<boolean> {
  try {
    // Run a dummy query to check if the database responds
    // 'select 1' is the fastest test query across almost all SQL databases
    console.log("DATABASE_URL:",env.DATABASE_URL);
    await queryClient`SELECT 1`;
    console.log('✅ Database connection established successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
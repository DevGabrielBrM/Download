import { execSync } from 'child_process';

/**
 * Executes a SQL statement via the team-db CLI and returns the parsed JSON result.
 */
export function dbQuery<T = any>(sql: string): T {
  try {
    // Escape double quotes for the shell command
    const escapedSql = sql.replace(/"/g, '\\"');
    const command = `team-db "${escapedSql}"`;
    const output = execSync(command, { encoding: 'utf8' });
    
    if (!output.trim()) {
      return [] as unknown as T;
    }
    
    return JSON.parse(output);
  } catch (error: any) {
    console.error('Database query error:', error.message);
    if (error.stdout) console.error('STDOUT:', error.stdout);
    if (error.stderr) console.error('STDERR:', error.stderr);
    throw new Error(`Failed to execute query: ${sql}`);
  }
}

export const db = {
  query: dbQuery,
  escape: (str: string) => str.replace(/'/g, "''"),
  // Helper for single row results
  one: <T = any>(sql: string): T | null => {
    const results = dbQuery<T[]>(sql);
    return results.length > 0 ? results[0] : null;
  },
  // Helper for INSERT/UPDATE/DELETE (which might return empty array)
  execute: (sql: string): void => {
    dbQuery(sql);
  }
};

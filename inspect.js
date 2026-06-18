const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

// Manually parse .env.local
const envPath = path.join(__dirname, ".env.local");
let connectionString = "";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach(line => {
    const parts = line.split("=");
    if (parts.length >= 2 && parts[0].trim() === "DATABASE_URL") {
      connectionString = parts.slice(1).join("=").trim();
      // Strip quotes
      connectionString = connectionString.replace(/^['"]|['"]$/g, "");
    }
  });
}

const sql = neon(connectionString);

async function main() {
  try {
    console.log("Fetching tables...");
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
    console.log("Tables:", tables.map(t => t.table_name));

    for (const t of tables) {
      const tableName = t.table_name;
      const cols = await sql.query(
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`,
        [tableName]
      );
      console.log(`\nTable: ${tableName}`);
      cols.forEach(c => console.log(`  - ${c.column_name}: ${c.data_type}`));
    }
  } catch (err) {
    console.error(err);
  }
}

main();

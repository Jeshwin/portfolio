import "dotenv/config";
import {Pool} from "pg";

// Database connection pool
export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    ssl:
        process.env.NODE_ENV === "production"
            ? {rejectUnauthorized: false}
            : false,
});

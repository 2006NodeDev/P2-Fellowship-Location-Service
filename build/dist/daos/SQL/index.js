"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
var pg_1 = require("pg");
//entrypoint for all of the database files
// things/ config that all database files need to be completed
//build a connection pool
//a secret is any value you don't want to share with the public
exports.connectionPool = new pg_1.Pool({
    host: process.env['LB_Host'],
    user: process.env['P2_User'],
    password: process.env['P2_Password'],
    database: process.env['P2_Database'],
    port: 5432,
    max: 5 //maximum number of connections
});
//# sourceMappingURL=index.js.map
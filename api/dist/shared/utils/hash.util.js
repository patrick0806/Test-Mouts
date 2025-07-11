"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = generateHash;
exports.compareHash = compareHash;
const bcrypt_1 = require("bcrypt");
const HASH_SALT = 10;
function generateHash(password) {
    return (0, bcrypt_1.hashSync)(password, HASH_SALT);
}
async function compareHash(password, hashedPassword) {
    return (0, bcrypt_1.compare)(password, hashedPassword);
}
//# sourceMappingURL=hash.util.js.map
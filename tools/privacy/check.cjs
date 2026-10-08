// A local publication sanity check, not a replacement for code review or access control.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const html = fs.readFileSync(path.join(root, 'system.html'), 'utf8');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'staticrypt.json'), 'utf8'));
const cipher = html.match(/"staticryptEncryptedMsgUniqueVariableName":\s*"([0-9a-f]+)"/);
const salt = html.match(/"staticryptSaltUniqueVariableName":\s*"([0-9a-f]+)"/);
assert(cipher && cipher[1].length > 1024, 'Missing encrypted system payload');
assert(salt && salt[1] === config.salt, 'Salt mismatch: remembered devices would break');
assert(!/id=["'](?:goals|strategy|formula|fire|ai|growth|essence)["']/.test(html), 'Plaintext system sections found in publication file');
assert(!html.includes('/*[|staticrypt_config|]*/'), 'Unrendered template found');
assert(html.includes('id="unlock-form"'), 'Missing unlock interface');
console.log('Encrypted system publication structure verified. Review changes and test unlocking before publishing.');

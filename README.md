# `unsafe-browser-aes`

Don't use this.

Use [Web Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). Even better, use something like [TweetNaCl](https://tweetnacl.js.org/). Even betterer, rely on other things like HTTPS transport or secure HTTP(S)-only cookies for security, and don't encrypt/decrypt things on the client.

That said, sometimes you don't have a choice of what protocol to use, and you need to do individual, raw AES block operations in the browser. This is an implementation that hacks Web Crypto's CBC implementation to wrap AES encryption with moderately small code size and moderate inefficiency (four AES operations under the hood per single desired decryption operation).

# Usage

```TypeScript
import {importKey, unsafeEncryptBlock} from "unsafe-browser-aes";

// Inside async code:

const plaintextBytes = new Uint8Array([0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff]);
const keyBytes = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);

const key = await importKey(keyBytes);
const encrypted = await unsafeEncryptBlock(key, plaintextBytes);
```


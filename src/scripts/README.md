# Polkadot API

## Pitfall

Use the following import pattern to avoid `Can't import the named export 'u8aToBuffer' from non EcmaScript module (only default export is available)` error message.

```
const Api = require('@polkadot/api');

const { ApiPromise, WsProvider } = Api;
```
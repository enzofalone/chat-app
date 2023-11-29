const Sqids = require('sqids').default;

const sqids = new Sqids();

const hashPayload = (payload) => {
    console.log(payload)
  return sqids.encode([`${payload}`]); 
};

const decodePayload = (encodedPayload) => {
  return sqids.decode(encodedPayload);
};

module.exports = { hashPayload };

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { buildServer } = require('./index.cjs');
test('validates submissions and keeps stored data isolated', async () => {
  const server = buildServer({ database: ':memory:' });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const url = `http://127.0.0.1:${server.address().port}`;
  const request = (body, headers = {}) => fetch(url + '/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  try {
    assert.equal((await request({})).status, 400);
    assert.equal((await request({"name": "Sample", "email": "sample@example.org", "message": "Product enquiry"}, { Origin: 'https://untrusted.example' })).status, 403);
    const response = await request({"name": "Sample", "email": "sample@example.org", "message": "Product enquiry"});
    assert.equal(response.status, 201);
    const created = await response.json(); assert.ok(created.id);
    const cookie = response.headers.get('set-cookie').split(';')[0];
    assert.equal((await fetch(url + "/api/messages", { headers: { Cookie: cookie } })).status, 405);
    assert.equal((await fetch(url + '/server/index.cjs')).status, 404);
    assert.equal((await fetch(url + '/.git/config')).status, 404);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
test('prices demo orders from the server catalog',async()=>{
 const server=buildServer({database:':memory:'});server.listen(0,'127.0.0.1');await once(server,'listening');const url=`http://127.0.0.1:${server.address().port}`;
 try {const response=await fetch(url+'/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[{id:1,quantity:2,price:1}],totalCents:1})});assert.equal(response.status,201);assert.equal((await response.json()).totalCents,179800);
 assert.equal((await fetch(url+'/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[{id:1,quantity:-1}]})})).status,400);
 }finally{await new Promise(resolve=>server.close(resolve));}
});

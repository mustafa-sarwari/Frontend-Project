const path = require('node:path');
const fs = require('node:fs');
const vm = require('node:vm');
const { createApp, text, HttpError } = require('./http.cjs');
const products = vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../products-data.js'),'utf8')+'; productsData;',Object.create(null),{timeout:1000});
function buildServer({database=path.join(__dirname,'../.data/demo.sqlite')}={}){
  return createApp({root:path.join(__dirname,'..'),database,resources:{
    messages:{writeOnly:true,validate(body){const email=text(body.email,'Email',254);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new HttpError(400,'Enter a valid email.');return{name:text(body.name,'Name',80),email,message:text(body.message,'Message',2000)};}},
    orders:{readOnly:true,validate(body){
      if(!Array.isArray(body.items)||!body.items.length||body.items.length>30)throw new HttpError(400,'Choose 1–30 products.');
      const items=body.items.map(item=>{const product=products.find(product=>product.id===item.id);if(!product||!product.inStock||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>20)throw new HttpError(400,'Invalid product or quantity.');return{id:product.id,name:product.name,quantity:item.quantity,unitPriceCents:Math.round(product.price*100)};});
      return{items,totalCents:items.reduce((sum,item)=>sum+item.unitPriceCents*item.quantity,0),status:'demo-order'};
    }}
  },extraRoute:async(req,res,url,{send})=>{if(url.pathname!=='/api/products')return false;if(req.method!=='GET')throw new HttpError(405,'Method not allowed.');send(res,200,products);return true;}});
}
if(require.main===module)buildServer().listen(Number(process.env.PORT||4000),'127.0.0.1',()=>console.log('AXIOM demo: http://localhost:4000'));
module.exports={buildServer};

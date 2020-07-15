const proxy = [
  {
   context: ['/v2'],
   target: "https://ws.sandbox.pagseguro.uol.com.br",
   secure: true,
   changeOrigin:true,
   logLevel: 'debug'
 }
];

module.exports = proxy;
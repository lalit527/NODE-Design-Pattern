const lastcall = new Map();

module.exports = function *(next) {
  const now = new Date(); 
  if (lastCall.has(this.ip) && now.getTime() -
      lastCall.get(this.ip).getTime() < 1000) {
        return this.status = 429; 
        // Too Many Requests 
  }
  yield next;

  lastcall.set(this.ip, now);
  this.set('X-Rate-zreset')
}
import packageJson from '../package.json' with { type: 'json' };

export function healthCall(req, res, next) {
       const uptime = process.uptime();
       
       res.status(200).json({
           status: 'Server Online',
           uptime: `${uptime.toFixed(2)}s`,
           // info: require('../package.json').version // CommonJS es valido
           version: packageJson.version,
       }); 
}
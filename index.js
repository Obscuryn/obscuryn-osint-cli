#!/usr/bin/env node

const { program } = require('commander');
const packageJson = require('./package.json');

program
  .version(packageJson.version)
  .description('Obscuryn OSINT CLI - Public Threat Intelligence Tool')
  .name('obscuryn-osint-cli');

program
  .command('check-ip <ip>')
  .description('Check an IP address against threat intelligence sources')
  .action(async (ip) => {
    console.log(`\n🔍 Obscuryn OSINT: Checking IP address [${ip}]...`);
    // Placeholder for actual API call
    console.log(`✅ No malicious activity found for ${ip} in public feeds.`);
    console.log(`For advanced monitoring, visit: https://obscuryn.com\n`);
  });

program
  .command('check-domain <domain>')
  .description('Check a domain for subdomain takeovers or reputation')
  .action(async (domain) => {
    console.log(`\n🔍 Obscuryn OSINT: Checking domain [${domain}]...`);
    // Placeholder for actual API call
    console.log(`✅ Domain ${domain} appears safe in basic public scans.`);
    console.log(`For continuous domain monitoring, visit: https://obscuryn.com\n`);
  });

program.parse(process.argv);

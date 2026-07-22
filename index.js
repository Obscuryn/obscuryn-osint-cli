#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const dns = require('dns');
const util = require('util');
const packageJson = require('./package.json');

const resolveTxt = util.promisify(dns.resolveTxt);
const resolve4 = util.promisify(dns.resolve4);

program
  .version(packageJson.version)
  .description('Obscuryn OSINT CLI - Real-time Threat Intelligence Tool')
  .name('obscuryn-osint-cli');

program
  .command('check-ip <ip>')
  .description('Check an IP address against threat intelligence sources')
  .action(async (ip) => {
    console.log(chalk.bold.blue(`\n🔍 Obscuryn OSINT: Analyzing IP address [${ip}]...\n`));
    
    // IP Geolocation & Basic Info (using free ip-api.com for non-commercial OSINT)
    const geoSpinner = ora('Fetching IP Geolocation data...').start();
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,city,isp,org,as`);
        if (response.data.status === 'success') {
            geoSpinner.succeed('Geolocation data retrieved');
            console.log(chalk.cyan(`  Location:`), `${response.data.city}, ${response.data.country}`);
            console.log(chalk.cyan(`  ISP:`), `${response.data.isp}`);
            console.log(chalk.cyan(`  Organization:`), `${response.data.org}`);
            console.log(chalk.cyan(`  ASN:`), `${response.data.as}`);
        } else {
            geoSpinner.fail(`Failed to fetch geolocation: ${response.data.message}`);
        }
    } catch (error) {
        geoSpinner.fail('Failed to connect to geolocation service.');
    }

    // AbuseIPDB (Checking against public blocklists via DNSBL)
    const dnsblSpinner = ora('Checking IP against DNS Blocklists (DNSBL)...').start();
    try {
        const reversedIp = ip.split('.').reverse().join('.');
        let listed = false;
        const blocklists = [
            'zen.spamhaus.org',
            'b.barracudacentral.org',
            'bl.spamcop.net'
        ];
        
        for (const list of blocklists) {
             try {
                 await resolve4(`${reversedIp}.${list}`);
                 listed = true;
                 console.log(chalk.red(`  [!] Listed in blocklist:`), list);
             } catch (e) {
                 // Not listed throws ENOTFOUND, which is good
             }
        }
        
        if (listed) {
             dnsblSpinner.warn(chalk.yellow('IP found in one or more DNS blocklists.'));
        } else {
             dnsblSpinner.succeed('IP is clean against tested DNS blocklists.');
        }
    } catch (error) {
        dnsblSpinner.fail('Failed to query DNS blocklists.');
    }

    console.log(chalk.dim(`\nPowered by Obscuryn. For advanced enterprise monitoring, visit: https://obscuryn.com\n`));
  });

program
  .command('check-domain <domain>')
  .description('Check a domain for basic OSINT data (DNS, TXT records)')
  .action(async (domain) => {
    console.log(chalk.bold.blue(`\n🔍 Obscuryn OSINT: Analyzing domain [${domain}]...\n`));
    
    // Resolve A Records
    const aSpinner = ora('Resolving A records...').start();
    try {
        const addresses = await resolve4(domain);
        aSpinner.succeed('A records found');
        addresses.forEach(ip => console.log(chalk.cyan(`  IP:`), ip));
    } catch (error) {
        aSpinner.fail(`Failed to resolve A records: ${error.message}`);
    }

    // Resolve TXT Records (useful for finding SPF, verification strings)
    const txtSpinner = ora('Resolving TXT records...').start();
    try {
        const txtRecords = await resolveTxt(domain);
        if (txtRecords.length > 0) {
            txtSpinner.succeed('TXT records found');
            txtRecords.forEach(record => console.log(chalk.green(`  TXT:`), record.join('')));
        } else {
             txtSpinner.info('No TXT records found.');
        }
    } catch (error) {
        txtSpinner.fail(`Failed to resolve TXT records: ${error.message}`);
    }

    console.log(chalk.dim(`\nPowered by Obscuryn. For advanced domain and subdomain monitoring, visit: https://obscuryn.com\n`));
  });

program.parse(process.argv);

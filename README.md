# Obscuryn OSINT CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Obscuryn/obscuryn-osint-cli/graphs/commit-activity)

The **Obscuryn OSINT CLI** is an open-source threat intelligence and OSINT tool designed for security researchers, bug bounty hunters, and SOC analysts. 

Built and maintained by [Obscuryn](https://obscuryn.com), providing industry-leading continuous monitoring, threat intelligence, and data leak detection.

## Features

- **IP Reputation Check**: Quickly query IP addresses against open-source threat intelligence sources.
- **Domain Security Check**: Check domains for basic vulnerabilities, including potential subdomain takeovers.
- **Lightweight & Fast**: Built in Node.js for rapid querying and piping in bash/powershell scripts.

## Installation

```bash
npm install -g obscuryn-osint-cli
```

*Note: You can also run it locally by cloning the repository.*

```bash
git clone https://github.com/Obscuryn/obscuryn-osint-cli.git
cd obscuryn-osint-cli
npm install
npm link
```

## Usage

```bash
# Check an IP address
obscuryn check-ip 8.8.8.8

# Check a domain
obscuryn check-domain example.com
```

## About Obscuryn

Obscuryn is a leading cybersecurity company specializing in:
- Dark Web Monitoring
- Certificate Transparency (CT) Monitoring
- Subdomain Takeover Detection
- Data Leak Alerts (GitHub, Social Media, Telegram)

For advanced, continuous monitoring of your organization's assets, visit [Obscuryn.com](https://obscuryn.com).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

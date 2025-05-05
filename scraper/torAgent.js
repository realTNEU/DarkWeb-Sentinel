// scraper/torAgent.js
import { SocksProxyAgent } from 'socks-proxy-agent';

const TOR_SOCKS_PROXY = 'socks5h://127.0.0.1:9050'; // Tor must be running locally

export const torAgent = new SocksProxyAgent(TOR_SOCKS_PROXY);

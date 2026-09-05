import { Client } from '@nimiq/core';

console.log('Creating client...');
const client = await Client.create({ network: 'test' });
console.log('Client created successfully');

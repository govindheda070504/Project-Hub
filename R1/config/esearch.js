// config/esearch.js

const { Client } = require('@elastic/elasticsearch');

// Elasticsearch URL 
const ELASTICSEARCH_URL = 'http://localhost:9200';

const client = new Client({
  node: ELASTICSEARCH_URL,
});

module.exports = client;

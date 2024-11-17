const axios = require('axios');
const natural = require('natural');
require('dotenv').config();

// GitHub personal access token
const token = process.env.GITHUB_TOKEN;

// Tokenizer
const tokenizer = new natural.WordTokenizer();

// Technology keywords list
const technologyKeywordsList = [
    'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'go', 
    'typescript', 'r', 'julia', 'shell', 'bash', 'perl', 'scala', 'dart', 'rust', 
    'kotlin', 'html', 'css', 'scss', 'less', 'xml', 'json', 'yaml', 'graphql', 
    'rest', 'soap', 'webapp', 'website', 'web application', 'frontend', 'backend', 
    'full stack', 'responsive design', 'pwa', 'react', 'angular', 'vue', 'ember', 
    'backbone', 'jquery', 'bootstrap', 'tailwind', 'materialize', 'django', 'flask', 
    'express', 'next.js', 'nuxt.js', 'svelte', 'fastapi', 'laravel', 'rails', 
    'spring', 'asp.net', 'sql', 'nosql', 'mongodb', 'mysql', 'postgresql', 'sqlite', 
    'redis', 'oracle', 'cassandra', 'elasticsearch', 'mariadb', 'firestore', 
    'cloud firestore', 'dynamodb', 'neo4j', 'couchdb', 'docker', 'kubernetes', 
    'vagrant', 'ansible', 'puppet', 'chef', 'terraform', 'jenkins', 'circleci', 
    'travis', 'ci/cd', 'continuous integration', 'continuous deployment', 'aws', 
    'azure', 'google cloud', 'heroku', 'netlify', 'firebase', 'digitalocean', 
    'ibm cloud', 'oracle cloud', 'cloud storage', 'cdn', 'api gateway', 'serverless', 
    'jest', 'mocha', 'chai', 'cypress', 'karma', 'junit', 'selenium', 'pytest', 
    'unittest', 'enzyme', 'robot framework', 'tensorflow', 'pytorch', 'keras', 
    'scikit-learn', 'numpy', 'pandas', 'matplotlib', 'seaborn', 'big data', 
    'data science', 'data analysis', 'deep learning', 'artificial intelligence', 
    'ai', 'ml', 'dl', 'nlp', 'computer vision', 'opencv', 'image processing', 
    'text mining', 'spark', 'hadoop', 'hive', 'etl', 'data lake', 'firewall', 
    'vpn', 'ssl', 'tls', 'ssh', 'ipsec', 'penetration testing', 'ethical hacking', 
    'cybersecurity', 'identity management', 'access control', 'audit', 'compliance', 
    'encryption', 'oauth', 'jwt', 'android', 'ios', 'flutter', 'react native', 
    'cordova', 'ionic', 'xamarin', 'swift', 'objective-c', 'webpack', 'gulp', 
    'grunt', 'rollup', 'parcel', 'babel', 'npm', 'yarn', 'pip', 'gradle', 'maven', 
    'wordpress', 'joomla', 'drupal', 'shopify', 'magento', 'woocommerce', 
    'squarespace', 'wix', 'strapi', 'contentful', 'git', 'github', 'gitlab', 
    'bitbucket', 'svn', 'jira', 'confluence', 'slack', 'trello', 'nginx', 'apache', 
    'iis', 'load balancing', 'dns', 'ssl certificate', 'reverse proxy', 'caching', 
    'command-line', 'cli', 'bash', 'shell scripting', 'cron job', 'task scheduling', 
    'blockchain', 'ethereum', 'bitcoin', 'smart contract', 'solidity', 'web3', 
    'dapp', 'user interface', 'ui', 'ux', 'accessibility', 'seo', 
    'performance optimization', 'cross-browser compatibility', 'agile', 'scrum', 
    'kanban', 'microservices', 'monolithic', 'api', 'backend as a service', 
    'progressive web app', 'spa', 'single page application', 'headless cms', 
    'responsive design', 'cross-platform'
];

// Function to remove .git from repo name if present
const cleanRepoName = (repo) => {
    return repo.endsWith('.git') ? repo.slice(0, -4) : repo;
};

// Fetch repository topics (tags)
const getRepoTopics = async (owner, repo) => {
    const cleanedRepo = cleanRepoName(repo);
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${cleanedRepo}/topics`, {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.mercy-preview+json',
            },
        });
        return response.status === 200 && response.data.names ? response.data.names : [];
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

// Fetch the README.md file
const getReadmeFile = async (owner, repo) => {
    const cleanedRepo = cleanRepoName(repo);
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${cleanedRepo}/readme`, {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.status === 200 && response.data.content ? Buffer.from(response.data.content, 'base64').toString('utf8') : '';
    } catch (error) {
        console.error(error.message);
        return '';
    }
};

// Extract keywords using TF-IDF
const extractKeywordsWithTfIdf = async (text) => {
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(text);
    const keywords = [];
    tfidf.listTerms(0).forEach(item => keywords.push(item.term));
    return keywords;
};

// Filter technology-related keywords
const filterTechnologyKeywords = async (owner, repo) => {
    const readmeContent = await getReadmeFile(owner, repo);
    if (!readmeContent) throw new Error('README content is empty or could not be fetched.');
    const extractedKeywords = await extractKeywordsWithTfIdf(readmeContent);
    return extractedKeywords.filter(keyword => technologyKeywordsList.includes(keyword.toLowerCase()));
};

module.exports = {
    getRepoTopics,
    getReadmeFile,
    extractKeywordsWithTfIdf,
    filterTechnologyKeywords
};

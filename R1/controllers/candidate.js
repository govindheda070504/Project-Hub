const client = require('../config/esearch'); 
const Candidate = require('../models/candidate');

// Predefined tag options
const predefinedTags = [
    'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'go',
    'typescript', 'r', 'julia', 'shell', 'bash', 'perl', 'scala', 'dart', 'rust',
    'kotlin', 'html', 'css', 'scss', 'less', 'xml', 'json', 'yaml', 'graphql',
    'rest', 'soap', 'webapp', 'website', 'frontend', 'backend', 'full stack',
    'responsive design', 'pwa', 'react', 'angular', 'vue', 'ember', 'backbone',
    'jquery', 'bootstrap', 'tailwind', 'django', 'flask', 'express', 'next.js',
    'svelte', 'fastapi', 'laravel', 'rails', 'spring', 'asp.net', 'sql', 'nosql',
    'mongodb', 'mysql', 'postgresql', 'sqlite', 'redis', 'oracle', 'elasticsearch',
    'docker', 'kubernetes', 'jenkins', 'aws', 'azure', 'google cloud',
    'ci/cd', 'github', 'gitlab', 'bitbucket', 'jira', 'slack', 'trello',
    'nginx', 'apache', 'dns', 'cli', 'cron job', 'blockchain', 'ethereum', 'smart contract',
    'solidity', 'web3', 'ux', 'ui', 'seo', 'agile', 'scrum', 'microservices', 'api'
];

const searchCandidates = async (req, res) => {
  try {
    const filters = req.query;
    const mongoQuery = {};

    // Build MongoDB query based on filters
    if (filters.course) mongoQuery.course = filters.course;
    if (filters.specialization) mongoQuery.specialization = filters.specialization;
    if (filters.yearOfStudy) mongoQuery.yearOfStudy = filters.yearOfStudy;
    if (filters.projectType) mongoQuery.projectType = filters.projectType;

    // GPA range filter
    if (filters.gpa) {
      const [minGPA, maxGPA] = filters.gpa.split('-').map(gpa => parseFloat(gpa));
      mongoQuery.gpa = { $gte: minGPA, $lte: maxGPA };
    }

    // Tags filter: Handle if it's an array or string
    if (filters.tags) {
      const tags = Array.isArray(filters.tags) ? filters.tags : filters.tags.split(',');
      mongoQuery['repos.tags'] = { $all: tags };
    }

    // Fetch initial candidates based on MongoDB query
    let candidates = await Candidate.find(mongoQuery);

    // Handle external tag search
    if (filters.tagSearch) {
      // Check if the tagSearch term exists in predefined tags
      const searchTag = filters.tagSearch.toLowerCase().trim();

      if (predefinedTags.includes(searchTag)) {
        // Search using Elasticsearch if tag is predefined
        const esQuery = {
          bool: {
            must: [
              {
                wildcard: {
                  'repos.tags': {
                    value: `*${searchTag}*`,
                    case_insensitive: true,
                  }
                }
              }
            ]
          }
        };

        try {
          const esResponse = await client.search({
            index: 'candidates',  // Ensure this matches your Elasticsearch index name
            body: { query: esQuery, size: 10 }
          });

          const esCandidateIds = esResponse.body.hits.hits.map(hit => hit._source._id);

          // Filter MongoDB candidates to only include those returned by Elasticsearch
          candidates = candidates.filter(candidate => esCandidateIds.includes(candidate._id.toString()));
        } catch (esError) {
          console.error('Elasticsearch connection or query error:', esError);
          res.status(500).send('Error with Elasticsearch');
          return;
        }
      } else {
        // If tag is not in predefined list, search MongoDB for candidates with repos.tags containing the tag
        candidates = candidates.filter(candidate => 
          candidate.repos.some(repo => repo.tags.includes(searchTag))
        );
      }
    }

    res.json(candidates); // Return final list of candidates
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { searchCandidates };

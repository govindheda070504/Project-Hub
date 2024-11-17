// scripts/indexToElastic.js

const client = require('../config/esearch');
const Candidate = require('../models/candidate');
const connectMongoDB = require('../config/mongodb');

const indexCandidates = async () => {
  await connectMongoDB();

  const candidates = await Candidate.find();
  for (let candidate of candidates) {
    await client.index({
      index: 'candidates',
      id: candidate._id.toString(),
      body: candidate.toObject()
    });
  }

  console.log('Indexing complete');
  process.exit();
};

indexCandidates().catch(console.error);

import { prisma } from '../../../lib/prisma.js';

// POST /api/add
export default async function handle(req, res) {
  const { name, description, founding_year, location, category, funding_stage } = req.body;

  const result = await prisma.company.create({
    data: {
      name: name,
      description: description,
      founding_year: founding_year,
      location: location,
      category: { connect: { id: 'cl36sruzp0229xitpqap25s8t' } },
      funding_stage: { connect: { id: 'cl36sn2k80081xitpkach7tpb' } },
    },
  });
  print("result: " + result);
  res.json(result);
}
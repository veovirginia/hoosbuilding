import { prisma } from '../../../lib/prisma.js';

// POST /api/add
export default async function handle(req, res) {
  const { name, url, description, founding_year, location, categoryId, stageId, founder_name, founder_grad_year, founder_url } = req.body;

  // creates a new company
  const result = await prisma.company.create({
    data: {
      name: name,
      company_url: url,
      description: description,
      founding_year: founding_year,
      location: location,
      category: {
        connect: {
          id: categoryId,
        },
      },
      funding_stage: {
        connect: {
          id: stageId,
        },
      },
      founders: {
        create: {
          name: founder_name,
          grad_year: founder_grad_year,
          url: founder_url,
        },
      },
    },
  });

  console.log("result: " + result);
  res.json(result);
}
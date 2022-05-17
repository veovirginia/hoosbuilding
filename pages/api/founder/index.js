import { prisma } from '../../../lib/prisma.js';

// POST /api/add
export default async function handle(req, res) {
  const { name, description, founding_year, location, category, funding_stage, founder_name, founder_grad_year, founder_url } = req.body;

  const result = await prisma.founder.create({
    data: {
      name: founder_name,
      grad_year: founder_grad_year,
      url: founder_url
    },
  });

  res.json(result);
}
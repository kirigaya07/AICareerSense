const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed feature costs
    const features = [
        { featureName: 'cover_letter', tokenCost: 100, description: 'Generate Cover Letter' },
        { featureName: 'resume_analysis', tokenCost: 50, description: 'Resume Analysis' },
        { featureName: 'interview_questions', tokenCost: 75, description: 'Interview Questions' },
        { featureName: 'industry_insights', tokenCost: 60, description: 'Industry Insights' },
        { featureName: 'career_advice', tokenCost: 40, description: 'Career Advice' },
    ];

    for (const feature of features) {
        await prisma.featureCost.upsert({
            where: { featureName: feature.featureName },
            update: feature,
            create: feature,
        });
    }

    console.log('Feature costs seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 
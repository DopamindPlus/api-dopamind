import { PrismaClient } from '@prisma/client';  // Use import instead of require
const prisma = new PrismaClient();

async function seed() {
  const typeDoctors = [
    {
      name: 'Neurologist',
      description: 'Specialist in the nervous system'
    },
    {
      name: 'Cardiologist',
      description: 'Specialist in heart and blood vessels'
    },
    {
      name: 'Orthopedic',
      description: 'Specialist in musculoskeletal system'
    },
    {
      name: 'Dermatologist',
      description: 'Specialist in skin and its diseases'
    },
    {
      name: 'Psychiatrist',
      description: 'Specialist in mental health'
    },
    {
      name: 'Gynecologist',
      description: 'Specialist in female reproductive system'
    },
    {
      name: 'Pediatrician',
      description: 'Specialist in children’s health'
    },
    {
      name: 'Endocrinologist',
      description: 'Specialist in glands and hormones'
    },
    {
      name: 'Oncologist',
      description: 'Specialist in cancer treatment'
    },
    {
      name: 'Urologist',
      description: 'Specialist in urinary system'
    },
    {
      name: 'Ophthalmologist',
      description: 'Specialist in eye care'
    },
    {
      name: 'ENT Specialist',
      description: 'Specialist in ear, nose, and throat'
    },
    {
      name: 'Rheumatologist',
      description: 'Specialist in arthritis and autoimmune diseases'
    },
    {
      name: 'Gastroenterologist',
      description: 'Specialist in digestive system'
    },
    {
      name: 'Pulmonologist',
      description: 'Specialist in lung diseases'
    },
    {
      name: 'Nephrologist',
      description: 'Specialist in kidney health'
    },
    {
      name: 'Hematologist',
      description: 'Specialist in blood diseases'
    },
    {
      name: 'Plastic Surgeon',
      description: 'Specialist in reconstructive surgery'
    },
    {
      name: 'Pathologist',
      description: 'Specialist in disease diagnosis through laboratory tests'
    }
  ];

  // Optionally, delete all existing records to avoid unique constraint issues
  await prisma.typeDoctor.deleteMany();

  // Add multiple typeDoctors at once
  const createdTypes = await prisma.typeDoctor.createMany({
    data: typeDoctors
  });

  console.log('Data successfully added:', createdTypes);
}

seed()
  .catch((error) => {
    console.error('Error while seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

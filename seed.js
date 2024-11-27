import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const doctorNames = {
  'Neurologist': [
    "John Doe", "Jane Smith", "Alice Johnson", "Michael Brown", "Emily Davis",
    "David Wilson", "Sophia Martinez", "James Anderson", "Olivia Thomas", "Daniel Jackson"
  ],
  'Cardiologist': [
    "Mia White", "Liam Harris", "Amelia Clark", "Lucas Lewis", "Isabella Walker",
    "Ethan Hall", "Charlotte Allen", "Alexander Young", "Victoria King", "Benjamin Scott"
  ],
  'Orthopedic': [
    "William Evans", "Nora Carter", "Jack Turner", "Grace King", "Samuel Lee",
    "Harper Perez", "Benjamin Wright", "Eva Mitchell", "Liam Scott", "Maya Thomas"
  ],
  'Dermatologist': [
    "Zoe Wilson", "Sophia Davis", "Isabella Brown", "Noah Taylor", "Matthew Lewis",
    "Eva Robinson", "Charlotte Clark", "Ella Young", "Grace Adams", "Lucas Carter"
  ],
  'Psychiatrist': [
    "Leo White", "Olivia Harris", "William King", "Mia Lewis", "Benjamin Hall",
    "Ethan Walker", "Amelia Young", "Harper Martinez", "Aiden Allen", "Charlotte Wright"
  ],
  'Pediatrician': [
    "Sophie Adams", "Liam Thompson", "Chloe Green", "Ethan Harris", "Zoe Clark",
    "Maya Scott", "Oliver King", "James Davis", "Sophia Mitchell", "Ben Young"
  ],
  'Ophthalmologist': [
    "Isabella Walker", "Emma Taylor", "Mason Brown", "Sophia Green", "Aiden Lee",
    "Lucas Hall", "Olivia Scott", "Ethan Johnson", "Charlotte White", "Amelia King"
  ],
  'Gynecologist': [
    "Samantha Allen", "Olivia Moore", "Emily Harris", "Jessica Clark", "Grace Hall",
    "Megan Lewis", "Hannah Wright", "Sophie Johnson", "Zoe Taylor", "Bella Young"
  ],
  'Oncologist': [
    "Benjamin King", "Dylan Walker", "Mia Scott", "Lily Davis", "George Evans",
    "William Brown", "Charlotte Clark", "James Harris", "Amelia Green", "Isaac King"
  ],
  'ENT Specialist': [
    "Liam White", "Olivia Walker", "Benjamin Hall", "Sophia Turner", "Ethan Clark",
    "Megan Wright", "Charlotte Adams", "James Green", "Emma Johnson", "Lucas Taylor"
  ],
  'Gastroenterologist': [
    "Isabella Young", "Grace Moore", "Daniel Hall", "Sophia Lewis", "Mia Wright",
    "Olivia Parker", "Lily Adams", "Benjamin Scott", "Amelia King", "Zoe Green"
  ],
  'Endocrinologist': [
    "Michael Lee", "Megan White", "Sophia Davis", "Isabella Moore", "Aiden Harris",
    "Lucas King", "Olivia Walker", "Benjamin Young", "Sophie Taylor", "Maya Clark"
  ],
  'Nephrologist': [
    "Samantha Green", "Ethan Lee", "Liam Johnson", "Charlotte King", "James Brown",
    "Emma Harris", "William Young", "Olivia Adams", "Sophia Taylor", "Benjamin Walker"
  ],
  'Urologist': [
    "Mason White", "Olivia Clark", "Grace Harris", "Megan Adams", "James Walker",
    "Sophia Green", "Daniel Brown", "Maya White", "Aiden Scott", "Benjamin Davis"
  ],
  'Radiologist': [
    "John Harris", "Liam Brown", "Emma Green", "Megan Clark", "William Taylor",
    "Sophia Young", "Lucas Scott", "Isabella Walker", "Benjamin White", "Olivia Davis"
  ],
  'Plastic Surgeon': [
    "Maya Taylor", "James Walker", "Emily Brown", "Benjamin Lewis", "Olivia Clark",
    "Sophia Green", "Liam Johnson", "Lucas Scott", "Ethan Harris", "Charlotte King"
  ],
  'Chiropractor': [
    "Isabella Wright", "Lily Green", "Olivia Brown", "Megan Clark", "Aiden Davis",
    "Sophia Taylor", "Ethan White", "James Young", "Grace Walker", "Benjamin King"
  ],
  'Pathologist': [
    "Liam White", "Sophia Green", "Emma Brown", "James Taylor", "Maya Clark",
    "Olivia Harris", "Benjamin Young", "Charlotte Scott", "Megan Johnson", "Lucas Walker"
  ],
  'Infectious Disease Specialist': [
    "Zoe Clark", "Benjamin Young", "Sophia Taylor", "Olivia Green", "Ethan Brown",
    "Maya Harris", "Grace Scott", "Lucas White", "Samantha King", "James Lewis"
  ]
};

async function seed() {
  try {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
    await prisma.$executeRaw`TRUNCATE TABLE Doctor`;
    await prisma.$executeRaw`TRUNCATE TABLE TypeDoctor`;
    await prisma.$executeRaw`ALTER TABLE TypeDoctor AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE Doctor AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
  } catch (error) {
    console.error('Error resetting tables:', error);
    throw error;
  }

  const typeDoctors = [
    { name: 'Neurologist', description: 'Specialist in the nervous system' },
    { name: 'Cardiologist', description: 'Specialist in heart and blood vessels' },
    { name: 'Orthopedic', description: 'Specialist in musculoskeletal system' },
    { name: 'Dermatologist', description: 'Specialist in skin and its diseases' },
    { name: 'Psychiatrist', description: 'Specialist in mental health' },
    { name: 'Pediatrician', description: 'Specialist in children\'s health' },
    { name: 'Ophthalmologist', description: 'Specialist in eye care' },
    { name: 'Gynecologist', description: 'Specialist in women\'s health' },
    { name: 'Oncologist', description: 'Specialist in cancer treatment' },
    { name: 'ENT Specialist', description: 'Specialist in ear, nose, and throat' },
    { name: 'Gastroenterologist', description: 'Specialist in digestive system' },
    { name: 'Endocrinologist', description: 'Specialist in hormones and metabolism' },
    { name: 'Nephrologist', description: 'Specialist in kidney function' },
    { name: 'Urologist', description: 'Specialist in urinary tract and male reproductive organs' },
    { name: 'Radiologist', description: 'Specialist in medical imaging' },
    { name: 'Plastic Surgeon', description: 'Specialist in reconstructive and cosmetic surgery' },
    { name: 'Chiropractor', description: 'Specialist in spinal health and adjustments' },
    { name: 'Pathologist', description: 'Specialist in disease diagnosis through lab tests' },
    { name: 'Infectious Disease Specialist', description: 'Specialist in infections and diseases' }
  ];

  const result = await prisma.$transaction(async (prisma) => {
    const createdTypes = [];

    for (const type of typeDoctors) {
      const createdType = await prisma.typeDoctor.create({
        data: {
          name: type.name,
          description: type.description
        }
      });

      const doctors = doctorNames[createdType.name] || [];

      const createdDoctors = await Promise.all(
        doctors.map(doctorName => 
          prisma.doctor.create({
            data: {
              name: doctorName,
              typeDoctors: {
                connect: { id: createdType.id }
              }
            }
          })
        )
      );

      createdTypes.push({
        type: createdType,
        doctors: createdDoctors
      });

      console.log(`Created ${createdDoctors.length} doctors for ${createdType.name}`);
    }

    return createdTypes;
  });

  console.log('Total Type Doctors Created:', result.length);
  result.forEach(item => {
    console.log(`Type: ${item.type.name}, ID: ${item.type.id}, Doctors: ${item.doctors.length}`);
  });

  console.log('Seeding completed successfully');
}

async function runSeed() {
  try {
    await seed();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runSeed();

import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors.js';
import axios from 'axios';

const prisma = new PrismaClient();
const DOCTORS_API_URL = process.env.DOCTORS_API_URL;

export class TypeDoctorService {
  static async getAllTypeDoctors() {
    return prisma.typeDoctor.findMany({
      include: { 
        doctors: true 
      }
    });
  }

  static async getTypeDoctorById(id) {
    const type = await prisma.typeDoctor.findUnique({
      where: { id: parseInt(id, 10) },
      include: { doctors: true }
    });

    if (!type) {
      throw new NotFoundError('Type Doctor not found');
    }
    return type;
  }

  static async createManyTypeDoctors(data) {
    return prisma.typeDoctor.createMany({
      data: data.map(item => ({
        name: item.name,
        description: item.description
      }))
    });
  }

  static async createTypeDoctor(data) {
    return prisma.typeDoctor.create({
      data
    });
  }

  static async addDoctorToType(typeId, doctorId) {
    const [type, doctor] = await Promise.all([
      prisma.typeDoctor.findUnique({ where: { id: parseInt(typeId, 10) } }),
      prisma.doctor.findUnique({ where: { id: parseInt(doctorId, 10) } })
    ]);

    if (!type) {
      throw new NotFoundError('Type Doctor not found');
    }

    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    return prisma.typeDoctor.update({
      where: { id: parseInt(typeId, 10) },
      data: {
        doctors: {
          connect: { id: parseInt(doctorId, 10) }
        }
      },
      include: { doctors: true }
    });
  }

  static async createDoctor(data) {
    return prisma.doctor.create({
      data: {
        name: data.name
      }
    });
  }
  static async getAllDoctors() {
    return prisma.doctor.findMany({
      include: { 
        typeDoctors: true 
      }
    });
  }
}
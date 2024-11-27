import { TypeDoctorService } from '../services/typeDoctorService.js';

export const typeDoctorController = {
  async getAll(req, res, next) {
    try {
      const types = await TypeDoctorService.getAllTypeDoctors();
      res.status(200).json(types);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const type = await TypeDoctorService.getTypeDoctorById(req.params.id);
      res.status(200).json(type);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const data = req.body;
      if (Array.isArray(data)) {
        const createdTypes = await TypeDoctorService.createManyTypeDoctors(data);
        return res.status(201).json(createdTypes);
      } else if (typeof data === 'object') {
        const createdType = await TypeDoctorService.createTypeDoctor(data);
        return res.status(201).json(createdType);
      } else {
        return res.status(400).json({ error: 'Invalid data format' });
      }
    } catch (error) {
      next(error);
    }
  },

  async addDoctor(req, res, next) {
    try {
      const { typeId, doctorId } = req.params;
      const type = await TypeDoctorService.addDoctorToType(typeId, doctorId);
      res.status(200).json(type);
    } catch (error) {
      next(error);
    }
  }
};

import request from 'supertest';
import { Usuario } from '../entities/usuario.entity';
import app from '../app';
import { generaJWT } from '../helpers/jwtService';

jest.mock('../entities/usuario.entity.ts');

describe('Actualizar afiliado por ID', () => {
    let token: string;

    beforeAll(() => {
        token = generaJWT({ id: 1, nombre: 'Omar', correo: 'Omar@example.com' });
    });

    it('debería devolver 201 si el usuario se actualiza correctamente', async () => {
        const mockCheckUsuario = jest.spyOn(require('../helpers/usuario.helper'), 'checkUsuario');
        mockCheckUsuario.mockResolvedValueOnce(null);
        const mockFindOne = Usuario.findOne as jest.Mock;
        const mockUpdate = Usuario.update as jest.Mock;

        mockFindOne.mockResolvedValueOnce({ id: 1, nombre: 'Omar', apellido: 'Perez', telefono: '1234567890' });

        mockUpdate.mockResolvedValueOnce({ affected: 1 });

        const response = await request(app)
            .patch('/api/v1/authRoutes/actualiza') 
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 19,
                nombre: 'Omar',
                apellido: 'Mendoza',
                telefono: '9876543210',
            });

        expect(response.status).toEqual(201);
        expect(response.body.ok).toEqual(true);
        expect(response.body.mensaje).toEqual('Usuario actualizado correctamente');
    });

    it('debería devolver 404 si no se encuentra un usuario con el ID', async () => {
        const mockFindOne = Usuario.findOne as jest.Mock;
        const mockUpdate = Usuario.update as jest.Mock;

        mockFindOne.mockResolvedValueOnce(null);

        const response = await request(app)
            .patch('/api/v1/authRoutes/actualiza') 
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 999,
                nombre: 'Omar',
                apellido: 'Mendoza',
                telefono: '9876543210',
            });

        expect(response.status).toEqual(404);
        expect(response.body.ok).toEqual(false);
        expect(response.body.mensaje).toEqual('No se encontró un usuario con el ID especificado');
    });

    it('debería devolver 500 si ocurre un error inesperado en el servidor', async () => {
        const mockFindOne = Usuario.findOne as jest.Mock;
        const mockUpdate = Usuario.update as jest.Mock;

        mockFindOne.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app)
            .patch('/api/v1/authRoutes/actualiza') 
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1,
                nombre: 'Omar',
                apellido: 'Mendoza',
                telefono: '9876543210',
            });

        expect(response.status).toEqual(500);
        expect(response.body.ok).toEqual(false);
        expect(response.body.mensaje).toEqual('Algo salió mal, contacte al administrador');
    });
});

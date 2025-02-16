import request from 'supertest';
import app from '../app'; 
import { Usuario } from '../entities/usuario.entity';
import { SesionUsuario } from '../entities/sesiones_usuario.entity';

jest.mock('../entities/usuario.entity');
jest.mock('../entities/sesiones_usuario.entity');
jest.mock('../entities/usuario.entity');


describe('Crear usuario', () => {

    it('debería devolver 201 si el usuario se crea correctamente', async () => {
        const mockCheckUsuario = jest.spyOn(require('../helpers/usuario.helper'), 'checkUsuario');
        mockCheckUsuario.mockResolvedValueOnce(null);
        const mockSaveUsuario = Usuario.save as jest.Mock;
        const mockCreateUsuario = Usuario.create as jest.Mock;
        const mockSaveSesion = SesionUsuario.save as jest.Mock;
        const mockCreateSesion = SesionUsuario.create as jest.Mock;

        const usuarioMock = {
            nombre: 'Omar',
            apellido: 'Perez',
            telefono: '1234567890',
            correo: 'Omar@example.com',
            password: 'password123',
            hashPassword: jest.fn()  
        };

        mockCreateUsuario.mockReturnValue(usuarioMock);
        mockSaveUsuario.mockResolvedValue(usuarioMock);

        mockCreateSesion.mockReturnValue({ usuario: usuarioMock });
        mockSaveSesion.mockResolvedValue({});

        const response = await request(app)
            .post('/api/v1/authRoutes')
            .send({
                nombre: 'Omar',
                apellido: 'Perez',
                telefono: '1234567890',
                correo: 'Omar@example.com',
                password: 'password123'
            });

        expect(response.status).toEqual(201);
        expect(response.body.ok).toEqual(true);
        expect(response.body.mensaje).toEqual('Usuario creado correctamente');
    });

    it('debería devolver 500 si ocurre un error inesperado en el servidor', async () => {
        const mockSaveUsuario = Usuario.save as jest.Mock;
        mockSaveUsuario.mockRejectedValue(new Error('Error de base de datos'));

        const response = await request(app)
            .post('/api/v1/authRoutes')
            .send({
                nombre: 'Omar',
                apellido: 'Perez',
                telefono: '1234567890',
                correo: 'Omar@example.com',
                password: 'password123'
            });

        expect(response.status).toEqual(500);
        expect(response.body.ok).toEqual(false);
        expect(response.body.mensaje).toEqual('Algo salio mal, contacte al administrador');
    });

});
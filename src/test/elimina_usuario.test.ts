import request from 'supertest';
import { Usuario } from '../entities/usuario.entity';
import app from '../app';
import { generaJWT } from '../helpers/jwtService';

jest.mock('../entities/usuario.entity.ts')
jest.mock('../entities/sesiones_usuario.entity.ts')


describe('Elimina usuario por ID', () => {
    let token: string;

    beforeAll(() => {
        token = generaJWT({ id: 1, nombre: 'Omar', correo: 'Omar@example.com' });
    });

    it('deberia devolver 400 si no se envia el ID usuario', async () => {
        const response = await request(app)
        .delete('/api/v1/authRoutes/elimina')
        .set('Authorization', `Bearer ${token}`)
        .query({id: ''})

        expect(response.status).toEqual(400)
        expect(response.body.ok).toEqual(false)
        expect(response.body.mensaje).toEqual('El ID del usuario es requerido')
    });

    it('deberia devolver 404 si no se encuentra un usuario con el ID', async () => {
        const mockFindOne = Usuario.findOne as jest.Mock;
        mockFindOne.mockResolvedValueOnce(null)

        const response = await request(app)
        .delete('/api/v1/authRoutes/elimina')
        .set('Authorization', `Bearer ${token}`)
        .query({id: 999})

        expect(response.status).toEqual(404)
        expect(response.body.ok).toEqual(false)
        expect(response.body.mensaje).toEqual('No se encontro un usuario con el ID especificado')
    })

    it('deberia devolver 201 si encuentra un usuario', async () => {
        const mockFindOne = Usuario.findOne as jest.Mock;
        const mockDelete = Usuario.delete as jest.Mock
        mockFindOne.mockResolvedValue({ id: 20, nombre: 'Omar' }); 

        mockDelete.mockResolvedValue({ affected: 1 });

        const response = await request(app)
        .delete('/api/v1/authRoutes/elimina')
        .set('Authorization', `Bearer ${token}`)
        .query({id: 20})

        expect(response.status).toEqual(201)
        expect(response.body.ok).toEqual(true)
        expect(response.body.mensaje).toEqual('El usuario y sus sesiones se eliminaron correctamente')

    })

    it('debería devolver 500 si ocurre un error inesperado en el servidor', async () => {
        const mockFindOne = Usuario.findOne as jest.Mock;
        mockFindOne.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .delete('/api/v1/authRoutes/elimina')
            .set('Authorization', `Bearer ${token}`)
            .query({ id: '1' });

        expect(response.status).toEqual(500);
        expect(response.body.ok).toEqual(false);
        expect(response.body.mensaje).toEqual('Algo salio mal, contacte al administrador');
    });
})
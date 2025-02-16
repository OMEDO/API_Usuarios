import request from 'supertest';
import { Usuario } from '../entities/usuario.entity';
import app from '../app';
import { SesionUsuario } from '../entities/sesiones_usuario.entity';
import { generaJWT } from '../helpers/jwtService';


jest.mock('../entities/usuario.entity.ts')
jest.mock('../entities/sesiones_usuario.entity.ts')
jest.mock('../helpers/jwtService.ts')


describe('Login', () => {

  it('debería devolver 400 si no se envían correo y contraseña', async () => {
    const response = await request(app)
      .post('/api/v1/authroutes/login')  
      .send({ correo: '', password: '' });  

    expect(response.status).toEqual(400);
    expect(response.body.ok).toEqual(false);
    expect(response.body.mensaje).toEqual('Usuario y contraseña son requeridos');
  });

  it('debería devolver 400 si las credenciales son incorrectas', async () => {
    const mockFindOne = Usuario.findOne as jest.Mock;
    const mockCheckPassword = jest.fn();
    mockFindOne.mockResolvedValue({
      id: 1,
      correo: 'usuario@example.com',
      nombre: 'Omar',
      checkPassword: mockCheckPassword,
      save: jest.fn(),
      token: ''
    });
    mockCheckPassword.mockReturnValue(false);  

    const response = await request(app)
      .post('/api/v1/authroutes/login')  
      .send({ correo: 'usuario@example.com', password: 'wrong-password' });

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.mensaje).toBe('Credenciales incorrectas');
  });

  it('debería devolver 200 y un token JWT si las credenciales son correctas', async () => {
    const mockFindOne = Usuario.findOne as jest.Mock;
    const mockSave = Usuario.save as jest.Mock;
    const mockCreateSesion = SesionUsuario.create as jest.Mock;
    const mockSaveSesion = SesionUsuario.save as jest.Mock;
    const mockGeneraJWT = generaJWT as jest.Mock;

    const mockUsuario = {
      id: 1,
      correo: 'usuario@example.com',
      nombre: 'Omar',
      password: 'correct-password',
      checkPassword: jest.fn().mockReturnValue(true),  
      save: mockSave,
      token: ''
    };

    mockFindOne.mockResolvedValue(mockUsuario);
    mockGeneraJWT.mockReturnValue('mocked-jwt-token');  
    mockCreateSesion.mockReturnValue({
      usuario: mockUsuario
    });
    mockSaveSesion.mockResolvedValue(true);

    const response = await request(app)
      .post('/api/v1/authroutes/login')  
      .send({ correo: 'usuario@example.com', password: 'correct-password' });

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.mensaje).toBe('Inicio de sesión éxitoso');
    expect(response.body.usuario).toBeDefined();
    expect(response.body.usuario.password).toBeUndefined();  
    expect(response.body.usuario.token).toBe('mocked-jwt-token');  
  });

  it('debería devolver 400 si no se encuentra un usuario con ese correo', async () => {
    const mockFindOne = Usuario.findOne as jest.Mock;
    mockFindOne.mockResolvedValue(null);  

    const response = await request(app)
      .post('/api/v1/authroutes/login')  
      .send({ correo: 'no-existe@example.com', password: 'any-password' });

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.mensaje).toBe('No se encontró un usuario las credenciales ingresadas');
  });

  it('debería devolver 500 si ocurre un error inesperado', async () => {
    const mockFindOne = Usuario.findOne as jest.Mock;
    mockFindOne.mockRejectedValue(new Error('Error en la base de datos'));  

    const response = await request(app)
      .post('/api/v1/authroutes/login')  
      .send({ correo: 'usuario@example.com', password: 'correct-password' });

    expect(response.status).toBe(500);
    expect(response.body.ok).toBe(false);
    expect(response.body.mensaje).toBe('Algo salio mal, contacte al administrador');
  });

});

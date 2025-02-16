import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Demasiados intentos de inicio de sesión. Por favor, inténtelo de nuevo más tarde.',
  });
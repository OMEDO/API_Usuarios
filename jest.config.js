module.exports = {
    preset: 'ts-jest',        // Usamos el preset para TypeScript
    testEnvironment: 'node',  // Definir el entorno de ejecución como Node.js
    transform: {
      '^.+\\.ts$': 'ts-jest',  // Transforma los archivos .ts usando ts-jest
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json', // Asegúrate de que Jest use tu archivo tsconfig
      },
    },
  };
  
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const api = axios.create({
  baseURL: 'https://api.kambista-clone.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const mock = new MockAdapter(api, { delayResponse: 1500 });

// ENDPOINTS SIMULADOS (AUTH & REGISTRO)

// Login
mock.onPost('/auth/login').reply((config) => {
  const credentials = JSON.parse(config.data);

  if (credentials.email === 'test@kambista.com' && credentials.password === '123456') {
    return [200, {
      token: 'kambista_simulated_token_xyz',
      user: { fullName: 'Test Kambista', email: credentials.email }
    }];
  }

  return [401, {
    name: 'INVALID_CREDENTIALS',
    message: 'Correo o contraseña incorrectos.'
  }];
});

// Registro de Datos Personales
mock.onPost('/users/personal-data').reply((config) => {
  const personalData = JSON.parse(config.data);

  if (personalData.documentNumber === '12345678' && personalData.phone === '999999999') {
    return [400, { name: 'DUPLICATE_BOTH', message: 'Documento y celular en uso' }];
  }
  
  if (personalData.documentNumber === '12345678') {
    return [400, { name: 'DUPLICATE_DNI', message: 'El DNI ya está en uso' }];
  }

  if (personalData.phone === '999999999') {
    return [400, { name: 'DUPLICATE_PHONE', message: 'El celular ya está en uso' }];
  }

  return [200, {
    token: 'kambista_simulated_token_new_user',
    user: personalData
  }];
});

// CALCULADORA

mock.onGet(/\/exchange\/current.*/).reply(200, {
  tc: { bid: 3.820, ask: 3.850 } 
});

mock.onGet(/\/exchange\/calculates.*/).reply((config) => {
  const params = config.params || {};
  const amount = parseFloat(params.amount || '0');
  const originCurrency = params.originCurrency;
  
  const bid = 3.820;
  const ask = 3.850;
  let exchange = 0;

  if (originCurrency === 'USD') {
    exchange = amount * bid;
  } else {
    exchange = amount / ask;
  }

  return [200, {
    tc: { bid, ask },
    exchange: exchange,
    savings: { amount: (exchange * 0.05).toFixed(2) }
  }];
});
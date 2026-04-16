import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const api = axios.create({
  baseURL: 'https://api.kambista.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR GLOBAL DE ERRORES
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response || error.message === 'Network Error' || error.response.status >= 500) {
      return Promise.reject({
        response: {
          data: {
            name: 'SERVER_ERROR',
            title: '¡Error de conexión!',
            message: 'No pudimos conectar con el servidor. Revisa tu internet e inténtalo de nuevo.'
          }
        }
      });
    }
    
    if (error.response && error.response.data && !error.response.data.title) {
      error.response.data.title = '¡Vaya!';
    }

    return Promise.reject(error);
  }
);

// LÓGICA DEL ENTORNO
const useMocks = process.env.EXPO_PUBLIC_USE_MOCKS === 'false';

if (useMocks) {
  console.log('🚀 API en Modo Simulación (Mocks Activos)');
  
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

  mock.onGet('/exchange/kambista/current').reply(200, {
    "bid": 3.422,
    "bidChange": 1,
    "ask": 3.448,
    "askChange": 1,
    "date": "2026-04-15",
    "author": "5a130edf17ab90001d731ce9",
    "created": "2026-04-16T01:25:26.583Z"
  });

  mock.onGet(/\/exchange\/calculates.*/).reply((config) => {
    const params = config.params || {};
    const amount = parseFloat(params.amount || '0');
    const originCurrency = params.originCurrency;
    
    const bid = 3.422;
    const ask = 3.448;
    let exchange = 0;
    let rate = 0;

    // Lógica de conversión
    if (originCurrency === 'USD') {
      exchange = amount * bid;
      rate = bid;
    } else {
      exchange = amount / ask;
      rate = ask;
    }

    return [200, {
      "rate": rate,
      "exchange": parseFloat(exchange.toFixed(2)),
      "tc": {
        "bid": bid,
        "ask": ask
      },
      "data": {
        "operate": true,
        "msg": "Puede operar"
      },
      "savings": {
        "amount": (exchange * 0.015).toFixed(2),
        "currency": originCurrency === 'USD' ? 'S/' : '$'
      }
    }];
  });

} else {
  console.log('🌐 API en Modo Real (Conectando a Internet)');
}
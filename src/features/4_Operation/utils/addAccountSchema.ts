import { z } from 'zod';

export const addAccountSchema = z.object({
  tipoCuenta: z.string().min(1, 'Selecciona el tipo de cuenta'),
  bancoId: z.string().min(1, 'Selecciona el banco'),
  numeroCuenta: z.string()
    .min(10, 'El número de cuenta es muy corto')
    .max(20, 'El número de cuenta es muy largo')
    .regex(/^\d+$/, 'Solo se permiten números'),
  alias: z.string()
    .min(3, 'El alias debe tener al menos 3 letras')
    .max(30, 'El alias es muy largo')
    .regex(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
  esPropia: z.boolean().refine(val => val === true, {
    message: 'Debes declarar que la cuenta es tuya',
  }),
}).superRefine((data, ctx) => {
  if (data.tipoCuenta === 'ahorro' && data.numeroCuenta.length !== 13) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'La cuenta de ahorro debe tener 13 dígitos exactos',
      path: ['numeroCuenta'],
    });
  }
  
  if (data.tipoCuenta === 'corriente' && data.numeroCuenta.length !== 14) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'La cuenta corriente debe tener 14 dígitos exactos',
      path: ['numeroCuenta'],
    });
  }
});

export type AddAccountFormValues = z.infer<typeof addAccountSchema>;
import { z } from 'zod';

export const personalDataSchema = z.object({
  fullName: z.string().min(1, 'Obligatorio').regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
  documentType: z.enum(['DNI', 'CE', 'PASSPORT']),
  documentNumber: z.string().min(1, 'Obligatorio'),
  phone: z.string().min(1, 'Obligatorio').regex(/^9\d{8}$/, 'Debe empezar con 9 y tener 9 dígitos'),
  birthDate: z.string().min(1, 'Obligatorio'),
  previousExchange: z.string().optional(), // <-- NUEVO CAMPO OPCIONAL
  acceptTerms: z.boolean().refine(val => val === true, 'Obligatorio'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'Obligatorio')
}).superRefine((data, ctx) => {
  if (data.documentType === 'DNI' && !/^\d{8}$/.test(data.documentNumber)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'DNI: 8 números', path: ['documentNumber'] });
  } else if (data.documentType === 'CE' && !/^\d{9}$/.test(data.documentNumber)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'CE: 9 números', path: ['documentNumber'] });
  } else if (data.documentType === 'PASSPORT' && !/^[a-zA-Z0-9]{8,15}$/.test(data.documentNumber)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Pasaporte: 8-15 caracteres', path: ['documentNumber'] });
  }
});

export type PersonalDataFormValues = z.infer<typeof personalDataSchema>;
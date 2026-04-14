import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().min(1, 'El correo es obligatorio').email('Ingresa un correo válido'),
  confirmEmail: z.string().min(1, 'Debes confirmar tu correo'),
  password: z.string().min(1, 'La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string().min(1, 'Debes confirmar tu contraseña'),
  acceptTerms: z.boolean().refine(val => val === true, 'Debes aceptar los términos y condiciones'),
  acceptPrivacy: z.boolean().refine(val => val === true, 'Debes aceptar la política de privacidad'),
  acceptPromotions: z.boolean()
})
.refine((data) => data.email === data.confirmEmail, {
  message: 'Los correos no coinciden',
  path: ['confirmEmail']
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
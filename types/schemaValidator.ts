import { z } from "zod";
const UserRole = z.enum(["EMPLOYEE", "ADMIN", "MANAGER"]);


export const employeeSchema = z.object({
  firstName: z.string().min(1).max(100, {
    message: "First name must be between 1 and 100 characters.",
  }),
  lastName: z.string().min(1).max(100, {
    message: "Last name must be between 1 and 100 characters.",
  }),
  dateOfBirth: z.date().max(new Date(), {
    message: "Date of birth cannot be in the future.",
  }),
  address: z.string().max(255).optional(),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: "Phone number must be 10 digits.",
    })
    .optional(),
  email: z.string().email(),
  teamId: z.string().optional(),
  password: z.string().min(6),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  token: z.string().optional(),
  role: UserRole.default("EMPLOYEE"),
});

const equipmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  serviceTag: z.string().min(1, "Service Tag is required").max(255),
  expressServiceCode: z.string().max(255).optional(),
  configuration: z.string().max(255).optional(),
  price: z.number().positive("Price must be greater than zero"),
  warrantyTill: z.date().optional(),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  employeeId: z.string().optional(),
  issuedAt: z.date(),
  returnedAt: z.date().optional(),
});

const teamSchema = z.object({
  name: z.string().min(1),
  employees: z.array(z.string()).optional(),
});

const chequeRecordSchema = z.object({
  chequeNo: z.string().min(1),
  equipmentId: z.string(),
  employeeId: z.string(),
  amount: z.number().positive(),
  date: z.date(),
});

export const validateEmployee = (data: any) => {
  return employeeSchema.parse(data);
};
export const validateUser = (data: any) => {
  return userSchema.parse(data);
};
export const validateEquipment = (data: any) => {
  return equipmentSchema.parse(data);
};
export const validateTeam = (data: any) => {
  return teamSchema.parse(data);
};
export const validateChequeRecord = (data: any) => {
  return chequeRecordSchema.parse(data);
};

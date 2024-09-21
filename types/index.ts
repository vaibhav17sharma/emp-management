import { Attendance, ChequeRecord, EmployeeProfile, Equipment, Session, Team, User, UserRole } from "@prisma/client";

export interface EmployeeProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  address?: string;
  phoneNumber?: string;
  teams: Team[] | null;
  user?: User;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  attendance?: Attendance[] | null;
  Equipment?: Equipment[] | null;
  cheques?: ChequeRecord[] | null;
}

export interface UserResponse {
  id: string;
  name: string | null;
  email: string;
  password: string;
  token: string | null;
  sessions: Session[] | null;
  role: UserRole;
  profile: EmployeeProfile | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionResponse {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User | null;
}

export interface AttendanceResponse {
  id: string;
  profile: EmployeeProfile | null;
  userId: string;
  date: Date;
  timeIn: Date;
  timeOut: Date | null;
  reason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentResponse {
  id: string;
  name: string;
  serviceTag: string;
  expressServiceCode: string | null;
  configuration: string | null;
  price: number;
  warrantyTill: Date | null;
  manufacturer: string;
  issuedTo?: EmployeeProfile | null;
  chequeRecords?: ChequeRecord[] | null;
  employeeId: string | null;
  issuedAt: Date;
  returnedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChequeRecordResponse {
  id: string;
  chequeNo: string;
  employee: EmployeeProfile | null;
  equipment: Equipment | null;
  equipmentId: string;
  employeeId: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamResponse {
  id: string;
  name: string;
  employees?: EmployeeProfile[] | null;
  createdAt: Date;
  updatedAt: Date;
}
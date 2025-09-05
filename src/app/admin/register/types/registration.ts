export type RegistrationStatus = 'new' | 'contacted' | 'enrolled' | 'rejected';

export interface Registration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  facebook?: string;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationListResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    registrations: Registration[];
    total: number;
    page: number;
    limit: number;
  } | null;
}

export interface RegistrationFilters {
  q: string;
  status: RegistrationStatus | '';
  from: string; // yyyy-mm-dd
  to: string;   // yyyy-mm-dd
}


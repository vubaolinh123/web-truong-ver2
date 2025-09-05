import { RegistrationListResponse } from '@/app/admin/register/types/registration';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

export async function fetchRegistrations(params: { page?: number; limit?: number; q?: string; status?: string; from?: string; to?: string } = {}) {
  const url = new URL(`${API_BASE}/students/registrations`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
  });

  const token = getAuthToken();
  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as RegistrationListResponse;
  if (json.status !== 'success' || !json.data) throw new Error(json.message || 'Unknown error');
  return json.data;
}

export async function updateRegistrationStatus(id: string, status: 'new' | 'contacted' | 'enrolled' | 'rejected') {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}/students/registrations/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.status !== 'success') {
    throw new Error(json.message || `HTTP ${res.status}`);
  }
  return json.data?.registration;
}


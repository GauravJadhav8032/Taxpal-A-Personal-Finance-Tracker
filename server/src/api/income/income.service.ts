import axios from 'axios';

export interface Income {
  _id: string;
  userId: string;
  source: string;
  description?: string;
  category: string;
  amount: number;
  date: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateIncomeBody = {
  source?: string;
  description?: string;
  category?: string;
  amount: number;
  date?: string | Date;
  notes?: string;
};

export type UpdateIncomeBody = Partial<CreateIncomeBody>;

export class IncomeService {
  private base = 'http://localhost:3000/api/v1/incomes';

  async create(body: CreateIncomeBody): Promise<Income> {
    const payload = { ...body };
    if (!payload.source && payload.description) payload.source = payload.description;
    if (payload.date instanceof Date) payload.date = payload.date.toISOString();
    const { data } = await axios.post(this.base, payload);
    return data;
  }

  async list(params?: {
    from?: string | Date;
    to?: string | Date;
    source?: string;
    category?: string;
  }): Promise<Income[]> {
    const { data } = await axios.get(this.base, { params });
    return data;
  }

  async update(id: string, patch: UpdateIncomeBody): Promise<Income> {
    const payload = { ...patch };
    if (!payload.source && payload.description) payload.source = payload.description;
    if (payload.date instanceof Date) payload.date = payload.date.toISOString();
    const { data } = await axios.put(`${this.base}/${id}`, payload);
    return data;
  }

  async remove(id: string): Promise<{ ok: boolean }> {
    const { data } = await axios.delete(`${this.base}/${id}`);
    return data;
  }
}

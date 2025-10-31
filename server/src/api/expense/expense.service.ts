import axios from 'axios';

export interface Expense {
  _id: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateExpenseBody = {
  description: string;
  amount: number;
  category: string;
  date: string | Date;
  notes?: string;
};

export type UpdateExpenseBody = Partial<CreateExpenseBody>;

export class ExpenseService {
  private base = 'http://localhost:3000/api/v1/expenses'; // adjust as needed

  async create(body: CreateExpenseBody): Promise<Expense> {
    const payload = { ...body, date: new Date(body.date).toISOString() };
    const { data } = await axios.post(this.base, payload);
    return data;
  }

  async list(params?: {
    from?: string | Date;
    to?: string | Date;
    category?: string;
  }): Promise<Expense[]> {
    const { data } = await axios.get(this.base, { params });
    return data;
  }

  async update(id: string, patch: UpdateExpenseBody): Promise<Expense> {
    const payload = { ...patch };
    if (payload.date instanceof Date) payload.date = payload.date.toISOString();
    const { data } = await axios.put(`${this.base}/${id}`, payload);
    return data;
  }

  async remove(id: string): Promise<{ deleted: true; _id: string }> {
    const { data } = await axios.delete(`${this.base}/${id}`);
    return data;
  }
}

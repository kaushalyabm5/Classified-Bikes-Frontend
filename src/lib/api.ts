const API_BASE_URL = 'http://localhost:5000/api';

// 1. Admin Login API Call
export async function loginAdmin(username: string, passwordHash: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: passwordHash }),
  });
  return response.json();
}

// 2. Get Bikes (Filter by 'available' or 'sold')
export async function fetchBikes(status?: 'available' | 'sold') {
  const url = status ? `${API_BASE_URL}/bikes?status=${status}` : `${API_BASE_URL}/bikes`;
  const response = await fetch(url);
  return response.json();
}

// 3. Add New Bike to Inventory
export async function createBike(bikeData: any) {
  const response = await fetch(`${API_BASE_URL}/bikes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bikeData),
  });
  return response.json();
}

// 4. Mark Bike as Sold
export async function sellBike(id: string, saleData: any) {
  const response = await fetch(`${API_BASE_URL}/bikes/${id}/sell`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saleData),
  });
  return response.json();
}

// 5. Delete Bike Record Permanently
export async function deleteBike(id: string) {
  const response = await fetch(`${API_BASE_URL}/bikes/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

// Fetch Single Bike by ID
export async function fetchBikeById(id: string) {
  const response = await fetch(`${API_BASE_URL}/bikes/${id}`);
  return response.json();
}

// Change Admin Password Call
export async function changePassword(passwordData: { username: string; currentPassword: string; newPassword: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(passwordData),
  });
  return response.json();
}
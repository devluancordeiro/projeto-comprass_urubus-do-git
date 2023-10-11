const base_url = 'https://api.escuelajs.co/api/v1';

export async function getCategories() {
  try {
    const response = await fetch(`${base_url}/categories`);
    const categories = await response.json();
    return categories;
  } catch (e) {
    console.error(e);
  }
}

export async function getProductsById(id: number) {
  try {
    const response = await fetch(`${base_url}/categories/${id}/products`);
    const products = await response.json();
    console.log('received products with id', id);
    return products;
  } catch (e) {
    console.error(e);
  }
}

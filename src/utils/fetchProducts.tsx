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

export async function getProductsByCategoryId(id: number) {
  try {
    const response = await fetch(`${base_url}/categories/${id}/products`);
    const products = await response.json();
    return products;
  } catch (e) {
    console.error(e);
  }
}

export async function getProductsByTitle(title: string) {
  try {
    const response = await fetch(`${base_url}/products/?title=${title}`);
    const products = await response.json();
    return products;
  } catch (e) {
    console.error(e);
  }
}

export async function getProductById(id: number) {
  try {
    const response = await fetch(`${base_url}/products/${id}`);
    const products = await response.json();
    return products;
  } catch (e) {
    console.error(e);
  }
}

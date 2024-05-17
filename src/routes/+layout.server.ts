export async function load({ cookies }) {
  const token = cookies.get("auth_token");
  return { token };
}
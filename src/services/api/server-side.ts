"use server";

export async function getServerSideProps(endpoint: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";
  const res = await fetch(baseUrl + endpoint);
  const data = await res.json();
  return { props: { data } };
}

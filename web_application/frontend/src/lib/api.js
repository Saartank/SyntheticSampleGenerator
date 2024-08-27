export const generateSampleImages = async (params) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate_sample`;

  const query = new URLSearchParams(params).toString();

  const response = await fetch(`${baseUrl}?${query}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the images");
  }

  return await response.json();
};

export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {
  if (!name || !email || !password) {
    throw new Error("Missing input fields");
  }

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
        bio,
        banner,
        avatar,
      }),
    });
    const data = await response.json();
    if (data.success) {
      console.log("User registered successfully!");
    } else {
      throw new Error(data.message);
    }
  }
  catch (error) {
    throw error;
  }
}


export const CreateUser = {
  execute: async ({ name, email, password }: { name: string; email: string; password: string }) => {
    // Validate input
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    // Create User Entity
    const user = new User(name, email, password);

    // Check if user exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Save user in the database
    return await userRepository.save(user);
  },
};

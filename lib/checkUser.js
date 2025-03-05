import { currentUser } from "@clerk/nextjs/server"; // Imports Clerk's authentication function to get the current user.
import { db } from "./prisma"; // Imports the Prisma database client instance.

/**
 * Checks if the currently authenticated user exists in the database.
 * If the user does not exist, creates a new user record in the database.
 *
 * @returns {Promise<User | null>} The logged-in user from the database or null if no user is found.
 */
export const checkUser = async () => {
  const user = await currentUser(); // Retrieves the currently authenticated user from Clerk.

  if (!user) {
    return null; // If no user is found, return null.
  }

  try {
    // Check if the user already exists in the database using their Clerk user ID.
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser; // If the user exists, return their record.
    }

    // Construct the full name by combining the first and last names.
    const name = `${user.firstName} ${user.lastName}`;

    // If the user does not exist, create a new user record in the database.
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id, // Store Clerk's unique user ID.
        name, // Store the user's full name.
        imageUrl: user.imageUrl, // Store the user's profile image URL.
        email: user.emailAddresses[0].emailAddress, // Store the user's primary email address.
      },
    });

    return newUser; // Return the newly created user.
  } catch (error) {
    console.log(error.message); // Log any errors that occur during the database operation.
  }
};

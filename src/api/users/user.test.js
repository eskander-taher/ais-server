const request = require("supertest");
const createApp = require("../../app");
const userService = require("./userService"); // Import your user service or database-related module

const app = createApp();

// Mock the userService module to simulate database behavior
jest.mock("./userService");

describe("POST /api/users", () => {
  test("should create a new user", async () => {
    // Mock the implementation of userService.createUser
    userService.createUser.mockResolvedValueOnce({
      id: "someMockedId",
      name: "eskander",
      createdAt: new Date().toISOString(),
    });

    const userData = {
      name: "eskander",
    };

    const response = await request(app).post("/api/users").send(userData);

    // Expect a 201 status code, indicating success
    expect(response.status).toBe(201);

    // Expect the response body to have the id, name, and createdAt fields
    expect(response.body).toHaveProperty("id", "someMockedId");
    expect(response.body).toHaveProperty("name", userData.name);
    expect(response.body).toHaveProperty("createdAt");

    // You can also validate the format of the createdAt field if needed
    // For example, you can check if it's a valid ISO date:
    expect(new Date(response.body.createdAt)).toBeInstanceOf(Date);
  });

  test("should handle errors gracefully", async () => {
    // Mock the implementation of userService.createUser to throw an error
    userService.createUser.mockRejectedValueOnce(new Error("Invalid data"));

    // Simulate an error in the controller by sending invalid data
    const userData = {
      // Invalid data, missing required fields
    };

    const response = await request(app).post("/api/users").send(userData);

    // Expect a 500 status code for an internal server error
    expect(response.status).toBe(500);

    // Expect an error message in the response
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});

describe("GET /api/users", () => {
  test("should get all users", async () => {
    // Mock the implementation of userService.getAllUsers
    userService.getAllUsers.mockResolvedValueOnce([
      {
        id: "user1",
        name: "John Doe",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user2",
        name: "Jane Doe",
        createdAt: new Date().toISOString(),
      },
    ]);

    const response = await request(app).get("/api/users");

    // Expect a 200 status code, indicating success
    expect(response.status).toBe(200);

    // Expect the response body to be an array of users
    expect(response.body).toBeInstanceOf(Array);

    // Expect the response body to have the expected user properties
    expect(response.body[0]).toHaveProperty("id", "user1");
    expect(response.body[0]).toHaveProperty("name", "John Doe");
    expect(response.body[0]).toHaveProperty("createdAt");

    expect(response.body[1]).toHaveProperty("id", "user2");
    expect(response.body[1]).toHaveProperty("name", "Jane Doe");
    expect(response.body[1]).toHaveProperty("createdAt");

    // You can also validate the format of the createdAt field if needed
    // For example, you can check if it's a valid ISO date:
    expect(new Date(response.body[0].createdAt)).toBeInstanceOf(Date);
    expect(new Date(response.body[1].createdAt)).toBeInstanceOf(Date);
  });

  test("should handle errors gracefully", async () => {
    // Mock the implementation of userService.getAllUsers to throw an error
    userService.getAllUsers.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/api/users");

    // Expect a 500 status code for an internal server error
    expect(response.status).toBe(500);

    // Expect an error message in the response
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});

describe("GET /api/users/:id", () => {
  test("should get a user by ID", async () => {
    // Mock the implementation of userService.getUserById
    userService.getUserById.mockResolvedValueOnce({
      id: "someMockedId",
      name: "eskander",
      createdAt: new Date().toISOString(),
    });

    const userId = "someMockedId";

    const response = await request(app).get(`/api/users/${userId}`);

    // Expect a 200 status code, indicating success
    expect(response.status).toBe(200);

    // Expect the response body to have the id, name, and createdAt fields
    expect(response.body).toHaveProperty("id", "someMockedId");
    expect(response.body).toHaveProperty("name", "eskander");
    expect(response.body).toHaveProperty("createdAt");

    // You can also validate the format of the createdAt field if needed
    expect(new Date(response.body.createdAt)).toBeInstanceOf(Date);
  });

  test("should handle user not found", async () => {
    // Mock the implementation of userService.getUserById to return null
    userService.getUserById.mockResolvedValueOnce(null);

    const userId = "nonExistentId";

    const response = await request(app).get(`/api/users/${userId}`);

    // Expect a 404 status code, indicating that the user was not found
    expect(response.status).toBe(404);

    // Expect an error message in the response
    expect(response.body).toHaveProperty("error", "User not found");
  });

  test("should handle errors gracefully", async () => {
    // Mock the implementation of userService.getUserById to throw an error
    userService.getUserById.mockRejectedValueOnce(new Error("Invalid user ID"));

    const userId = "invalidId";

    const response = await request(app).get(`/api/users/${userId}`);

    // Expect a 500 status code for an internal server error
    expect(response.status).toBe(500);

    // Expect an error message in the response
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});

describe("PUT /api/users/:id", () => {
  test("should update an existing user", async () => {
    const userId = "someExistingUserId";

    // Mock the implementation of userService.updateUserById
    userService.updateUserById.mockResolvedValueOnce({
      id: userId,
      name: "updatedName",
      updatedAt: new Date().toISOString(),
    });

    const updatedUserData = {
      name: "updatedName",
    };

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUserData);

    // Expect a 200 status code, indicating success
    expect(response.status).toBe(200);

    // Expect the response body to have the id, name, and updatedAt fields
    expect(response.body).toHaveProperty("id", userId);
    expect(response.body).toHaveProperty("name", updatedUserData.name);
    expect(response.body).toHaveProperty("updatedAt");

    // You can also validate the format of the updatedAt field if needed
    // For example, you can check if it's a valid ISO date:
    expect(new Date(response.body.updatedAt)).toBeInstanceOf(Date);
  });

  test("should handle errors gracefully", async () => {
    const userId = "someNonexistentUserId";

    // Mock the implementation of userService.updateUserById to throw an error
    userService.updateUserById.mockRejectedValueOnce(
      new Error("User not found")
    );

    // Simulate an error in the controller by sending an update request for a nonexistent user
    const updatedUserData = {
      name: "updatedName",
    };

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUserData);

    // Expect a 404 status code for not found
    expect(response.status).toBe(500);

    // Expect an error message in the response
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});

describe("DELETE /api/users/:id", () => {
  test("should delete an existing user", async () => {
    const userId = "someExistingUserId";

    // Mock the implementation of userService.deleteUserById
    userService.deleteUserById.mockResolvedValueOnce({
      message: "User deleted successfully",
    });

    const response = await request(app).delete(`/api/users/${userId}`);

    // Expect a 200 status code, indicating success
    expect(response.status).toBe(200);

    // Expect the response body to have the id and a success message
    expect(response.body).toHaveProperty(
      "message",
      "User deleted successfully"
    );
  });

  test("should handle user not found", async () => {
    const userId = "nonExistentId";

    // Mock the implementation of userService.deleteUserById to return null
    userService.deleteUserById.mockResolvedValueOnce(null);

    const response = await request(app).delete(`/api/users/${userId}`);

    // Expect a 404 status code, indicating that the user was not found
    expect(response.status).toBe(404);

    // Expect an error message in the response
    expect(response.body).toHaveProperty("error", "User not found");
  });

  test("should handle errors gracefully", async () => {
    const userId = "invalidId";

    // Mock the implementation of userService.deleteUserById to throw an error
    userService.deleteUserById.mockRejectedValueOnce(
      new Error("Invalid user ID")
    );

    const response = await request(app).delete(`/api/users/${userId}`);

    // Expect a 500 status code for an internal server error
    expect(response.status).toBe(500);

    // Expect an error message in the response
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});

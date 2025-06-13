require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const User = require('../models/User');
const Book = require('../models/Book');

const mongo_URI = process.env.MONGODB_URI;

async function seedDatabase() {
  try {
    await mongoose.connect(mongo_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Book.deleteMany({});
    console.log("Cleared existing users and books");

    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword
      });
      await user.save();
      users.push(user);
    }
    console.log("Seeded users");

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        yearPublished: faker.date.past().getFullYear(),
        user: randomUser._id
      });
      await book.save();
    }
    console.log("Seeded books");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

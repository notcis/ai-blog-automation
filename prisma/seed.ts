import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const users = [
  {
    name: "notcis",
    username: "notcis",
    email: "notcis07@gmail.com",
    password: bcrypt.hashSync("49310407", 10),
  },
];

const seedData = async () => {
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    console.log({ createdUser });
  }
};

seedData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

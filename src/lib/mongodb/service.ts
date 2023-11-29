import clientPromise from "./init";
import { ObjectId } from "mongodb";
// import bcrypt from "bcrypt";

const database = process.env.DB_NAME;

// LOGIN
export async function login(data: { email: string }) {
  const client = await clientPromise;
  const userCollection = client.db(database).collection("users");
  const user = await userCollection.findOne({ email: data.email });

  if (user) {
    return user;
  } else {
    return null;
  }
}

// GET USER DATA
export async function getUser(userId: string) {
  const client = await clientPromise;
  const userCollection = client.db(database).collection("users");
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });

  if (user) {
    return user;
  } else {
    return null;
  }
}

// Save Location
export async function saveLocation(data: {
  userId: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
}) {
  const client = await clientPromise;
  const user = client.db(database).collection("users");
  const existUser = await user.findOne({ _id: new ObjectId(data.userId) });

  const location = {
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
    city: data.city,
    country: data.country,
  };

  try {
    if (existUser) {
      await user.updateOne(
        { _id: new ObjectId(data.userId) },
        { $set: { locations: location } }
      );
    } else {
      await user.insertOne({
        _id: new ObjectId(data.userId),
        locations: location,
      });
    }

    return { status: true, statusCode: 200, message: "Add Location success." };
  } catch (error) {
    return { status: true, statusCode: 400, message: "Add Location failed." };
  }
}

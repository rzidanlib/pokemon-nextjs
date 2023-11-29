import clientPromise from "./init";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

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

// REGISTER
export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  gender: string;
  role?: string;
}) {
  const client = await clientPromise;
  const usersCollection = client.db(database).collection("users");
  const existUser = await usersCollection.findOne({ email: data.email });

  if (existUser) {
    return { status: false, statusCode: 400, message: "Email sudah ada." };
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);

    try {
      await usersCollection.insertOne(data);
      return { status: true, statusCode: 200, message: "Register success." };
    } catch (error) {
      return { status: true, statusCode: 400, message: "Register failed." };
    }
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

// Find Nearby User
export async function findNearbyUser(data: {
  userId: string;
  latitude: number;
  longitude: number;
  maxDistance: number;
}) {
  const client = await clientPromise;
  const usersCollection = client.db(database).collection("users");

  const nearbyUsers = await usersCollection
    .find({
      _id: { $ne: new ObjectId(data.userId) },
      "locations.latitude": {
        $gte: data.latitude - data.maxDistance,
        $lte: data.latitude + data.maxDistance,
      },
      "locations.longitude": {
        $gte: data.longitude - data.maxDistance,
        $lte: data.longitude + data.maxDistance,
      },
    })
    .toArray();

  if (nearbyUsers) {
    return {
      status: true,
      statusCode: 200,
      message: "Nearby user success.",
      data: nearbyUsers,
    };
  } else {
    return { status: true, statusCode: 400, message: "Nearby user failed" };
  }
}

// Friend Request Queue
export async function friendRequest(data: {
  userId: string;
  requestId: string;
}) {
  const client = await clientPromise;
  const requestFriend = client.db(database).collection("friendRequest");

  try {
    await requestFriend.insertOne({
      userId: data.userId,
      requestFriends: [{ requestId: data.requestId, status: "pending" }],
    });

    return { status: true, statusCode: 200, message: "Add Request Success" };
  } catch (error) {
    return { status: true, statusCode: 400, message: "Add Request failed" };
  }
}

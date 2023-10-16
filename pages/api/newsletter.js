import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method == "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.staus(422).json({ message: "Invalid email address" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://kamlesh_1997:kamlesh_1997@shah-collections.1k1pn.mongodb.net/newsletter?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("emails").insertOne({ email: userEmail });

    console.log(userEmail);
    client.close();
    res.status(201).json({ message: "Signed UP!" });
  }
}

export default handler;

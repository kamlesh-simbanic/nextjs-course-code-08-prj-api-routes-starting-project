import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://kamlesh_1997:kamlesh_1997@shah-collections.1k1pn.mongodb.net/events?retryWrites=true&w=majority"
  );
  const db = client.db();

  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { name, email, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() == "" ||
      !text ||
      text.trim() == ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newComment = {
      // id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;
    res.status(201).json({ message: "Added Comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "A First Comment" },
      { id: "c2", name: "Max", text: "A Second Comment" },
    ];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}

export default handler;

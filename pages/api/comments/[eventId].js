function handler(req, res) {
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: "Added Comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "A First Comment" },
      { id: "c2", name: "Max", text: "A Second Comment" },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;

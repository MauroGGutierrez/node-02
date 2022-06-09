import express from "express";

const app = express();
const port = 4000;

interface Dog {
  name: string;
  breed: "labrador" | "german shepherd" | "golden retriever";
  adopted_at: Date | null;
  birth_date: Date | null;
}

// app.get<Params,ResBody,ReqBody,ReqQuery,Locals>('/api/v1/dogs',
// (req,res) => {
// })

app.get<
  {},
  { data: Dog[]; message: string },
  {},
  {
    page: number;
    limit: number;
    breed: "labrador" | "german shepherd" | "golden retriever";
  }
>("/api/v1/dogs", (req, res) => {
  res.send({
    data: [
      { name: "Rodi", breed: "labrador", adopted_at: null, birth_date: null },
    ],
    message: "All Dogs",
  });
});

app.get<{ id: number }, { data: Dog | null; message: string }, {}>(
  "/api/v1/dogs/:id",
  (req, res) => {
    res.send({
      data: {
        name: "tobi",
        breed: "german shepherd",
        adopted_at: null,
        birth_date: null,
      },
      message: "One Dog",
    });
  }
);

//----------------------------------------

app.post<
  {},
  // RECIBO = response                            //
  { data: Dog & { id: number }; message: string }, // & esto me quiere decir union ej: esto y esto mas
  // ENVIO = request //
  Dog,
  {}
>("/api/v1/dogs", (req, res) => {
  res.send({
    data: {
      name: "botas",
      breed: "german shepherd",
      adopted_at: null,
      birth_date: null,
      id: 1,
    },
    message: "Dog created",
  });
});

app.put<
  { id: number },
  { data: Dog & { id: number }; message: string },
  Partial<Dog>, // partial me quiere decir opcional por ejemplo si quiero o no cambiar el nombre o la raza
  {}
>("/api/v1/dogs", (req, res) => {
  res.send({
    data: {
      id: 1,
      name: "Chimuelo",
      breed: "german shepherd",
      adopted_at: null,
      birth_date: null,
    },
    message: "Dog updated",
  });
});

app.delete<
  { id: number },
  { data: Dog & { id: number }; message: string },
  {},
  {}
>("/api/v1/dogs", (req, res) => {
  res.send({
    data: {
      name: "Chimuelo",
      breed: "german shepherd",
      adopted_at: null,
      birth_date: null,
      id: 1,
    },
    message: "Dog deleted",
  });
});

app.listen(port, () => {
  console.log(`API Dogs listening on port ${port}`);
});

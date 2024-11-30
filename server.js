import express from "express";
const app = express();
const router = express.Router();
app.use(express.json());
app.use("/", router);
app.listen(3000, () => {
  console.log("server runnning at  port 3000");
});
const users = [
  {
    id: 1,
    firstname: "Amaresh",
    lastname: "Sahoo",
    hobby: "Coding",
  },
  {
    id: 2,
    firstname: "Rohit",
    lastname: "Sharma",
    hobby: "Cricket",
  },
  {
    id: 3,
    firstname: "Priya",
    lastname: "Kumar",
    hobby: "Painting",
  },
  {
    id: 4,
    firstname: "Anjali",
    lastname: "Verma",
    hobby: "Reading",
  },
  {
    id: 5,
    firstname: "Raj",
    lastname: "Mehta",
    hobby: "Cycling",
  },
];
router.use(
  (req, res, next) => {
    console.log("Request Type", req.method);
    next();
  },
  (req, res, next) => {
    if (req.method == "POST") {
      console.log("post is called", req.body);
      if (Object.keys(req.body).length === 0) {
        console.log("req.body is called");
        return res.status(400).json({ message: "body should not be empty" });
      } else if (!req.body?.firstname) {
        console.log("first name called");
        return res
          .status(400)
          .json({ message: "body should contain firstname" });
      } else if (!req.body?.lastname) {
        return res
          .status(400)
          .json({ message: "body should contain lastname" });
      } else if (!req.body?.hobby) {
        return res.status(400).json({ message: "body should contain hobby" });
      }
    } else if (req.method == "PUT") {
      if (!req.body) {
        return res.status(400).json({ message: "body should not be empty" });
      } else if (!req.body.id) {
        return res.status(400).json({ message: "body should contain id" });
      }
    }
    next();
  },
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  }
),
  //get ->to show all details
  router.get("/users", (req, res) => {
    res.json(users);
  });
//get:id ->to show specific details for specific id
router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id == userId);
  if (!user) {
    res.status(404).json({ message: "user is not found with this id" });
  }
  res.json(user);
});
//post ->to add a new user
router.post("/user", (req, res) => {
  const id = (Math.random() * 10).toFixed(2);
  const { firstname, lastname, hobby } = req.body;
  const newUser = {
    id: id,
    firstname: firstname,
    lastname: lastname,
    hobby: hobby,
  };
  users.push(newUser);
  res.json(users);
});
//put -> to update details in an existing user
router.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id == userId);
  if (!user) {
    res.status(404).json({
      message: "user id is not found,user details can't updated with id",
    });
  }
  const keys = Object.keys(req.body);
  keys.forEach((key) => {
    //dynamic updating
    user[key] = req.body[key];
  });
  res.json(users);
});
//delete ->to remove an user with specific id
router.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id == userId);
  if (!user) {
    res.status(404).json({ message: "user can't be deleted with this id" });
  }
  const filteredUser = users.filter((user) => user.id != userId);
  res.json(filteredUser);
});

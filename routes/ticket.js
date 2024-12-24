const router = require("express").Router();
const db = require("../db/db");

router.get("/t/:ticketId", (req, res) => {
  const ticketId = req.params.ticketId;
  const ticket = db.findByID(ticketId);
  res.status(200).json(ticket);
});

router.patch("/t/:ticketId", (req, res) => {
  const ticketId = req.params.ticketId;
  const updatedTicket = db.updateById(ticketId, req.body);
  res.status(200).json({ message: "updated successfully", updatedTicket });
});

router.delete("/t/:ticketId", (req, res) => {
  const ticketId = req.params.ticketId;
  db.deleteById(ticketId);
  res.status(203).send();
});

router.get("/u/:username", (req, res) => {
  const username = req.params.username;
  const tickets = db.findByUserName(username);
  res.status(200).json(tickets);
});
router.patch("/u/:username", (req, res) => {
  const username = req.params.username;
  const updatedUsername = db.updateById(username, req.body);
  res.status(200).json({ message: "updated successfully", updatedUsername });
});
router.delete("/u/:username", (req, res) => {
  const userName = req.params.username;
  db.deleteById(userName);
  res.status(203).send()
});

router.post("/sell", (req, res) => {
  const { username, price } = req.body;
  const ticket = db.create(username, price);
  res.status(201).json({ message: "Ticket Created Successfully", ticket });
});
router.post("/bulk", (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = db.bulkCreate(username, price, quantity);
  res
    .status(201)
    .json({ message: "Bulk Ticket Created Successfully", tickets });
});

router.get("/draw", (req, res) => {

  const winnerCount = parseInt(req.query.wc, 10) || 3;
  const winners = db.draw(winnerCount);
  res.status(200).json(winners);
});

// router.get("/draw", (req, res) => {
//   const winnerCount = parseInt(req.query.wc, 10) || 3; // wc কে সংখ্যা হিসেবে রূপান্তর করুন
//   if (isNaN(winnerCount) || winnerCount <= 0) {
//     return res
//       .status(400)
//       .json({ message: "Invalid winner count. It must be a positive number." });
//   }

//   try {
//     const winners = db.draw(winnerCount); // db.draw থেকে বিজেতার লিস্ট পান
//     res.status(200).json(winners);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// });

router.get("", (req, res) => {
  const ticket = db.find();
  res.status(200).json(ticket);
});

// router
//   .route("/:ticketId")
//   .get(() => {})
//   .patch(() => {})
//   .delete(() => {});

module.exports = router;

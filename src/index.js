let express = require("express");
let http = require("http");
let db = require("./mongoose_connect.js");
let Question = require("./models/question.js");
let cors = require("cors");

let app = express();
let port = 8000;
app.use(cors());

// var questions = db.collection("questions");
let jsonData = {
  query: "query2",
  topic: "top-colleges",
  tags: ["usa", "admission"],
};
// let question = new Question(jsonData);
// question.save();

// db.collection('questions').dropIndex({query : 1});

//to extract info from url
// app.use(express.urlencoded({
// extended: true
// }));
app.use(express.json());

app.get("/", function (req, res) {
  // returns all routes in case of 404
  res.status(200).send("successful");
});

/** 
 * @api {get} /question/ 

 * @apiName GetQuestions

 * @apiParam (query q) {String} searchTerm

 * @apiSuccess {Json} Returns the list of question based on Search Term whether the given question
    has a query containing the search term, or one of the tag is the search term.

 */
app.get("/question/", async function (req, res) {
  let query_term = req.query.q || "";
  let query = {
    $or: [
      { query: { $regex: ".*" + query_term + ".*" } },
      { tags: query_term },
    ],
  };

  Question.find(query)
    .sort({ createdAt: -1 })
    .exec(function (err, questions) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Internal Server Error---" + err,
        });
      }
      // questions = JSON.parse(JSON.stringify(questions));
      return res.status(200).json(questions);
    });
});

app.post("/question/", async function (req, res) {
  try {
    console.log(req.body);
    var questionData = req.body;
    let question = new Question(questionData);
    let result = await question.save();
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.error(err.stack);
    res.status(400).send({ message: err.message });
  }
});

app.listen(process.env.PORT || port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`running on port ${port}`);
});

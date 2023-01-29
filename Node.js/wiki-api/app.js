const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")

  .get((req, res) => {
    Article.find((err, foundArticles) => {
      err ? res.send(err) : res.send(foundArticles);
    });
  })

  .post(async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const newArticle = new Article({
      title,
      content,
    });

    let savedArticle;

    try {
      savedArticle = await newArticle.save();
    } catch (err) {
      console.log(err);
    }

    res.send(savedArticle);
  })

  .delete((req, res) => {
    Article.deleteMany((err) => {
      err ? res.send(err) : res.send("Successfully deleted all articles.");
    });
  });

app
  .route("/articles/:title")

  .get((req, res) => {
    const title = req.params.title;
    Article.findOne({ title }, (err, foundArticle) => {
      err
        ? res.send(err)
        : foundArticle
        ? res.send(foundArticle)
        : res.send(`No articles matching ${title}.`);
    });
  })

  .put((req, res) => {
    const title = req.params.title;
    Article.findOneAndUpdate(
      { title },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err) => {
        err ? res.send(err) : res.send("successfully updated the article.");
      }
    );
  })

  .patch((req, res) => {
    const title = req.params.title;
    Article.findOneAndUpdate({ title }, { $set: req.body }, (err) => {
      err ? res.send(err) : res.send("successfully updated the article.");
    });
  })

  .delete((req, res) => {
    const title = req.params.title;
    Article.deleteOne({ title }, (err) => {
      err ? res.send(err) : res.send("successfully deleted the article.");
    });
  });

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});

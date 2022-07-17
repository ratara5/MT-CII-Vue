const { Router } = require("express");
const router = Router();
const faker = require("faker");
const article = require("../models/article");

router.get("/create", async(req, res) => {
  //console.log(faker.image.imageUrl());
  //console.log(faker.name.title());
  //console.log(faker.lorem.paragraph());
  //res.send('Hola mundo');
  for(let i=0; i<100; i++){
    await article.create({
      title: faker.name.title(),
      imageURL: faker.image.imageUrl(),
      description: faker.lorem.paragraph()
      });
    }
    res.json({message: '100 records created'})
});

router.get("/articles", (req, res) => {

});
module.exports = router;

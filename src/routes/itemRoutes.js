const express = require('express');
const Item = require('../models/Item');
const app = express();
const itemRouter = express.Router();

// itemRouter.route('/').get(function(req, res){
//   res.render('items');
// });

itemRouter.route('/single').get(function (req, res) {

  res.render('singleItem');
});

itemRouter.route('/add').get(function (req, res) {

  res.render('addItem');
});

itemRouter.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      for(let item of items) {
        item.addDate = new Date(item.addDate).toDateString();
      }
      res.render('items', {itms: items});
    }
  });
});

itemRouter.route('/add/post').post(function (req, res) {
  var item = new Item(req.body);
        item.save()
        .then(item => {
            res.redirect('/items');
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
});


itemRouter.route('/edit/:id').get(function (req, res) {

      let id = req.params.id;

      Item.findById(id, function(err, item){
          res.render('editItem', {item: item});
      });

});

itemRouter.route('/update/:id').post(function (req, res) {

  let id = req.params.id;
console.log(id);
  Item.findById(id, function (err, item){

    if(!item) {
      return nex(new Error('Could not load Document'));
    } else {
      item.item = req.body.item;

      item.save().then(item => {
        res.redirect('/items');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
    }
  });
});


itemRouter.route('/delete/:id').get(function (req, res){
const id = req.params.id;
  Item.findByIdAndRemove({_id: id }, function (err, item) {
    if(err) res.json(err);
    else res.redirect('/items');
  })
});

module.exports = itemRouter;

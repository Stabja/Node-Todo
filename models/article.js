let mongoose = require('mongoose');

var personSchema = mongoose.Schema({
  firstname: String,
  middlename: String,
  lastname: String
},{ _id : false });

let articleSchema = mongoose.Schema({
  _id: String,
  byline: {
    person: [personSchema],
    organization: String,
    original: String
  },
  document_type: String,
  headline: {
    content_kicker: String,
    main: String,
    print_headline: String
  },
  keywords: [
    {
      name: String,
      value: String
    }
  ],
  lead_paragraph: String,
  multimedia: Array,
  news_desk: String,
  print_page: String,
  pub_date: String,
  score: Number,
  section_name: String,
  snippet: String,
  source: String,
  type_of_material: String,
  uri: String,
  web_url: String,
  word_count: Number
});


module.exports = mongoose.model('Article', articleSchema, 'articles');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('../models/article');



router.get('/', async (req, res) => {
  let articles = 
    await Article
      .find({})
      .sort({ pub_date: -1 })
      .select('-keywords')
      .limit(500)
      .lean()
      .exec();
  if(!articles){
    return res.json({ error: `Articles not found` });
  }
  return res.json(articles);
});


router.get('/doc-type-counts', async (req, res) => {
  //let doctypeList = [ "article", "multimedia", "audio", "blogpost" ];
  let articleCount = 0;
  let multimediaCount = 0;
  let audioCount = 0;
  let blogpostCount = 0;
  let othersCount = 0;
  let articles = await Article.find({}).select('document_type').exec();
  if(!articles){
    return res.json({ error: `Articles not found` });
  }
  articles.map(article => {
    if(article.document_type === 'article') articleCount++;
    else if(article.document_type === 'multimedia') multimediaCount++;
    else if(article.document_type === 'audio') audioCount++;
    else if(article.document_type === 'blogpost') blogpostCount++;
    else othersCount++;
  });
  let responseJson = {};
  responseJson['article'] = articleCount;
  responseJson['multimedia'] = multimediaCount;
  responseJson['audio'] = audioCount;
  responseJson['blogpost'] = blogpostCount;
  responseJson['others'] = othersCount;
  return res.json(responseJson);
});


router.get('/newsdesks', async (req, res) => {
  //let newsDesks = await Article.find().distinct('news_desk').exec();
  let newsDesks = await Article.find({}).select('news_desk').exec();
  if(!newsDesks){
    return res.json({ error: `Newsdesks not found` });
  }
  let newsDeskMap = new Map();
  newsDesks.forEach(obj => {
    if(!newsDeskMap[obj.news_desk]){
      newsDeskMap[obj.news_desk] = 1;
    } else {
      newsDeskMap[obj.news_desk]++;
    }
  });
  let newsDesksList = [];
  Object.keys(newsDeskMap).forEach(key => {
    let deskObj = {
      name: key,
      count: newsDeskMap[key]
    };
    newsDesksList.push(deskObj);
  });
  newsDesksList.sort((a, b) => {
    return b.count > a.count ? 1 : -1;
  });
  console.log(newsDesksList.length);
  return res.json(newsDesksList);
});


router.get('/section-names', async (req, res) => {
  let sectionNames = await Article.find().distinct('section_name').exec();
  if(!sectionNames){
    return res.json({ error: `SectionNames not found` });
  }
  return res.json(sectionNames);
});


router.get('/all-persons', async (req, res) => {
  let persons = await Article.find({}).select('byline.person').exec();
  if(!persons){
    return res.json({ error: `Persons not found` });
  }
  let personsList = [];
  let personsMap = new Map();
  persons.map(item => {
    item.byline.person.map(p => {
      let str = null;
      if(p.middlename){
        str = p.firstname + ' ' + p.middlename + ' ' + p.lastname;
      } else if (p.lastname){
        str = p.firstname + ' ' + p.lastname;
      } else {
        str = p.firstname;
      }
      if(!personsMap[str]){
        personsMap[str] = 1;
        //personsList.push(str);
      } else {
        personsMap[str]++;
      }
    });
  });
  Object.keys(personsMap).forEach(key => {
    let personObj = {
      name: key,
      count: personsMap[key]
    };
    personsList.push(personObj);
  });
  personsList.sort((a, b) => {
    return b.count > a.count ? 1 : -1;
  });
  console.log(personsList.length);
  return res.json(personsList);
});


router.get('/article/:id', async (req, res) => {
  let article = await Article.findOne({ _id : req.params.id }).exec();
  if(!article){
    return res.json({ error: `Article with id ${req.params.id} not found` });
  }
  return res.json(article);
});


router.get('/by-newsdesk/:newsdesk', async (req, res) => {
  let articles = 
    await Article
      .find({ news_desk: req.params.newsdesk })
      .sort({ pub_date: -1 })
      //.select('pub_date')
      .exec();
  if(articles.length === 0){
    return res.json({ error: `Article with newsdesk '${req.params.newsdesk}' not found.` });
  }
  return res.json(articles);
});


router.get('/by-keyword/:value', async (req, res) => {
  console.log(req.body);
  let articles = await Article.find({keywords: { $elemMatch: req.body }}).limit(100).exec();
  if(articles.length === 0){
    return res.json({ error: `Article with keyword '${req.body.value}' not found` });
  }
  return res.json(articles);
});


router.get('/by-person/:person', async (req, res) => {
  let user = req.params.person.toLowerCase();
  let name = user.split(' ');
  let matchObj = null;
  if(name.length >= 3) {
    matchObj = {
      'byline.person.firstname': name[0],
      'byline.person.middlename': name[1],
      'byline.person.lastname': name[2]
    }
  } else if (name.length === 2) {
    matchObj = {
      'byline.person.firstname': name[0],
      'byline.person.lastname': name[1]
    }
  } else if (name.length === 1) {
    matchObj = {
      'byline.person.firstname': name[0]
    }
  } else {
    return res.json({ error: 'Person cannot be empty' });
  }
  console.log(matchObj);
  let result = await Article.aggregate([
    {$unwind: '$byline.person'},
    {$match: matchObj},
    {$project: {
      _id: '$_id'
    }}
    //{$group: { _id: '$_id' }}
  ]);
  if(result.length === 0){
    return res.json({ error: `Articles for person ${req.params.person} not found` });
  }

  let articlesList = [];
  let execute = new Promise((resolve, reject) => {
    result.map(async (ids, i, arr) => {
      let temp = await Article.findOne({ _id : ids._id }).select('byline').exec();
      //console.log(i, temp.byline);
      articlesList.push(temp);
      if(i === result.length-1) resolve();
    });
  });
  execute.then(() => {
    return res.json(articlesList);
  });
});


router.get('/keywords/:item', async (req, res) => {
  let keywordsList = await Article.find({}).select('keywords').exec();
  if(!keywordsList){
    return res.json({ error: `Articles with keywords ${req.params.item} not found` });
  }
  let subjects = [];
  let subjectsMap = new Map();
  let cnt = 0;
  keywordsList.map(list => {
    list.keywords.map(word => {
      cnt++;
      if(!subjectsMap[word.value]){
        if(word.name === req.params.item){
          subjectsMap[word.value] = 1;
          //subjects.push(word.value);
        }
      } else {
        if(word.name === req.params.item){
          subjectsMap[word.value]++;
        }
      }
    });
  });
  Object.keys(subjectsMap).forEach(key => {
    let value = {
      name: key,
      count: subjectsMap[key]
    }
    subjects.push(value);
  });
  console.log(cnt);
  subjects.sort((a, b) => {
    return b.count > a.count ? 1: -1;
  });
  return res.json(subjects);
});


router.get('/values/:keyword', async (req, res) => {
  let result = await Article.aggregate([
    {$unwind: '$keywords'},
    {$match: {
      'keywords.name': req.params.keyword
    }},
    {$group: {
      _id: '$keywords.value'
    }}
  ]);
  if(result.length === 0){
    return res.json({ error: `Articles with keyword '${req.params.keyword}' not found` });
  }
  let wordsList = [];
  result.map(word => {
    wordsList.push(word._id);
  });
  wordsList.sort();
  return res.json(wordsList);
});


router.get('/single-person/:person', async (req, res) => {
  let person = await Article.find({ 
    'byline.original': req.params.person.toLowerCase()
  }).sort({ pub_date: -1 }).select('byline').exec();
  if(person.length === 0){
    return res.json({ error: `Person ${req.params.person} not found` });
  }
  return res.json(person);
});


router.get('/article-by-person/:person', async (req, res) => {
  let bylines = await Article.find(
    {'byline.original': req.params.person.toLowerCase() }
  ).sort({ pub_date: -1 })
   .select('byline pub_date').exec();
  /* let bylines = await Article.aggregate([
    {$unwind: '$byline'},
    {$match: { 'byline.original': null }},
    {$project: { byline: '$byline' }}
  ]); */
  if(!bylines){
    return res.json({ error: 'Bylines not found' });
  }
  return res.json(bylines);
});


router.put('/lowercase/:id', async (req, res) => {
  let articlesList = await Article.find({}).select('byline').exec();
  let responseList = [];
  articlesList.map((article, i) => {
    if(!article.byline){
      console.log('byline doesnt exist' );
      return;
    }
    if(article.byline.original){
      article.byline.original = article.byline.original.toLowerCase();
      let originalStr = article.byline.original;
      let replacedStr = originalStr.replace(/ and /g, ', ');
      let personList = replacedStr.split(', ');
      let newPersonList = [];
      personList.map(person => {
        let fullName = person.split(' ');
        let personObj = {};
        if(fullName.length >= 3) {
          personObj.firstname = fullName[0];
          personObj.middlename = fullName[1];
          personObj.lastname = fullName[2];
        } else if (fullName.length === 2) {
          personObj.firstname = fullName[0];
          personObj.middlename = null;
          personObj.lastname = fullName[1];
        } else if (fullName.length === 1) {
          personObj.firstname = fullName[0];
          personObj.middlename = null;
          personObj.lastname = null;
        } else {
          personObj.firstname = null;
          personObj.middlename = null;
          personObj.lastname = null;
        }
        responseList.push(personObj);
        newPersonList.push(personObj);
      });
      article.byline.person = newPersonList;
      article.save();
      console.log('byline.person:', article.byline.person);
    } else {
      if(article.byline.person.length > 0) {
        let originalName = '';
        if(article.byline.person.length === 1){
          article.byline.person.map(p => {
            p.firstname = p.firstname.toLowerCase();
            p.middlename ? p.middlename = p.middlename.toLowerCase() : null;
            p.lastname = p.lastname.toLowerCase();
            p.middlename
            ? originalName = p.firstname + ' ' + p.middlename + ' ' + p.lastname
            : originalName = p.firstname + ' ' + p.lastname
          });
        } else {
          article.byline.person.map((p, i, arr) => {
            p.firstname = p.firstname.toLowerCase();
            p.middlename ? p.middlename = p.middlename.toLowerCase() : null;
            p.lastname = p.lastname.toLowerCase();
            let tempName = null;
            p.middlename
            ? tempName = p.firstname + ' ' + p.middlename + ' ' + p.lastname
            : tempName = p.firstname + ' ' + p.lastname
            i < arr.length-1 ? originalName += tempName + ' and ' : originalName += tempName;
          });
        }
        article.byline.original = originalName;
        responseList.push(article);
        article.save();
        console.log('byline.original:', originalName);
      } else {
        console.log('byline.original doesnt exist');
        return;
      }
    }
  });
  console.log('DONE!!..........');
  return res.json(responseList);
});



module.exports = router;

yaml = require('js-yaml');
fs   = require('fs');

var home   = process.env.HOME;

console.log(home)
// Get document, or throw exception on error
try {
  var config = yaml.safeLoad(fs.readFileSync(home + '/.cloudmesh/cloudmesh.yaml', 'utf8'));
  console.log(config);
  console.log(config["cloudmesh"]["data"]["mongo"])
} catch (e) {
  console.log(e);
}

var credentials = config["cloudmesh"]["data"]["mongo"]
var collection = "workflow-flow"

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/";

var auth = credentials["MONGO_USERNAME"] + ":" +  credentials["MONGO_PASSWORD"]
console.log(auth)
var url = 'mongodb://' + auth + '@127.0.0.1:27017/?authMechanism=DEFAULT&authSource=admin';

console.log(url)

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cloudmesh");
  var query = { cloud: "workflow" };
  dbo.collection(collection).find(query).toArray(function(err, result) {
    if (err) throw err;

    console.log(result);

    var html = "\n<table>\n"
    html += "<caption>Workflow Table</caption>\n"
    for (var i in result) {
        var entry = result[i]
        console.log(entry)
        html += "<tr>";
        html += "<td> "+entry["name"]+" </td> ";
        html += "<td> "+entry["dependencies"]+" </td> ";
        html += "<td> "+entry["cm"]["modified"]+" </td> ";
        html += "</tr>\n";
    }
    html += "</table>\n";

console.log(html)

    db.close();
  });
});



const { ObjectID } = require("bson");

async function main() {
  //let a = await promise1;

  const MongoClient = require("mongodb").MongoClient;
  uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connection established");

    //await insertProject(client, "html", "three weeks", "missing symbol");
    //await insertError(client, "missing { symbol", "User must add the symbol");
    //await deleteErrorId(client, "6297987fc1f879334ecda332");
    //await updateProject(client,);
  } catch (error) {
    console.log("There was an error, can't connect" + error);
  } finally {
    client.close();
    console.log("The connection was closed.");
  }

  async function insertProject(client, projName, projDue, projError) {
    const project = {
      projectName: projName,
      projectDue: projDue,
      projectError: projError,
    };
    const result = await client
      .db("PMS")
      .collection("Projects")
      .insertOne(project);
    console.log(result);
  }

  async function insertError(client, newError, errorFix) {
    const errorObj = {
      Error: newError,
      Fix: errorFix,
    };
    const errorData = await client
      .db("PMS")
      .collection("Errors")
      .insertOne(errorObj);
    console.log("new error added" + errorData);
  }

  async function deleteErrorId(client, errorId) {
    const errorData2 = await client
      .db("PMS")
      .collection("Errors")
      .deleteOne({ _id: ObjectID(errorId) });
    console.log("Removed error ID:" + errorData2);
  }
  // async function updateProject(obj) {
  //   const objUpdate = await client
  //     .db("PMS")
  //     .collection("ProjectType")
  //     .updateOne(obj, { $set: obj });
  //   console.log(objUpdate);
  // }
  async function updateProject(client, paramName, oldParam, newParam) {
    const jsonUpdateOld = `{ "${paramName}": "${oldParam}" }`;
    const jsonUpdateNew = `{ "${paramName}": "${newParam}" }`;
    await client
      .db("PMS")
      .collection("ProjectType")
      .updateOne(JSON.parse(jsonUpdateOld), {
        $set: JSON.parse(jsonUpdateNew),
      });
    console.log(
      `Parameter in ${paramName} was updated from ${oldParam} to ${newParam}`
    );
  }
}
main();

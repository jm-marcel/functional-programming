const fs = require("fs");
const { DOMParser } = require("xmldom");
const R = require("ramda");

const { isValid, elementsToArray, getGitHubProject } = require("./xmlfilter");

// Efetua o processamento do xml e armazena a estrutura no objeto 'document'
const document = new DOMParser().parseFromString(
  fs.readFileSync("res/f-droid.xml", "utf-8")
);

const isAddedAfter2018AndUpdatedAfter2019 = isValid(R.__, 2018, 2019);

const addedApps = elementsToArray(document.getElementsByTagName("application"))
  .filter(isAddedAfter2018AndUpdatedAfter2019)
  .map(getGitHubProject);

console.log(addedApps.join("\n"));

const selectApps = (appTag, dateTag, updateTag) => {
  const contentOfApp = R.curry(
    document.getElementsByTagName(appTag)[0].textContent
  );
  console.log(contentOfApp);

  const contentOfDate = R.curry(
    document.getElementsByTagName(dateTag)[0].textContent
  );
  console.log(contentOfDate);

  const contentOfUpdate = R.curry(
    document.getElementsByTagName(updateTag)[0].textContent
  );
  console.log(contentOfUpdate);
};

selectApps("application", "added", "lastUpdated");

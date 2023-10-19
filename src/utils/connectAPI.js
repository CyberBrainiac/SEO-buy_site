function connectApi(arrURL_objects, formData) {
  /**CHANGE 2 VALUES BELOW AND SAVE*/
  const cx = '62fa1c39e6b7f4a66'; //identeficator of programmatic seach engine
  const apiKey = 'AIzaSyB6jxLovSRB87xAoxImfXzweaf3kKUWexg'; //your API key
  /**CHANGE 2 VALUES ABOVE AND SAVE*/

  /**
   *    ABOUT DELAY SETTINGS
   *
   * 1. limit_package_urls -- (work with fixed count of urls)
   * 2. step -- do request for one url
   */

  const limit_package_urls = 90; //value set limit for count of site urls, which process in one iteration.
  const delay_between_iterations = 66000; //value set delay after finish each iteration in MILLISECONDS. 66000 milliseconds = 66 seconds
  const delay_between_steps = 130; //value set delay before each request in MILLISECONDS. 130 milliseconds = 0.13 second

  const query = formData.get('inputQuery');
  const sites = JSON.parse(formData.get('url'));
  const errorContainer = document.querySelector('.errorContainer');

  while (errorContainer.firstChild) {
    errorContainer.removeChild(errorContainer.firstChild); //clear error container
  }

  calculateIndex()
    .then(arrURL_objects => {
      asyncReturnValue(arrURL_objects);
    })
    .catch(error => {
      alert('something broken ;(');
      console.error(error);
    });

  async function calculateIndex() {
    for (
      let iteration = 0, site = sites[iteration];
      iteration < sites.length;
      iteration++, site = sites[iteration]
    ) {
      if (iteration !== 0 && iteration % limit_package_urls == 0) {
        await waitIteration();
      }

      const targetPage = await searchWithQuery(site);
      await waitStep();
      let thematicIndex = 0;

      for (const obj of arrURL_objects) {
        if (obj.url === site) {
          if (targetPage === null) {
            obj.targetPage = '';
          } else {
            obj.targetPage = targetPage;
          }

          /**If we have totalPage value, we wont do one more request*/
          if (obj.totalPage) {
            thematicIndex = targetPage / obj.totalPage;
            let truncatedThematicIndex = Number(thematicIndex.toFixed(4));
            obj.thematicIndex = truncatedThematicIndex;
          } else {
            const totalPage = await searchSite(site);
            await waitStep();

            if (totalPage === null) {
              obj.totalPage = '';
              obj.thematicIndex = '';
            } else {
              thematicIndex = targetPage / totalPage;
              let truncatedThematicIndex = Number(thematicIndex.toFixed(4));
              obj.thematicIndex = truncatedThematicIndex;
              obj.totalPage = totalPage;
            }
          }
        }
      }
      createTableRow(arrURL_objects); //update table in real time
    }

    return arrURL_objects;
  }

  async function searchWithQuery(site) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
      query
    )}%20site:${site}&fields=searchInformation`;
    let response;

    try {
      response = await fetch(url);
    } catch (error) {
      console.error(error);
    }

    if (response.ok) {
      const json = await response.json();
      console.log(site, 'target: ', json.searchInformation.totalResults);
      return json.searchInformation.totalResults;
    } else {
      checkHTTPError(response, site);
      return null;
    }
  }

  async function searchSite(site) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=site:${site}&fields=searchInformation`;
    let response;

    try {
      response = await fetch(url);
    } catch (error) {
      console.error(error);
    }

    if (response.ok) {
      const json = await response.json();
      console.log(site, 'total: ', json.searchInformation.totalResults);
      return json.searchInformation.totalResults;
    } else {
      checkHTTPError(response, site);
      return null;
    }
  }

  async function waitStep() {
    return new Promise(resolve => setTimeout(resolve, delay_between_steps));
  }

  async function waitIteration() {
    return new Promise(resolve => setTimeout(resolve, delay_between_iterations));
  }

  function checkHTTPError(response, site) {
    const errCode = response.status;
    let errorMessage = '';
    let paragraph = document.createElement('p');

    if (errCode === 429) {
      errorMessage = `Site: ${site}  ||  Error: quota for requests has run out`;
      console.log(errorMessage);
    } else if (errCode === 500) {
      errorMessage = `Site: ${site}  ||  Error: internal server error`;
      console.log(errorMessage);
    } else {
      errorMessage = `Site: ${site}  ||  Error code: ${errCode}`;
      console.error(errorMessage);
    }

    paragraph.textContent = errorMessage;
    errorContainer.appendChild(paragraph);
  }
}

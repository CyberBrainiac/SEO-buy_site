import axios, { AxiosResponse } from 'axios';

export interface URLObjectProps {
  url: string;
  targetPage?: string;
  totalPage?: string;
  thematicityIndex?: string;
}

interface CalcThematicityIndexProps {
  arrURL_objects: URLObjectProps[];
  formData: FormData;
  onUpdate?: (siteData: URLObjectProps[]) => void;
  errorContainer: HTMLDivElement | null;
}

async function calcThematicityIndex(props: CalcThematicityIndexProps) {
  const { arrURL_objects, formData, onUpdate, errorContainer } = props;

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

  const query = formData.get('request');
  const siteUrls: string[] = [];

  for (const arrURL_object of arrURL_objects) {
    const siteUrl = arrURL_object.url;
    siteUrls.push(siteUrl);
  }

  while (errorContainer?.firstChild) {
    errorContainer.removeChild(errorContainer.firstChild); //clear error container
  }

  try {
    return await calculateIndex(arrURL_objects);
  } catch (error) {
    alert('something in calcThematicityIndex broken ;(');
    console.error(error);
    return null;
  }

  async function calculateIndex(arrURL_objects: URLObjectProps[]) {
    for (
      let iteration = 0, siteURL = siteUrls[iteration];
      iteration < siteUrls.length;
      iteration++
    ) {
      if (iteration !== 0 && iteration % limit_package_urls == 0) {
        await waitIteration();
      }

      const targetPage = await searchWithQuery(siteURL);
      await waitStep();
      let thematicIndex = 0;

      for (const obj of arrURL_objects) {
        if (obj.url === siteURL) {
          if (targetPage === null) {
            obj.targetPage = '';
          } else {
            obj.targetPage = targetPage;
          }

          /**If we have totalPage value, we wont do one more request*/
          if (obj.totalPage) {
            thematicIndex = targetPage / Number(obj.totalPage);
            const truncatedThematicIndex = thematicIndex.toFixed(4);
            obj.thematicityIndex = truncatedThematicIndex;
          } else {
            const totalPage = await searchSite(siteURL);
            await waitStep();

            if (totalPage === null) {
              obj.totalPage = '';
              obj.thematicityIndex = '';
            } else {
              thematicIndex = targetPage / totalPage;
              const truncatedThematicIndex = Number(thematicIndex.toFixed(4));
              obj.thematicityIndex = String(truncatedThematicIndex);
              obj.totalPage = totalPage;
            }
          }
        }
      }
      if (onUpdate) {
        onUpdate(arrURL_objects); //update value in real time after each iteration
      }
    }
    return arrURL_objects;
  }

  async function searchWithQuery(siteURL: string) {
    if (typeof query !== 'string') {
      console.error("Parameter 'query' must be a 'string'");
      return null;
    }
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
      query
    )}%20site:${siteURL}&fields=searchInformation`;
    let response;

    try {
      response = await axios.get(url);
    } catch (error) {
      console.error(error);
    }

    if (response && response.status === 200) {
      const res = response.data;
      console.log(siteURL, 'target: ', res.searchInformation.totalResults);
      return res.searchInformation.totalResults;
    } else {
      checkHTTPError(response, siteURL);
      return null;
    }
  }

  async function searchSite(siteURL: string) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=site:${siteURL}&fields=searchInformation`;
    let response;

    try {
      response = await axios.get(url);
    } catch (error) {
      console.error(error);
    }

    if (response && response.status === 200) {
      const json = await response.data;
      console.log(siteURL, 'total: ', json.searchInformation.totalResults);
      return json.searchInformation.totalResults;
    } else {
      checkHTTPError(response, siteURL);
      return null;
    }
  }

  async function waitStep() {
    return new Promise(resolve => setTimeout(resolve, delay_between_steps));
  }

  async function waitIteration() {
    return new Promise(resolve => setTimeout(resolve, delay_between_iterations));
  }

  function checkHTTPError(response: AxiosResponse | undefined, siteURL: string) {
    if (!response) {
      console.error('Bad request');
      return null;
    }

    const errCode = response.status;
    let errorMessage = '';
    const paragraph = document.createElement('p');

    if (errCode === 429) {
      errorMessage = `Site: ${siteURL}  ||  Error: quota for requests has run out`;
      console.error(errorMessage);
    } else if (errCode === 500) {
      errorMessage = `Site: ${siteURL}  ||  Error: internal server error`;
      console.error(errorMessage);
    } else {
      errorMessage = `Site: ${siteURL}  ||  Error code: ${errCode}`;
      console.error(errorMessage);
    }

    paragraph.textContent = errorMessage;
    errorContainer?.appendChild(paragraph); //add Error message in container
  }
}

export default calcThematicityIndex;

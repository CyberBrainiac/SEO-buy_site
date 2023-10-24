import axios, { AxiosResponse } from 'axios';

export interface URLObjectProps {
  url: string;
  totalPage?: string;
  targetPage?: string;
  thematicityIndex?: string;
}

interface CalcThematicityIndexProps {
  arrURL_objects: URLObjectProps[];
  formData: FormData;
  onUpdate?: (progress: string, siteData?: URLObjectProps[]) => void;
  onError?: (errorMessage: string, response?: AxiosResponse) => void;
}

async function calcThematicityIndex(props: CalcThematicityIndexProps) {
  const { arrURL_objects, formData, onUpdate, onError } = props;

  /**CHANGE 2 VALUES BELOW AND SAVE*/
  const cx = '62fa1c39e6b7f4a66'; //identeficator of programmatic seach engine
  const apiKey = 'AIzaSyB6jxLovSRB87xAoxImfXzweaf3kKUWexg'; //your API key
  // const apiKey = 'AIzaSyDpoWIqtGP4SlVAsAEjAel84a58694785A'; //your API key
  /**CHANGE 2 VALUES ABOVE AND SAVE*/

  /**
   *    ABOUT DELAY SETTINGS
   *
   * 1. limit_package_urls -- (work with fixed count of urls)
   * 2. step -- do request for one url
   */

  const limit_package_urls = 100; //value set limit for count of site urls, which process in one iteration.
  const delay_between_iterations = 66000; //value set delay after finish each iteration in MILLISECONDS. 66000 milliseconds = 66 seconds
  const delay_between_steps = 130; //value set delay before each request in MILLISECONDS. 130 milliseconds = 0.13 second

  const query = formData.get('request');
  const siteUrls: string[] = [];

  for (const arrURL_object of arrURL_objects) {
    const siteUrl = arrURL_object.url;
    siteUrls.push(siteUrl);
  }

  try {
    return await calculateIndex(arrURL_objects);
  } catch (error) {
    alert('something in calcThematicityIndex broken ;(');
    console.error(error);
    return null;
  }

  //
  async function calculateIndex(arrURL_objects: URLObjectProps[]) {
    for (
      let iteration = 0, siteURL = siteUrls[iteration];
      iteration < siteUrls.length;
      iteration++
    ) {
      //Await Iteration Delay
      if (iteration % limit_package_urls == 0 && iteration !== 0) {
        if (onUpdate) {
          onUpdate(`Processed urls: ${iteration}`); //update value in real time after each iteration
        }
        await waitIteration();
      }

      const targetPage = await searchWithQuery(siteURL);
      await waitStep();
      let thematicIndex = 0;

      for (const obj of arrURL_objects) {
        if (obj.url !== siteURL) {
          continue;
        }

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
          break;
        }

        const totalPage = await searchSite(siteURL);
        await waitStep();

        if (totalPage === null) {
          obj.totalPage = '';
          obj.thematicityIndex = '';
          break;
        }

        thematicIndex = targetPage / totalPage;
        const truncatedThematicIndex = Number(thematicIndex.toFixed(4));
        obj.thematicityIndex = String(truncatedThematicIndex);
        obj.totalPage = totalPage;
        break;
      }
    }
    return arrURL_objects;
  }

  //
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
      handleHTTPError(response, siteURL);
      return null;
    }
  }

  //
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
      handleHTTPError(response, siteURL);
      return null;
    }
  }

  //
  async function waitStep() {
    return new Promise(resolve => setTimeout(resolve, delay_between_steps));
  }

  //
  async function waitIteration() {
    return new Promise(resolve => setTimeout(resolve, delay_between_iterations));
  }

  //
  function handleHTTPError(response: AxiosResponse | undefined, siteURL: string) {
    let errorMessage: string;

    if (!response) {
      console.error('Bad request to google search engine');

      if (onError) onError('Bad request to google search engine');
      return null;
    }
    const errCode = response.status;

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

    if (onError) {
      onError(errorMessage, response);
    }
  }
}

export default calcThematicityIndex;

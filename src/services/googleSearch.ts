import RequestError from '@/utils/errorHandlers/requestError';
import axios, { AxiosResponse } from 'axios';
import googleSearchConfig from './config/customGoogleSearch';

//
async function withQuery(siteURL: string, query: string) {
  const apiKey = googleSearchConfig.apiKey;
  const cx = googleSearchConfig.cx;
  console.log(
    siteURL, 
    query,
  );
  console.log('CHANGE TIMEOUT AFTER STEP TO 0.3 S!!!');
  

  //fields=searchInformation/totalResults used to optimize the query
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
    query
  )}%20site:${siteURL}`;
  let response;

  try {
    response = await axios.get(url);
  } catch (error) {
    const axiosError = error as AxiosResponse;

    if (axios.isAxiosError(axiosError)) {
      handleHTTPError(axiosError, siteURL);
    } else {
      console.error(error);
    }
    return null;
  }

  if (response && response.status === 200) {
    const res = response.data;
    return res;
  } else {
    handleHTTPError(response, siteURL);
    return null;
  }
}

//
async function site(siteURL: string) {
  const apiKey = googleSearchConfig.apiKey;
  const cx = googleSearchConfig.cx;

  //fields=searchInformation/totalResults used to optimize the query
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=site:${siteURL}&fields=searchInformation`;
  let response;

  try {
    response = await axios.get(url);
  } catch (error) {
    const axiosError = error as AxiosResponse;

    if (axios.isAxiosError(axiosError)) {
      handleHTTPError(axiosError, siteURL);
    } else {
      console.error(error);
    }
    return null;
  }

  if (response && response.status === 200) {
    const json = await response.data;
    // console.log(siteURL, 'total: ', json.searchInformation.totalResults);
    return json.searchInformation.totalResults;
  } else {
    handleHTTPError(response, siteURL);
    return null;
  }
}

//
function handleHTTPError(response: AxiosResponse | undefined, siteURL: string) {
  let errorMessage: string;

  if (!response) {
    console.error('Bad request to google search engine');
    return new RequestError('Bad request to google search engine');
  }

  //Axios Error Handler
  if (axios.isAxiosError(response)) {
    const errResponse = response.code;

    if (errResponse === 'ERR_NETWORK') {
      errorMessage = `Error: Network error, check your WI-FI connection`;
    } else if (errResponse === 'ERR_BAD_REQUEST') {
      const status = response.response?.status;

      if (status === 403) {
        errorMessage = `Error with credentials. Error code: ${status}`;
      } else if (status === 429) {
        errorMessage = `Site: ${siteURL}  ||  Error: quota for requests has run out. Error code: ${status}`;
      } else {
        errorMessage = `ERR_BAD_REQUEST: ${status}`;
      }
    } else {
      errorMessage = `Axios Error`;
    }

    console.error(errorMessage);
    return new RequestError(errorMessage);
  }

  //HTTP Answer Handler
  const errCode = response.status;

  if (errCode === 500) {
    errorMessage = `Site: ${siteURL}  ||  Error: internal server error`;
  } else {
    errorMessage = `Site: ${siteURL}  ||  Error code: ${errCode}`;
  }

  console.error(errorMessage);
  return new RequestError(errorMessage);
}

const googleSearch = {
  withQuery,
  site,
};

export default googleSearch;

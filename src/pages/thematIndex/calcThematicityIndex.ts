/**
 * https://developers.google.com/custom-search/v1/overview
 * Custom Search JSON API provides 100 search queries per day for free.
 * If you need more, you may sign up for billing in the API Console.
 * Additional requests cost $5 per 1000 queries, up to 10k queries per day.
 * $0.005 per query, $0.01 for Index, $0.012 for Index + 20% profit*/

import { AxiosResponse } from 'axios';
import throttling from '@/utils/throttling';
import { InputData } from '@/containers/reducers/inputDataSlice';
import googleSearch from '@/services/googleSearch';

interface CalcThematicityIndexProps {
  inputDataArr: InputData[];
  query: string;
  onUpdate?: (progress: string) => void;
  onError?: (errorMessage: string, response?: AxiosResponse) => void;
}

async function calcThematicityIndex({
  inputDataArr,
  query,
  onUpdate,
  onError,
}: CalcThematicityIndexProps) {
  /**
   *    ABOUT DELAY SETTINGS
   *
   * 1. limit_package_urls -- (work with fixed count of urls)
   * 2. step -- do request for one url
   */

  const limit_package_urls = 10; //value set limit for count of site urls, which process in one iteration.
  const delay_between_iterations = 300; //value set delay after finish each iteration in MILLISECONDS. 66000 milliseconds = 66 seconds
  const delay_between_steps = 150; //value set delay before each request in MILLISECONDS. 130 milliseconds = 0.13 second

  inputDataArr = JSON.parse(JSON.stringify(inputDataArr)); //clone inputData

  try {
    return await calculateIndex(inputDataArr);
  } catch (error) {
    console.error(error);
    return null;
  }

  //
  async function calculateIndex(inputDataArr: InputData[]): Promise<InputData[]> {
    const siteUrls: string[] = [];

    for (const inputData of inputDataArr) {
      const siteUrl = inputData.url;
      siteUrls.push(siteUrl);
    }

    for (
      let iteration = 0, siteURL = siteUrls[0];
      iteration < siteUrls.length;
      iteration++, siteURL = siteUrls[iteration]
    ) {
      //Await Iteration Delay
      if (iteration % limit_package_urls === 0 && iteration !== 0) {
        if (onUpdate) {
          onUpdate(`Processed urls: ${iteration}`); //update value in real time after each iteration
        }
        await throttling(delay_between_iterations);
      }
      //for last value
      if (onUpdate && iteration === siteUrls.length - 1) {
        onUpdate(`All urls processed: ${siteUrls.length}`);
      }

      if (siteURL === '') {
        continue;
      }

      // const targetPageStr = await searchWithQuery(siteURL);
      const searchResult = await googleSearch.withQuery(siteURL, query);

      if (searchResult instanceof Error) {
        if (onError) onError(searchResult.message);
        continue;
      }

      const targetPageStr = searchResult.searchInformation.totalResults;
      const targetPage = Number(targetPageStr);

      await throttling(delay_between_steps);
      let thematicIndex = 0;

      for (const obj of inputDataArr) {
        if (obj.url !== siteURL) {
          continue;
        }

        if (targetPage === null || targetPage === 0) {
          continue;
        } else {
          obj.targetPage = Number(targetPage);
        }

        /**If we have totalPage value, we wont do one more request*/
        if (obj.totalPage) {
          thematicIndex = targetPage / Number(obj.totalPage);
          const truncatedThematicIndex = Number(thematicIndex.toFixed(4));
          obj.thematicityIndex = truncatedThematicIndex;
          break;
        }

        const totalPage = await googleSearch.site(siteURL);

        if (totalPage instanceof Error) {
          if (onError) onError(totalPage.message);
          continue;
        }
        await throttling(delay_between_steps);

        if (totalPage === null || totalPage === 0) {
          obj.totalPage = 0;
          obj.thematicityIndex = 0;
          break;
        }

        thematicIndex = targetPage / totalPage;
        const truncatedThematicIndex = Number(thematicIndex.toFixed(4));
        obj.thematicityIndex = truncatedThematicIndex;
        obj.totalPage = Number(totalPage);
        break;
      }
    }
    return inputDataArr;
  }

  // //
  // async function searchWithQuery(siteURL: string) {
  //   if (typeof query !== 'string') {
  //     console.error(new TypeError("Parameter 'query' must be a 'string'"));
  //     return null;
  //   }

  //   //fields=searchInformation/totalResults used to optimize the query
  //   const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
  //     query
  //   )}%20site:${siteURL}&fields=searchInformation/totalResults`;
  //   let response;

  //   try {
  //     response = await axios.get(url);
  //   } catch (error) {
  //     const axiosError = error as AxiosResponse;

  //     if (axios.isAxiosError(axiosError)) {
  //       handleHTTPError(axiosError, siteURL);
  //     } else {
  //       console.error(error);
  //     }
  //     return null;
  //   }

  //   if (response && response.status === 200) {
  //     const res = response.data;
  //     // console.log(siteURL, 'target: ', res.searchInformation.totalResults);
  //     return res.searchInformation.totalResults;
  //   } else {
  //     handleHTTPError(response, siteURL);
  //     return null;
  //   }
  // }

  // //
  // async function searchSite(siteURL: string) {
  //   //fields=searchInformation/totalResults used to optimize the query
  //   const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=site:${siteURL}&fields=searchInformation/totalResults`;
  //   let response;

  //   try {
  //     response = await axios.get(url);
  //   } catch (error) {
  //     const axiosError = error as AxiosResponse;

  //     if (axios.isAxiosError(axiosError)) {
  //       handleHTTPError(axiosError, siteURL);
  //     } else {
  //       console.error(error);
  //     }
  //     return null;
  //   }

  //   if (response && response.status === 200) {
  //     const json = await response.data;
  //     // console.log(siteURL, 'total: ', json.searchInformation.totalResults);
  //     return json.searchInformation.totalResults;
  //   } else {
  //     handleHTTPError(response, siteURL);
  //     return null;
  //   }
  // }

  // //
  // function handleHTTPError(response: AxiosResponse | undefined, siteURL: string) {
  //   let errorMessage: string;

  //   if (!response) {
  //     console.error('Bad request to google search engine');
  //     if (onError) onError('Bad request to google search engine');
  //     return null;
  //   }

  //   //Axios Error Handler
  //   if (axios.isAxiosError(response)) {
  //     const errResponse = response.code;

  //     if (errResponse === 'ERR_NETWORK') {
  //       errorMessage = `Error: Network error, check your WI-FI connection`;
  //     } else if (errResponse === 'ERR_BAD_REQUEST') {
  //       const status = response.response?.status;

  //       if (status === 403) {
  //         errorMessage = `Error with credentials. Error code: ${status}`;
  //       } else if (status === 429) {
  //         errorMessage = `Site: ${siteURL}  ||  Error: quota for requests has run out. Error code: ${status}`;
  //       } else {
  //         errorMessage = `ERR_BAD_REQUEST: ${status}`;
  //       }
  //     } else {
  //       errorMessage = `Axios Error`;
  //     }

  //     if (onError) {
  //       onError(errorMessage, response);
  //     }
  //     console.error(errorMessage);
  //     return null;
  //   }

  //   //HTTP Answer Handler
  //   const errCode = response.status;

  //   if (errCode === 500) {
  //     errorMessage = `Site: ${siteURL}  ||  Error: internal server error`;
  //   } else {
  //     errorMessage = `Site: ${siteURL}  ||  Error code: ${errCode}`;
  //   }

  //   if (onError) {
  //     onError(errorMessage, response);
  //   }
  //   console.error(errorMessage);
  // }
}

export default calcThematicityIndex;

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
      const searchResult = await googleSearch.withQuery(siteURL, query);

      if (searchResult instanceof Error) {
        if (onError) onError(searchResult.message);
        continue;
      }
      const targetPage = Number(searchResult.searchInformation.totalResults);
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

        const searchResult = await googleSearch.site(siteURL);

        if (searchResult instanceof Error) {
          if (onError) onError(searchResult.message);
          continue;
        }
        await throttling(delay_between_steps);
        const totalPage = Number(searchResult.searchInformation.totalResults);

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
}

export default calcThematicityIndex;

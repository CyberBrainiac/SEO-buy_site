/**
 * https://developers.google.com/custom-search/v1/overview
 * Custom Search JSON API provides 100 search queries per day for free.
 * If you need more, you may sign up for billing in the API Console.
 * Additional requests cost $5 per 1000 queries, up to 10k queries per day.
 * $0.005 per query, $0.005 for Insertion, $0.006 for Insertion + 20% profit*/

import { AxiosResponse } from 'axios';
import throttling from '@/utils/throttling';
import { InputData } from '@/containers/reducers/inputDataSlice';

interface GetLinkInsertionProps {
  inputDataArr: InputData[];
  query: string;
  onUpdate?: (progress: string) => void;
  onError?: (errorMessage: string, response?: AxiosResponse) => void;
}

async function getLinkInsertion ({
  inputDataArr,
  query,
  onUpdate,
  onError,
}: GetLinkInsertionProps) {
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
    return await getInsertion(inputDataArr);
  } catch (error) {
    alert('something in calcThematicityIndex broken ;(');
    console.error(error);
    return null;
  }

  //
  async function getInsertion(inputDataArr: InputData[]) {
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
    }
  }
}

export default getLinkInsertion;

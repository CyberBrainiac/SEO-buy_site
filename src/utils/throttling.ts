export default async function throttling(delay: number) {
  return new Promise(resolve => setTimeout(() => resolve(true), delay));
}

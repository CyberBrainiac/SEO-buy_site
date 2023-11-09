export default function isLatinOrCyrillic(char: string) {
  const latinRegex = /^[a-zA-Z]$/;
  const cyrillicRegex = /^[а-яА-Я]$/;

  return latinRegex.test(char) || cyrillicRegex.test(char);
}

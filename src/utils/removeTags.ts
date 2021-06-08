export function removeTags(value: string): string {
  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return value.replace(/(<([^>]+)>)/gi, '');
}

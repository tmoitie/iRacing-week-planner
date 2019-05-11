export default function (text) {
  return decodeURIComponent(text).replace(/\+/g, ' ').trim();
}

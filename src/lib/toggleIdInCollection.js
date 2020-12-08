export default function toggleIdInCollection(collection, id, newState) {
  const newCollection = [...collection];
  const index = newCollection.indexOf(id);

  if (index === -1 && newState) {
    newCollection.push(id);
  }
  if (index !== -1 && newState === false) {
    newCollection.splice(index, 1);
  }
  return newCollection;
}

import clone from 'lodash/clone';

export default function addZombie (zombies, name, location) {
  const zombiesClone = clone(zombies);
  zombiesClone.push({
    name: name,
    location: location,
    id: Date.now()
  })
  return zombiesClone;
}

export default function editZombie (zombies, name, location, id) {
  if(name === undefined) {
    name = zombies.find(zombie => zombie.id === id).name;
  }
  if(location === undefined) {
    location = zombies.find(zombie => zombie.id === id).location;
  }
  return zombies.map(zombie => {
    return zombie.id === id ? 
      ({
        ...zombie,
        location: location,
        name: name,
      })
      : zombie
  })
}

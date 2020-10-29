export default function deleteZombie (zombies, id) {
  return zombies.filter(zombie => zombie.id !== id)
}

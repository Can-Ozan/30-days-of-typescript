const themes = [
  'Cyberpunk Future', 'Medieval Fantasy', 'Post-Apocalyptic', 'Space Opera',
  'Steampunk Victorian', 'Ancient Mythology', 'Underwater Civilization', 'Desert Wasteland',
  'Neon Noir City', 'Magical School', 'Time Travel Adventure', 'Zombie Survival',
  'Robot Uprising', 'Pirate High Seas', 'Haunted Mansion', 'Wild West Frontier',
  'Alien Invasion', 'Virtual Reality', 'Norse Mythology', 'Samurai Era Japan',
  'Egyptian Pyramids', 'Ice Age', 'Jungle Expedition', 'Gothic Horror',
  'Superhero Metropolis', 'Feudal China', 'Aztec Empire', 'Atlantis Lost City'
];

const genres = [
  'Action RPG', 'Platformer', 'Puzzle', 'Strategy', 'Adventure',
  'Survival', 'Roguelike', 'Metroidvania', 'Tower Defense', 'Fighting',
  'Racing', 'Simulation', 'Stealth', 'Horror', 'Beat em up',
  'Card Battle', 'Turn-Based Strategy', 'Real-Time Strategy', 'Visual Novel', 'Shooter'
];

const mechanics = [
  'Double Jump', 'Wall Running', 'Time Manipulation', 'Grappling Hook',
  'Shape Shifting', 'Elemental Powers', 'Crafting System', 'Base Building',
  'Perma-death', 'Procedural Generation', 'Day/Night Cycle', 'Weather System',
  'Skill Trees', 'Combo System', 'Parry and Counter', 'Stealth Mechanics',
  'Resource Management', 'Territory Control', 'Pet/Companion System', 'Magic Spells',
  'Weapon Upgrades', 'Character Customization', 'Dialogue Choices', 'Quick Time Events',
  'Physics Manipulation', 'Portal Mechanics', 'Gravity Control', 'Mind Control',
  'Possession', 'Teleportation', 'Slow Motion', 'Inventory Tetris',
  'Cooking System', 'Fishing', 'Photography Mode', 'Hacking Minigame'
];

const characterRoles = [
  'Protagonist', 'Antagonist', 'Mentor', 'Sidekick', 'Anti-Hero',
  'Mysterious Stranger', 'Merchant', 'Quest Giver', 'Boss', 'Rival'
];

const characterTraits = [
  'brave', 'cunning', 'mysterious', 'wise', 'reckless', 'calculated',
  'charismatic', 'silent', 'haunted', 'optimistic', 'cynical', 'loyal',
  'ambitious', 'scarred', 'noble', 'ruthless', 'playful', 'stoic'
];

const characterTypes = [
  'warrior', 'mage', 'rogue', 'engineer', 'scientist', 'pilot',
  'hacker', 'mercenary', 'detective', 'knight', 'samurai', 'ninja',
  'cyborg', 'mutant', 'android', 'vampire', 'werewolf', 'necromancer'
];

const names = {
  cyber: ['Zyx', 'Nova', 'Cipher', 'Blade', 'Raven', 'Zero', 'Ghost', 'Phoenix'],
  fantasy: ['Aldric', 'Elara', 'Thorne', 'Lyra', 'Kael', 'Mira', 'Draven', 'Seraphina'],
  modern: ['Alex', 'Morgan', 'Riley', 'Jordan', 'Casey', 'Taylor', 'Quinn', 'Reese'],
  ancient: ['Marcus', 'Helena', 'Leonidas', 'Artemis', 'Thor', 'Freya', 'Ra', 'Isis']
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getNameByTheme(theme: string): string {
  if (theme.toLowerCase().includes('cyber') || theme.toLowerCase().includes('future')) {
    return getRandomElement(names.cyber);
  } else if (theme.toLowerCase().includes('fantasy') || theme.toLowerCase().includes('medieval')) {
    return getRandomElement(names.fantasy);
  } else if (theme.toLowerCase().includes('myth') || theme.toLowerCase().includes('ancient')) {
    return getRandomElement(names.ancient);
  } else {
    return getRandomElement(names.modern);
  }
}

export function generateGameIdea() {
  const theme = getRandomElement(themes);
  const genre = getRandomElement(genres);
  const selectedMechanics = getRandomElements(mechanics, Math.floor(Math.random() * 3) + 3);

  const characterCount = Math.floor(Math.random() * 2) + 3;
  const characters = Array.from({ length: characterCount }, () => {
    const role = getRandomElement(characterRoles);
    const trait = getRandomElement(characterTraits);
    const type = getRandomElement(characterTypes);
    const name = getNameByTheme(theme);

    return {
      name,
      role,
      description: `A ${trait} ${type} who serves as the ${role.toLowerCase()}`
    };
  });

  const description = generateDescription(theme, genre, selectedMechanics, characters);

  return {
    theme,
    genre,
    mechanics: selectedMechanics,
    characters,
    description
  };
}

function generateDescription(
  theme: string,
  genre: string,
  mechanics: string[],
  characters: Array<{ name: string; role: string; description: string }>
): string {
  const protagonist = characters.find(c => c.role === 'Protagonist') || characters[0];
  const mainMechanic = mechanics[0];

  const descriptions = [
    `An epic ${genre} set in a ${theme} world where ${protagonist.name} must master ${mainMechanic} to save their realm from an ancient threat.`,
    `Experience a ${genre} adventure in a ${theme} setting. Play as ${protagonist.name} and utilize ${mainMechanic} to overcome impossible odds.`,
    `In this ${genre}, explore the ${theme} universe as ${protagonist.name}. Harness the power of ${mainMechanic} to defeat your enemies.`,
    `A thrilling ${genre} that takes place in ${theme}. Guide ${protagonist.name} through challenges using ${mainMechanic} and other abilities.`,
    `Set in ${theme}, this ${genre} follows ${protagonist.name} on a quest where mastering ${mainMechanic} is key to survival.`
  ];

  return getRandomElement(descriptions);
}

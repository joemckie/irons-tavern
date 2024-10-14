export type DiaryLocation =
  | 'Ardougne'
  | 'Desert'
  | 'Falador'
  | 'Fremennik'
  | 'Kandarin'
  | 'Karamja'
  | 'Kourend & Kebos'
  | 'Lumbridge & Draynor'
  | 'Morytania'
  | 'Varrock'
  | 'Western Provinces'
  | 'Wilderness';

export enum DiaryTier {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Elite = 'Elite',
}

export interface DiaryTierData {
  complete: boolean;
  tasks: boolean[];
}

export type CombatAchievementTier =
  | 'Easy'
  | 'Medium'
  | 'Hard'
  | 'Elite'
  | 'Master'
  | 'Grandmaster';

export enum Skill {
  Attack = 'Attack',
  Strength = 'Strength',
  Defence = 'Defence',
  Ranged = 'Ranged',
  Prayer = 'Prayer',
  Magic = 'Magic',
  Runecraft = 'Runecraft',
  Hitpoints = 'Hitpoints',
  Crafting = 'Crafting',
  Mining = 'Mining',
  Smithing = 'Smithing',
  Fishing = 'Fishing',
  Cooking = 'Cooking',
  Firemaking = 'Firemaking',
  Woodcutting = 'Woodcutting',
  Agility = 'Agility',
  Herblore = 'Herblore',
  Thieving = 'Thieving',
  Fletching = 'Fletching',
  Slayer = 'Slayer',
  Farming = 'Farming',
  Construction = 'Construction',
  Hunter = 'Hunter',
}

export enum Quest {
  'A Kingdom Divided' = 'A Kingdom Divided',
  'A Night at the Theatre' = 'A Night at the Theatre',
  'A Porcine of Interest' = 'A Porcine of Interest',
  "A Soul's Bane" = "A Soul's Bane",
  'A Tail of Two Cats' = 'A Tail of Two Cats',
  'A Taste of Hope' = 'A Taste of Hope',
  'Animal Magnetism' = 'Animal Magnetism',
  'Another Slice of H.A.M.' = 'Another Slice of H.A.M.',
  'At First Light' = 'At First Light',
  'Below Ice Mountain' = 'Below Ice Mountain',
  'Beneath Cursed Sands' = 'Beneath Cursed Sands',
  'Between a Rock...' = 'Between a Rock...',
  'Bone Voyage' = 'Bone Voyage',
  'Children of the Sun' = 'Children of the Sun',
  'Client of Kourend' = 'Client of Kourend',
  'Cold War' = 'Cold War',
  'Contact!' = 'Contact!',
  'Creature of Fenkenstrain' = 'Creature of Fenkenstrain',
  'Darkness of Hallowvale' = 'Darkness of Hallowvale',
  'Death on the Isle' = 'Death on the Isle',
  'Death to the Dorgeshuun' = 'Death to the Dorgeshuun',
  'Defender of Varrock' = 'Defender of Varrock',
  'Demon Slayer' = 'Demon Slayer',
  'Desert Treasure I' = 'Desert Treasure I',
  'Desert Treasure II - The Fallen Empire' = 'Desert Treasure II - The Fallen Empire',
  'Devious Minds' = 'Devious Minds',
  'Dragon Slayer II' = 'Dragon Slayer II',
  'Dream Mentor' = 'Dream Mentor',
  "Eagles' Peak" = "Eagles' Peak",
  'Elemental Workshop I' = 'Elemental Workshop I',
  'Elemental Workshop II' = 'Elemental Workshop II',
  "Enakhra's Lament" = "Enakhra's Lament",
  'Enlightened Journey' = 'Enlightened Journey',
  'Ethically Acquired Antiquities' = 'Ethically Acquired Antiquities',
  'Fairytale I - Growing Pains' = 'Fairytale I - Growing Pains',
  'Fairytale II - Cure a Queen' = 'Fairytale II - Cure a Queen',
  'Forgettable Tale...' = 'Forgettable Tale...',
  'Garden of Tranquillity' = 'Garden of Tranquillity',
  'Getting Ahead' = 'Getting Ahead',
  'Ghosts Ahoy' = 'Ghosts Ahoy',
  'Goblin Diplomacy' = 'Goblin Diplomacy',
  'Grim Tales' = 'Grim Tales',
  'Horror from the Deep' = 'Horror from the Deep',
  "Icthlarin's Little Helper" = "Icthlarin's Little Helper",
  'In Aid of the Myreque' = 'In Aid of the Myreque',
  "King's Ransom" = "King's Ransom",
  'Land of the Goblins' = 'Land of the Goblins',
  'Lunar Diplomacy' = 'Lunar Diplomacy',
  'Making Friends with My Arm' = 'Making Friends with My Arm',
  'Making History' = 'Making History',
  'Meat and Greet' = 'Meat and Greet',
  'Misthalin Mystery' = 'Misthalin Mystery',
  'Monkey Madness II' = 'Monkey Madness II',
  'Mountain Daughter' = 'Mountain Daughter',
  "Mourning's End Part II" = "Mourning's End Part II",
  "My Arm's Big Adventure" = "My Arm's Big Adventure",
  "Olaf's Quest" = "Olaf's Quest",
  'Perilous Moons' = 'Perilous Moons',
  'Ratcatchers' = 'Ratcatchers',
  'Recipe for Disaster' = 'Recipe for Disaster',
  "Recipe for Disaster - Another Cook's Quest" = "Recipe for Disaster - Another Cook's Quest",
  'Recipe for Disaster - Culinaromancer' = 'Recipe for Disaster - Culinaromancer',
  'Recipe for Disaster - Evil Dave' = 'Recipe for Disaster - Evil Dave',
  'Recipe for Disaster - King Awowogei' = 'Recipe for Disaster - King Awowogei',
  'Recipe for Disaster - Lumbridge Guide' = 'Recipe for Disaster - Lumbridge Guide',
  'Recipe for Disaster - Mountain Dwarf' = 'Recipe for Disaster - Mountain Dwarf',
  'Recipe for Disaster - Pirate Pete' = 'Recipe for Disaster - Pirate Pete',
  'Recipe for Disaster - Sir Amik Varze' = 'Recipe for Disaster - Sir Amik Varze',
  'Recipe for Disaster - Skrach Uglogwee' = 'Recipe for Disaster - Skrach Uglogwee',
  'Recipe for Disaster - Wartface & Bentnoze' = 'Recipe for Disaster - Wartface & Bentnoze',
  'Recruitment Drive' = 'Recruitment Drive',
  'Royal Trouble' = 'Royal Trouble',
  'Secrets of the North' = 'Secrets of the North',
  'Shadow of the Storm' = 'Shadow of the Storm',
  'Shield of Arrav' = 'Shield of Arrav',
  'Sins of the Father' = 'Sins of the Father',
  'Sleeping Giants' = 'Sleeping Giants',
  'Song of the Elves' = 'Song of the Elves',
  'Spirits of the Elid' = 'Spirits of the Elid',
  'Swan Song' = 'Swan Song',
  'Tale of the Righteous' = 'Tale of the Righteous',
  'Tears of Guthix' = 'Tears of Guthix',
  'Temple of the Eye' = 'Temple of the Eye',
  'The Ascent of Arceuus' = 'The Ascent of Arceuus',
  'The Corsair Curse' = 'The Corsair Curse',
  'The Depths of Despair' = 'The Depths of Despair',
  'The Eyes of Glouphrie' = 'The Eyes of Glouphrie',
  'The Feud' = 'The Feud',
  'The Forsaken Tower' = 'The Forsaken Tower',
  'The Fremennik Exiles' = 'The Fremennik Exiles',
  'The Fremennik Isles' = 'The Fremennik Isles',
  'The Garden of Death' = 'The Garden of Death',
  'The Giant Dwarf' = 'The Giant Dwarf',
  'The Golem' = 'The Golem',
  'The Hand in the Sand' = 'The Hand in the Sand',
  'The Heart of Darkness' = 'The Heart of Darkness',
  'The Lost Tribe' = 'The Lost Tribe',
  'The Path of Glouphrie' = 'The Path of Glouphrie',
  'The Queen of Thieves' = 'The Queen of Thieves',
  'The Ribbiting Tale of a Lily Pad Labour Dispute' = 'The Ribbiting Tale of a Lily Pad Labour Dispute',
  'The Slug Menace' = 'The Slug Menace',
  'Tower of Life' = 'Tower of Life',
  "Twilight's Promise" = "Twilight's Promise",
  'Wanted!' = 'Wanted!',
  'What Lies Below' = 'What Lies Below',
  'While Guthix Sleeps' = 'While Guthix Sleeps',
  'X Marks the Spot' = 'X Marks the Spot',
  'Zogre Flesh Eaters' = 'Zogre Flesh Eaters',
  'Big Chompy Bird Hunting' = 'Big Chompy Bird Hunting',
  'Biohazard' = 'Biohazard',
  "Black Knights' Fortress" = "Black Knights' Fortress",
  'Cabin Fever' = 'Cabin Fever',
  'Clock Tower' = 'Clock Tower',
  "Cook's Assistant" = "Cook's Assistant",
  'Death Plateau' = 'Death Plateau',
  "Doric's Quest" = "Doric's Quest",
  'Dragon Slayer I' = 'Dragon Slayer I',
  'Druidic Ritual' = 'Druidic Ritual',
  'Dwarf Cannon' = 'Dwarf Cannon',
  "Eadgar's Ruse" = "Eadgar's Ruse",
  'Ernest the Chicken' = 'Ernest the Chicken',
  'Family Crest' = 'Family Crest',
  'Fight Arena' = 'Fight Arena',
  'Fishing Contest' = 'Fishing Contest',
  "Gertrude's Cat" = "Gertrude's Cat",
  'Haunted Mine' = 'Haunted Mine',
  'Hazeel Cult' = 'Hazeel Cult',
  "Heroes' Quest" = "Heroes' Quest",
  'Holy Grail' = 'Holy Grail',
  'Imp Catcher' = 'Imp Catcher',
  'In Search of the Myreque' = 'In Search of the Myreque',
  'Jungle Potion' = 'Jungle Potion',
  "Legends' Quest" = "Legends' Quest",
  'Lost City' = 'Lost City',
  "Merlin's Crystal" = "Merlin's Crystal",
  "Monk's Friend" = "Monk's Friend",
  'Monkey Madness I' = 'Monkey Madness I',
  "Mourning's End Part I" = "Mourning's End Part I",
  'Murder Mystery' = 'Murder Mystery',
  'Nature Spirit' = 'Nature Spirit',
  'Observatory Quest' = 'Observatory Quest',
  'One Small Favour' = 'One Small Favour',
  "Pirate's Treasure" = "Pirate's Treasure",
  'Plague City' = 'Plague City',
  'Priest in Peril' = 'Priest in Peril',
  'Prince Ali Rescue' = 'Prince Ali Rescue',
  'Rag and Bone Man I' = 'Rag and Bone Man I',
  'Rag and Bone Man II' = 'Rag and Bone Man II',
  'Regicide' = 'Regicide',
  'Romeo & Juliet' = 'Romeo & Juliet',
  'Roving Elves' = 'Roving Elves',
  'Rum Deal' = 'Rum Deal',
  'Rune Mysteries' = 'Rune Mysteries',
  'Scorpion Catcher' = 'Scorpion Catcher',
  'Sea Slug' = 'Sea Slug',
  "Shades of Mort'ton" = "Shades of Mort'ton",
  'Sheep Herder' = 'Sheep Herder',
  'Sheep Shearer' = 'Sheep Shearer',
  'Shilo Village' = 'Shilo Village',
  'Tai Bwo Wannai Trio' = 'Tai Bwo Wannai Trio',
  'Temple of Ikov' = 'Temple of Ikov',
  'The Dig Site' = 'The Dig Site',
  'The Fremennik Trials' = 'The Fremennik Trials',
  'The Grand Tree' = 'The Grand Tree',
  'The Great Brain Robbery' = 'The Great Brain Robbery',
  "The Knight's Sword" = "The Knight's Sword",
  'The Restless Ghost' = 'The Restless Ghost',
  'The Tourist Trap' = 'The Tourist Trap',
  'Throne of Miscellania' = 'Throne of Miscellania',
  'Tree Gnome Village' = 'Tree Gnome Village',
  'Tribal Totem' = 'Tribal Totem',
  'Troll Romance' = 'Troll Romance',
  'Troll Stronghold' = 'Troll Stronghold',
  'Underground Pass' = 'Underground Pass',
  'Vampyre Slayer' = 'Vampyre Slayer',
  'Watchtower' = 'Watchtower',
  'Waterfall Quest' = 'Waterfall Quest',
  "Witch's House" = "Witch's House",
  "Witch's Potion" = "Witch's Potion",
}

export enum MiniQuest {
  "Alfred Grimhand's Barcrawl" = "Alfred Grimhand's Barcrawl",
  'Barbarian Training' = 'Barbarian Training',
  'Bear Your Soul' = 'Bear Your Soul',
  'Curse of the Empty Lord' = 'Curse of the Empty Lord',
  "Daddy's Home" = "Daddy's Home",
  'The Enchanted Key' = 'The Enchanted Key',
  'Enter the Abyss' = 'Enter the Abyss',
  'Family Pest' = 'Family Pest',
  'The Frozen Door' = 'The Frozen Door',
  "The General's Shadow" = "The General's Shadow",
  'His Faithful Servants' = 'His Faithful Servants',
  "Hopespear's Will" = "Hopespear's Will",
  'In Search of Knowledge' = 'In Search of Knowledge',
  'Into the Tombs' = 'Into the Tombs',
  'Lair of Tarn Razorlor' = 'Lair of Tarn Razorlor',
  'Mage Arena I' = 'Mage Arena I',
  'Mage Arena II' = 'Mage Arena II',
  'Skippy and the Mogres' = 'Skippy and the Mogres',
}

export enum QuestStatus {
  NotStarted,
  Started,
  Completed,
}

export interface WikiSyncResponse {
  achievement_diaries: Record<DiaryLocation, Record<DiaryTier, DiaryTierData>>;
  quests: Record<Quest | MiniQuest, QuestStatus>;
}

export interface PlayerData {
  acquiredItems: string[];
}

export interface RequiredItem {
  clogName: string;
  amount: number;
}

export interface BaseItem {
  image: string;
  name: string;
  points: number;
}

export interface CollectionLogItem extends BaseItem {
  requiredLevels?: AtLeastOne<Record<Skill, number>>;
  requiredItems: NonEmptyArray<RequiredItem>;
}

export interface CombatAchievementItem extends BaseItem {
  requiredCombatAchievements: NonEmptyArray<number>;
}

export interface QuestItem extends BaseItem {
  requiredQuests: NonEmptyArray<Quest | MiniQuest>;
}

export type Item =
  | BaseItem
  | CollectionLogItem
  | CombatAchievementItem
  | QuestItem;

export interface ItemCategory {
  image?: string;
  items: NonEmptyArray<Item>;
}

export type ItemsResponse = Record<string, ItemCategory>;

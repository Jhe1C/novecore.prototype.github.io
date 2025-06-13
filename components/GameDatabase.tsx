export interface GameData {
  id: string;
  title: string;
  titleCN?: string; // 中文標題
  developer: string;
  publisher: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  coverImage: string;
  heroImage?: string;
  screenshots: string[];
  description: string;
  descriptionCN?: string; // 中文描述
  shortDescription: string;
  shortDescriptionCN?: string; // 中文簡短描述
  genre: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  releaseDate: string;
  ageRating: string;
  languages: string[];
  platforms: string[];
  fileSize: string;
  features: string[];
  systemRequirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
  dlcAvailable?: boolean;
  multiplayer?: boolean;
  achievements?: number;
  isNewRelease?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  isEarlyAccess?: boolean;
}

// 遊戲資料庫
export const GAME_DATABASE: GameData[] = [
  {
    id: "red-dead-redemption-2",
    title: "Red Dead Redemption 2",
    titleCN: "碧血狂殺2",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    coverImage: "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg?w=400&h=600&fit=crop",
    heroImage: "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg?w=1200&h=675&fit=crop",
    screenshots: [
      "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg?w=800&h=450&fit=crop",
    ],
    description: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age. America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.",
    descriptionCN: "榮獲超過175項年度最佳遊戲獎項和250多個滿分評價的《碧血狂殺2》，是一部關於榮譽與忠誠的史詩故事，背景設定在現代時代的黎明。美國，1899年。亞瑟·摩根和范德林德幫派是在逃的亡命之徒。面對聯邦探員和全國最優秀的賞金獵人的追捕，幫派必須在美國崎嶇的腹地搶劫、偷竊和戰鬥才能生存下去。",
    shortDescription: "An epic tale of life in America's unforgiving heartland, featuring a vast and atmospheric world.",
    shortDescriptionCN: "一個關於美國無情腹地生活的史詩故事，擁有廣闊而充滿氛圍的世界。",
    genre: ["Action", "Adventure", "Open World"],
    tags: ["Western", "Story Rich", "Open World", "Third Person", "Crime", "Horses", "Survival", "Hunting"],
    rating: 4.8,
    reviewCount: 89342,
    releaseDate: "2018-10-26",
    ageRating: "M",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Japanese", "Korean", "Chinese (Traditional)", "Chinese (Simplified)"],
    platforms: ["Windows", "PlayStation", "Xbox"],
    fileSize: "150 GB",
    features: ["Single Player", "Steam Achievements", "Steam Cloud", "Controller Support", "HDR Support"],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-2500K / AMD FX-6300",
        memory: "8 GB RAM",
        graphics: "Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280",
        storage: "150 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i7-4770K / AMD Ryzen 5 1500X",
        memory: "12 GB RAM",
        graphics: "Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB",
        storage: "150 GB available space"
      }
    },
    dlcAvailable: false,
    multiplayer: true,
    achievements: 52,
    isBestSeller: true,
    isOnSale: true
  },
  {
    id: "the-witcher-3-wild-hunt",
    title: "The Witcher 3: Wild Hunt",
    titleCN: "巫師 3：狂獵",
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    coverImage: "https://images.gog-statics.com/71d71c40052877a42c096b8230c71856a560d42132208cfa8e719243b5c6626b.jpg?w=400&h=600&fit=crop",
    heroImage: "https://images.gog-statics.com/71d71c40052877a42c096b8230c71856a560d42132208cfa8e719243b5c6626b.jpg?w=1200&h=675&fit=crop",
    screenshots: [
      "https://images.gog-statics.com/71d71c40052877a42c096b8230c71856a560d42132208cfa8e719243b5c6626b.jpg?w=800&h=450&fit=crop",
    ],
    description: "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world. The Witcher 3: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    descriptionCN: "你是利維亞的傑洛特，一名雇傭怪物獵人。在你面前是一個飽受戰爭蹂躪、怪物橫行的大陸，你可以隨意探索。你目前的合約？追蹤希里——預言之子，一個能夠改變世界形狀的活體武器。《巫師3：狂獵》是一款劇情驅動的次世代開放世界角色扮演遊戲，設定在一個視覺震撼的奇幻宇宙中，充滿了意義深遠的選擇和重大的後果。",
    shortDescription: "The most awarded game of 2015. Become a professional monster slayer and embark on an adventure of epic proportions!",
    shortDescriptionCN: "2015年最多獎項的遊戲。成為專業的怪物獵人，踏上史詩級的冒險之旅！",
    genre: ["RPG", "Action", "Adventure"],
    tags: ["Fantasy", "Open World", "RPG", "Story Rich", "Choices Matter", "Magic", "Medieval", "Third Person"],
    rating: 4.9,
    reviewCount: 156789,
    releaseDate: "2015-05-19",
    ageRating: "M",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Polish", "Japanese", "Korean", "Chinese (Traditional)", "Chinese (Simplified)"],
    platforms: ["Windows", "PlayStation", "Xbox", "Nintendo Switch"],
    fileSize: "50 GB",
    features: ["Single Player", "Steam Achievements", "Steam Cloud", "Controller Support", "Steam Workshop", "HDR Support"],
    systemRequirements: {
      minimum: {
        os: "Windows 7 64-bit",
        processor: "Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940",
        memory: "6 GB RAM",
        graphics: "Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870",
        storage: "50 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz",
        memory: "8 GB RAM",
        graphics: "Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290",
        storage: "50 GB available space"
      }
    },
    dlcAvailable: true,
    multiplayer: false,
    achievements: 78,
    isBestSeller: true,
    isOnSale: true
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    titleCN: "電馭叛客 2077",
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    coverImage: "https://cdn.mos.cms.futurecdn.net/BeyhFdCM2ugLQjX8vX7fuQ.jpg?w=400&h=600&fit=crop",
    heroImage: "https://cdn.mos.cms.futurecdn.net/BeyhFdCM2ugLQjX8vX7fuQ.jpg?w=1200&h=675&fit=crop",
    screenshots: [
      "https://cdn.mos.cms.futurecdn.net/BeyhFdCM2ugLQjX8vX7fuQ.jpg?w=800&h=450&fit=crop",
    ],
    description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamour, and ceaseless body modification. You play as V, a cyberpunk mercenary pursuing a one-of-a-kind implant — the key to immortality. Customize your cyberware and skillset, and explore a vast city where your choices shape the story and the world around you.",
    descriptionCN: "《電馭叛客2077》是一款開放世界動作冒險RPG，背景設定在夜城的黑暗未來——一個沉迷於權力、魅力和無休止身體改造的危險大都市。你扮演V，一名追求獨一無二植入物的電馭叛客雇傭兵——通往永生的鑰匙。自定義你的電馭裝備和技能，探索一個龐大的城市，你的選擇將塑造故事和周圍的世界。",
    shortDescription: "An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.",
    shortDescriptionCN: "一款開放世界動作冒險RPG，背景設定在夜城大都市，你扮演一名電馭叛客雇傭兵，卷入生死存亡的戰鬥。",
    genre: ["RPG", "Action", "Adventure"],
    tags: ["Cyberpunk", "Open World", "RPG", "Futuristic", "Story Rich", "First Person", "Character Customization", "Sci-fi"],
    rating: 4.1,
    reviewCount: 67892,
    releaseDate: "2020-12-10",
    ageRating: "M",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Polish", "Japanese", "Korean", "Chinese (Traditional)", "Chinese (Simplified)"],
    platforms: ["Windows", "PlayStation", "Xbox"],
    fileSize: "70 GB",
    features: ["Single Player", "Steam Achievements", "Steam Cloud", "Controller Support", "Ray Tracing", "DLSS Support"],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-3570K / AMD FX-8310",
        memory: "8 GB RAM",
        graphics: "GTX 780 3GB / RX 470 4GB",
        storage: "70 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i7-4790 / AMD Ryzen 3 3200G",
        memory: "12 GB RAM",
        graphics: "GTX 1060 6GB / RX 580 8GB",
        storage: "70 GB available space"
      }
    },
    dlcAvailable: true,
    multiplayer: false,
    achievements: 44,
    isNewRelease: false,
    isBestSeller: false,
    isOnSale: true
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    titleCN: "艾爾登法環",
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    price: 49.99,
    originalPrice: 59.99,
    discount: 17,
    coverImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546?w=400&h=600&fit=crop",
    heroImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546?w=1200&h=675&fit=crop",
    screenshots: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546?w=800&h=450&fit=crop"
    ],
    description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected.",
    descriptionCN: "全新奇幻動作角色扮演遊戲。褪色者啊，起身吧，在恩惠的指引下，揮舞艾爾登法環的力量，在交界地成為艾爾登之王。廣闊的世界中，各種情況的開放場域與設計複雜且具立體感的巨大地下城無縫連接。",
    shortDescription: "A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.",
    shortDescriptionCN: "一款奇幻動作角色扮演冒險遊戲，背景設定在宮崎英高和喬治·R·R·馬丁共同創造的世界中。",
    genre: ["Action", "RPG", "Adventure"],
    tags: ["Dark Fantasy", "Open World", "Souls-like", "Challenging", "Boss Battles", "Medieval", "Magic", "Third Person"],
    rating: 4.7,
    reviewCount: 234567,
    releaseDate: "2022-02-25",
    ageRating: "M",
    languages: ["English", "Japanese", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Korean", "Chinese (Traditional)", "Chinese (Simplified)"],
    platforms: ["Windows", "PlayStation", "Xbox"],
    fileSize: "60 GB",
    features: ["Single Player", "Online Co-op", "Steam Achievements", "Controller Support", "HDR Support"],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-8400 / AMD Ryzen 3 3300X",
        memory: "12 GB RAM",
        graphics: "GTX 1060 3GB / RX 580 4GB",
        storage: "60 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i7-8700K / AMD Ryzen 5 3600X",
        memory: "16 GB RAM",
        graphics: "GTX 1070 8GB / RX Vega 56 8GB",
        storage: "60 GB available space"
      }
    },
    dlcAvailable: true,
    multiplayer: true,
    achievements: 42,
    isBestSeller: true,
    isOnSale: true
  },
  {
    id: "minecraft",
    title: "Minecraft",
    titleCN: "當個創世神",
    developer: "Mojang Studios",
    publisher: "Microsoft Studios",
    price: 26.95,
    coverImage: "https://play-lh.googleusercontent.com/gfNz1N2GNi5piz24IB08RQ4ZGfUnN_kOH8Edhh7uCiotI2P7IBWBXdHzR8gC01ppNnU=w720-h405-rw?w=400&h=600&fit=crop",
    heroImage: "https://play-lh.googleusercontent.com/gfNz1N2GNi5piz24IB08RQ4ZGfUnN_kOH8Edhh7uCiotI2P7IBWBXdHzR8gC01ppNnU=w720-h405-rw?w=1200&h=675&fit=crop",
    screenshots: [
      "https://play-lh.googleusercontent.com/gfNz1N2GNi5piz24IB08RQ4ZGfUnN_kOH8Edhh7uCiotI2P7IBWBXdHzR8gC01ppNnU=w720-h405-rw?w=800&h=450&fit=crop"
    ],
    description: "Minecraft is a game made up of blocks, creatures, and community. You can survive the night or build a work of art – the choice is all yours. But if the thought of exploring a vast new world all on your own feels overwhelming, then it's a good thing that Minecraft can be played with friends.",
    descriptionCN: "Minecraft是一個由方塊、生物和社區組成的遊戲。你可以在夜晚生存或建造藝術品——選擇權完全在你。但如果獨自探索廣闊新世界的想法讓人感到overwhelmed，那麼Minecraft可以與朋友一起遊玩就是一件好事。",
    shortDescription: "A game about placing blocks and going on adventures. Build, explore, and survive in randomly generated worlds.",
    shortDescriptionCN: "一個關於放置方塊和冒險的遊戲。在隨機生成的世界中建造、探索和生存。",
    genre: ["Sandbox", "Adventure", "Survival"],
    tags: ["Building", "Crafting", "Survival", "Open World", "Multiplayer", "Creative", "Exploration", "Family Friendly"],
    rating: 4.6,
    reviewCount: 445632,
    releaseDate: "2011-11-18",
    ageRating: "E10+",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Japanese", "Korean", "Chinese (Traditional)", "Chinese (Simplified)"],
    platforms: ["Windows", "Mac", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"],
    fileSize: "4 GB",
    features: ["Single Player", "Multiplayer", "Creative Mode", "Survival Mode", "Cross-platform", "Mods Support"],
    systemRequirements: {
      minimum: {
        os: "Windows 7 64-bit",
        processor: "Intel Core i3-3210 / AMD A8-7600",
        memory: "4 GB RAM",
        graphics: "Intel HD Graphics 4000 / AMD Radeon R5",
        storage: "4 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-4690 / AMD A10-7800",
        memory: "8 GB RAM",
        graphics: "GTX 700 Series / AMD Radeon Rx 200 Series",
        storage: "4 GB available space"
      }
    },
    dlcAvailable: false,
    multiplayer: true,
    achievements: 117,
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: "fifa-24",
    title: "EA Sports FC 24",
    titleCN: "EA Sports FC 24",
    developer: "EA Vancouver",
    publisher: "Electronic Arts",
    price: 59.99,
    originalPrice: 69.99,
    discount: 14,
    coverImage: "https://i.ytimg.com/vi/-vL01jbgENE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA9MHL5-P0kAP8POYz-7723i09TlA?w=400&h=600&fit=crop",
    heroImage: "https://i.ytimg.com/vi/-vL01jbgENE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA9MHL5-P0kAP8POYz-7723i09TlA?w=1200&h=675&fit=crop",
    screenshots: [
      "https://i.ytimg.com/vi/-vL01jbgENE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA9MHL5-P0kAP8POYz-7723i09TlA?w=800&h=450&fit=crop"
    ],
    description: "EA Sports FC 24 welcomes you to The World's Game: the most true-to-football experience ever with HyperMotionV, PlayStyles optimised by Opta, and an enhanced Frostbite Engine delivering authenticity across 19,000+ players in 700+ teams playing in 100+ stadiums and over 30 leagues around the world.",
    descriptionCN: "EA Sports FC 24歡迎您來到世界遊戲：有史以來最真實的足球體驗，配備HyperMotionV、由Opta優化的PlayStyles，以及增強的Frostbite引擎，為全球30多個聯賽的700多支球隊中的19,000多名球員提供真實性，在100多個體育場中比賽。",
    shortDescription: "The World's Game returns with enhanced realism, featuring HyperMotionV technology and authentic football experience.",
    shortDescriptionCN: "世界遊戲回歸，具有增強的真實感，採用HyperMotionV技術和真實的足球體驗。",
    genre: ["Sports", "Simulation"],
    tags: ["Football", "Soccer", "Multiplayer", "Sports", "Competitive", "Realistic", "Career Mode", "Ultimate Team"],
    rating: 4.2,
    reviewCount: 98756,
    releaseDate: "2023-09-29",
    ageRating: "E",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Japanese", "Korean"],
    platforms: ["Windows", "PlayStation", "Xbox", "Nintendo Switch"],
    fileSize: "100 GB",
    features: ["Online Multiplayer", "Career Mode", "Ultimate Team", "Cross-platform", "Live Updates", "Tournament Mode"],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-6600K / AMD Ryzen 5 1600",
        memory: "8 GB RAM",
        graphics: "GTX 1050 Ti / RX 570",
        storage: "100 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i7-9700K / AMD Ryzen 7 2700X",
        memory: "12 GB RAM",
        graphics: "GTX 1660 / RX 5600 XT",
        storage: "100 GB available space"
      }
    },
    dlcAvailable: true,
    multiplayer: true,
    achievements: 45,
    isNewRelease: true,
    isBestSeller: true,
    isOnSale: true
  },
  {
    id: "spider-man-remastered",
    title: "Marvel's Spider-Man Remastered",
    titleCN: "漫威蜘蛛人重製版",
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    coverImage: "https://p2.bahamut.com.tw/B/2KU/93/042b7f6bcee686b5231c7ec8221gltl5.JPG?v=1654209859933?w=400&h=600&fit=crop",
    heroImage: "https://p2.bahamut.com.tw/B/2KU/93/042b7f6bcee686b5231c7ec8221gltl5.JPG?v=1654209859933?w=1200&h=675&fit=crop",
    screenshots: [
      "https://p2.bahamut.com.tw/B/2KU/93/042b7f6bcee686b5231c7ec8221gltl5.JPG?v=1654209859933?w=800&h=450&fit=crop"
    ],
    description: "In Marvel's Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original action-adventure story. Play as an experienced Peter Parker, fighting big crime and iconic villains in Marvel's New York. Web-swing through vibrant neighborhoods and defeat villains with epic takedowns.",
    descriptionCN: "在《漫威蜘蛛人重製版》中，彼得·帕克和蜘蛛人的世界在原創動作冒險故事中碰撞。扮演經驗豐富的彼得·帕克，在漫威紐約與大犯罪和標誌性反派戰鬥。通過充滿活力的社區擺盪蛛網，用史詩般的終結技擊敗反派。",
    shortDescription: "Swing through Marvel's New York as an experienced Peter Parker in this critically acclaimed adventure.",
    shortDescriptionCN: "在這個廣受好評的冒險中，扮演經驗豐富的彼得·帕克在漫威紐約中擺盪。",
    genre: ["Action", "Adventure", "Superhero"],
    tags: ["Superhero", "Open World", "Action", "Story Rich", "Third Person", "Marvel", "Web Swinging", "Combat"],
    rating: 4.8,
    reviewCount: 87654,
    releaseDate: "2022-08-12",
    ageRating: "T",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Japanese", "Korean", "Chinese (Traditional)", "Chinese (Simplified)"],
    platforms: ["Windows", "PlayStation"],
    fileSize: "75 GB",
    features: ["Single Player", "Steam Achievements", "Ray Tracing", "DLSS Support", "HDR Support", "Controller Support"],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i3-4160 / AMD FX-6300",
        memory: "8 GB RAM",
        graphics: "GTX 950 / RX 470",
        storage: "75 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-4670 / AMD Ryzen 5 1600",
        memory: "16 GB RAM",
        graphics: "GTX 1060 6GB / RX 580 8GB",
        storage: "75 GB available space"
      }
    },
    dlcAvailable: true,
    multiplayer: false,
    achievements: 76,
    isBestSeller: true,
    isOnSale: true
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    titleCN: "柏德之門3",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    price: 59.99,
    coverImage: "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg?w=400&h=600&fit=crop",
    heroImage: "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg?w=1200&h=675&fit=crop",
    screenshots: [
      "https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg?w=800&h=450&fit=crop",

    ],
    description: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a Mind Flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil.",
    descriptionCN: "召集你的隊伍，在一個關於友誼與背叛、犧牲與生存，以及絕對權力誘惑的故事中回到被遺忘的國度。神秘的能力在你體內覺醒，來自植入你大腦的奪心魔寄生蟲。抵抗，讓黑暗對抗自身。或者擁抱腐敗，成為終極邪惡。",
    shortDescription: "Gather your party and return to the Forgotten Realms in a tale of fellowship, betrayal, sacrifice, survival, and the lure of absolute power.",
    shortDescriptionCN: "召集你的隊伍，在一個關於友誼、背叛、犧牲、生存和絕對權力誘惑的故事中回到被遺忘的國度。",
    genre: ["RPG", "Strategy", "Adventure"],
    tags: ["Turn-Based Combat", "D&D", "Party-Based RPG", "Character Creation", "Choices Matter", "Fantasy", "Co-op", "Isometric"],
    rating: 4.9,
    reviewCount: 198756,
    releaseDate: "2023-08-03",
    ageRating: "M",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Polish", "Japanese", "Korean", "Chinese (Simplified)"],
    platforms: ["Windows", "Mac", "PlayStation"],
    fileSize: "150 GB",
    features: ["Single Player", "Online Co-op", "Local Co-op", "Cross-platform", "Character Creation", "Turn-based Combat"],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel i5-4690 / AMD FX 4350",
        memory: "8 GB RAM",
        graphics: "GTX 970 / RX 480",
        storage: "150 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Intel i7 8700K / AMD r5 3600",
        memory: "16 GB RAM",
        graphics: "GTX 1060 6GB / RX 580",
        storage: "150 GB available space"
      }
    },
    dlcAvailable: false,
    multiplayer: true,
    achievements: 54,
    isNewRelease: true,
    isBestSeller: true,
    isOnSale: false
  },
  {
    id: "starfield",
    title: "Starfield",
    titleCN: "星空",
    developer: "Bethesda Game Studios",
    publisher: "Bethesda Softworks",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=675&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=450&fit=crop"
    ],
    description: "Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom as you embark on an epic journey to answer humanity's greatest mystery.",
    descriptionCN: "《星空》是貝塞斯達遊戲工作室25年來的第一個新宇宙，該工作室是獲獎作品《上古卷軸V：天際》和《異塵餘生4》的創作者。在這款設定在星空中的次世代角色扮演遊戲中，創造任何你想要的角色，以無與倫比的自由度探索，踏上解答人類最大謎題的史詩之旅。",
    shortDescription: "Bethesda Game Studios' first new universe in 25 years. Create any character and explore the galaxy with unparalleled freedom.",
    shortDescriptionCN: "貝塞斯達遊戲工作室25年來的第一個新宇宙。創造任何角色，以無與倫比的自由度探索銀河系。",
    genre: ["RPG", "Adventure", "Sci-Fi"],
    tags: ["Space", "Open World", "RPG", "Sci-fi", "Character Creation", "Exploration", "Bethesda", "Story Rich"],
    rating: 4.0,
    reviewCount: 123456,
    releaseDate: "2023-09-06",
    ageRating: "M",
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese", "Russian", "Polish", "Japanese", "Korean"],
    platforms: ["Windows", "Xbox"],
    fileSize: "125 GB",
    features: ["Single Player", "Character Creation", "Mod Support", "Xbox Game Pass", "Steam Achievements", "Controller Support"],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "AMD Ryzen 5 2600X / Intel Core i7-6800K",
        memory: "16 GB RAM",
        graphics: "AMD Radeon RX 5700 / GTX 1070 Ti",
        storage: "125 GB available space"
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "AMD Ryzen 5 3600X / Intel i5-10600K",
        memory: "16 GB RAM",
        graphics: "AMD Radeon RX 6800 XT / GTX 2080",
        storage: "125 GB available space"
      }
    },
    dlcAvailable: true,
    multiplayer: false,
    achievements: 50,
    isNewRelease: true,
    isBestSeller: false,
    isOnSale: true
  }
];

// 遊戲搜尋功能
export function searchGames(
  query: string, 
  filters?: {
    genre?: string;
    priceRange?: [number, number];
    platform?: string;
    rating?: number;
    isOnSale?: boolean;
  }
): GameData[] {
  let results = GAME_DATABASE;

  // 文字搜尋 (英文標題或中文標題)
  if (query.trim()) {
    const queryLower = query.toLowerCase();
    results = results.filter(game => 
      game.title.toLowerCase().includes(queryLower) ||
      (game.titleCN && game.titleCN.includes(query)) ||
      game.developer.toLowerCase().includes(queryLower) ||
      game.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
      game.genre.some(genre => genre.toLowerCase().includes(queryLower))
    );
  }

  // 套用篩選條件
  if (filters) {
    if (filters.genre) {
      results = results.filter(game => 
        game.genre.some(g => g.toLowerCase() === filters.genre?.toLowerCase())
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      results = results.filter(game => game.price >= min && game.price <= max);
    }

    if (filters.platform) {
      results = results.filter(game => 
        game.platforms.some(p => p.toLowerCase() === filters.platform?.toLowerCase())
      );
    }

    if (filters.rating) {
      results = results.filter(game => game.rating >= filters.rating!);
    }

    if (filters.isOnSale !== undefined) {
      results = results.filter(game => game.isOnSale === filters.isOnSale);
    }
  }

  return results;
}

// 根據類型取得遊戲
export function getGamesByGenre(genre: string): GameData[] {
  return GAME_DATABASE.filter(game => 
    game.genre.some(g => g.toLowerCase() === genre.toLowerCase())
  );
}

// 取得折扣遊戲
export function getDiscountedGames(): GameData[] {
  return GAME_DATABASE.filter(game => game.isOnSale && game.discount && game.discount > 0);
}

// 取得暢銷遊戲
export function getBestSellerGames(): GameData[] {
  return GAME_DATABASE.filter(game => game.isBestSeller);
}

// 取得新發布遊戲
export function getNewReleaseGames(): GameData[] {
  return GAME_DATABASE.filter(game => game.isNewRelease);
}

// 根據ID取得遊戲
export function getGameById(id: string): GameData | undefined {
  return GAME_DATABASE.find(game => game.id === id);
}

// 取得隨機遊戲推薦
export function getRandomGames(count: number = 5): GameData[] {
  const shuffled = [...GAME_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 取得精選遊戲 (用於首頁輪播)
export function getFeaturedGames(count: number = 5): GameData[] {
  // 優先顯示高評分、暢銷或新發布的遊戲
  const featuredGames = GAME_DATABASE
    .filter(game => game.isBestSeller || game.isNewRelease || game.rating >= 4.5)
    .sort((a, b) => {
      // 按評分和暢銷度排序
      const scoreA = (a.rating * 10) + (a.isBestSeller ? 5 : 0) + (a.isNewRelease ? 3 : 0);
      const scoreB = (b.rating * 10) + (b.isBestSeller ? 5 : 0) + (b.isNewRelease ? 3 : 0);
      return scoreB - scoreA;
    })
    .slice(0, count);

  // 如果精選遊戲不足，補充其他高評分遊戲
  if (featuredGames.length < count) {
    const remainingGames = GAME_DATABASE
      .filter(game => !featuredGames.includes(game))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count - featuredGames.length);
    
    return [...featuredGames, ...remainingGames];
  }

  return featuredGames;
}

// 取得推薦遊戲 (基於用戶喜好的智能推薦)
export function getRecommendedGames(
  userPreferences?: {
    favoriteGenres?: string[];
    ratingThreshold?: number;
    excludeOwned?: string[];
  },
  count: number = 8
): GameData[] {
  const { favoriteGenres = [], ratingThreshold = 4.0, excludeOwned = [] } = userPreferences || {};
  
  let recommendations = GAME_DATABASE.filter(game => 
    !excludeOwned.includes(game.id) && game.rating >= ratingThreshold
  );

  // 如果有偏好類型，優先推薦這些類型的遊戲
  if (favoriteGenres.length > 0) {
    const genreMatches = recommendations.filter(game =>
      game.genre.some(genre => 
        favoriteGenres.some(favGenre => 
          genre.toLowerCase() === favGenre.toLowerCase()
        )
      )
    );

    const otherGames = recommendations.filter(game =>
      !genreMatches.includes(game)
    );

    // 混合偏好類型和其他高評分遊戲
    const genreCount = Math.min(genreMatches.length, Math.ceil(count * 0.7));
    const otherCount = count - genreCount;

    recommendations = [
      ...genreMatches.slice(0, genreCount),
      ...otherGames.slice(0, otherCount)
    ];
  }

  // 按評分和流行度排序
  return recommendations
    .sort((a, b) => {
      const scoreA = (a.rating * 10) + (a.isBestSeller ? 5 : 0) + (a.isNewRelease ? 3 : 0);
      const scoreB = (b.rating * 10) + (b.isBestSeller ? 5 : 0) + (b.isNewRelease ? 3 : 0);
      return scoreB - scoreA;
    })
    .slice(0, count);
}

// 類型集合
export const GENRE_COLLECTIONS = {
  action: getGamesByGenre('Action'),
  rpg: getGamesByGenre('RPG'), 
  adventure: getGamesByGenre('Adventure'),
  strategy: getGamesByGenre('Strategy'),
  sports: getGamesByGenre('Sports'),
  simulation: getGamesByGenre('Simulation'),
  shooter: getGamesByGenre('FPS'),
  sandbox: getGamesByGenre('Sandbox')
};

// 精選集合
export const FEATURED_COLLECTIONS = {
  bestSellers: getBestSellerGames(),
  newReleases: getNewReleaseGames(),
  onSale: getDiscountedGames(),
  topRated: GAME_DATABASE.filter(game => game.rating >= 4.5).sort((a, b) => b.rating - a.rating),
  upcoming: [], // 即將推出的遊戲可以在這裡添加
  free: GAME_DATABASE.filter(game => game.price === 0),
  multiplayer: GAME_DATABASE.filter(game => game.multiplayer === true),
  singlePlayer: GAME_DATABASE.filter(game => game.multiplayer === false)
};

// 遊戲統計資訊
export const GAME_STATS = {
  totalGames: GAME_DATABASE.length,
  totalGenres: [...new Set(GAME_DATABASE.flatMap(game => game.genre))].length,
  averageRating: GAME_DATABASE.reduce((sum, game) => sum + game.rating, 0) / GAME_DATABASE.length,
  averagePrice: GAME_DATABASE.reduce((sum, game) => sum + game.price, 0) / GAME_DATABASE.length,
  gamesOnSale: getDiscountedGames().length,
  newReleases: getNewReleaseGames().length,
  bestSellers: getBestSellerGames().length
};
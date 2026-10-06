export const initialMysteries = [
  {
    id: 1,
    slug: "phase-1-elemental-mages",
    title: "Phase 1: The Elemental Trial (Multiple-Choice)",
    intro:
      "Cross the realms of Wind, Ocean, and Earth. Prove your wisdom against the first three Elemental Mages to unlock the forbidden chambers of Fire, Shadow, and Time.",
    totalStages: 3,
    currentStage: 0,
    solved: false,
    hintsUsed: 0,
    reveal:
      "You have mastered the Elemental Trial! The winds bowed to your swiftness, the abyssal ocean parted for your intellect, and the ancient forest opened its labyrinth. The seal to Phase 2 is now broken—prepare to face the Mages of Fire, Shadow, and Time!",
    stages: [
      {
        id: 1,
        question:
          'Level 1 — The Mage of Winds & Aether: "Welcome to the Mountain of Storms! I am the Master of Winds. I move around you all the time. I play with trees and push big ships, but you cannot see me. Answer my question to show you are smart and fast: I cry without a voice, and fly without wings. I bite in the cold winter without teeth, and whisper in your ear without lips. What am I?"',
        options: ["The Cloud", "The Wind", "The Echo", "The Lightning"],
        answer: ["The Wind", "wind"],
        hintsUsed: 0,
        hints: [
          "Hint 1: You can feel me against your face, but it is impossible to see me with your eyes.",
          "Hint 2: I am the invisible force that turns windmills and fills the sails of ships.",
          "Hint 3: My name is right there in the title of the Mage standing before you!",
        ],
      },
      {
        id: 2,
        question:
          'Level 2 — The Mage of the Abyssal Oceans: "You passed the winds, but can you swim in my deep water? I am the Guardian of the Dark Oceans. Let\'s see if you can win: I have a big bed, but I never sleep. I have a wide mouth, but I never speak. I run all day through mountains and valleys without feet. In the end, I go into the sea. What am I?"',
        options: ["The Wave", "The Ship", "The River", "The Whale"],
        answer: ["The River", "river"],
        hintsUsed: 0,
        hints: [
          'Hint 1: My "bed" is the channel I flow through, and my "mouth" is my delta where I meet the sea.',
          "Hint 2: I am a flowing source of fresh water that originates high in the mountains.",
          "Hint 3: Famous examples of me include the Nile, the Amazon, and the Euphrates.",
        ],
      },
      {
        id: 3,
        question:
          'Level 3 — The Sorceress of Forests & Earth: "Welcome to my green home. I am the Magic Queen of the Earth. Everything here grows slowly. Choose your answer carefully: I wear hundreds of green coats in the summer. In winter, I take them off one by one, but I don\'t feel cold. I breathe without lungs, and I drink water with my feet deep in the ground. What am I?"',
        options: ["The Tree", "The Turtle", "The Mountain", "The Chameleon"],
        answer: ["The Tree", "tree"],
        hintsUsed: 0,
        hints: [
          'Hint 1: My "green coats" are leaves that turn yellow and fall during autumn.',
          'Hint 2: The "feet" I use to drink water are actually roots buried underground.',
          "Hint 3: I am the source of wood, shade, and fruit in the forest.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "phase-2-gate-of-eternal-knowledge",
    title: "Phase 2: The Gate of Eternal Knowledge (Written Answers)",
    intro:
      "The era of easy choices is over, traveler! Here stand the Mages of Fire, Shadow, and Time. No options will guide you now—you must type the truth yourself to claim your throne.",
    totalStages: 3,
    currentStage: 0,
    solved: false,
    hintsUsed: 0,
    reveal:
      'Grand Archmage: "Astounding! The winds have bowed to you, the oceans have calmed before you, and fire, shadow, and even time itself have yielded to your mind! Not in centuries has an intellect so fierce stood before me. Step forward, Wise One—the Gate of Eternal Knowledge is wide open... Enter, and claim your throne among the greats!"',
    stages: [
      {
        id: 1,
        question:
          'Level 4 — The Mage of Fire & Ash: "Easy choices are finished, traveler! I am the Master of Fire. Now, luck cannot help you. You must type the answer yourself: I am black when you buy me. I am red when you use me. I am white when you throw me away. I come from wood, and water kills me. What am I?"',
        options: [],
        answer: ["coal", "charcoal", "ember", "the coal", "the charcoal"],
        hintsUsed: 0,
        hints: [
          "Hint 1: People used me for heating in the past, and use me for barbecue grills today.",
          "Hint 2: I am made from burned wood or mined from deep underground.",
          "Hint 3: It is a 4-letter word starting with C (or an 8-letter word starting with C-H-A-R).",
        ],
      },
      {
        id: 2,
        question:
          'Level 5 — The Mage of Shadows & Void: "Good job passing the fire. But here, there is no light. I am the Master of Shadows. Listen carefully, the answer is very close to you: I follow you everywhere in the sun. I copy everything you do quietly. But I run away and disappear when it gets dark. I have no weight, and you cannot touch me. What am I?"',
        options: [],
        answer: ["shadow", "my shadow", "your shadow", "a shadow", "the shadow"],
        hintsUsed: 0,
        hints: [
          "Hint 1: I only appear when your body blocks a source of light.",
          "Hint 2: My length changes throughout the day depending on where the sun is in the sky.",
          "Hint 3: My name is the singular form of the title of the Mage questioning you right now!",
        ],
      },
      {
        id: 3,
        question:
          'Level 6 (Final Boss) — The Mage of Time & Eternity: "You reached the end! I am the Guardian of Time. You defeated five masters. Now, answer my question to open the big gate: I eat iron and break steel. I turn hard stones into dust. I end kings and destroy big mountains. But, you cannot stop me for one second. If you try to catch me, I run away faster. What am I?"',
        options: [],
        answer: ["time", "eternity", "the time"],
        hintsUsed: 0,
        hints: [
          "Hint 1: My movement is measured in seconds, minutes, hours, and years.",
          'Hint 2: People often say that I "wait for no man" and that I "heal all wounds."',
          "Hint 3: Clocks and calendars were invented specifically to track me. It is a 4-letter word starting with T.",
        ],
      },
    ],
  },
];
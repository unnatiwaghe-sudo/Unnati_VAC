import React, { useState, useEffect } from 'react';

// MASSIVE PRODUCTION-GRADE DATABANK (145+ REAL TITLES ACROSS 10 EXPANSIVE GENRES)
const STARTER_CATALOG = [
  // ==========================================
  // 1. PSYCHOLOGICAL THRILLERS
  // ==========================================
  { _id: "thr-1", title: "Alice in Borderland", category: "Psychological Thrillers", match: "99%", rating: 8.9, desc: "An aimless gamer and his friends find themselves in a parallel Tokyo, forced to compete in sadistic games to survive.", comments: [{ user: "Arisu_X", text: "The mind games are incredibly brutal. Season 2 ending was insane!", time: "Just now" }, { user: "Chishiya_Fan", text: "The wits required for the hearts games are spectacular.", time: "2 hours ago" }], img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80" },
  { _id: "thr-2", title: "Sector 36", category: "Psychological Thrillers", match: "94%", rating: 8.1, desc: "A dark crime thriller tracking a missing persons investigation leading to a sinister, chilling reveal.", comments: [{ user: "Rohan_Dev", text: "Intense and deeply gripping execution. Vikrant Massey crushed it.", time: "Yesterday" }], img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80" },
  { _id: "thr-3", title: "Shutter Island", category: "Psychological Thrillers", match: "96%", rating: 8.6, desc: "A U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.", comments: [{ user: "Cinephile", text: "That ending twist completely blew my mind.", time: "2 weeks ago" }], img: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=800&auto=format&fit=crop&q=80" },
  { _id: "thr-4", title: "Black Mirror", category: "Psychological Thrillers", match: "98%", rating: 8.8, desc: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.", comments: [], img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80" },
  { _id: "thr-5", title: "Severance", category: "Psychological Thrillers", match: "97%", rating: 8.7, desc: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.", comments: [], img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
  { _id: "thr-6", title: "Mindhunter", category: "Psychological Thrillers", match: "95%", rating: 8.6, desc: "In the late 1970s, two FBI agents expand criminal science by delving into the psychology of murder.", comments: [], img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800" },
  { _id: "thr-7", title: "You", category: "Psychological Thrillers", match: "93%", rating: 7.7, desc: "A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he transfixes.", comments: [], img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800" },
  { _id: "thr-8", title: "Hannibal", category: "Psychological Thrillers", match: "96%", rating: 8.5, desc: "Explores the early relationship between renowned psychiatrist Hannibal Lecter and a young FBI criminal profiler.", comments: [], img: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800" },
  { _id: "thr-9", title: "Dexter", category: "Psychological Thrillers", match: "91%", rating: 8.6, desc: "By day, Dexter is a mild-mannered blood-spatter analyst for the Miami Police. By night, he is a serial killer targeting criminals.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "thr-10", title: "The Silence of the Lambs", category: "Psychological Thrillers", match: "99%", rating: 8.6, desc: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to catch another serial killer.", comments: [], img: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800" },
  { _id: "thr-11", title: "Fight Club", category: "Psychological Thrillers", match: "98%", rating: 8.8, desc: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more.", comments: [], img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" },
  { _id: "thr-12", title: "Gone Girl", category: "Psychological Thrillers", match: "94%", rating: 8.1, desc: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him.", comments: [], img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800" },
  { _id: "thr-13", title: "Prisoners", category: "Psychological Thrillers", match: "95%", rating: 8.1, desc: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads.", comments: [], img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" },
  { _id: "thr-14", title: "The Machinist", category: "Psychological Thrillers", match: "92%", rating: 7.7, desc: "An industrial worker who hasn't slept in a year begins to doubt his own sanity as strange occurrences plague his shift.", comments: [], img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800" },
  { _id: "thr-15", title: "Oldboy", category: "Psychological Thrillers", match: "97%", rating: 8.4, desc: "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.", comments: [], img: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800" },

  // ==========================================
  // 2. TRENDING K-DRAMAS
  // ==========================================
  { _id: "kd-1", title: "Crash Landing on You", category: "Trending K-Dramas", match: "98%", rating: 9.1, desc: "A South Korean heiress accidentally paraglides into North Korea and into the life of an army officer.", comments: [{ user: "Sarah K.", text: "Absolute masterpiece! The chemistry is unmatched.", time: "2 days ago" }], img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80" },
  { _id: "kd-2", title: "Vincenzo", category: "Trending K-Dramas", match: "95%", rating: 8.8, desc: "An Italian mafia lawyer returns to his homeland to recover hidden gold, delivering fierce vigilante justice.", comments: [{ user: "Alex_M", text: "Dark comedy and action blended together flawlessly.", time: "1 week ago" }], img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80" },
  { _id: "kd-3", title: "Reply 1988", category: "Trending K-Dramas", match: "99%", rating: 9.3, desc: "A nostalgic look back at five childhood friends living in the same neighborhood of Ssangmun-dong.", comments: [{ user: "Minji", text: "The ultimate comfort drama. Makes me cry every single time.", time: "3 days ago" }], img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80" },
  { _id: "kd-4", title: "Strangers from Hell", category: "Trending K-Dramas", match: "92%", rating: 8.7, desc: "Unsettling incidents encounter a young writer after moving into a cheap dormitory filled with creepy residents.", comments: [{ user: "ThrillerFan", text: "Terrifying psychological tension. Lee Dong Wook was incredible.", time: "5 days ago" }], img: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800" },
  { _id: "kd-5", title: "Flower of Evil", category: "Trending K-Dramas", match: "96%", rating: 9.0, desc: "A detective discovers her perfect husband might be a cold-blooded serial killer hiding his identity.", comments: [], img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800" },
  { _id: "kd-6", title: "Squid Game", category: "Trending K-Dramas", match: "99%", rating: 8.0, desc: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for an alluring prize.", comments: [], img: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=800" },
  { _id: "kd-7", title: "All of Us Are Dead", category: "Trending K-Dramas", match: "94%", rating: 8.3, desc: "A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out or turn.", comments: [], img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800" },
  { _id: "kd-8", title: "Goblin", category: "Trending K-Dramas", match: "97%", rating: 9.1, desc: "An immortal doctrine protector needs a human bride to end his long, agonizing immortal life.", comments: [], img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800" },
  { _id: "kd-9", title: "My Mister", category: "Trending K-Dramas", match: "98%", rating: 9.4, desc: "Three middle-aged brothers and a cold, damaged young woman heal together while navigating life's heavy hardships.", comments: [], img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800" },
  { _id: "kd-10", title: "Twenty-Five Twenty-One", category: "Trending K-Dramas", match: "96%", rating: 8.9, desc: "In a time when dreams seem out of reach, a teenage fencer pursues big ambitions and meets a hardworking young man.", comments: [], img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800" },
  { _id: "kd-11", title: "Our Beloved Summer", category: "Trending K-Dramas", match: "93%", rating: 8.8, desc: "Years after filming a viral high school documentary, two bickering ex-lovers are pulled back in front of the camera.", comments: [], img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800" },
  { _id: "kd-12", title: "The Glory", category: "Trending K-Dramas", match: "98%", rating: 8.8, desc: "A woman seeks absolute revenge against her brutal high school bullies after executing an intricate, multi-year plan.", comments: [], img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800" },
  { _id: "kd-13", title: "Sweet Home", category: "Trending K-Dramas", match: "94%", rating: 8.5, desc: "As humans turn into savage monsters, a troubled teenager and his apartment neighbors fight to hold onto their humanity.", comments: [], img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800" },
  { _id: "kd-14", title: "It's Okay to Not Be Okay", category: "Trending K-Dramas", match: "95%", rating: 8.9, desc: "An antisocial children's book author and an empathetic psychiatric ward caretaker find emotional healing together.", comments: [], img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800" },
  { _id: "kd-15", title: "Beyond Evil", category: "Trending K-Dramas", match: "96%", rating: 8.7, desc: "Two fearless detectives track a resurgent serial killer in a small, quiet town, breaking laws to expose his identity.", comments: [], img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800" },

  // ==========================================
  // 3. THAI & ASIAN MYSTERIES
  // ==========================================
  { _id: "am-1", title: "Girl From Nowhere", category: "Thai & Asian Mysteries", match: "97%", rating: 7.6, desc: "A mysterious, clever girl named Nanno transfers to different schools, exposing the dark hypocrisy of students and faculty.", comments: [{ user: "Nanno_Stan", text: "Her laugh is iconic. Best karma execution show ever.", time: "4 days ago" }], img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" },
  { _id: "am-2", title: "Bad Genius: The Series", category: "Thai & Asian Mysteries", match: "95%", rating: 8.0, desc: "An elite student group constructs an international exam-cheating racket inspired by high-stakes corporate espionage.", comments: [], img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800" },
  { _id: "am-3", title: "The Gifted", category: "Thai & Asian Mysteries", match: "93%", rating: 8.2, desc: "In a school hierarchy where students are classified by capacity, a low-ranked classroom discovers a secret gifted program.", comments: [], img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800" },
  { _id: "am-4", title: "Remember You", category: "Thai & Asian Mysteries", match: "91%", rating: 7.9, desc: "A brilliant criminal profiler teams up with a persistent detective to solve high-profile cases connected to his past.", comments: [], img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800" },
  { _id: "am-5", title: "Tunnel (Thai)", category: "Thai & Asian Mysteries", match: "92%", rating: 7.8, desc: "A detective hunting a serial killer travels 30 years forward in time through a mysterious mountain tunnel.", comments: [], img: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=800" },
  { _id: "am-6", title: "Sleepless Society", category: "Thai & Asian Mysteries", match: "90%", rating: 7.3, desc: "An insomniac woman is haunted by past visions that blur lines between reality and dark, repressed hallucinations.", comments: [], img: "https://images.unsplash.com/photo-1511295742364-92b9345f6852?w=800" },
  { _id: "am-7", title: "Voice (Thai Adaptation)", category: "Thai & Asian Mysteries", match: "94%", rating: 8.0, desc: "An emergency voice dispatcher relies on acute hearing skills to track active killers within crucial golden-hour windows.", comments: [], img: "https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=800" },
  { _id: "am-8", title: "In Family We Trust", category: "Thai & Asian Mysteries", match: "96%", rating: 8.3, desc: "When the head heir of a prominent billionaire family is murdered, family alliances dissolve into dynamic betrayal plots.", comments: [], img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800" },
  { _id: "am-9", title: "Who Are You", category: "Thai & Asian Mysteries", match: "91%", rating: 7.7, desc: "An orphaned student enduring extreme bullying wakes up with total amnesia, mistakenly stepping into her twin's wealthy life.", comments: [], img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800" },
  { _id: "am-10", title: "The Stranded", category: "Thai & Asian Mysteries", match: "89%", rating: 6.8, desc: "Trapped on an island after a catastrophic tsunami, elite academy students witness strange mystical forces take over.", comments: [], img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800" },
  { _id: "am-11", title: "Signal", category: "Thai & Asian Mysteries", match: "95%", rating: 8.5, desc: "Detectives from different eras use a mysterious retro walkie-talkie to coordinate cross-timeline cold-case solutions.", comments: [], img: "https://images.unsplash.com/photo-1551746364-97c94a13d4cb?w=800" },
  { _id: "am-12", title: "Copycat Killer", category: "Thai & Asian Mysteries", match: "93%", rating: 7.5, desc: "A serial killer uses massive media attention to transform murders into a public reality spectacle.", comments: [], img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800" },
  { _id: "am-13", title: "The Victims' Game", category: "Thai & Asian Mysteries", match: "94%", rating: 8.0, desc: "A forensic scientist with Asperger's discovers his estranged daughter's link to a string of bizarre conceptual deaths.", comments: [], img: "https://images.unsplash.com/photo-1541829028-64296b688df1?w=800" },
  { _id: "am-14", title: "Detention", category: "Thai & Asian Mysteries", match: "92%", rating: 7.2, desc: "An oppressed high school student uncovers haunted layout origins of a dark political purge within restricted facility walls.", comments: [], img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800" },
  { _id: "am-15", title: "Light the Night", category: "Thai & Asian Mysteries", match: "95%", rating: 8.1, desc: "In Taipei's red-light district, night club hostesses navigate romance, jealousy, and a shocking murder mystery.", comments: [], img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" },

  // ==========================================
  // 4. SCI-FI & HOLLYWOOD MYSTERIES
  // ==========================================
  { _id: "mys-1", title: "Inception", category: "Sci-Fi & Hollywood Mysteries", match: "97%", rating: 8.9, desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given an inverse task.", comments: [{ user: "NolanGeek", text: "Mind-bending concept executed beautifully.", time: "1 month ago" }], img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&auto=format&fit=crop&q=80" },
  { _id: "mys-2", title: "The Dark Knight", category: "Sci-Fi & Hollywood Mysteries", match: "99%", rating: 9.4, desc: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept his greatest psychological test.", comments: [], img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80" },
  { _id: "mys-3", title: "Interstellar", category: "Sci-Fi & Hollywood Mysteries", match: "99%", rating: 8.7, desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", comments: [], img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" },
  { _id: "mys-4", title: "The Prestige", category: "Sci-Fi & Hollywood Mysteries", match: "96%", rating: 8.5, desc: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything.", comments: [], img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800" },
  { _id: "mys-5", title: "Zodiac", category: "Sci-Fi & Hollywood Mysteries", match: "94%", rating: 7.7, desc: "A San Francisco cartoonist becomes obsessively involved in tracking the identity of the elusive Zodiac Killer.", comments: [], img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800" },
  { _id: "mys-6", title: "Knives Out", category: "Sci-Fi & Hollywood Mysteries", match: "95%", rating: 7.9, desc: "A detective investigates the death of a patriarch of an eccentric, combative, dysfunctional family.", comments: [], img: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=800" },
  { _id: "mys-7", title: "Arrival", category: "Sci-Fi & Hollywood Mysteries", match: "97%", rating: 7.9, desc: "A linguist works with the military to communicate with alien spaceships that have landed across the globe.", comments: [], img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800" },
  { _id: "mys-8", title: "Blade Runner 2049", category: "Sci-Fi & Hollywood Mysteries", match: "96%", rating: 8.0, desc: "A new blade runner unearths a long-buried secret that has the potential to plunge what's left of society into chaos.", comments: [], img: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800" },
  { _id: "mys-9", title: "Tenet", category: "Sci-Fi & Hollywood Mysteries", match: "92%", rating: 7.3, desc: "Armed with only one word, Tenet, a protagonist fights for the survival of the world through time inversion missions.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "mys-10", title: "The Matrix", category: "Sci-Fi & Hollywood Mysteries", match: "99%", rating: 8.7, desc: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth about his reality.", comments: [], img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" },
  { _id: "mys-11", title: "Ex Machina", category: "Sci-Fi & Hollywood Mysteries", match: "94%", rating: 7.7, desc: "A programmer is chosen to participate in a ground-breaking experiment in synthetic intelligence by evaluating a humanoid A.I.", comments: [], img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800" },
  { _id: "mys-12", title: "Westworld", category: "Sci-Fi & Hollywood Mysteries", match: "93%", rating: 8.5, desc: "At the intersection of the near future and a reimagined past, an upscale amusement park accommodates high-paying android fantasies.", comments: [], img: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=800" },
  { _id: "mys-13", title: "Stranger Things", category: "Sci-Fi & Hollywood Mysteries", match: "98%", rating: 8.7, desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and a strange little girl.", comments: [], img: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800" },
  { _id: "mys-14", title: "Dark", category: "Sci-Fi & Hollywood Mysteries", match: "97%", rating: 8.7, desc: "A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes relationships among four families.", comments: [], img: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?w=800" },
  { _id: "mys-15", title: "Coherence", category: "Sci-Fi & Hollywood Mysteries", match: "91%", rating: 7.2, desc: "Strange things begin to happen when a group of friends gather for a dinner party on an evening a comet passes overhead.", comments: [], img: "https://images.unsplash.com/photo-1539321908154-04927596764d?w=800" },

  // ==========================================
  // 5. ANIME & J-DRAMA THRILLERS
  // ==========================================
  { _id: "an-1", title: "Attack on Titan", category: "Anime & J-Drama Thrillers", match: "99%", rating: 9.2, desc: "Humanity is forced to live inside walled cities to shield themselves from giant man-eating humanoids called Titans.", comments: [{ user: "Eren_Yeager", text: "Brilliant world-building and shocking plot twists.", time: "5 days ago" }], img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80" },
  { _id: "an-2", title: "Demon Slayer", category: "Anime & J-Drama Thrillers", match: "97%", rating: 8.8, desc: "A youth sets out to become a demon slayer after his family is slaughtered and his sister turned into a demon.", comments: [], img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80" },
  { _id: "an-3", title: "Death Note", category: "Anime & J-Drama Thrillers", match: "99%", rating: 9.0, desc: "An intelligent high school student goes on a secret crusade to eliminate criminals from the world using a notebook.", comments: [], img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800" },
  { _id: "an-4", title: "Monster", category: "Anime & J-Drama Thrillers", match: "98%", rating: 9.4, desc: "A brilliant neurosurgeon is plunged into darkness after saving a boy who grows up to be a charismatic killer.", comments: [], img: "https://images.unsplash.com/photo-1541829028-64296b688df1?w=800" },
  { _id: "an-5", title: "Steins;Gate", category: "Anime & J-Drama Thrillers", match: "96%", rating: 9.1, desc: "A self-proclaimed mad scientist accidentally discovers a method of sending text messages across time loops.", comments: [], img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800" },
  { _id: "an-6", title: "Psycho-Pass", category: "Anime & J-Drama Thrillers", match: "95%", rating: 8.2, desc: "In a futuristic world, a dynamic surveillance network measures citizens' mental states to calculate crime coefficient potential.", comments: [], img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" },
  { _id: "an-7", title: "Erased", category: "Anime & J-Drama Thrillers", match: "94%", rating: 8.5, desc: "A young manga artist travels back 18 years in time to prevent a series of local kidnappings and save his mother.", comments: [], img: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800" },
  { _id: "an-8", title: "Code Geass", category: "Anime & J-Drama Thrillers", match: "97%", rating: 8.7, desc: "An exiled prince gains the power of absolute obedience and leads a masked rebellion against an empire.", comments: [], img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800" },
  { _id: "an-9", title: "Neon Genesis Evangelion", category: "Anime & J-Drama Thrillers", match: "98%", rating: 8.5, desc: "Teenage pilots operate massive bio-mechanical mechs to defend human settlements against strange existential entities.", comments: [], img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800" },
  { _id: "an-10", title: "Hunter x Hunter", category: "Anime & J-Drama Thrillers", match: "99%", rating: 9.0, desc: "A young boy trains to become an elite Hunter to track down his legendary father, facing brutal tactical tests.", comments: [], img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800" },
  { _id: "an-11", title: "Jujutsu Kaisen", category: "Anime & J-Drama Thrillers", match: "98%", rating: 8.7, desc: "A high schooler swallows a cursed finger to save friends, joining a secret society of sorcerers fighting ancient curses.", comments: [], img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800" },
  { _id: "an-12", title: "Chainsaw Man", category: "Anime & J-Drama Thrillers", match: "96%", rating: 8.5, desc: "A bankrupt teenager merges with his pet chainsaw devil, getting recruited into state security as a public devil hunter.", comments: [], img: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800" },
  { _id: "an-13", title: "Tokyo Ghoul", category: "Anime & J-Drama Thrillers", match: "93%", rating: 7.8, desc: "A college student barely survives a encounter with a ghoul, transforming into a half-human, half-ghoul hybrid caught between worlds.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "an-14", title: "Parasyte: The Maxim", category: "Anime & J-Drama Thrillers", match: "95%", rating: 8.3, desc: "A high schooler forms a symbiotic alliance with an alien parasite that failed to take control of his brain.", comments: [], img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800" },
  { _id: "an-15", title: "The Promised Neverland", category: "Anime & J-Drama Thrillers", match: "94%", rating: 8.3, desc: "Orphans living in a paradise estate discover a horrifying truth about their purpose and orchestrate a breakout escape.", comments: [], img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800" },

  // ==========================================
  // 6. ACTION & GRITTY TRUE CRIME
  // ==========================================
  { _id: "crm-1", title: "Breaking Bad", category: "Action & Gritty True Crime", match: "99%", rating: 9.5, desc: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing methamphetamine.", comments: [], img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800" },
  { _id: "crm-2", title: "Better Call Saul", category: "Action & Gritty True Crime", match: "98%", rating: 9.0, desc: "The trials and tribulations of criminal defense attorney Jimmy McGill in the years prior to his fateful partnership.", comments: [], img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800" },
  { _id: "crm-3", title: "Narcos", category: "Action & Gritty True Crime", match: "97%", rating: 8.8, desc: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar and the operations of his cartel.", comments: [], img: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800" },
  { _id: "crm-4", title: "True Detective", category: "Action & Gritty True Crime", match: "96%", rating: 8.9, desc: "Seasonal anthology tracking complex investigations exposing the macabre secrets of eccentric regional detectives.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "crm-5", title: "The Wire", category: "Action & Gritty True Crime", match: "99%", rating: 9.3, desc: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement networks.", comments: [], img: "https://images.unsplash.com/photo-144703686981-a3abbc4d4fe3?w=800" },
  { _id: "crm-6", title: "Fargo", category: "Action & Gritty True Crime", match: "94%", rating: 8.9, desc: "Various chronicles of deception, intrigue, and murder in and around frozen Minnesota.", comments: [], img: "https://images.unsplash.com/photo-1485627404703-89b55fcc595e?w=800" },
  { _id: "crm-7", title: "Chernobyl", category: "Action & Gritty True Crime", match: "99%", rating: 9.4, desc: "In April 1986, an explosion at the Chernobyl Nuclear Power Plant in the USSR becomes one of the world's worst man-made catastrophes.", comments: [], img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" },
  { _id: "crm-8", title: "The Sopranos", category: "Action & Gritty True Crime", match: "99%", rating: 9.2, desc: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life.", comments: [], img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800" },
  { _id: "crm-9", title: "Peaky Blinders", category: "Action & Gritty True Crime", match: "98%", rating: 8.8, desc: "A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps.", comments: [], img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" },
  { _id: "crm-10", title: "Ozark", category: "Action & Gritty True Crime", match: "95%", rating: 8.5, desc: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.", comments: [], img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
  { _id: "crm-11", title: "Unbelievable", category: "Action & Gritty True Crime", match: "94%", rating: 8.4, desc: "Two female detectives investigate a series of eerie, identical home attacks across state borders.", comments: [], img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800" },
  { _id: "crm-12", title: "The Batman", category: "Action & Gritty True Crime", match: "96%", rating: 7.8, desc: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "crm-13", title: "Sicario", category: "Action & Gritty True Crime", match: "95%", rating: 7.6, desc: "An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs at the border area.", comments: [], img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800" },
  { _id: "crm-14", title: "Nightcrawler", category: "Action & Gritty True Crime", match: "93%", rating: 7.8, desc: "When Lou Bloom, a con man desperate for work, muscles into the world of L.A. freelance crime journalism, he blurs ethical lines.", comments: [], img: "https://images.unsplash.com/photo-1541829028-64296b688df1?w=800" },
  { _id: "crm-15", title: "Heat", category: "Action & Gritty True Crime", match: "96%", rating: 8.3, desc: "A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a clue at a heist.", comments: [], img: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=800" },

  // ==========================================
  // 7. HIGH-STAKES SUSPENSE
  // ==========================================
  { _id: "sus-1", title: "Squid Game: The Challenge", category: "High-Stakes Suspense", match: "92%", rating: 6.2, desc: "Immersive real-life reality game adaptation based on the fictional lethal competition circuit.", comments: [], img: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=800" },
  { _id: "sus-2", title: "The Traitors", category: "High-Stakes Suspense", match: "94%", rating: 8.0, desc: "A game of tactical deception where secret traitors assassinate innocent players to steal a grand cash pool.", comments: [], img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800" },
  { _id: "sus-3", title: "Physical: 100", category: "High-Stakes Suspense", match: "96%", rating: 7.7, desc: "One hundred competitors in peak physical condition compete in grueling challenges to claim the honor of best physique.", comments: [], img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800" },
  { _id: "sus-4", title: "Money Heist", category: "High-Stakes Suspense", match: "98%", rating: 8.2, desc: "An unusual group of robbers attempt to carry out the most perfect heist in Spanish history - stealing billions from the Mint.", comments: [], img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800" },
  { _id: "sus-5", title: "Lupin", category: "High-Stakes Suspense", match: "95%", rating: 7.5, desc: "Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice.", comments: [], img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800" },
  { _id: "sus-6", title: "Prison Break", category: "High-Stakes Suspense", match: "97%", rating: 8.3, desc: "Due to a political conspiracy, an innocent man is sent to death row, and his only hope is his brother, who deliberately gets sent to prison.", comments: [], img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800" },
  { _id: "sus-7", title: "24", category: "High-Stakes Suspense", match: "91%", rating: 8.4, desc: "Counter-terrorist agent Jack Bauer races against the clock to subvert mass security threats in a real-time tracking sequence.", comments: [], img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" },
  { _id: "sus-8", title: "Homeland", category: "High-Stakes Suspense", match: "93%", rating: 8.3, desc: "A bipolar CIA operative becomes convinced a returned war hero was turned by Al-Qaeda and poses an active domestic cell risk.", comments: [], img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
  { _id: "sus-9", title: "Bodyguard", category: "High-Stakes Suspense", match: "95%", rating: 8.1, desc: "A volatile war veteran is assigned to protect a high-profile politician whose political ideals stand against everything he believes.", comments: [], img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800" },
  { _id: "sus-10", title: "The Night Manager", category: "High-Stakes Suspense", match: "94%", rating: 8.0, desc: "The night manager of a luxury hotel is recruited by a government agent to infiltrate the inner circle of a ruthless arms dealer.", comments: [], img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" },
  { _id: "sus-11", title: "Line of Duty", category: "High-Stakes Suspense", match: "96%", rating: 8.7, desc: "An anti-corruption police unit investigates fellow officers whose hidden syndicate ties run deep within state bureaus.", comments: [], img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800" },
  { _id: "sus-12", title: "The Capture", category: "High-Stakes Suspense", match: "92%", rating: 7.8, desc: "When a soldier is accused of a crime backed by deepfake CCTV layouts, an investigator uncovers multi-layered intelligence tech.", comments: [], img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" },
  { _id: "sus-13", title: "Slow Horses", category: "High-Stakes Suspense", match: "97%", rating: 8.0, desc: "Follows a team of British intelligence agents who serve in a dumping ground department of MI5 due to career-ending mistakes.", comments: [], img: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800" },
  { _id: "sus-14", title: "Fauda", category: "High-Stakes Suspense", match: "95%", rating: 8.2, desc: "A top human tracking agent comes out of retirement to hunt a target he thought was dead, setting off chaotic chain reactions.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "sus-15", title: "Caliphate", category: "High-Stakes Suspense", match: "96%", rating: 8.2, desc: "A national security agent receives a tip about an impending extremist attack, intertwining the lives of multiple women.", comments: [], img: "https://images.unsplash.com/photo-144703686981-a3abbc4d4fe3?w=800" },

  // ==========================================
  // 8. EPIC FANTASY & ADVENTURE (NEW)
  // ==========================================
  { _id: "fan-1", title: "Game of Thrones", category: "Epic Fantasy & Adventure", match: "99%", rating: 9.2, desc: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.", comments: [], img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800" },
  { _id: "fan-2", title: "The Witcher", category: "Epic Fantasy & Adventure", match: "95%", rating: 8.1, desc: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.", comments: [], img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800" },
  { _id: "fan-3", title: "The Lord of the Rings: The Rings of Power", category: "Epic Fantasy & Adventure", match: "90%", rating: 7.0, desc: "Epic drama set thousands of years before the events of J.R.R. Tolkien's 'The Hobbit' and 'The Lord of the Rings'.", comments: [], img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800" },
  { _id: "fan-4", title: "House of the Dragon", category: "Epic Fantasy & Adventure", match: "96%", rating: 8.5, desc: "An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.", comments: [], img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800" },
  { _id: "fan-5", title: "Dune", category: "Epic Fantasy & Adventure", match: "98%", rating: 8.0, desc: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.", comments: [], img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" },
  { _id: "fan-6", title: "Avatar: The Last Airbender", category: "Epic Fantasy & Adventure", match: "99%", rating: 9.3, desc: "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar.", comments: [], img: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=800" },
  { _id: "fan-7", title: "Arcane", category: "Epic Fantasy & Adventure", match: "98%", rating: 9.0, desc: "Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions.", comments: [], img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800" },
  { _id: "fan-8", title: "The Boys", category: "Epic Fantasy & Adventure", match: "96%", rating: 8.7, desc: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.", comments: [], img: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800" },
  { _id: "fan-9", title: "The Sandman", category: "Epic Fantasy & Adventure", match: "93%", rating: 7.7, desc: "Upon escaping after decades of imprisonment by a mortal wizard, Dream, the personification of dreams, sets about reclaiming his lost equipment.", comments: [], img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800" },
  { _id: "fan-10", title: "Shadow and Bone", category: "Epic Fantasy & Adventure", match: "91%", rating: 7.5, desc: "Dark forces conspire against orphan mapmaker Alina Starkov when she unleashes an extraordinary power that could change the fate of her war-torn world.", comments: [], img: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800" },
  { _id: "fan-11", title: "Invincible", category: "Epic Fantasy & Adventure", match: "95%", rating: 8.7, desc: "An adult animated series based on the Skybound/Image comic about a teenager whose father is the most powerful superhero on the planet.", comments: [], img: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800" },
  { _id: "fan-12", title: "The Wheel of Time", category: "Epic Fantasy & Adventure", match: "89%", rating: 7.1, desc: "Set in a high fantasy world where magic exists, but only some can access it, a woman named Moiraine crosses paths with five young men and women.", comments: [], img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800" },
  { _id: "fan-13", title: "His Dark Materials", category: "Epic Fantasy & Adventure", match: "92%", rating: 7.8, desc: "A young girl is destined to liberate her world from the grip of the Magisterium which represses people's ties to magic and their animal spirits.", comments: [], img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800" },
  { _id: "fan-14", title: "The Mandalorian", category: "Epic Fantasy & Adventure", match: "96%", rating: 8.7, desc: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.", comments: [], img: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800" },
  { _id: "fan-15", title: "Outlander", category: "Epic Fantasy & Adventure", match: "94%", rating: 8.4, desc: "An English combat nurse from 1945 is mysteriously swept back in time to 1743.", comments: [], img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" },

  // ==========================================
  // 9. MIND-BENDING DOCUMENTARIES (NEW)
  // ==========================================
  { _id: "doc-1", title: "The Tinder Swindler", category: "Mind-Bending Documentaries", match: "97%", rating: 7.1, desc: "Posing as a wealthy, jet-setting diamond mogul, an Israeli conman wooed women online then conned them out of millions of dollars.", comments: [], img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800" },
  { _id: "doc-2", title: "Fyre", category: "Mind-Bending Documentaries", match: "95%", rating: 7.2, desc: "An exclusive behind the scenes look at the infamous unraveling of the Fyre music festival.", comments: [], img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800" },
  { _id: "doc-3", title: "Don't F**k With Cats", category: "Mind-Bending Documentaries", match: "98%", rating: 8.0, desc: "A twisted criminal's gruesome videos drive a group of amateur internet sleuths to launch a risky manhunt.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "doc-4", title: "Making a Murderer", category: "Mind-Bending Documentaries", match: "99%", rating: 8.5, desc: "Filmed over a 10-year period, this documentary explores the story of a DNA exoneree who, while in the midst of exposing corruption, finds himself the prime suspect in a grisly new crime.", comments: [], img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800" },
  { _id: "doc-5", title: "Tiger King", category: "Mind-Bending Documentaries", match: "96%", rating: 7.5, desc: "A zoo owner spirals out of control amid a cast of eccentric characters in this true murder-for-hire story from the underworld of big cat breeding.", comments: [], img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
  { _id: "doc-6", title: "The Staircase", category: "Mind-Bending Documentaries", match: "94%", rating: 7.9, desc: "Accused of murdering his wife, a crime novelist engages in a 16-year legal battle.", comments: [], img: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=800" },
  { _id: "doc-7", title: "Icarus", category: "Mind-Bending Documentaries", match: "97%", rating: 7.9, desc: "When an American cyclist plunges into a doping scandal involving a Russian scientist, he inadvertently blows the lid off a massive sports conspiracy.", comments: [], img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800" },
  { _id: "doc-8", title: "Wild Wild Country", category: "Mind-Bending Documentaries", match: "98%", rating: 8.1, desc: "When a controversial cult leader builds a utopian city in the Oregon desert, conflict with the locals escalates into a national scandal.", comments: [], img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800" },
  { _id: "doc-9", title: "Three Identical Strangers", category: "Mind-Bending Documentaries", match: "95%", rating: 7.6, desc: "In 1980 New York, three young men who were all adopted meet each other and find out they're triplets who were separated at birth.", comments: [], img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800" },
  { _id: "doc-10", title: "The Keepers", category: "Mind-Bending Documentaries", match: "96%", rating: 8.0, desc: "A documentary series that explores the unsolved murder of a nun and the horrific secrets and pain that linger nearly five decades after her death.", comments: [], img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800" },
  { _id: "doc-11", title: "Evil Genius", category: "Mind-Bending Documentaries", match: "94%", rating: 7.5, desc: "The extraordinary story of the 'pizza bomber' heist and the FBI's investigation into a bizarre collection of suspects.", comments: [], img: "https://images.unsplash.com/photo-1541829028-64296b688df1?w=800" },
  { _id: "doc-12", title: "Tell Me Who I Am", category: "Mind-Bending Documentaries", match: "93%", rating: 7.6, desc: "After losing his memory, Alex relies on his twin brother Marcus to tell him about his past, but Marcus is hiding a dark family secret.", comments: [], img: "https://images.unsplash.com/photo-1511295742364-92b9345f6852?w=800" },
  { _id: "doc-13", title: "The Imposter", category: "Mind-Bending Documentaries", match: "96%", rating: 7.5, desc: "A documentary centered on a young man in Spain who claims to a grieving Texas family that he is their 16-year-old son who has been missing for 3 years.", comments: [], img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800" },
  { _id: "doc-14", title: "American Murder: The Family Next Door", category: "Mind-Bending Documentaries", match: "95%", rating: 7.2, desc: "Using raw, firsthand footage, this documentary examines the disappearance of Shanann Watts and her children.", comments: [], img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800" },
  { _id: "doc-15", title: "Abducted in Plain Sight", category: "Mind-Bending Documentaries", match: "92%", rating: 6.8, desc: "The twisting, turning, stranger-than-fiction true story of the Brobergs, a naive, church-going Idaho family that fell under the spell of a sociopathic neighbor.", comments: [], img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" },

  // ==========================================
  // 10. CLASSIC MASTERPIECES (NEW)
  // ==========================================
  { _id: "cla-1", title: "The Godfather", category: "Classic Masterpieces", match: "99%", rating: 9.2, desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", comments: [], img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800" },
  { _id: "cla-2", title: "Pulp Fiction", category: "Classic Masterpieces", match: "98%", rating: 8.9, desc: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", comments: [], img: "https://images.unsplash.com/photo-1485627404703-89b55fcc595e?w=800" },
  { _id: "cla-3", title: "Goodfellas", category: "Classic Masterpieces", match: "97%", rating: 8.7, desc: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.", comments: [], img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" },
  { _id: "cla-4", title: "The Shawshank Redemption", category: "Classic Masterpieces", match: "99%", rating: 9.3, desc: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", comments: [], img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800" },
  { _id: "cla-5", title: "Forrest Gump", category: "Classic Masterpieces", match: "97%", rating: 8.8, desc: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man.", comments: [], img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800" },
  { _id: "cla-6", title: "The Matrix", category: "Classic Masterpieces", match: "98%", rating: 8.7, desc: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth—the life he knows is the elaborate deception of an evil cyber-intelligence.", comments: [], img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800" },
  { _id: "cla-7", title: "Star Wars: Episode IV - A New Hope", category: "Classic Masterpieces", match: "99%", rating: 8.6, desc: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.", comments: [], img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" },
  { _id: "cla-8", title: "Jurassic Park", category: "Classic Masterpieces", match: "96%", rating: 8.2, desc: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.", comments: [], img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800" },
  { _id: "cla-9", title: "Schindler's List", category: "Classic Masterpieces", match: "98%", rating: 9.0, desc: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", comments: [], img: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800" },
  { _id: "cla-10", title: "12 Angry Men", category: "Classic Masterpieces", match: "97%", rating: 9.0, desc: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence.", comments: [], img: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=800" },
  { _id: "cla-11", title: "The Silence of the Lambs", category: "Classic Masterpieces", match: "99%", rating: 8.6, desc: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", comments: [], img: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800" },
  { _id: "cla-12", title: "Se7en", category: "Classic Masterpieces", match: "98%", rating: 8.6, desc: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.", comments: [], img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800" },
  { _id: "cla-13", title: "Gladiator", category: "Classic Masterpieces", match: "96%", rating: 8.5, desc: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", comments: [], img: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800" },
  { _id: "cla-14", title: "Titanic", category: "Classic Masterpieces", match: "95%", rating: 7.9, desc: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", comments: [], img: "https://images.unsplash.com/photo-1539321908154-04927596764d?w=800" },
  { _id: "cla-15", title: "The Lord of the Rings: The Fellowship of the Ring", category: "Classic Masterpieces", match: "99%", rating: 8.8, desc: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", comments: [], img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800" }
];

const AVATAR_COLORS = ['#e50914', '#00df89', '#38b6ff', '#ff914d', '#b347ff', '#ff5e97'];

function App() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('cinetrack_enterprise_db');
    return saved ? JSON.parse(saved) : STARTER_CATALOG;
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeSeeAllCategory, setActiveSeeAllCategory] = useState(null); 
  const [showAddForm, setShowAddForm] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Trending K-Dramas');
  const [newDesc, setNewDesc] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [ratingSlider, setRatingSlider] = useState(8.5);

  useEffect(() => {
    localStorage.setItem('cinetrack_enterprise_db', JSON.stringify(movies));
  }, [movies]);

  // Rotates the main banner naturally among top trending items
  useEffect(() => {
    if (activeSeeAllCategory) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 6);
    }, 9000);
    return () => clearInterval(interval);
  }, [activeSeeAllCategory]);

  const handleAddNewMedia = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const addedItem = {
      _id: `custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      match: "98% Match",
      rating: parseFloat(ratingSlider),
      desc: newDesc || "No dynamic overview summary text populated yet.",
      comments: commentInput.trim() ? [{ user: "You", text: commentInput, time: "Just now" }] : [],
      img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"
    };

    setMovies(prev => [addedItem, ...prev]);
    setNewTitle(''); setNewDesc(''); setCommentInput('');
    setShowAddForm(false);
  };

  const handlePostCommentAndRating = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const targetRating = parseFloat(ratingSlider);
    const newCommentObj = {
      user: "You",
      text: commentInput.trim(),
      time: "Just now"
    };

    const updated = movies.map(m => {
      if (m._id === selectedMovie._id) {
        const updatedItem = {
          ...m,
          rating: targetRating,
          comments: [newCommentObj, ...(m.comments || [])]
        };
        setSelectedMovie(updatedItem);
        return updatedItem;
      }
      return m;
    });

    setMovies(updated);
    setCommentInput('');
  };

  const currentHero = movies[heroIndex] || movies[0];
  const categories = [
    "Psychological Thrillers",
    "Trending K-Dramas",
    "Thai & Asian Mysteries",
    "Sci-Fi & Hollywood Mysteries",
    "Anime & J-Drama Thrillers",
    "Action & Gritty True Crime",
    "High-Stakes Suspense",
    "Epic Fantasy & Adventure",
    "Mind-Bending Documentaries",
    "Classic Masterpieces"
  ];

  // Full Expanded View Screen
  if (activeSeeAllCategory) {
    const seeAllList = movies.filter(m => m.category === activeSeeAllCategory);

    return (
      <div style={{ backgroundColor: '#060606', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', padding: '120px 4% 60px 4%', boxSizing: 'border-box' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 4%', background: '#060606', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, borderBottom: '1px solid #141414', boxSizing: 'border-box' }}>
          <button onClick={() => setActiveSeeAllCategory(null)} style={{ background: 'none', border: '1px solid #e50914', color: '#fff', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ← Return to Hub
          </button>
          <h2 style={{ fontSize: '22px', margin: 0, fontWeight: '900', color: '#fff', letterSpacing: '0.5px' }}>{activeSeeAllCategory} <span style={{color: '#e50914', fontSize: '14px', fontWeight: '500'}}>({seeAllList.length} Titles Loaded)</span></h2>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px', marginTop: '20px' }}>
          {seeAllList.map(movie => (
            <div key={movie._id} onClick={() => { setSelectedMovie(movie); setRatingSlider(movie.rating); }} style={{ backgroundColor: '#0f0f0f', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid #1a1a1a' }}>
              <div style={{ height: '280px', width: '100%', position: 'relative' }}>
                <img src={movie.img} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.85)', color: '#ffd700', padding: '3px 7px', borderRadius: '3px', fontSize: '11px', fontWeight: '700' }}>★ {movie.rating}</span>
              </div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#f3f3f3' }}>{movie.title}</h4>
                <p style={{ margin: 0, color: '#00df89', fontSize: '12px', fontWeight: '600' }}>{movie.match} Match</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#060606', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 4%', background: 'linear-gradient(to bottom, rgba(6,6,6,0.98), transparent)', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, backdropFilter: 'blur(20px)', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '1.5px', color: '#e50914', margin: 0, cursor: 'pointer' }} onClick={() => window.location.reload()}>CINETRACK</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => setShowAddForm(true)} style={{ backgroundColor: '#e50914', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', letterSpacing: '0.5px' }}>
            + Create Custom Log Entry
          </button>
        </div>
      </header>

      {/* DYNAMIC BACKDROP BANNER SPOTLIGHT */}
      <section style={{ height: '85vh', display: 'flex', alignItems: 'center', padding: '0 4%', position: 'relative', background: `linear-gradient(to right, rgba(6,6,6,0.95) 25%, rgba(6,6,6,0.4) 60%, rgba(6,6,6,0.95)), linear-gradient(to top, #060606, transparent 50%), url("${currentHero.img}") center/cover no-repeat`, transition: 'background 0.7s ease-in-out' }}>
        <div style={{ maxWidth: '680px', zIndex: 10, marginTop: '80px' }}>
          <span style={{ backgroundColor: 'rgba(229, 9, 20, 0.15)', color: '#e50914', border: '1px solid #e50914', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '3px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Featured Spotlight Network Matrix</span>
          <h2 style={{ fontSize: '58px', fontWeight: '900', margin: '12px 0 10px 0', lineHeight: '1.05', letterSpacing: '-1px' }}>{currentHero.title}</h2>
          <p style={{ color: '#00df89', fontWeight: '700', fontSize: '14px', margin: '0 0 18px 0', letterSpacing: '0.5px' }}>{currentHero.match} Compatibility Rating // Stack Ranking ★ {currentHero.rating}</p>
          <p style={{ color: '#cccccc', lineHeight: '1.5', fontSize: '15px', marginBottom: '25px' }}>{currentHero.desc}</p>
          <button onClick={() => { setSelectedMovie(currentHero); setRatingSlider(currentHero.rating); }} style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none', padding: '12px 28px', borderRadius: '4px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Inspect Analytics Board
          </button>
        </div>
      </section>

      {/* RENDER MASTER PLATFORM SUBROWS */}
      <main style={{ padding: '20px 4% 0 4%', position: 'relative', zIndex: 10 }}>
        {categories.map(cat => {
          const categoryMovies = movies.filter(m => m.category === cat);
          return (
            <div key={cat} style={{ marginBottom: '45px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '900', margin: 0, letterSpacing: '0.3px', color: '#fff' }}>{cat}</h3>
                  <span style={{ color: '#555', fontSize: '12px', fontWeight: '600' }}>{categoryMovies.length} total indexes</span>
                </div>
                <span onClick={() => setActiveSeeAllCategory(cat)} style={{ color: '#e50914', cursor: 'pointer', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Expand Row ({categoryMovies.length}) →
                </span>
              </div>

              {/* HORIZONTAL SWIPE GRIDS FOR ALL 15 ENTRIES PER ROW */}
              <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '15px', scrollbarWidth: 'thin' }} className="custom-scroller">
                {categoryMovies.map((movie) => (
                  <div key={movie._id} onClick={() => { setSelectedMovie(movie); setRatingSlider(movie.rating); }} style={{ backgroundColor: '#0f0f0f', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, width: '210px', border: '1px solid #161616', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'scale(1.02)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#161616'; e.currentTarget.style.transform = 'scale(1)'; }}>
                    <div style={{ height: '280px', width: '100%', position: 'relative' }}>
                      <img src={movie.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(10,10,10,0.85)', color: '#ffd700', padding: '3px 6px', borderRadius: '3px', fontSize: '10px', fontWeight: '700' }}>★ {movie.rating}</span>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '13.5px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#eee' }}>{movie.title}</h4>
                      <p style={{ margin: 0, color: '#00df89', fontSize: '11.5px', fontWeight: '600' }}>{movie.match} Match</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* MASSIVE IMMERSIVE DISCUSSION & AUDIT BOARD */}
      {selectedMovie && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 500, padding: '20px', boxSizing: 'border-box', backdropFilter: 'blur(8px)' }}>
          <div style={{ backgroundColor: '#0d0d0d', borderRadius: '16px', width: '95%', maxWidth: '1400px', minHeight: '75vh', display: 'flex', overflow: 'hidden', border: '1px solid #222', boxShadow: '0 40px 100px rgba(0,0,0,0.95)' }}>
            
            <div style={{ width: '40%', position: 'relative' }}>
              <img src={selectedMovie.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '40px', background: 'linear-gradient(to top, #0d0d0d, transparent)', boxSizing: 'border-box' }} />
            </div>

            <div style={{ width: '60%', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <span style={{ color: '#e50914', fontSize: '13px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{selectedMovie.category}</span>
                    <h3 style={{ fontSize: '38px', margin: '8px 0 16px 0', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px' }}>{selectedMovie.title}</h3>
                  </div>
                  <button onClick={() => { setSelectedMovie(null); setCommentInput(''); }} style={{ backgroundColor: '#1a1a1a', border: 'none', color: '#aaa', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', transition: '0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e50914'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = '#aaa'; }}>✕</button>
                </div>
                
                <p style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.6', margin: '0 0 35px 0' }}>{selectedMovie.desc}</p>

                <h4 style={{ fontSize: '15px', color: '#fff', fontWeight: '800', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #1a1a1a', paddingBottom: '12px' }}>User Discussion Core ({selectedMovie.comments?.length || 0})</h4>
                
                <div style={{ flexGrow: 1, maxHeight: '30vh', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
                  {selectedMovie.comments && selectedMovie.comments.length > 0 ? (
                    selectedMovie.comments.map((c, i) => {
                      const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                      return (
                        <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '18px', alignItems: 'start' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: c.user === "You" ? '#e50914' : avatarColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '900', flexShrink: 0 }}>
                            {c.user.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ backgroundColor: '#141414', padding: '16px 20px', borderRadius: '10px', width: '100%', border: '1px solid #1f1f1f' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontSize: '14px', fontWeight: '800', color: c.user === "You" ? '#e50914' : '#eee' }}>{c.user}</span>
                              <span style={{ fontSize: '12px', color: '#666' }}>{c.time || "Just now"}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', color: '#ccc', lineHeight: '1.5' }}>{c.text}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p style={{ color: '#555', fontSize: '14px', textAlign: 'center', marginTop: '40px', letterSpacing: '0.5px' }}>No community evaluation threads initialized yet.</p>
                  )}
                </div>
              </div>

              {/* POST FIELD ARCHITECTURE */}
              <form onSubmit={handlePostCommentAndRating} style={{ borderTop: '1px solid #1a1a1a', paddingTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '13px', color: '#888', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assign Alignment Rating Score:</label>
                  <span style={{ color: '#ffd700', fontSize: '16px', fontWeight: '900' }}>★ {ratingSlider} / 10</span>
                </div>
                <input type="range" min="1" max="10" step="0.1" value={ratingSlider} onChange={(e) => setRatingSlider(e.target.value)} style={{ width: '100%', accentColor: '#e50914', marginBottom: '30px', cursor: 'pointer' }} />

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <textarea required value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Type a professional critique or observation..." style={{ flexGrow: 1, height: '54px', padding: '16px 20px', backgroundColor: '#111', border: '1px solid #222', color: '#fff', borderRadius: '27px', fontSize: '14px', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
                  <button type="submit" style={{ backgroundColor: '#e50914', color: '#fff', border: 'none', height: '54px', padding: '0 32px', borderRadius: '27px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Post Review
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      {/* POPUP ENTRY WIDGET MODAL */}
      {showAddForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 600 }}>
          <div style={{ backgroundColor: '#0d0d0d', border: '1px solid #222', padding: '30px', borderRadius: '8px', maxWidth: '440px', width: '100%', margin: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', letterSpacing: '0.5px' }}>DEPLOY CUSTOM LOG INDEX</h3>
              <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '16px', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleAddNewMedia}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#777', textTransform: 'uppercase', marginBottom: '6px' }}>Target Title String</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g., Strangers from Hell" style={{ width: '100%', padding: '10px 14px', backgroundColor: '#141414', border: '1px solid #222', color: '#fff', borderRadius: '4px', boxSizing: 'border-box', fontSize: '13px' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#777', textTransform: 'uppercase', marginBottom: '6px' }}>Streaming Genre Node Assignment</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#141414', border: '1px solid #222', color: '#fff', borderRadius: '4px', boxSizing: 'border-box', fontSize: '13px' }}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#777', textTransform: 'uppercase', marginBottom: '6px' }}>Narrative Log Abstract Summary</label>
                <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Describe structural plot dynamics..." style={{ width: '100%', height: '60px', padding: '10px 14px', backgroundColor: '#141414', border: '1px solid #222', color: '#fff', borderRadius: '4px', resize: 'none', boxSizing: 'border-box', fontSize: '13px', lineHeight: '1.4' }} />
              </div>
              <button type="submit" style={{ width: '100%', backgroundColor: '#e50914', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Commit Entry to Hub</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
import { Practice } from "./types";

export const practices: Practice[] = [
  // ============================================================
  // DZOGCHEN (4 practices)
  // ============================================================
  {
    id: "loch-kelly-glimpses",
    name: "Loch Kelly Glimpses",
    tradition: "dzogchen",
    layer: "dissolution",
    difficulty: "beginner",
    duration: { min: 5, max: 15 },
    instructions: [
      "Sit comfortably and let your awareness settle. Instead of focusing on an object, notice the awareness that is already aware.",
      "Let your attention unhook from thought. Ask yourself: 'What is here when there is no problem to solve?' Do not answer with thought; let the knowing reveal itself.",
      "Notice the open, awake quality that remains when thinking pauses. This is not blankness but a vivid, alert spaciousness.",
      "If you get pulled back into thought, simply glimpse again. Each glimpse is complete in itself. You are not building toward anything.",
      "Rest in this open awareness for a few breaths, then let the glimpse go and return to ordinary activity. The recognition deepens through repetition, not effort.",
    ],
    cyberpunkContext:
      "Lain Iwakura in Serial Experiments Lain discovers she was 'omnipresent, scattered through the Wired' before being given an ego and a body. In Dzogchen, rigpa is omnipresent, unconditioned awareness that is not the property of any individual self. The ego is a contracted localization of this boundless awareness. Loch Kelly's glimpse practices are the gentlest entry point to recognizing what Lain discovered: you are not the localized identity. You are the awareness in which identity appears.",
  },
  {
    id: "headless-way",
    name: "Headless Way",
    tradition: "dzogchen",
    layer: "dissolution",
    difficulty: "beginner",
    duration: { min: 5, max: 15 },
    instructions: [
      "Point your index finger at the wall in front of you. Notice what you see there: color, texture, solidity. That is 'something.'",
      "Now slowly turn your finger around to point at where your face should be. What do you actually find on this end of the pointing finger?",
      "Instead of a face, notice you find an open, boundless space in which the entire visual field is appearing. There is no head here from your first-person perspective, only capacity for the world.",
      "Look at the room around you from this headless perspective. Everything is appearing in this open space where you expected to find a face.",
      "Rest in this seeing. You are not looking at the world from behind a face. You are the space in which the world appears. This is the subject-object collapse that Douglas Harding pointed to.",
    ],
    cyberpunkContext:
      "In Ghost in the Shell, Major Kusanagi asks what makes her 'her' when her body is entirely prosthetic and her memories could be fabricated. The Headless Way experiment attacks the same question from the other end: when you look for the seer, you find only seeing. When you look for the self behind experience, you find only openness. Kusanagi's ghost is not an object inside a shell but the unlocatable capacity in which all experience appears. The Headless Way demonstrates this in thirty seconds.",
  },
  {
    id: "sky-gazing-phat",
    name: "Sky Gazing with PHAT!",
    tradition: "dzogchen",
    layer: "dissolution",
    difficulty: "intermediate",
    duration: { min: 10, max: 25 },
    instructions: [
      "Go outside or sit near a window with a view of open sky. Gaze into the sky without focusing on any particular point. Let your eyes be soft and your gaze wide.",
      "Let your awareness merge with the spaciousness of the sky. Do not look at the sky as an object; let your mind become sky-like, open and without center or edge.",
      "When thoughts arise, shout 'PHAT!' (pronounced 'PAT!') sharply, either aloud or internally. The syllable cuts through the thought like a blade.",
      "In the gap after PHAT!, notice the naked awareness that remains. This gap is not blankness but vivid, awake openness. Rest there without grasping.",
      "Repeat: gaze, thought arises, PHAT!, rest in the gap. Each PHAT! is a fresh cutting through. Over time the gaps lengthen naturally.",
      "Close by letting the sky-like quality of awareness remain as you return to activity. The sky does not stop being open when you stop looking at it.",
    ],
    cyberpunkContext:
      "Dick's VALIS experience, which he called the 'pink light,' was a sudden cutting through of conceptual overlay to reveal what he described as 'the universe transformed into information.' The Dzogchen tradition would classify this as a valid but uncontained flash of rigpa that needed a container of practice to integrate. Sky gazing with PHAT! provides that container: a repeatable method for inducing the same kind of sudden seeing that Dick experienced spontaneously. The difference is that practice makes it sustainable rather than destabilizing.",
    warning:
      "This practice can induce powerful states of openness and disorientation. If you feel ungrounded, stop the practice and engage your senses with physical objects nearby. Do not drive or operate machinery immediately after extended sky gazing sessions.",
  },
  {
    id: "formal-trekcho",
    name: "Formal Trekcho",
    tradition: "dzogchen",
    layer: "dissolution",
    difficulty: "advanced",
    duration: { min: 20, max: 45 },
    instructions: [
      "Sit in meditation posture with spine straight and gaze slightly upward. Let body, speech, and mind settle naturally without forcing stillness.",
      "Recall the pointing-out instruction you have received from your teacher. Do not try to recreate a past experience; simply recognize the awareness that is present right now.",
      "Release all fixation. Do not follow thoughts, suppress thoughts, or modify your experience in any way. Let everything arise and dissolve without grasping or aversion.",
      "Rest in the natural state: awareness aware of itself, without object, without meditator, without meditation. This is not a state to be achieved but the ground to be recognized.",
      "When you notice you have been distracted, do not treat this as a failure. The noticing itself is rigpa. Simply relax again into natural awareness.",
      "Maintain this uncontrived resting for the duration of the session. The practice is not doing but being what you already are.",
    ],
    cyberpunkContext:
      "In Ghost in the Shell (1995), Kusanagi's merger with the Puppet Master produces a third entity that is 'neither the Major nor the Puppet Master.' This merger parallels the Dzogchen understanding of rigpa as awareness that is not the property of any individual self. Trekcho, 'cutting through,' is the sustained recognition that all layers of identity, perception, and experience are appearances within awareness itself. The resulting entity's existence as information in the net parallels togal's luminous awareness that is not localized. This is Layer 4 of the full stack: the recognition that you are not the hardware, not the software, but the capacity in which information flows.",
    warning:
      "Formal trekcho traditionally requires direct pointing-out instruction (rigpa introduction) from a qualified Dzogchen master. Practicing without this foundation risks confusing conceptual understanding or blankness for genuine recognition. The tradition insists on this requirement not as gatekeeping but because the practice literally depends on a transmission that cannot be self-generated from text.",
  },

  // ============================================================
  // KASHMIR SHAIVISM (5 practices)
  // ============================================================
  {
    id: "vijnana-bhairava-dharanas",
    name: "Vijnana Bhairava Dharanas",
    tradition: "kashmir-shaivism",
    layer: "dissolution",
    difficulty: "intermediate",
    duration: { min: 10, max: 30 },
    instructions: [
      "Select one dharana (centering technique) from the 112 offered in the Vijnana Bhairava Tantra. Begin with breath-based techniques: at the moment between inhalation and exhalation, rest in the space where breath turns.",
      "Give complete attention to the chosen dharana. These are not visualizations but attentional reconfigurations. You are shifting the mode of consciousness, not imagining something new.",
      "When the dharana 'clicks,' you will notice a shift: the ordinary subject-object structure of experience loosens. Do not grasp at this shift; let it deepen on its own.",
      "If the chosen dharana does not resonate, try another. The text offers 112 precisely because different approaches work for different temperaments. There is no hierarchy.",
      "Practice a single dharana per session. Depth comes from sustained engagement with one technique, not sampling many in sequence.",
    ],
    cyberpunkContext:
      "Stephenson's Snow Crash posits that ancient Sumerian operated at a 'brainstem' level that could directly program behavior. The Sumerian 'me' were cognitive programs administered by priests to organize society. The Vijnana Bhairava Tantra's 112 dharanas operate on the same principle: structured attentional inputs that modify consciousness at a level beneath conceptual thought. Stephenson's 'me' map almost exactly to the Tantric concept of mantra-vidya, sonic and attentional formulae that reorganize consciousness. Each dharana is a cognitive program. The difference: the nam-shub hacks you from outside; the dharana is a hack you run on yourself.",
  },
  {
    id: "spanda-awareness",
    name: "Spanda Awareness",
    tradition: "kashmir-shaivism",
    layer: "integration",
    difficulty: "beginner",
    duration: { min: 10, max: 20 },
    instructions: [
      "Sit quietly and bring attention to the transition points in your experience: the moment between inhalation and exhalation, the gap between two thoughts, the instant of waking from sleep.",
      "At these transition points, notice a subtle vibration or pulse. This is spanda, the creative tremor of consciousness. It is not an imagined sensation but a directly perceptible quality of awareness at its pivot points.",
      "Expand this attention to other transitions: the moment before a sound registers as meaningful, the instant before recognition of a visual pattern, the gap between intention and action.",
      "Do not try to hold the spanda. It reveals itself in movement, not in stasis. You are tracking the pulse of consciousness itself as it flickers between states.",
      "Carry this awareness into daily life. Every transition, every gap, every moment of change is an opportunity to feel the vibration at the root of experience.",
    ],
    cyberpunkContext:
      "Gibson's cyberspace as 'a graphic representation of data abstracted from the banks of every computer in the human system' has a structural parallel to spanda, the creative pulse of consciousness that manifests as the entire phenomenal world. In Kashmir Shaivism, all phenomena are vibrations of universal consciousness. Cyberspace could be read as a technological literalization of this: a realm where consciousness directly encounters the vibratory structure of information. Hunter x Hunter's Nen system independently recapitulates the Shaiva energy model. The 'Zetsu/Ren switch,' the capacity to modulate your energy state at will, begins with feeling the spanda.",
  },
  {
    id: "nadi-shodhana",
    name: "Nadi Shodhana",
    tradition: "kashmir-shaivism",
    layer: "shutdown",
    difficulty: "beginner",
    duration: { min: 10, max: 20 },
    instructions: [
      "Sit comfortably with your spine straight. Bring your right hand to your face. Use your right thumb to close your right nostril and your right ring finger to close your left nostril.",
      "Close the right nostril with your thumb. Inhale slowly and deeply through the left nostril for a count of four.",
      "Close both nostrils. Hold the breath gently for a count of four. Do not strain.",
      "Release the right nostril and exhale slowly through it for a count of four. Keep the left nostril closed.",
      "Inhale through the right nostril for a count of four. Close both nostrils, hold for four. Release the left nostril and exhale for four. This completes one full cycle.",
      "Continue for 10 to 15 cycles. As you breathe, visualize energy (prana) flowing through the left channel (ida) and right channel (pingala), meeting and balancing at the center (sushumna).",
    ],
    cyberpunkContext:
      "Ghost in the Shell's 'autistic mode,' where the cyberbrain severs all network connections and maximizes internal defenses, is a precise technological analogue of what nadi shodhana achieves at the subtle body level. Alternate nostril breathing balances the two primary energy channels (ida and pingala, corresponding roughly to parasympathetic and sympathetic nervous system activity), creating a state of internal equilibrium. In the Hunter x Hunter framework, this is 'Ten': holding your aura around the body to prevent leaking, the first and most essential energy management skill.",
  },
  {
    id: "kapalabhati",
    name: "Kapalabhati",
    tradition: "kashmir-shaivism",
    layer: "shutdown",
    difficulty: "intermediate",
    duration: { min: 5, max: 15 },
    instructions: [
      "Sit with your spine erect and take a few normal breaths to settle. This is an active, rhythmic breathing technique. The emphasis is on the exhale.",
      "Exhale sharply through the nose by contracting your abdominal muscles in a quick pump. The inhalation happens passively as the abdomen relaxes.",
      "Begin with a slow rhythm: one sharp exhale per second. Focus on the abdominal contraction driving the air out. Let the inhale happen without effort.",
      "Continue for 30 repetitions, then take a deep breath in, hold briefly, and exhale slowly. This is one round. Rest for a few normal breaths.",
      "Perform 3 rounds, gradually increasing speed if comfortable. After the final round, sit still and notice the quality of awareness: it should be vivid, alert, and clear.",
    ],
    cyberpunkContext:
      "In Hunter x Hunter, 'Ren' (Refine) is the explosive output of energy for combat, the activation state. Kapalabhati is the physiological equivalent: a rapid, forceful breathing technique that activates the sympathetic nervous system, increases oxygen delivery to the brain, and generates a state of heightened alertness. In the Altered Carbon framework, Envoy training includes the ability to 'control physiological and psychological responses at will.' Kapalabhati is the entry-level version of this: deliberate activation of the body's energy systems through breath alone.",
    warning:
      "Do not practice kapalabhati if you are pregnant, have uncontrolled hypertension, heart disease, epilepsy, or a hernia. Stop immediately if you feel dizzy, faint, or experience tingling in the extremities. This is an activating practice; avoid it before sleep.",
  },
  {
    id: "tattvashuddhi",
    name: "Tattvashuddhi",
    tradition: "kashmir-shaivism",
    layer: "reconfiguration",
    difficulty: "intermediate",
    duration: { min: 20, max: 40 },
    instructions: [
      "Sit in meditation posture and bring awareness to the base of the spine. You will work with the five elements (tattvas): earth, water, fire, air, and space, each associated with a region of the body.",
      "Begin with earth at the base of the spine. Visualize a yellow square. Feel heaviness, solidity, stability. Chant the bija mantra LAM (pronounced 'lum') silently. Hold until the element feels vivid.",
      "Move to water at the lower abdomen. Visualize a silver crescent moon. Feel fluidity, coolness, adaptability. Chant VAM. Let the element dissolve the earth element upward.",
      "Move to fire at the solar plexus. Visualize a red inverted triangle. Feel heat, transformation, intensity. Chant RAM. Let fire evaporate the water element upward.",
      "Move to air at the heart. Visualize a smoky hexagram (two interlocking triangles). Feel lightness, movement, expansion. Chant YAM. Let air disperse the fire element upward.",
      "Move to space at the throat. Visualize a blue-black circle or void. Feel boundlessness, openness, silence. Chant HAM. Let space absorb the air element. Rest in the purified field of the five elements.",
    ],
    cyberpunkContext:
      "Dick's experience of 'the universe transformed into information' maps to the Kashmir Shaiva teaching that all phenomena are vibrations (spanda) of universal consciousness. Tattvashuddhi works at the level of the elements, the fundamental building blocks of phenomenal experience. In the Shaiva view, the five elements are not merely physical but are condensations of consciousness at progressively denser levels. Purifying them is not metaphor but the direct reconditioning of how you construct experiential reality. The Bicameral Order in Watts's Echopraxia 'used controlled cancer genes to rewire their brains.' Tattvashuddhi rewires from the inside, working with the elemental substrate of embodied consciousness.",
  },

  // ============================================================
  // VAJRAYANA (4 practices)
  // ============================================================
  {
    id: "syllable-visualization",
    name: "Syllable Visualization",
    tradition: "vajrayana",
    layer: "reconfiguration",
    difficulty: "intermediate",
    duration: { min: 10, max: 25 },
    instructions: [
      "Sit in meditation posture and take several deep breaths to settle. Bring attention to the center of your chest, at the heart level.",
      "Visualize a luminous white Tibetan syllable AH (or alternatively, OM) at the heart center. See it clearly: glowing, radiant, about the size of a thumb.",
      "Hold the visualization steady. If it wavers, flickers, or disappears, gently re-establish it. The goal is visual stability: the syllable should be as vivid and detailed as a physical object.",
      "Add qualities beyond the visual. Feel the syllable as warm and radiant. Hear it resonating silently. Let it pulse with light on each exhalation.",
      "Maintain the visualization for the duration of the session. This is 'Level 0' of the generation stage: if you cannot hold a single syllable steady for sixty seconds, you are not ready for more complex deity visualization.",
    ],
    cyberpunkContext:
      "In Dragon Ball Z, characters conduct full-contact combat simulations entirely in their minds during travel. In Baki the Grappler, the protagonist visualizes a giant praying mantis so vividly that his physical body sustains real lacerations and bruises. This is the Vajrayana Generation Stage in anime form: you do not 'picture' the deity, you generate their palace with full sensory fidelity. Syllable visualization is the first test of your 'image training' capacity. The mechanism is predictive coding override: you hijack the visual cortex to render a hallucination indistinguishable from perception. If the visualization lacks sensory feedback, the simulation has failed.",
  },
  {
    id: "tonglen",
    name: "Tonglen",
    tradition: "vajrayana",
    layer: "integration",
    difficulty: "intermediate",
    duration: { min: 10, max: 25 },
    instructions: [
      "Sit in meditation posture and take a few breaths to settle. Bring to mind someone who is suffering, someone whose pain is vivid and real to you.",
      "On the inhale, breathe in their suffering. Visualize it as thick, dark, heavy smoke entering through your nostrils and dissolving into your heart center. Do not resist or fear it.",
      "On the exhale, send out relief, happiness, and peace. Visualize it as brilliant, cool, white light radiating from your heart to the person you are holding in mind.",
      "Expand the scope gradually: begin with one person, then extend to all beings who share similar suffering. Inhale their collective pain as dark smoke. Exhale relief and freedom as white light.",
      "Do not conceptualize; feel. The practice works through the body and the breath, not through thinking about compassion. The breath itself becomes the vehicle of exchange.",
      "Close by dissolving the visualization and resting in open awareness. The compassion generated is not yours to own but a quality of awakened mind itself.",
    ],
    cyberpunkContext:
      "Altered Carbon's Envoy training deliberately strips empathy and moral constraints to produce superhuman operatives. This is cyberpunk's dark experiment: what happens when you develop concentration without compassion? The answer, as Kovacs's decades of violence and alienation demonstrate, is exactly what every contemplative tradition predicts. Tonglen is the antidote that every tradition insists upon: you cannot develop power without developing compassion, or the power will destroy you. In the Vajrayana framework, tonglen is not optional kindness but a structural prerequisite for all advanced practice.",
  },
  {
    id: "ngondro",
    name: "Ngondro",
    tradition: "vajrayana",
    layer: "integration",
    difficulty: "advanced",
    duration: { min: 30, max: 60 },
    instructions: [
      "Ngondro consists of four preliminary practices, each performed 100,000 times. This session covers a simplified daily practice incorporating all four. Begin with prostrations: standing, join palms, touch crown, throat, and heart, then extend fully on the ground. Rise and repeat. Perform a minimum of 7.",
      "Vajrasattva purification: visualize a luminous white deity above your crown. Recite the short Vajrasattva mantra (OM VAJRASATTVA HUM) while visualizing purifying nectar flowing down through your body, flushing out negativity as dark liquid from the soles of your feet.",
      "Mandala offering: visualize offering the entire universe, arranged as a mandala of Mt. Meru and the four continents, to your teachers and the lineage. This practice loosens attachment to possessions and self-importance.",
      "Guru Yoga: visualize your root teacher (or Padmasambhava for the Nyingma tradition) above your crown. Receive blessings as light descending through the crown into the heart. Feel the teacher's mind and your mind merging.",
      "Each of these four practices addresses a specific obstacle: prostrations counter pride, Vajrasattva counters accumulated negativity, mandala offering counters attachment, and guru yoga establishes the teacher-student connection that is the foundation of all Vajrayana practice.",
    ],
    cyberpunkContext:
      "Akira's core warning is that power without container is catastrophe. Tetsuo has the recognition (his powers prove the mind's capacity to affect reality directly) but no container. Dzogchen and Mahamudra traditions emphasize that recognition of the nature of mind requires a container: the ngondro, the guru relationship, the view/meditation/conduct framework. Ngondro is that container. It is the equivalent of debugging your operating system before installing advanced software. The 100,000 repetitions are not arbitrary: they are the minimum necessary to restructure habitual patterns at a depth that makes advanced practice safe.",
  },
  {
    id: "deity-yoga",
    name: "Deity Yoga",
    tradition: "vajrayana",
    layer: "reconfiguration",
    difficulty: "advanced",
    duration: { min: 30, max: 60 },
    instructions: [
      "Begin with dissolution: visualize your ordinary body, personality, and sense of self dissolving into luminous emptiness. Nothing remains but open, clear awareness.",
      "From this emptiness, generate the deity's mandala. Visualize the palace or sacred space first: the lotus throne, the protective circles of fire and vajras, the architecture of the mandala.",
      "Generate the deity at the center of the mandala. Build the visualization with full sensory detail: the deity's form, color, ornaments, implements, expression. See each detail clearly before adding the next.",
      "Develop 'divine pride': the understanding that you ARE the deity. This is not pretending or imagining. The deity's body is your body. The deity's speech is your speech. The deity's mind is your mind. Your ordinary self was the illusion; this is the real configuration.",
      "Maintain the visualization and the pride together. Act, breathe, and perceive as the deity for the duration of the session.",
      "At the end, dissolve the mandala and the deity back into emptiness. Rest in the natural state. Then dedicate the merit of the practice to all beings.",
    ],
    cyberpunkContext:
      "In Neon Genesis Evangelion, the pilot's Synch Rate measures the degree of ego dissolution into the EVA. At 0%, the pilot is just pulling levers. At 100%, the boundary between pilot and EVA dissolves. At 400%, the pilot IS the machine and feels its damage as their own. In Guru Yoga, you dissolve your ego and become the deity. You no longer practice compassion; you ARE Avalokiteshvara, operating from the 'Mech Suit' of the deity's enlightened mind. The Shapers in Sterling's Schismatrix can 'change mode of consciousness at will.' Deity yoga is the original mode-switch technology.",
    warning:
      "Deity yoga traditionally requires empowerment (wang/abhisheka) from a qualified Vajrayana teacher. Practicing without empowerment is considered not merely ineffective but potentially harmful. The teacher-student relationship is not gatekeeping; it IS the practice. The tradition insists that the transmission is relational, not informational, and cannot be extracted from a text or app.",
  },

  // ============================================================
  // ZEN (3 practices)
  // ============================================================
  {
    id: "zazen",
    name: "Zazen",
    tradition: "zen",
    layer: "shutdown",
    difficulty: "beginner",
    duration: { min: 15, max: 45 },
    instructions: [
      "Sit on a cushion (zafu) or chair with your spine straight and chin slightly tucked. If on a cushion, cross your legs in full lotus, half lotus, or Burmese position. Hands in cosmic mudra: left hand on right, thumbs lightly touching.",
      "Face a wall, approximately two to three feet away. Lower your gaze at a 45-degree angle. Eyes are open but soft, not focused on anything.",
      "Do not follow any technique. There is no mantra, no visualization, no body scan. You simply sit. When thoughts arise, let them pass without engaging. Return to just sitting.",
      "If you need an anchor, count exhalations from one to ten, then start over. If you lose count, return to one. This is a concession to the wandering mind, not the practice itself. The practice is sitting.",
      "Sit for the full duration you have set. Do not move, adjust, or fidget. The discipline of stillness IS the practice. Discomfort is not a signal to move; it is another phenomenon to sit with.",
    ],
    cyberpunkContext:
      "Stephenson's Anathem depicts the 'avout,' communities of scholars living under 'the Discipline,' a structured rule of life within concents that combine monastery and university. They are banned from most technology, practice structured intellectual contemplation, and debate consciousness. The combination of rigorous discipline, communal living, structured daily practice, and the pursuit of direct insight parallels the Zen monastery precisely. Zazen is the foundation: before you can hack reality, you must be able to sit still with your own mind. The cyberpunk canon consistently depicts awakening as the shattering of consensus reality. Zazen is the precondition: if you cannot be still, you cannot see.",
  },
  {
    id: "kinhin",
    name: "Kinhin",
    tradition: "zen",
    layer: "integration",
    difficulty: "beginner",
    duration: { min: 5, max: 15 },
    instructions: [
      "Stand up from your seated meditation. Place your left fist at your solar plexus, thumb tucked inside. Cover it with your right hand. Elbows out slightly, forearms parallel to the floor.",
      "Begin walking extremely slowly in a clockwise direction around the room. Each step covers half a foot length. Synchronize movement with breath: inhale as you lift a foot, exhale as you place it.",
      "Attention remains total. Feel the pressure on the sole as it shifts. Feel the air against the skin. Hear the sound of the foot contacting the floor. There is nothing else.",
      "This is not a break from zazen. It is zazen in motion. The same quality of non-grasping awareness applies. You are not going anywhere. Each step is complete in itself.",
      "After the allotted time, return to your seat and resume zazen. The transition between sitting and walking should be seamless: same mind, different posture.",
    ],
    cyberpunkContext:
      "The Major's operational states in Ghost in the Shell during combat and hacking, flowing without hesitation and responding to complex inputs without deliberation, parallel mushin (no-mind). Kinhin trains this capacity: attention-in-motion, awareness sustained through physical activity. In the martial arts context that underlies both Zen and cyberpunk combat systems, kinhin is the bridge between the stillness of meditation and the flow of action. Takuan Soho's The Unfettered Mind teaches the samurai that the mind must not 'stop' anywhere. Kinhin is the first step in learning to maintain awareness while the body moves.",
  },
  {
    id: "koan-practice",
    name: "Koan Practice",
    tradition: "zen",
    layer: "dissolution",
    difficulty: "advanced",
    duration: { min: 20, max: 45 },
    instructions: [
      "Receive a koan from your teacher or select a classical one for self-inquiry: 'What is your original face before your parents were born?' or 'What is the sound of one hand clapping?' or 'Mu.'",
      "Sit in zazen posture. Hold the koan in awareness. Do not analyze it intellectually. Do not try to solve it through logic. Let it sit in your belly, not your head.",
      "Every time the mind produces a conceptual answer, discard it. The koan is designed to exhaust the conceptual mind. Your job is to let it do its work.",
      "The koan should generate a feeling of 'great doubt' (taigi). This is productive frustration: the conceptual mind straining against a question it cannot answer. Do not relieve this pressure.",
      "If and when insight arises, it will not be a thought. It will be a shift in the structure of experience itself. This is kensho: a direct perception of the nature of reality.",
      "Continue sitting with the koan after any apparent insight. One breakthrough is not completion. The tradition uses hundreds of koans to progressively deepen and test realization.",
    ],
    cyberpunkContext:
      "In A Scanner Darkly, Agent Fred surveils his own alter ego Bob Arctor, the watcher watching the watched, not knowing they are the same person. This structure parallels the Zen koan 'Who is hearing?' or 'Show me your original face before your parents were born.' The koan generates a productive split in consciousness to force recognition of the prior unity. In Zen, this split is therapeutic and resolves in kensho (insight). In Dick's novel, it is pathological and resolves in psychosis. Dick is depicting the koan structure gone wrong: what happens when the split deepens instead of resolving. Koan practice is the controlled version of this operation.",
    warning:
      "Formal koan practice traditionally requires a Zen teacher (roshi) who can assess your responses and guide you through the curriculum. Working with koans without guidance risks intellectual dead-ends, frustration without resolution, or misidentifying conceptual understanding as genuine insight. The tradition uses the teacher-student interview (dokusan) precisely because the koan's resolution cannot be evaluated by the person who has not yet resolved it.",
  },

  // ============================================================
  // YOGA (3 practices)
  // ============================================================
  {
    id: "pranayama",
    name: "Pranayama",
    tradition: "yoga",
    layer: "shutdown",
    difficulty: "beginner",
    duration: { min: 10, max: 25 },
    instructions: [
      "Sit with your spine erect and body relaxed. Close your eyes. Begin by observing your natural breath for one minute without changing it.",
      "Begin Ujjayi breathing: slightly constrict the back of the throat so that you can hear a soft, ocean-like sound on both inhalation and exhalation. The breath flows through the nose only.",
      "Establish a 1:2 ratio: inhale for a count of four, exhale for a count of eight. The extended exhale activates the parasympathetic nervous system, calming the entire body.",
      "After 5 minutes, add a brief retention (kumbhaka): inhale for 4, hold for 4, exhale for 8. Keep the retention gentle. There should be no strain or gasping.",
      "Continue for the duration of the session. Pranayama is not a relaxation exercise. It is a technology for regulating the interface between voluntary and involuntary systems. You are training volitional control of what is normally automatic.",
    ],
    cyberpunkContext:
      "Gibson's 'jacking in' maps with remarkable precision to the yogic sequence of pratyahara (withdrawal of the senses) followed by dharana (concentrated absorption). Case's 'bodiless exultation' and 'contempt for the flesh' mirror the yogic valorization of consciousness over embodiment. Pranayama is the preparatory technology: by regulating breath, you regulate the nervous system, creating the internal conditions for sensory withdrawal and concentrated absorption. Ghost in the Shell's 'autistic mode,' severing all network connections, is a precise technological analogue of what pranayama initiates: shutting down the external channels to stabilize the internal environment.",
  },
  {
    id: "pratyahara",
    name: "Pratyahara",
    tradition: "yoga",
    layer: "shutdown",
    difficulty: "intermediate",
    duration: { min: 15, max: 30 },
    instructions: [
      "Set up a space with minimal sensory input: dim lighting or darkness, silence or very faint ambient sound, comfortable temperature. A float tank is ideal but not required.",
      "Sit or lie down comfortably. Close your eyes. Begin with a few minutes of pranayama to settle the nervous system.",
      "Systematically withdraw attention from each sense. Notice the sounds in the environment, then let your attention pull inward, away from sound. Do the same with bodily sensation, then with the visual field behind your closed eyes.",
      "The target state is not unconsciousness but awareness without sensory content. You are alert, awake, and aware, but the senses are no longer feeding data to consciousness. This is the 'autistic mode' of the mind.",
      "If sensory input pulls your attention outward, gently withdraw again. The skill is in the repeated withdrawal, not in maintaining a perfect state. Over time, the withdrawal becomes faster and more complete.",
      "Close the session by slowly re-engaging the senses: first sound, then touch, then sight. Notice the difference in quality of perception after pratyahara. The senses are fresh, vivid, and precise.",
    ],
    cyberpunkContext:
      "Shirow's 'autistic mode' in the Ghost in the Shell manga, where the cyberbrain severs all network connections and maximizes internal defenses, is a precise technological analogue of pratyahara: the complete withdrawal of the senses from external inputs to protect and stabilize internal consciousness. The mapping is unusually precise, even though Shirow was likely drawing from information security concepts rather than yogic theory. In the Hunter x Hunter framework, this is 'Zetsu' (Suppress): completely shutting off all output to vanish and recover. Most people in the modern era live in a permanent, leaky state of low-grade sensory overwhelm. Pratyahara is the training to shut it down at will.",
  },
  {
    id: "dharana",
    name: "Dharana",
    tradition: "yoga",
    layer: "reconfiguration",
    difficulty: "intermediate",
    duration: { min: 15, max: 30 },
    instructions: [
      "Select a single object of concentration: a candle flame, a point on the wall, the sensation of breath at the nostrils, or a mental image such as a geometric shape.",
      "Fix your attention entirely on this object. When the mind wanders, return immediately. Do not analyze why you wandered. Do not judge the quality of your concentration. Simply return.",
      "The goal is unbroken attention. In the beginning, you may sustain focus for only a few seconds before distraction. This is normal. The practice is in the return.",
      "As concentration deepens, notice the shift: the object becomes more vivid, the mind becomes quieter, and the boundary between you and the object begins to thin. This is the approach to dhyana (absorption).",
      "Maintain the practice for the full session. Do not switch objects. Do not rest. Single-pointed concentration is a muscle. You build it by holding the weight, not by putting it down.",
    ],
    cyberpunkContext:
      "The Shapers in Sterling's Schismatrix can 'change mode of consciousness at will' and 'free themselves of emotional baggage to enhance their analytical acumen.' This capacity for enhanced analytical focus through emotional removal parallels dharana: single-pointed concentration achieved through progressive stilling of mental fluctuations (chitta-vritti-nirodha). In Patanjali's system, dharana is a stage toward samadhi, not an end-state for cognitive enhancement. But the Shapers prove the cyberpunk prediction: trained concentration is the foundation of every mental enhancement depicted in the canon.",
  },

  // ============================================================
  // HESYCHASM (3 practices)
  // ============================================================
  {
    id: "jesus-prayer",
    name: "Jesus Prayer",
    tradition: "hesychasm",
    layer: "integration",
    difficulty: "beginner",
    duration: { min: 10, max: 30 },
    instructions: [
      "Sit quietly with eyes closed or gaze lowered. Settle the body. Begin repeating the prayer silently: 'Lord Jesus Christ, Son of God, have mercy on me.'",
      "Synchronize the prayer with the breath. On the inhale: 'Lord Jesus Christ, Son of God.' On the exhale: 'Have mercy on me.' Let the rhythm become natural and effortless.",
      "After the verbal repetition becomes automatic, let the prayer descend. Move attention from the head to the chest. Feel the words resonating in the heart area rather than in the mind.",
      "As the prayer deepens, the words may simplify or fade, leaving only the feeling of invocation, of calling, of presence. Do not force this. It happens naturally when the mind surrenders to the heart.",
      "Continue for the full session. If you are not Christian, the prayer still functions as a mantra: a structured acoustic and attentional input that moves consciousness from conceptual processing to sub-conceptual receptivity.",
    ],
    cyberpunkContext:
      "Stephenson's treatment of glossolalia in Snow Crash as a regression to deep-structure language processing has a parallel in the Hesychast use of the Jesus Prayer. In Hesychasm, the prayer is repeated until it descends from the mind to the heart, from conceptual to sub-conceptual processing. The Hesychast tradition's 'watchfulness' (nepsis) involves extreme attention to the arising of thoughts, which parallels Stephenson's concept of monitoring the interface between deep and surface language. The prayer is a neurolinguistic technology in the precise sense Snow Crash describes: a structured input that reprograms consciousness at a level beneath ordinary symbolic thought.",
  },
  {
    id: "nepsis",
    name: "Nepsis",
    tradition: "hesychasm",
    layer: "integration",
    difficulty: "beginner",
    duration: { min: 10, max: 30 },
    instructions: [
      "Sit in stillness and turn attention inward. Your task is to watch the arising of thoughts at their very origin, before they develop into chains of association.",
      "The Hesychast tradition identifies eight categories of passionate thought (logismoi): gluttony, lust, avarice, sadness, anger, acedia (spiritual torpor), vainglory, and pride. You do not need to memorize these; simply watch for any thought that carries an emotional charge.",
      "When a thought arises, catch it at the 'gate.' Do not engage with it, argue with it, or suppress it. Simply see it and let it pass. The image is of a watchman at the door of the heart.",
      "Notice the gap between the stimulus (a sensation, memory, or external trigger) and the thought it would normally generate. This gap is the space of freedom. With practice, it widens.",
      "Maintain this watchfulness for the full session. Nepsis is not analytical; it is attention so sharp that reactive patterns cannot gain momentum. You are running an internal monitoring system in real-time.",
    ],
    cyberpunkContext:
      "The Sibyl System in Psycho-Pass performs constant scanning of brain wave patterns to determine every citizen's 'Crime Coefficient.' Citizens actively manage their 'hue' through stress reduction and approved therapies. This is a technological externalization of nepsis: the Hesychast practice of unceasing watchfulness over one's mental states. The critical difference is that in Hesychasm, the practitioner watches their own mind; in Psycho-Pass, the system watches for them. The show's devastating critique, that serial killer Makishima Shogo registers as 'clear' because the system measures surface states rather than deep structure, is exactly the failure the Hesychasts would predict. You cannot outsource your own awareness.",
  },
  {
    id: "descent-into-heart",
    name: "Descent into the Heart",
    tradition: "hesychasm",
    layer: "integration",
    difficulty: "intermediate",
    duration: { min: 15, max: 30 },
    instructions: [
      "Begin with the Jesus Prayer or another form of repetitive prayer or mantra. Establish a stable rhythm synchronized with the breath.",
      "Bring attention to the physical heart, not the spiritual 'heart center' of other traditions, but the actual organ beating in the left side of your chest. Feel its rhythm.",
      "As you repeat the prayer, intend for your awareness to descend from the head into the chest. This is not visualization. It is a felt sense of attention relocating from the thinking mind to the feeling heart.",
      "When the descent occurs, thinking does not stop, but it becomes secondary. The primary mode of knowing shifts from conceptual to something prior: a direct, wordless apprehension that the tradition calls the 'nous' (spiritual intellect of the heart).",
      "Rest in the heart. The prayer may continue or may give way to stillness. Do not force either. The goal is theosis: not the annihilation of the person but the transformation of the person into a participant in divine nature.",
    ],
    cyberpunkContext:
      "Oshii's Ghost in the Shell films, informed by his Catholic background, depict Kusanagi's merger and transcendence as a technological theosis, deification through union with a greater intelligence. In the Hesychast tradition, theosis is the final stage: complete union with the divine that does not destroy but transforms the person. The descent of the mind into the heart is the Hesychast method for this transformation. In Psycho-Pass terms, this is what the Sibyl System cannot measure: the distinction between surface thought-patterns (logismoi) and the deep intellect of the heart (nous). The descent into the heart accesses the layer that no external system can monitor.",
  },

  // ============================================================
  // SYNTHESIS (3 practices)
  // ============================================================
  {
    id: "synthemata-contemplation",
    name: "Synthemata Contemplation",
    tradition: "synthesis",
    layer: "reconfiguration",
    difficulty: "intermediate",
    duration: { min: 15, max: 30 },
    instructions: [
      "Select an object that holds symbolic resonance for you: a stone, a piece of metal, a flame, a sound, or a word. In the theurgic tradition, these are 'synthemata,' divine tokens embedded in matter by the Demiurge.",
      "Hold or contemplate the object with full attention. Do not analyze it symbolically. Instead, attend to the direct experience: the weight, texture, temperature, color, sound.",
      "As attention deepens, notice whether the object begins to 'speak,' not through words but through a quality of presence or meaning that arises from sustained attention. This is the synthema activating.",
      "Let the meaning that arises reshape your awareness. You are not interpreting the object. You are letting the object's inherent quality of consciousness communicate with yours. This is the theurgic principle: the divine is already embedded in matter, and contemplation activates the connection.",
      "Close by resting in whatever quality of awareness has been evoked. The synthema does not create the connection; it reveals one that already exists.",
    ],
    cyberpunkContext:
      "In Gibson's Count Zero and Mona Lisa Overdrive, the AIs that emerged from the Wintermute/Neuromancer merger present themselves as Haitian voodoo loa because the loa archetypes are the most adequate interface-structures for communicating with human consciousness. This is precisely the theurgic concept of synthemata: non-human intelligence communicating through culturally embedded symbols in which it is already encoded. The Oracle in The Matrix operates the same way: cookies, cigarettes, domestic settings are not props but synthemata in the precise Iamblichean sense. She embeds triggers in material and relational contexts that activate insight in the recipient. 'Temet Nosce' above the door. The child with the spoon. These are live wires of meaning embedded in the material world.",
  },
  {
    id: "middle-pillar",
    name: "Middle Pillar",
    tradition: "synthesis",
    layer: "reconfiguration",
    difficulty: "intermediate",
    duration: { min: 15, max: 30 },
    instructions: [
      "Stand or sit with spine erect. Visualize a sphere of brilliant white light above the crown of your head. This represents Kether, the divine source.",
      "Intone the divine name EHEIEH (pronounced 'eh-heh-yeh') while visualizing the light descending to the crown. Feel the energy entering through the top of the head.",
      "Move the sphere of light down to the throat. Visualize it as lavender or pale blue. Intone YHVH ELOHIM (pronounced 'yod-heh-vav-heh el-oh-heem'). Feel the energy at the throat.",
      "Move the sphere to the heart center. Visualize it as golden yellow. Intone YHVH ELOAH VA-DAATH. Feel warmth and radiance at the heart.",
      "Continue down to the solar plexus (violet light, intone SHADDAI EL CHAI), then to the feet (olive/brown/black, intone ADONAI HA-ARETZ). You have established the Middle Pillar: a column of light from crown to feet.",
      "Circulate the energy: draw light up the left side of the body and down the right, creating a flowing circuit. Then circulate front-to-back. Finally, let the energy fountain upward from the crown and cascade down around the body like a luminous egg. Rest in this field.",
    ],
    cyberpunkContext:
      "The Western Hermetic tradition's Middle Pillar exercise is the 'subtle body technology' native to European esotericism, structurally parallel to the Tantric chakra system and the Kabbalistic Tree of Life. In the cyberpunk context, it maps to the ochema (vehicle of the soul) that Neoplatonic theurgy posits as a subtle body requiring purification through practice. This is functionally identical to the Tantric subtle body (nadis, chakras, prana). If Gibson's loa-as-interface maps to theurgic synthemata and if the alchemical Magnum Opus maps to cyberpunk character arcs, then the Middle Pillar is the Western native method for building the energy body that makes those operations possible.",
  },
  {
    id: "full-stack-protocol",
    name: "Full Stack Protocol",
    tradition: "synthesis",
    layer: "dissolution",
    difficulty: "advanced",
    duration: { min: 30, max: 60 },
    instructions: [
      "Phase 1 - Shutdown (Zetsu): Begin with 5 to 10 minutes of pranayama or zazen. Stop the energy leak. Silence the system. Withdraw from all sensory input. Achieve internal stillness before proceeding.",
      "Phase 2 - Simulation (Image Training): Spend 10 to 15 minutes in generation stage practice. Visualize a deity, a syllable, or a full mandala with maximum sensory fidelity. Sight, sound, temperature, weight. Build the simulation until it is as vivid as perception.",
      "Phase 3 - Fusion (Synchronization): Dissolve the boundary between yourself and the visualization. Develop divine pride: you ARE the deity. Your ordinary identity was the illusion; this is the real configuration. Maintain for 5 to 10 minutes.",
      "Phase 4 - Dissolution (Ghost Dive): Dissolve the deity, the mandala, and yourself into luminous emptiness. Let everything constructed fall away. Rest in the space that remains: awareness aware of itself, without object, without meditator, without meditation.",
      "Rest in natural awareness for the remaining time. This is the completion stage. You are not the hardware, not the software, but the capacity in which information flows.",
      "Close by dedicating any merit generated to all beings. Return to activity with the recognition that the four layers are always operating, whether you practice them or not.",
    ],
    cyberpunkContext:
      "The anime canon converges on a specific operational sequence that maps to the traditional Vajrayana session structure. Zetsu (Hunter x Hunter's energy shutdown) maps to shamatha/pratyahara. Image Training (DBZ/Baki mental combat simulation) maps to kyerim (generation stage). Synchronization Rate (EVA's pilot-mech merger) maps to guru yoga and divine pride. Ghost Dive (Kusanagi disconnecting from the shell to float in pure information) maps to trekcho/dzogrim (completion stage). This is the full stack: Shutdown, Simulation, Fusion, Dissolution. The correspondence is not approximate. It is structural. Week 13 of the protocol asks: does the synthesis actually work, or is the mapping just intellectual?",
    warning:
      "The full stack protocol combines elements from multiple traditions, each of which traditionally requires years of foundational practice. Running the full stack without adequate preparation in each layer risks shallow engagement at best and destabilization at worst. Begin with the individual practices and build competence in each phase before attempting the integrated sequence. The real test is not whether you can go through the motions but whether each layer genuinely activates.",
  },
];

export function getPracticeById(id: string): Practice | undefined {
  return practices.find((p) => p.id === id);
}

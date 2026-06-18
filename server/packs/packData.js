/**
 * Pack theme definitions and prompt asset generation for all 150 marketplace packs.
 */

const { slugify, getAssetCount, createAsset, createPack, buildPrompt } = require('./helpers');

const VISUAL_PACKS = [
  { name: 'Ghibli Style', tags: ['ghibli', 'anime', 'illustration'], description: 'Dreamy Studio Ghibli-inspired scenes, characters, and cinematic environments.' },
  { name: 'Midjourney V6', tags: ['midjourney', 'ai-art', 'prompting'], description: 'Optimized Midjourney v6 prompts with parameters, style weights, and negative prompts.' },
  { name: 'Anime Fantasy', tags: ['anime', 'fantasy', 'character'], description: 'Fantasy anime character and world-building prompts for illustration and concept art.' },
  { name: 'Product Mockups', tags: ['product', 'mockup', 'ecommerce'], description: 'Professional product mockup prompts for packaging, devices, and lifestyle shots.' },
  { name: 'Thumbnail Creator', tags: ['thumbnail', 'youtube', 'social'], description: 'High-CTR thumbnail prompts for YouTube, streams, and social video content.' },
  { name: 'Portrait Photography', tags: ['portrait', 'photography', 'lighting'], description: 'Studio and natural portrait prompts with lighting, lens, and mood direction.' },
  { name: 'Landscape Mastery', tags: ['landscape', 'nature', 'scenery'], description: 'Epic landscape and nature scene prompts for mountains, coasts, and wilderness.' },
  { name: 'Logo Design', tags: ['logo', 'branding', 'identity'], description: 'Logo concept prompts for minimalist, vintage, and modern brand marks.' },
  { name: 'UI Mockups', tags: ['ui', 'ux', 'app-design'], description: 'App and dashboard UI mockup prompts for web and mobile interfaces.' },
  { name: 'Brand Identity', tags: ['brand', 'identity', 'visual'], description: 'Cohesive brand identity visuals including color, typography, and mood boards.' },
  { name: 'Watercolor Art', tags: ['watercolor', 'painting', 'art'], description: 'Soft watercolor illustration prompts with wash techniques and paper texture.' },
  { name: 'Oil Painting Style', tags: ['oil-painting', 'classical', 'art'], description: 'Classical oil painting style prompts with brushwork, glaze, and composition.' },
  { name: 'Pixel Art', tags: ['pixel-art', 'retro', 'game'], description: 'Retro pixel art prompts for sprites, scenes, and nostalgic game aesthetics.' },
  { name: 'Isometric Design', tags: ['isometric', '3d', 'illustration'], description: 'Isometric illustration prompts for rooms, cities, and technical diagrams.' },
  { name: 'Flat Illustration', tags: ['flat-design', 'vector', 'illustration'], description: 'Clean flat illustration prompts for apps, infographics, and editorial art.' },
  { name: '3D Renders', tags: ['3d', 'render', 'cinema4d'], description: 'Photoreal and stylized 3D render prompts with materials and lighting setups.' },
  { name: 'Character Design', tags: ['character', 'concept', 'design'], description: 'Character design sheet prompts with poses, outfits, and personality cues.' },
  { name: 'Concept Art', tags: ['concept-art', 'environment', 'game'], description: 'Game and film concept art prompts for props, environments, and keyframes.' },
  { name: 'Fashion Lookbook', tags: ['fashion', 'lookbook', 'editorial'], description: 'Editorial fashion prompts for runway, streetwear, and seasonal collections.' },
  { name: 'Food Photography', tags: ['food', 'photography', 'culinary'], description: 'Appetizing food photography prompts with styling, props, and lighting.' },
  { name: 'Architecture Viz', tags: ['architecture', 'visualization', '3d'], description: 'Architectural visualization prompts for exteriors, interiors, and urban plans.' },
  { name: 'Interior Design', tags: ['interior', 'decor', 'home'], description: 'Interior design prompts for living spaces, offices, and styled room layouts.' },
  { name: 'Vehicle Design', tags: ['vehicle', 'automotive', 'concept'], description: 'Concept vehicle prompts for cars, bikes, aircraft, and futuristic transport.' },
  { name: 'Pet Portraits', tags: ['pets', 'portrait', 'animals'], description: 'Charming pet portrait prompts for dogs, cats, and exotic animals.' },
  { name: 'Wedding Photography', tags: ['wedding', 'photography', 'romance'], description: 'Wedding and engagement photography prompts with candid and posed moments.' },
  { name: 'Street Photography', tags: ['street', 'urban', 'photography'], description: 'Urban street photography prompts capturing candid city life and atmosphere.' },
  { name: 'Macro Nature', tags: ['macro', 'nature', 'close-up'], description: 'Macro nature prompts for insects, flowers, dewdrops, and organic textures.' },
  { name: 'Sci-Fi Worlds', tags: ['sci-fi', 'futuristic', 'worldbuilding'], description: 'Science fiction world prompts for planets, colonies, and advanced civilizations.' },
  { name: 'Cyberpunk Aesthetic', tags: ['cyberpunk', 'neon', 'dystopia'], description: 'Cyberpunk visual prompts with neon cities, tech noir, and rain-soaked streets.' },
  { name: 'Fantasy Maps', tags: ['map', 'fantasy', 'cartography'], description: 'Fantasy map prompts for continents, dungeons, and illustrated cartography.' },
  { name: 'Comic Panels', tags: ['comic', 'panels', 'sequential'], description: 'Comic panel layout prompts with dynamic action and narrative framing.' },
  { name: 'Manga Style', tags: ['manga', 'japanese', 'comic'], description: 'Manga-style illustration prompts with screentone, speed lines, and emotion.' },
  { name: "Children's Book Art", tags: ['children', 'illustration', 'storybook'], description: 'Whimsical children book art prompts with friendly characters and scenes.' },
  { name: 'Infographic Visuals', tags: ['infographic', 'data', 'visual'], description: 'Data infographic prompts for charts, icons, and information design layouts.' },
  { name: 'Social Media Banners', tags: ['banner', 'social-media', 'marketing'], description: 'Social media banner prompts sized for LinkedIn, Twitter, and Facebook covers.' },
  { name: 'YouTube Covers', tags: ['youtube', 'channel-art', 'branding'], description: 'YouTube channel art and cover prompts with bold branding and readability.' },
  { name: 'Instagram Aesthetics', tags: ['instagram', 'aesthetic', 'feed'], description: 'Instagram feed aesthetic prompts for cohesive visual grids and stories.' },
  { name: 'Pinterest Pins', tags: ['pinterest', 'pin', 'vertical'], description: 'Vertical Pinterest pin prompts optimized for clicks and save-worthy design.' },
  { name: 'App Icons', tags: ['app-icon', 'mobile', 'design'], description: 'Mobile app icon prompts with clarity, contrast, and platform guidelines.' },
  { name: 'Game Assets', tags: ['game', 'assets', 'sprites'], description: 'Game asset prompts for items, environments, and collectible object design.' },
  { name: 'Texture Packs', tags: ['texture', 'seamless', 'material'], description: 'Seamless texture prompts for wood, stone, fabric, and sci-fi surfaces.' },
  { name: 'Pattern Design', tags: ['pattern', 'repeat', 'textile'], description: 'Repeat pattern prompts for textiles, wallpapers, and packaging backgrounds.' },
  { name: 'Poster Art', tags: ['poster', 'print', 'graphic'], description: 'Bold poster art prompts for events, movies, and promotional campaigns.' },
  { name: 'Album Covers', tags: ['album', 'music', 'cover-art'], description: 'Album cover prompts expressing genre mood through typography and imagery.' },
  { name: 'Book Covers', tags: ['book', 'cover', 'publishing'], description: 'Book cover prompts for fiction, nonfiction, and genre-specific layouts.' },
  { name: 'Tattoo Concepts', tags: ['tattoo', 'ink', 'body-art'], description: 'Tattoo concept prompts for linework, blackwork, and illustrative body art.' },
  { name: 'Nail Art Design', tags: ['nail-art', 'beauty', 'design'], description: 'Creative nail art prompts with patterns, gradients, and seasonal themes.' },
  { name: 'Makeup Looks', tags: ['makeup', 'beauty', 'editorial'], description: 'Editorial makeup look prompts for editorial, bridal, and avant-garde styles.' },
  { name: 'Jewelry Design', tags: ['jewelry', 'accessories', 'luxury'], description: 'Jewelry design prompts for rings, necklaces, and luxury accessory concepts.' },
  { name: 'Seasonal Themes', tags: ['seasonal', 'holiday', 'themed'], description: 'Seasonal and holiday-themed visual prompts for spring, summer, fall, and winter.' }
];

const INFORMATIONAL_PACKS = [
  { name: 'After Graduation', tags: ['career', 'graduate', 'planning'], description: 'Career planning prompts for new graduates entering the professional world.' },
  { name: 'Professional Communication', tags: ['communication', 'workplace', 'email'], description: 'Workplace communication prompts for emails, updates, and difficult conversations.' },
  { name: 'Office Productivity', tags: ['productivity', 'office', 'workflow'], description: 'Office productivity prompts for task management, focus, and daily workflows.' },
  { name: 'Email Mastery', tags: ['email', 'writing', 'business'], description: 'Professional email prompts for outreach, follow-ups, and polished correspondence.' },
  { name: 'Meeting Notes', tags: ['meetings', 'notes', 'summary'], description: 'Meeting notes prompts for agendas, summaries, and action item tracking.' },
  { name: 'Report Writing', tags: ['report', 'writing', 'business'], description: 'Business report prompts for analysis, findings, and executive-ready documents.' },
  { name: 'Proposal Builder', tags: ['proposal', 'sales', 'business'], description: 'Proposal writing prompts for clients, grants, and project pitches.' },
  { name: 'Resume Optimizer', tags: ['resume', 'career', 'job-search'], description: 'Resume optimization prompts for ATS-friendly, achievement-driven CVs.' },
  { name: 'Cover Letter Pro', tags: ['cover-letter', 'job', 'application'], description: 'Cover letter prompts tailored to roles, companies, and career transitions.' },
  { name: 'LinkedIn Growth', tags: ['linkedin', 'networking', 'personal-brand'], description: 'LinkedIn profile and content prompts for personal branding and networking.' },
  { name: 'Interview Prep', tags: ['interview', 'career', 'preparation'], description: 'Interview preparation prompts for behavioral, technical, and case questions.' },
  { name: 'Negotiation Scripts', tags: ['negotiation', 'salary', 'business'], description: 'Negotiation script prompts for salary, contracts, and business deals.' },
  { name: 'Project Planning', tags: ['project', 'planning', 'management'], description: 'Project planning prompts for timelines, milestones, and resource allocation.' },
  { name: 'OKR Framework', tags: ['okr', 'goals', 'strategy'], description: 'OKR writing prompts for objectives, key results, and quarterly alignment.' },
  { name: 'SWOT Analysis', tags: ['swot', 'analysis', 'strategy'], description: 'SWOT analysis prompts for strategic planning and competitive assessment.' },
  { name: 'Business Strategy', tags: ['strategy', 'business', 'planning'], description: 'Business strategy prompts for growth, positioning, and market entry.' },
  { name: 'Market Research', tags: ['market-research', 'insights', 'analysis'], description: 'Market research prompts for surveys, interviews, and insight synthesis.' },
  { name: 'Competitor Analysis', tags: ['competitor', 'analysis', 'benchmark'], description: 'Competitor analysis prompts for feature, pricing, and positioning comparisons.' },
  { name: 'Customer Personas', tags: ['persona', 'customer', 'ux'], description: 'Customer persona prompts with demographics, goals, pain points, and behaviors.' },
  { name: 'Sales Outreach', tags: ['sales', 'outreach', 'prospecting'], description: 'Sales outreach prompts for cold calls, LinkedIn messages, and follow-ups.' },
  { name: 'Cold Email', tags: ['cold-email', 'outreach', 'sales'], description: 'Cold email prompts with subject lines, personalization, and clear CTAs.' },
  { name: 'Pitch Deck', tags: ['pitch', 'startup', 'presentation'], description: 'Pitch deck prompts for investor slides, narrative flow, and key metrics.' },
  { name: 'Financial Summary', tags: ['finance', 'summary', 'reporting'], description: 'Financial summary prompts for P&L reviews, budgets, and stakeholder reports.' },
  { name: 'Budget Planning', tags: ['budget', 'finance', 'planning'], description: 'Budget planning prompts for departments, projects, and personal finance.' },
  { name: 'Risk Assessment', tags: ['risk', 'assessment', 'compliance'], description: 'Risk assessment prompts for identifying, scoring, and mitigating business risks.' },
  { name: 'Policy Drafting', tags: ['policy', 'compliance', 'hr'], description: 'Policy drafting prompts for HR, security, and operational guidelines.' },
  { name: 'SOP Creator', tags: ['sop', 'process', 'documentation'], description: 'Standard operating procedure prompts with steps, owners, and checkpoints.' },
  { name: 'Training Manuals', tags: ['training', 'manual', 'onboarding'], description: 'Training manual prompts for employee onboarding and skill development.' },
  { name: 'Knowledge Base', tags: ['knowledge-base', 'docs', 'support'], description: 'Knowledge base article prompts for help centers and internal wikis.' },
  { name: 'FAQ Builder', tags: ['faq', 'support', 'customer'], description: 'FAQ writing prompts for products, services, and customer support pages.' },
  { name: 'Technical Docs', tags: ['technical', 'documentation', 'engineering'], description: 'Technical documentation prompts for architecture, setup, and troubleshooting.' },
  { name: 'API Documentation', tags: ['api', 'documentation', 'developer'], description: 'API documentation prompts for endpoints, examples, and error references.' },
  { name: 'Release Notes', tags: ['release-notes', 'changelog', 'product'], description: 'Release notes prompts for changelogs, feature announcements, and migrations.' },
  { name: 'Bug Report Triage', tags: ['bug', 'triage', 'engineering'], description: 'Bug report triage prompts for reproduction steps, severity, and prioritization.' },
  { name: 'Data Analysis', tags: ['data', 'analysis', 'insights'], description: 'Data analysis prompts for interpreting datasets and actionable insights.' },
  { name: 'Survey Design', tags: ['survey', 'research', 'feedback'], description: 'Survey design prompts for unbiased questions and response analysis.' },
  { name: 'Presentation Builder', tags: ['presentation', 'slides', 'storytelling'], description: 'Presentation prompts for slide outlines, narratives, and speaker notes.' },
  { name: 'Executive Summary', tags: ['executive', 'summary', 'leadership'], description: 'Executive summary prompts distilling complex reports for leadership decisions.' },
  { name: 'Press Release', tags: ['press-release', 'pr', 'media'], description: 'Press release prompts for product launches, milestones, and company news.' },
  { name: 'Crisis Communication', tags: ['crisis', 'communication', 'pr'], description: 'Crisis communication prompts for internal and external stakeholder messaging.' },
  { name: 'HR Policies', tags: ['hr', 'policies', 'workplace'], description: 'HR policy prompts for leave, conduct, diversity, and remote work guidelines.' },
  { name: 'Onboarding Guides', tags: ['onboarding', 'employee', 'hr'], description: 'Employee onboarding guide prompts for day-one through first-90-day plans.' },
  { name: 'Performance Reviews', tags: ['performance', 'review', 'management'], description: 'Performance review prompts with balanced feedback and development goals.' },
  { name: 'Team Feedback', tags: ['feedback', 'team', 'culture'], description: 'Team feedback prompts for retrospectives, peer reviews, and growth conversations.' },
  { name: 'Conflict Resolution', tags: ['conflict', 'mediation', 'workplace'], description: 'Conflict resolution prompts for mediation scripts and de-escalation strategies.' },
  { name: 'Time Management', tags: ['time-management', 'productivity', 'planning'], description: 'Time management prompts for prioritization, scheduling, and deep work.' },
  { name: 'Goal Setting', tags: ['goals', 'planning', 'personal-growth'], description: 'Goal setting prompts using SMART frameworks and accountability checkpoints.' },
  { name: 'Decision Matrix', tags: ['decision', 'analysis', 'framework'], description: 'Decision matrix prompts for weighing options with criteria and trade-offs.' },
  { name: 'Root Cause Analysis', tags: ['root-cause', 'analysis', 'problem-solving'], description: 'Root cause analysis prompts using 5 Whys, fishbone, and corrective actions.' },
  { name: 'Stakeholder Updates', tags: ['stakeholder', 'update', 'communication'], description: 'Stakeholder update prompts for executives, clients, and cross-functional teams.' }
];

const STUDENT_PACKS = [
  { name: 'Projects and Mini Projects', tags: ['projects', 'academic', 'planning'], description: 'Academic project prompts for planning, execution, and presentation deliverables.' },
  { name: 'Analysis Module', tags: ['analysis', 'critical-thinking', 'academic'], description: 'Critical analysis prompts for texts, data, and research interpretation.' },
  { name: 'Assignments and Exams', tags: ['assignments', 'exams', 'study'], description: 'Assignment and exam prep prompts for structured answers and revision plans.' },
  { name: 'Branches', tags: ['engineering', 'branches', 'technical'], description: 'Branch-specific study prompts for engineering and technical disciplines.' },
  { name: 'Research Papers', tags: ['research', 'paper', 'academic'], description: 'Research paper prompts for abstracts, methodology, and literature integration.' },
  { name: 'Literature Review', tags: ['literature-review', 'research', 'citations'], description: 'Literature review prompts for synthesis, gap analysis, and source evaluation.' },
  { name: 'Thesis Outline', tags: ['thesis', 'outline', 'graduate'], description: 'Thesis outline prompts for chapters, research questions, and timelines.' },
  { name: 'Lab Reports', tags: ['lab-report', 'science', 'experiment'], description: 'Lab report prompts for hypothesis, procedure, results, and discussion sections.' },
  { name: 'Case Studies', tags: ['case-study', 'analysis', 'business'], description: 'Case study response prompts applying frameworks to real-world scenarios.' },
  { name: 'Essay Writing', tags: ['essay', 'writing', 'academic'], description: 'Academic essay prompts for thesis statements, arguments, and conclusions.' },
  { name: 'Debate Prep', tags: ['debate', 'argument', 'public-speaking'], description: 'Debate preparation prompts for arguments, rebuttals, and cross-examination.' },
  { name: 'Presentation Slides', tags: ['presentation', 'slides', 'academic'], description: 'Academic presentation prompts for slide structure and speaker delivery.' },
  { name: 'Study Notes', tags: ['study-notes', 'revision', 'learning'], description: 'Study notes prompts for condensing lectures into memorable summaries.' },
  { name: 'Flashcard Generator', tags: ['flashcards', 'memorization', 'study'], description: 'Flashcard generation prompts for definitions, formulas, and key concepts.' },
  { name: 'Exam Revision', tags: ['exam', 'revision', 'study-plan'], description: 'Exam revision prompts for topic prioritization and practice schedules.' },
  { name: 'MCQ Practice', tags: ['mcq', 'practice', 'exam'], description: 'Multiple choice question prompts with explanations and distractor analysis.' },
  { name: 'Problem Solving', tags: ['problem-solving', 'STEM', 'practice'], description: 'Structured problem-solving prompts for STEM and quantitative subjects.' },
  { name: 'Math Proofs', tags: ['math', 'proofs', 'logic'], description: 'Mathematical proof prompts with logical steps and notation guidance.' },
  { name: 'Physics Concepts', tags: ['physics', 'concepts', 'explanation'], description: 'Physics concept explanation prompts with diagrams and real-world examples.' },
  { name: 'Chemistry Reactions', tags: ['chemistry', 'reactions', 'equations'], description: 'Chemistry reaction prompts for balancing, mechanisms, and lab safety.' },
  { name: 'Biology Diagrams', tags: ['biology', 'diagrams', 'labeling'], description: 'Biology diagram prompts for cell structures, systems, and labeled illustrations.' },
  { name: 'CS Algorithms', tags: ['algorithms', 'computer-science', 'coding'], description: 'Computer science algorithm prompts for complexity analysis and pseudocode.' },
  { name: 'Data Structures', tags: ['data-structures', 'cs', 'implementation'], description: 'Data structure prompts for arrays, trees, graphs, and implementation trade-offs.' },
  { name: 'DBMS Queries', tags: ['dbms', 'sql', 'database'], description: 'Database query prompts for SQL writing, optimization, and schema design.' },
  { name: 'Web Dev Projects', tags: ['web-dev', 'projects', 'fullstack'], description: 'Web development project prompts for frontend, backend, and deployment plans.' },
  { name: 'ML Basics', tags: ['machine-learning', 'ai', 'concepts'], description: 'Machine learning basics prompts for models, training, and evaluation metrics.' },
  { name: 'Statistics Help', tags: ['statistics', 'analysis', 'math'], description: 'Statistics prompts for hypothesis testing, distributions, and interpretation.' },
  { name: 'Economics Essays', tags: ['economics', 'essay', 'analysis'], description: 'Economics essay prompts for supply-demand, policy, and market analysis.' },
  { name: 'History Analysis', tags: ['history', 'analysis', 'essay'], description: 'History analysis prompts for primary sources, causation, and historiography.' },
  { name: 'Geography Reports', tags: ['geography', 'report', 'environment'], description: 'Geography report prompts for maps, climate data, and regional studies.' },
  { name: 'Political Science', tags: ['political-science', 'essay', 'policy'], description: 'Political science prompts for policy analysis, theory, and comparative government.' },
  { name: 'Psychology Papers', tags: ['psychology', 'research', 'paper'], description: 'Psychology paper prompts for studies, ethics, and behavioral analysis.' },
  { name: 'Sociology Research', tags: ['sociology', 'research', 'qualitative'], description: 'Sociology research prompts for surveys, ethnography, and social theory.' },
  { name: 'Philosophy Essays', tags: ['philosophy', 'essay', 'argument'], description: 'Philosophy essay prompts for ethical arguments, logic, and textual analysis.' },
  { name: 'Law Case Briefs', tags: ['law', 'case-brief', 'legal'], description: 'Legal case brief prompts for facts, issues, holdings, and reasoning.' },
  { name: 'Medical Terminology', tags: ['medical', 'terminology', 'health'], description: 'Medical terminology prompts for definitions, mnemonics, and clinical context.' },
  { name: 'Nursing Care Plans', tags: ['nursing', 'care-plan', 'clinical'], description: 'Nursing care plan prompts for assessments, diagnoses, and interventions.' },
  { name: 'Engineering Drawings', tags: ['engineering', 'drawings', 'technical'], description: 'Engineering drawing prompts for orthographic views, dimensions, and annotations.' },
  { name: 'Architecture Briefs', tags: ['architecture', 'brief', 'design'], description: 'Architecture design brief prompts for site analysis, program, and concept.' },
  { name: 'Civil Project Reports', tags: ['civil', 'engineering', 'report'], description: 'Civil engineering project report prompts for surveys, materials, and safety.' },
  { name: 'Mechanical Design', tags: ['mechanical', 'design', 'engineering'], description: 'Mechanical design prompts for components, tolerances, and failure analysis.' },
  { name: 'Electrical Circuits', tags: ['electrical', 'circuits', 'engineering'], description: 'Electrical circuit prompts for analysis, schematics, and component selection.' },
  { name: 'MBA Case Analysis', tags: ['mba', 'case-analysis', 'business'], description: 'MBA case analysis prompts for strategy, finance, and recommendation frameworks.' },
  { name: 'CA Exam Prep', tags: ['ca-exam', 'accounting', 'finance'], description: 'Chartered accountancy exam prep prompts for theory and practical problems.' },
  { name: 'UPSC Answer Writing', tags: ['upsc', 'answer-writing', 'civil-services'], description: 'UPSC answer writing prompts for structured, high-scoring Mains responses.' },
  { name: 'IELTS Writing', tags: ['ielts', 'writing', 'english'], description: 'IELTS writing prompts for Task 1 reports and Task 2 argumentative essays.' },
  { name: 'GRE Verbal', tags: ['gre', 'verbal', 'test-prep'], description: 'GRE verbal prompts for reading comprehension, vocabulary, and argument analysis.' },
  { name: 'Coding Interviews', tags: ['coding-interview', 'leetcode', 'prep'], description: 'Coding interview prompts for algorithms, system design, and behavioral prep.' },
  { name: 'Hackathon Ideas', tags: ['hackathon', 'ideas', 'innovation'], description: 'Hackathon ideation prompts for problem statements, MVPs, and pitch decks.' },
  { name: 'Internship Reports', tags: ['internship', 'report', 'reflection'], description: 'Internship report prompts for learnings, projects, and professional reflection.' }
];

const PROMPT_TOPICS = {
  visual: [
    'Hero Scene Composer', 'Lighting Setup Guide', 'Color Palette Builder', 'Camera Angle Planner',
    'Mood Board Generator', 'Style Reference Mixer', 'Negative Prompt Optimizer', 'Aspect Ratio Advisor',
    'Detail Enhancement Pass', 'Background Environment', 'Foreground Subject Focus', 'Texture and Material',
    'Seasonal Variant Creator', 'Character Pose Director', 'Composition Rule Guide', 'Art Style Blending'
  ],
  informational: [
    'Draft Builder', 'Outline Generator', 'Tone Adjuster', 'Audience Analyzer',
    'Bullet Point Summarizer', 'Action Item Extractor', 'Follow-Up Composer', 'Template Customizer',
    'Risk Note Writer', 'Stakeholder Mapper', 'Deadline Planner', 'Quality Review Checklist',
    'Concise Rewrite Pass', 'Professional Opener', 'Closing Statement Writer', 'FAQ Section Builder'
  ],
  student: [
    'Outline Planner', 'Thesis Statement Builder', 'Citation Helper', 'Rubric Aligner',
    'Practice Question Maker', 'Concept Explainer', 'Summary Condenser', 'Exam Strategy Guide',
    'Diagram Description', 'Formula Sheet Builder', 'Peer Review Simulator', 'Timeboxed Study Plan',
    'Argument Structurer', 'Definition Clarifier', 'Example Generator', 'Self-Assessment Quiz'
  ]
};

const ASSET_BUILDERS = {
  visual: (pack, topic) => ({
    role: `You are a senior visual prompt engineer focused on ${pack.name} imagery for Midjourney, DALL-E, and Stable Diffusion.`,
    task: `Write a production-ready image prompt for "${topic}" within the ${pack.name} aesthetic. Subject: {{SUBJECT}}. Scene: {{SCENE}}.`,
    context: `Mood: {{MOOD}}. Color direction: {{COLORS}}. Target platform: {{PLATFORM}}. Style references: ${pack.tags.join(', ')}.`,
    constraints: `Specify composition, lighting, lens, texture, and art medium. Include a negative prompt line. Avoid logos, watermarks, blurry faces, and inconsistent anatomy. Match ${pack.name} visual language faithfully.`,
    output: `Return the image prompt (under 90 words), negative prompt, aspect ratio, and two style modifier keywords.`
  }),
  informational: (pack, topic) => ({
    role: `You are a ${pack.name} specialist who writes clear, actionable business and professional content.`,
    task: `Using the "${topic}" framework, produce a draft about {{TOPIC}} for {{AUDIENCE}}. Objective: {{OBJECTIVE}}.`,
    context: `Tone: {{TONE}}. Length: {{LENGTH}}. Key facts: {{KEY_FACTS}}. Domain tags: ${pack.tags.join(', ')}.`,
    constraints: `Be specific, scannable, and outcome-oriented. Use headings or bullets where helpful. Avoid jargon without explanation, passive voice overload, and unsupported claims.`,
    output: `Return the complete draft ready to send or publish, plus three optional improvements ranked by impact.`
  }),
  student: (pack, topic) => ({
    role: `You are an academic coach specializing in ${pack.name} for university-level coursework and exams.`,
    task: `Apply "${topic}" to help with {{ASSIGNMENT_TYPE}} on {{SUBJECT_TOPIC}}. Course: {{COURSE}}. Mark weight: {{MARKS}}.`,
    context: `Rubric focus: {{RUBRIC}}. Student level: {{LEVEL}}. Deadline: {{DEADLINE}}. Related tags: ${pack.tags.join(', ')}.`,
    constraints: `Prioritize rubric alignment, academic integrity, and exam-ready clarity. Cite placeholders as [SOURCE] where evidence is needed. Do not fabricate references or complete graded work dishonestly.`,
    output: `Return a structured study deliverable with section headings, key points, and a self-check checklist before submission.`
  })
};

const generateAssets = (pack, category, packIndex) => {
  const packSlug = slugify(pack.name);
  const count = getAssetCount(packIndex);
  const topics = PROMPT_TOPICS[category];
  const builder = ASSET_BUILDERS[category];
  const assets = [];

  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length];
    const variant = Math.floor(i / topics.length) + 1;
    const title = variant > 1 ? `${topic} v${variant}` : topic;
    const content = buildPrompt(builder(pack, topic));

    assets.push(
      createAsset(title, packSlug, [pack.tags[0], pack.tags[1] || 'general'], content)
    );
  }

  return assets;
};

const buildPacksForCategory = (packDefs, category) =>
  packDefs.map((pack, index) =>
    createPack({
      name: pack.name,
      category,
      description: pack.description,
      tags: pack.tags,
      assets: generateAssets(pack, category, index)
    })
  );

const visualPacks = buildPacksForCategory(VISUAL_PACKS, 'visual');
const informationalPacks = buildPacksForCategory(INFORMATIONAL_PACKS, 'informational');
const studentPacks = buildPacksForCategory(STUDENT_PACKS, 'student');

const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

module.exports = {
  VISUAL_PACKS,
  INFORMATIONAL_PACKS,
  STUDENT_PACKS,
  visualPacks,
  informationalPacks,
  studentPacks,
  chunk
};

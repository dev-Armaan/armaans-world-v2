export type TextBlock = {
  type: "text";
  content: string;
};

export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  fullWidth?: boolean;
};

export type YouTubeBlock = {
  type: "youtube";
  videoId: string;
  title: string;
  caption?: string;
};

export type ContentBlock = TextBlock | ImageBlock | YouTubeBlock;

export type Project = {
  title: string;
  subtitle: string;
  year: string;
  type: string;
  image: string;
  contents: string[];
  descriptionBlocks: ContentBlock[];
  repoUrl?: string;
  demoUrl?: string;
};

export const projectsData: Record<string, Project> = {
  arxivisual: {
    title: "arXivisual",
    subtitle: "transforming research papers into visual stories",
    year: "2026",
    type: "project",
    image: "/arx-logo.png",
    repoUrl: "https://github.com/rajshah6/arXivisual",
    demoUrl: "https://arxivisual.org",
    contents: [
      "tartanhacks '26 winner",
      "multi-agent ai pipeline",
      "3blue1brown-style animations",
      "serverless manim rendering",
      "interactive scrollytelling ui",
      "real-time documentation via dedalus sdk",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "built arXivisual at tartanhacks '26 to solve a problem i've personally felt: academic papers are incredibly dense and hard to parse. we won the hackathon by creating a full-stack system that automatically transforms arxiv research papers into interactive visual stories with 3blue1brown-style animated explanations. paste any arxiv url, and within minutes you get a scrollytelling interface where manim animations play inline as you read through the paper. the goal was simple: make cutting-edge research accessible to everyone through animation + narration.",
      },
      {
        type: "image",
        src: "/arxiv.png",
        alt: "arXiv paper ingestion and processing",
        width: 800,
        height: 600,
        fullWidth: true,
      },
      {
        type: "text",
        content:
          "the technical architecture is split into a next.js 16 frontend with react 19 and a python fastapi backend orchestrating a sophisticated multi-agent ai pipeline. when you submit a paper, the backend fetches it from arxiv, parses sections using pymupdf4llm or ar5iv html, then runs a sequence of 7 specialized ai agents built with anthropic claude. the sectionanalyzer identifies visualizable concepts, the visualizationplanner creates storyboards with scene breakdowns, and the manimgenerator writes executable python code using manim (3blue1brown's animation library).",
      },
      {
        type: "text",
        content:
          "what made this project especially interesting was implementing a 4-stage quality pipeline with retry logic. code goes through syntactic validation (ast parsing), spatial validation (checking if elements are off-screen), voiceover quality scoring (using both heuristics and llm judges), and render testing before we actually spin up a serverless modal.com container to render the video. this multi-gate approach took our success rate from ~60% on first attempt to ~98% by attempt 3. each failure provides detailed feedback to the code generator, creating a tight feedback loop.",
      },
      {
        type: "youtube",
        videoId: "ug9BamKXKdk",
        title: "arXivisual demo - TartanHacks '26",
      },
      {
        type: "text",
        content:
          "one of the coolest parts was integrating the dedalus sdk with context7 mcp for live documentation retrieval. manim's api changes frequently, so instead of relying on static docs that go stale, the manimgenerator agent fetches real-time api references from context7 as it writes code. this was our entry for the 'best use of tool calling' track and it genuinely improved code quality since the agent always had access to current manim syntax. if mcp fails, we fall back to cached docs, but the live approach works remarkably well.",
      },
      {
        type: "image",
        src: "/loading.png",
        alt: "arXivisual processing pipeline with real-time progress",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "the voiceover quality validator was critical for maintaining educational standards. we banned phrases like 'now we display...' or 'watch as...' because those are meta-commentary about the animation, not actual explanations of the concept. narration needed to teach, not describe. the validator uses dual scoring: heuristic rules check for banned phrases and concept alignment, while an llm judge evaluates pedagogical quality (like explaining to a high schooler). if scores fall below thresholds, we regenerate with targeted feedback. this strictness paid off as the final narrations actually explain the math and intuition.",
      },
      {
        type: "text",
        content:
          "rendering happens serverlessly on modal.com, where we spin up isolated containers with all the manim dependencies (ffmpeg, cairo, pango, latex). each visualization takes 30-60 seconds to render, and we use elevenlabs for high-quality tts voiceovers synced to the animations. videos get uploaded to cloudflare r2 (s3-compatible storage), and the frontend displays them in a beautiful scrollytelling interface. as you scroll through the paper, sections transform from cards to full-screen, with videos playing inline next to the relevant text. we even render latex equations with katex so the math flows naturally with the prose.",
      },
      {
        type: "image",
        src: "/manim.png",
        alt: "3Blue1Brown-style Manim animations generated by AI",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "the frontend was built with next.js 16 (app router), react 19, tailwindcss 4, and framer motion for smooth animations. the landing page has this glassmorphic ui with floating shards and a mosaic background that looks pretty sick. we implemented real-time progress tracking with estimated completion times, and added a demo mode where pre-processed papers (like 'attention is all you need') load instantly with a 5-second simulated processing animation for that instant gratification.",
      },
      {
        type: "text",
        content:
          "backend wise, we used python 3.11 with fastapi, sqlalchemy 2.0 async for database operations (sqlite for dev, postgresql for prod), and structured everything around clear separation of concerns. the ingestion system handles both ar5iv html parsing (preferred) and pdf parsing (fallback), extracting sections, equations, figures, and tables while preserving hierarchical structure. the agent orchestrator runs visualizations sequentially with configurable retry counts and failure policies.",
      },
      {
        type: "text",
        content:
          "performance was interesting to optimize. processing a paper takes 3-6 minutes: a few seconds for arxiv fetching, 5-10s for parsing, 5-10s for parallel section analysis, then 45-150s for visualization generation across 3-5 visualizations, and 90-300s for rendering. the bottlenecks are llm calls (manimgenerator generates 8k tokens) and rendering (modal cold starts + manim execution). we parallelized section analysis and implemented static validation before expensive rendering to minimize compute costs.",
      },
      {
        type: "text",
        content:
          "winning tartanhacks '26 with this was incredible validation that the problem we were solving actually mattered. academic papers shouldn't be gatekeepers of knowledge when we have the tools to make them intuitive and visual. the tech stack came together beautifully: typescript frontend, python backend, claude for agents, elevenlabs for voice, modal for serverless rendering, manim for animations, and dedalus+context7 for live docs. it's a production-grade system that's technically ambitious, pedagogically sound, and genuinely useful. definitely one of the projects i'm most proud of.",
      },
    ],
  },
  ford: {
    title: "SWE @ Ford",
    subtitle: "handling a lot of data",
    year: "2026",
    type: "internship",
    image: "/ford.jpg",
    contents: [
      "automated order validation & persistence",
      "distributed systems instrumentation",
      "datadog apm integration",
      "pipeline architecture & design",
      "performance optimization & monitoring",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "currently working as a software engineer at ford motor company in toronto, building backend infrastructure and automation systems for critical order processing workflows in automotive manufacturing. my work focuses on designing scalable distributed systems, implementing observability tooling, and eliminating manual processes through intelligent automation.",
      },
      {
        type: "image",
        src: "/ready-ford.jpg",
        alt: "Ford facility",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "one of my primary contributions has been designing and implementing automated validation and persistence pipelines for order ingestion. i architected end-to-end pipelines that validate incoming orders against business rules, handle edge cases, and persist data to downstream services without human oversight. this eliminated manual order ingestion paths and reduced human intervention by over 60%, significantly improving throughput and reducing processing errors. the pipeline includes comprehensive validation logic, intelligent retry strategies with exponential backoff, and dead letter queues for orders requiring manual review.",
      },
      {
        type: "text",
        content:
          "i instrumented distributed services across the order processing stack with datadog apm, implementing distributed tracing, custom metrics, and proactive alerting. this gives our team real-time visibility into service health, request latencies, and error rates across microservices. with distributed tracing, we can track individual orders through the entire pipeline, pinpointing bottlenecks and failures with precision. the custom dashboards and alerting system i built have drastically reduced mean time to detection and resolution for incidents, enabling low-latency debugging and proactive performance regression detection.",
      },
      {
        type: "image",
        src: "/ford-electric.jpg",
        alt: "Ford electric vehicle",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "working with technologies like java spring boot, kafka for event streaming, postgresql for persistence, and kubernetes for orchestration has given me deep exposure to enterprise-grade distributed systems architecture. this role has been an incredible learning experience in large-scale systems, modern observability practices, and the complexities of automotive software engineering.",
      },
    ],
  },
  baba: {
    title: "Engineer @ Baba",
    subtitle: "building copilot for healthcare",
    year: "2025",
    type: "internship",
    image: "/baba.png",
    contents: ["tba"],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "baba is currently in stealth, so i can't share specific details about the product or technical implementation just yet. once baba launches publicly, i'll update this page with more information about the work i've been doing!",
      },
    ],
  },
  assembl3d: {
    title: "assembl3D",
    subtitle: "copilot for furniture assembly",
    year: "2025",
    type: "project",
    image: "/a3D_homepage.png",
    repoUrl: "https://github.com/rajshah6/assembl3D",
    demoUrl: "https://devpost.com/software/assembl3d",
    contents: [
      "intelligent pdf scraping & processing",
      "ai vision analysis with gemini",
      "interactive 3d visualization",
      "real-time assembly chatbot",
      "50+ product library",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "assembl3d is basically a copilot for putting together ikea furniture (or any furniture really). i built this at cal hacks 12.0 with my team because we were tired of staring at confusing 2d assembly manuals that look like hieroglyphics. the idea was simple: take any furniture manual pdf, use ai to understand what's going on, and render the steps in interactive 3d so you can actually see what you're supposed to be doing.",
      },
      {
        type: "text",
        content:
          "the first part was getting the manuals themselves. i used bright data's apis to automatically scrape product info from ikea.their serp api searches google for products, web unlocker downloads protected pdfs, and we cached everything to avoid re-downloading. we ended up with a library of 50+ popular ikea products that you can browse through, or you can just paste any product url and the system will grab it for you.",
      },
      {
        type: "text",
        content:
          "the harder part was making sense of the pdfs. assembly manuals are almost entirely visual with tiny diagrams with arrows and numbers everywhere. we tried text extraction at first but it was basically useless. the pivot was converting each pdf page into a high-res image and feeding it to google gemini. with some careful prompting, gemini could actually parse out the assembly steps, parts list, quantities, tools needed, and even spatial positioning. getting the ai to understand complex ikea diagrams and spit out structured json was probably the biggest technical win of the project.",
      },
      {
        type: "image",
        src: "/a3D_demo.png",
        alt: "assembl3D 3d visualization interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "once we had the structured data, i built the 3d visualization using react three fiber. instead of using pre-made 3d models (which would've limited us to specific products), we generate geometric primitives procedurally based on the dimensions gemini extracts. so you can render any part type on the fly like screws, wooden slabs, brackets, whatever. the viewer lets you step through the assembly process, rotate the camera around with orbit controls, and see exactly how each part fits together.",
      },
      {
        type: "text",
        content:
          "i also added a reka ai chatbot that answers questions about the current step. like if you're confused about which screw to use or how a part should be oriented, you can just ask and it'll help you out. it has context about the entire assembly process and the specific step you're on, so the answers are actually relevant.",
      },
      {
        type: "text",
        content:
          "performance was a real challenge. rendering 50+ parts in 3d got laggy fast, so i spent time optimizing with low-poly primitives, frustum culling, and lazy loading. also had to deal with coordinate system conversions as pdf coordinates don't map directly to three.js 3d space (y-up vs z-up), which was annoying to figure out.",
      },
      {
        type: "youtube",
        videoId: "c-3XQTTbKns",
        title: "assembl3D demo video",
      },
      {
        type: "text",
        content:
          "rate limits were another pain point. gemini has a 60 requests/minute limit and bright data charges per request, so i implemented 500ms delays between api calls and md5-based caching to avoid reprocessing the same files. definitely learned a lot about managing api costs and optimizing scraping workflows.",
      },
      {
        type: "text",
        content:
          "the final product looks pretty polished with smooth animations, responsive design, and it actually works well across devices. built the whole stack with typescript, next.js, and tailwind for the frontend, express and node for the backend, and integrated gemini and reka for the ai stuff. won some recognition at cal hacks which was cool. honestly just proud we built something that actually solves a real problem instead of yet another generic chatbot.",
      },
    ],
  },
  traffic: {
    title: "real time traffic analysis",
    subtitle: "cnn model for real-time traffic analysis",
    year: "2025",
    type: "project",
    image: "/vtracker.png",
    repoUrl: "https://github.com/dev-Armaan/vehicle-tracker",
    demoUrl: "https://youtu.be/S-3mQ_zNbvw",
    contents: [
      "object detection & tracking",
      "speed estimation",
      "vehicle classification",
      "cutomizable configuration",
      "video processing & analytics",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "this model estimates vehicle speed by leveraging object detection, tracking, and perspective transformation. it begins by using yolov8 to detect vehicles in each frame of a video. yolo provides bounding boxes around detected objects, along with confidence scores and class labels, allowing the model to differentiate between cars and trucks. vehicles classified as cars are displayed with peach-colored annotations, while trucks and semis are shown in green. once a vehicle is detected, the model assigns it a unique tracker id using bytetrack, ensuring consistent identification even as the vehicle moves across multiple frames.",
      },
      {
        type: "image",
        src: "/vtracker.png",
        alt: "E-commerce dashboard interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "to calculate speed, the model records the vertical position of each tracked vehicle over time. since cameras often capture footage from an elevated or angled perspective, the raw pixel displacement of a vehicle may not directly correlate to real-world movement. to address this, the model applies a perspective transformation using a predefined mapping between a source polygon (representing the detected region in the original frame) and a target rectangle (representing a standardized measurement plane). this transformation ensures that movements in the frame correspond proportionally to real-world distances, allowing the model to calculate speed accurately regardless of the camera angle.",
      },
      {
        type: "text",
        content:
          "the model maintains a history of tracked positions for each vehicle, storing them in a time-sequenced queue. when a vehicle has been tracked for long enough, the system calculates its displacement over a known time interval by comparing its initial and final transformed positions. since the frame rate of the video is known, the time elapsed between position updates can be precisely determined. the model then applies a simple kinematic formula, converting the displacement and time into speed, expressed in kilometers per hour.",
      },
      {
        type: "youtube",
        videoId: "S-3mQ_zNbvw",
        title: "Raw vs Processed Footage",
      },
      {
        type: "text",
        content:
          "this approach allows the system to work across different camera angles because the transformation matrix is adjustable. by defining a new source-target mapping specific to each camera setup, the model can adapt to various perspectives while maintaining accurate speed estimation. additionally, because vehicle classification is handled by yolo's object detection network, it remains robust to changes in lighting, background, and road conditions, ensuring reliable classification of different vehicle types in diverse environments.",
      },
    ],
  },
  watonomous: {
    title: "Software Engineer @ WATonomous",
    subtitle: "cloud computing & infrastructure internship",
    year: "2025",
    type: "internship",
    image: "/wato.png",
    contents: [
      "automated power outage notification system",
      "cloud-native apis & automation scripts",
      "slurm & kubernetes integration",
      "containerized microservices",
      "hpc cluster deployment",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "currently working as a software engineer at watonomous, university of waterloo's autonomous vehicle research team. i am focused on developing and maintaining cloud infrastructure and computing solutions to support autonomous vehicle development and testing, with a particular emphasis on building robust, scalable systems that enhance operational efficiency.",
      },
      {
        type: "text",
        content:
          "one of my key achievements is building an automated power outage notification system that leverages cloud-based services and containerized microservices with docker. this system has reduced manual reporting delays by 80%, significantly improving response times and operational reliability for the autonomous vehicle testing infrastructure.",
      },
      {
        type: "image",
        src: "/watcloud_machines.png",
        alt: "WATonomous cloud infrastructure architecture",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "i am developing cloud-native apis and automation scripts to integrate with slurm and kubernetes, enabling parallel execution of simulation jobs and increasing throughput by 300%. this integration allows for efficient resource management and job scheduling across distributed computing environments, supporting the complex computational requirements of autonomous vehicle simulation and testing.",
      },
      {
        type: "text",
        content:
          "my work involves developing and containerizing backend services with docker, deploying them to both cloud and hpc clusters via kubernetes. this approach ensures consistent deployment environments, improved scalability, and enhanced resource utilization across different computing platforms. the containerized architecture enables seamless scaling and management of services as the team's computational needs grow.",
      },
      {
        type: "image",
        src: "/watcloud_cluster.jpg",
        alt: "WATcloud cluster",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "working at watonomous is providing me with invaluable experience in cloud computing, containerization, and distributed systems while contributing to cutting-edge autonomous vehicle research. this role is strengthening my skills in cloud infrastructure, devops practices, and high-performance computing while supporting innovative research that advances autonomous vehicle technology.",
      },
    ],
  },
  govcanada: {
    title: "Software engineer @ environment Canada",
    subtitle: "climate reanalysis & data visualization",
    year: "2025",
    type: "internship",
    image: "/gov2.png",
    contents: [
      "climate reanalysis model pipeline",
      "ml-based interpolation techniques",
      "interactive web tool development",
      "data visualization & exploration",
      "automated deployments & ci/cd",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "as a software engineer at environment and climate change canada (eccc), i worked in the numerical terrestrial environment prediction section, focusing on developing innovative solutions for climate data analysis and visualization. my role involved building robust systems that helped canadians access and understand decades of environmental data through cutting-edge technology.",
      },
      {
        type: "text",
        content:
          "one of my key contributions was developing a comprehensive climate reanalysis model pipeline that integrated machine learning-based interpolation techniques using scikit-learn and pytorch. this system significantly improved the spatial resolution of missing environmental data by 35%, enabling more accurate climate modeling and analysis. the pipeline processed vast amounts of historical climate data, filling gaps and enhancing data quality for researchers and policymakers.",
      },
      {
        type: "image",
        src: "/govcan_pipeline.png",
        alt: "Environment Canada data pipeline architecture",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "to make this valuable data accessible to the public, i built an interactive web tool that allowed users to explore over 40 years of climate data across 50+ weather stations and 16 different datasets. the tool was developed using python, pandas for data processing, and d3.js for dynamic visualizations, providing canadians with unprecedented access to novel reanalysis datasets. this democratization of climate data helped researchers, students, and the general public better understand environmental trends and changes.",
      },
      {
        type: "text",
        content:
          "throughout my internship, i implemented robust software engineering practices by automating deployments and establishing comprehensive version control using git, docker, and ci/cd internal practices across multiple projects. this ensured reliable, scalable, and maintainable systems that could handle the complex requirements of climate data processing and visualization.",
      },
      {
        type: "image",
        src: "/govcan_weather.jpeg",
        alt: "Climate change extremes",
        width: 800,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "working at environment canada provided me with invaluable experience in applying machine learning to real-world environmental challenges, developing user-friendly data visualization tools, and implementing enterprise-level software engineering practices. this role strengthened my skills in data science, web development, and cloud infrastructure while contributing to important climate research that benefited all canadians.",
      },
    ],
  },
  asd: {
    title: "ASD Prediction Model",
    subtitle: "machine learning prediction model",
    year: "2025",
    type: "project",
    image: "/asd.png",
    repoUrl: "https://github.com/dev-Armaan/autism-prediction",
    contents: [
      "dataset tuning",
      "data visualization",
      "supervised learning",
      "hyperparameter tuning",
      "model evaluation",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "more than 75,000,000 people worldwide have been diagnosed with autism spectrum disorder (asd), yet accurate diagnosis remains a challenge. a recent study by the journal of the american medical association found that medical teams could correctly diagnose asd in children only 60-89% of the time. given the scale of the condition, this means millions of individuals may be misdiagnosed or remain undiagnosed, leading to delayed interventions and inadequate support. this is where my model comes in, leveraging machine learning to enhance diagnostic accuracy and provide a data-driven approach to autism prediction.",
      },
      {
        type: "image",
        src: "/kdata.png",
        alt: "ASD prediction model correlation heatmap",
        width: 700,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "the dataset used for training and testing originates from a kaggle community prediction competition. before building the model, i refined the dataset by removing irrelevant or incomplete columns, ensuring the data was clean, consistent, and optimized for machine learning. data visualization techniques, such as correlation heatmaps, were applied to identify relationships between different features, highlighting the most influential parameters contributing to asd prediction.",
      },
      {
        type: "image",
        src: "/asd.png",
        alt: "ASD prediction model correlation heatmap",
        width: 700,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "this project employs supervised learning algorithms, specifically the decision tree classifier and random forest classifier, to predict the likelihood of asd based on approximately 20 related parameters. decision trees are well-suited for this task as they can capture complex, nonlinear relationships in the data, while random forests, being an ensemble of multiple decision trees, enhance generalization and reduce the risk of overfitting.",
      },
      {
        type: "text",
        content:
          "to further improve model performance, i conducted hyperparameter tuning using grid search, systematically testing different parameter combinations to optimize accuracy. additionally, smote (synthetic minority over-sampling technique) was applied to address class imbalance, preventing the model from disproportionately favoring the majority class. class imbalance is a critical issue in medical datasets, where cases of a condition are often far fewer than non-cases, leading to biased predictions. smote generates synthetic examples for the minority class, ensuring a more balanced and fair learning process.",
      },
      {
        type: "image",
        src: "/asd-hyper.png",
        alt: "ASD prediction model correlation heatmap",
        width: 600,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "to rigorously evaluate the model's effectiveness, i implemented cross-validation, splitting the dataset into multiple subsets to assess performance across different test scenarios. the final model achieved a 93% cross-validation accuracy, surpassing the reported medical diagnosis accuracy range. this indicates that the model has strong potential for assisting healthcare professionals by offering an additional layer of decision support in asd diagnosis.",
      },
      {
        type: "text",
        content:
          "by carefully curating the dataset, applying advanced machine learning techniques, and optimizing hyperparameters, this model provides a reliable, efficient, and scalable approach to asd prediction. improving early detection can lead to timely interventions, personalized support, and better long-term outcomes for individuals with autism.",
      },
    ],
  },
  preppal: {
    title: "PrepPal",
    subtitle: "ai-powered interview prep bot",
    year: "2025",
    type: "project",
    image: "/preppal.png",
    repoUrl: "https://github.com/dev-Armaan/ai-interviewer",
    demoUrl: "https://preppal.work",
    contents: [
      "genai questions",
      "eye tracking",
      "progress dashboard",
      "24/7 accessibility",
      "genai feedback & analytics",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "preppal is an ai-powered interview preparation assistant designed to help users excel in various interview scenarios, whether technical, behavioral, or industry-specific. the platform simulates realistic mock interview sessions, providing personalized and interactive experiences tailored to each user's needs. with preppal, candidates can practice anytime, anywhere, gaining valuable insights to improve their responses and boost confidence before the big day.",
      },
      {
        type: "image",
        src: "/pfeedback.png",
        alt: "Fitness app interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "the core of preppal lies in its dynamic question-and-answer sessions. it offers users the ability to choose between different question sets, such as technical, behavioral, or domain-specific, ensuring a well-rounded preparation. after each session, the ai provides detailed feedback, highlighting strengths and areas for improvement, helping users to focus their efforts on what matters most. this feedback, combined with the system's advanced analytics, enables users to track their progress over time, making continuous improvements in their interview skills.",
      },
      {
        type: "text",
        content:
          "an added feature includes a progress dashboard, which gives users an overview of their performance across different sessions, showing trends and offering suggestions for further practice. the system also integrates eye tracking using opencv to analyze and provide feedback on non-verbal cues during interviews, offering a comprehensive approach to interview preparation.",
      },
      {
        type: "text",
        content:
          "later, preppal integrated the gcp speech-to-text api, which allows users to practice their responses aloud and get instant transcriptions. this feature has significantly boosted user readiness by 40%, as users can review their spoken answers, refine their communication skills, and gain valuable insights into their verbal performance. this integration has been particularly popular, contributing to preppal gaining 100+ active users within just two weeks.",
      },
      {
        type: "youtube",
        videoId: "0uulnpFgpyc",
        title: "preppal demo",
      },
      {
        type: "text",
        content:
          "built with a robust tech stack, preppal combines frontend technologies like react.js and tailwind css with a flask-powered backend, integrating apis from openai and cohere for intelligent question generation and feedback. mysql and mongodb handle the data storage needs, while opencv and recharts provide additional functionality and data visualizations for the user interface.",
      },
      {
        type: "text",
        content:
          "preppal is available 24/7, offering flexibility to users who can practice at their own pace, whenever it suits them. whether you're preparing for a job interview or just sharpening your skills, preppal is here to help take your interview preparation to the next level.",
      },
    ],
  },
  v2world: {
    title: "Armaan's World [v2]",
    subtitle: "second iteration of my personal website",
    year: "2025",
    type: "project",
    repoUrl: "https://github.com/dev-Armaan/armaans-world-v2",
    image: "/aworld.png",
    contents: [
      "modern & responsive ui",
      "optimized performance",
      "integrated email functionality",
      "cross-device compatibility",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "you're on it right now! this is the second iteration of my personal portfolio website, designed with a sleek, modern, and fully responsive user interface. built using typescript, react, next.js, and tailwind css, the site provides a seamless experience across all devices while maintaining optimized performance. it serves as a central hub to showcase my skills, past experiences, projects, and more, offering an interactive and intuitive browsing experience.",
      },
      {
        type: "text",
        content:
          "leveraging next.js for server-side rendering and vite for fast builds, the website is designed for speed and efficiency. integrated email functionality via emailjs allows visitors to contact me directly, ensuring seamless communication. deployed on vercel, the site benefits from automatic optimizations and a globally distributed network for minimal load times.",
      },
      {
        type: "image",
        src: "/aworld3.png",
        alt: "Armaan's world v2 screenshot",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "beyond aesthetics, this portfolio emphasizes functionality and accessibility, ensuring a smooth experience whether viewed on a desktop, tablet, or mobile device. with a focus on performance, responsiveness, and a refined ui, this iteration of my portfolio represents a polished, professional, and interactive showcase of my work.",
      },
    ],
  },
  landingx: {
    title: "Founder @ LandingX",
    subtitle: "created a web dev company for business and personal purposes",
    year: "2024",
    type: "job",
    image: "/landingx.png",
    contents: [
      "app development",
      "client & team communication",
      "performance optimization",
      "cross-device compatability",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "as the ceo and founder of landingx, i focused on building modern, responsive web applications that met client needs through tailored, cutting-edge solutions. for each project, i first took the time to understand the specific requirements and objectives of the client, gathering insights into their target audience and business goals. using technologies like react.js and node.js, i created dynamic user interfaces and scalable backends to ensure the applications were not only functional but also aesthetically appealing.",
      },
      {
        type: "text",
        content:
          "i used three.js for interactive 3d visuals when the project demanded a more immersive user experience. leveraging tailwind css, i was able to quickly implement customizable styles while ensuring a consistent look and feel across devices, achieving seamless cross-device compatibility. to further ensure quality, i continuously tested applications on various screen sizes and browsers.",
      },
      {
        type: "image",
        src: "/lxinsta.png",
        alt: "Fitness app interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "on the deployment side, i utilized vercel and aws to host applications, optimizing performance through content delivery networks (cdns) and fine-tuning load times by up to 30%. in doing so, i ensured a smooth and fast user experience, even with high traffic.",
      },
      {
        type: "text",
        content:
          "my role also involved direct communication with clients, where i translated their needs into technical solutions, ensuring alignment between business objectives and the development process. i worked closely with team members, iterating on designs and implementing features based on feedback. my focus on client satisfaction led to a 95% client retention rate.",
      },
      {
        type: "image",
        src: "/lxdemo.png",
        alt: "Fitness app interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "by managing the full-stack development workflow using vite, npm, and git, i ensured seamless collaboration, version control, and deployment pipelines, which made the development process more efficient and streamlined. this allowed me to scale the business and deliver high-quality web applications to clients.",
      },
    ],
  },
  codeninjas: {
    title: "sensai & camp leader @ code ninjas",
    subtitle: "developed cirriculum & taught students",
    year: "2024",
    type: "job",
    image: "/cninjas2.png",
    contents: [
      "curriculum development",
      "game development",
      "code reviews",
      "collaboration with cross-functional teams",
      "edtech integration",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "during my time at code ninjas, i was responsible for developing an engaging programming curriculum for both beginners and intermediate learners. i focused on integrating lua, game development concepts, and computational thinking into the lessons to help students build a strong foundation in coding while keeping them engaged through interactive tutorials and games.",
      },
      {
        type: "text",
        content:
          "i designed and optimized educational games using lua and roblox studio, ensuring that students could apply what they learned in real-time through hands-on projects. by leveraging scripting apis, i enhanced game mechanics and interactivity, which increased student engagement and retention by 30%.",
      },
      {
        type: "image",
        src: "/cninjas3.png",
        alt: "code ninjas class",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "working closely with a cross-functional team, including designers and educators, i ensured the curriculum met industry standards and aligned with the latest trends in educational technology (edtech). i also conducted code reviews, providing feedback to learners to improve their coding skills and problem-solving abilities. this experience gave me a strong foundation in edtech integration, game development, and fostering a collaborative environment for effective learning.",
      },
    ],
  },
  v1world: {
    title: "Armaan's World [v1]",
    subtitle: "first iteration of my personal website",
    year: "2024",
    type: "project",
    image: "/v1aworld2.png",
    repoUrl: "https://github.com/dev-Armaan/armaans-world",
    contents: [
      "interactive 3d models",
      "modern ui",
      "vite tool",
      "email functionality",
      "aws amplify deployment",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "this project is a personal portfolio website built with a clean and modern ui, featuring interactive 3d models that enhance the user experience. leveraging technologies like javascript, html/css, react, node.js, tailwind css, three.js, emailjs, and vite, i created a visually engaging site that showcases my skills, past experiences, and projects. the website includes links to my socials, resume, and a tech stack display, all presented with an intuitive layout.",
      },
      {
        type: "text",
        content:
          "one of the standout features of the site is the interactive 3d models, such as a customizable pc setup, floating tech stack balls, and a rotating globe, providing a dynamic and engaging browsing experience. the project is deployed using aws amplify, ensuring fast load times and reliable performance across devices.",
      },
      {
        type: "image",
        src: "/v1aworld.png",
        alt: "code ninjas class",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "email functionality was integrated using emailjs, allowing visitors to contact me directly through the website. the use of vite as a build tool ensures fast load times and an efficient development process. this portfolio demonstrates both my front-end development skills and my ability to integrate creative and interactive elements into web design.",
      },
    ],
  },
  tks: {
    title: "AI INNOVATOR @ TKS",
    subtitle: "9-month human accelerator program",
    year: "2024",
    type: "program",
    image: "/tks.png",
    repoUrl: "https://tks.life/profile/armaan.gupta#portfolio",
    contents: [
      "deep learning research",
      "cnn development & optimization",
      "technical competitions",
      "cibc & mastercard consulting",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "during my time at tks, i had the opportunity to work on some exciting, cutting-edge ai projects with a focus on leveraging machine learning to address real-world business challenges. one of the key projects i led was a comprehensive 8-year strategy for cibc to attract and retain genz customers. this strategy involved extensive research into customer behavior and preferences, and i used this data to design a mobile app prototype that integrated react, node.js, and aws for a scalable, efficient backend. the app included automation features to streamline the user experience and enhance personalization for genz users. this work required me to balance technical considerations with business needs, ensuring the solution aligned with cibc's long-term goals.",
      },
      {
        type: "image",
        src: "/mnist.png",
        alt: "code ninjas class",
        width: 400,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "in addition to my work with cibc, i dedicated significant time to advancing my knowledge of deep learning, particularly in the areas of natural language processing (nlp) and computer vision (cv). my r&d work focused on optimizing cnn architectures, which led to breakthroughs like improving a text recognition model to 99.5% accuracy, while also enhancing its speed by 27%. i also applied these improvements to other classification tasks, boosting their performance by 15%. these results were a direct outcome of my experimentation with new techniques, such as incorporating attention mechanisms into the cnn, as well as my implementation of advanced data augmentation methods to address overfitting.",
      },
      {
        type: "image",
        src: "/tksmc.png",
        alt: "code ninjas class",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "my efforts were recognized when i won separate technical competitions hosted by the mastercard foundation and cibc, which further cemented my understanding of how emerging technologies can be integrated into business operations. these wins opened doors for me to consult directly with executives at both organizations, where i provided insights into the future integration of ai and machine learning into their systems. through these consultations, i gained invaluable experience working with senior leaders to translate technical ideas into actionable business strategies, ensuring the seamless adoption of new technologies that drive innovation and competitive advantage.",
      },
    ],
  },
  hippocampus: {
    title: "cirriculum dev @ hippocampus",
    subtitle: "developed programming cirriculum",
    year: "2022",
    type: "job",
    image: "/hcampus2.jpg",
    contents: [
      "interactive learning",
      "consumer-focused modules",
      "cross-team collaboration",
      "code reviews",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "at hippocampus learning, i played a key role in developing engaging, educational programming curriculums for beginner and intermediate students. collaborating closely with a cross-functional team, i helped create summer camp modules that balanced learning outcomes with fun, interactive content. using block-based programming platforms and robotics applications, i designed lesson plans that were both accessible and challenging, ensuring students developed key computational thinking skills while staying engaged.",
      },
      {
        type: "image",
        src: "/hcampus5.jpg",
        alt: "hippocampus class",
        width: 600,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "through regular communication with my superiors and team members, i ensured that each module aligned with the needs of the learners, while also pushing their boundaries in terms of programming concepts and problem-solving. one of my main responsibilities was to assess the educational materials and adapt them as needed to make sure they resonated with the students.",
      },
      {
        type: "image",
        src: "/hcampus4.jpg",
        alt: "hippocampus student",
        width: 600,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "i also participated in code reviews, providing constructive feedback to young programmers on how they could improve their code, learn new techniques, and deepen their understanding of programming concepts. this experience helped me foster an environment of continuous learning, where students felt motivated to improve and were encouraged to take risks in their coding journey. overall, my work at hippocampus learning was a fulfilling opportunity to contribute to the next generation of coders while refining my skills in curriculum development, interactive learning, and teamwork.",
      },
    ],
  },
};

// Helper function to get all project slugs
export function getProjectSlugs(): string[] {
  return Object.keys(projectsData);
}

// Helper function to get a project by slug
export function getProject(slug: string): Project | undefined {
  return projectsData[slug];
}


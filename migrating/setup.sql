-- Complete Database Setup Script
-- Combined blog and projects setup with proper dependency management
-- Run this file with: psql -d your_database_name -f combined_setup.sql
-- Drop tables if they exist (for clean setup)
-- Drop in reverse dependency order
DROP TABLE IF EXISTS project_tags CASCADE;
DROP TABLE IF EXISTS blog_post_tags CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
-- Drop function if it exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
-- Create the function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';
-- Create the tags table (shared by both blog posts and projects)
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create the blog_posts table
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create the projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(500),
    links JSONB,
    artifacts JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create the junction table for blog posts and tags
CREATE TABLE blog_post_tags (
    id SERIAL PRIMARY KEY,
    blog_post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(blog_post_id, tag_id)
);
-- Create the junction table for projects and tags
CREATE TABLE project_tags (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, tag_id)
);
-- Create indexes for performance
CREATE INDEX idx_blog_post_tags_blog_post_id ON blog_post_tags(blog_post_id);
CREATE INDEX idx_blog_post_tags_tag_id ON blog_post_tags(tag_id);
CREATE INDEX idx_project_tags_project_id ON project_tags(project_id);
CREATE INDEX idx_project_tags_tag_id ON project_tags(tag_id);
CREATE INDEX idx_tags_name ON tags(name);
-- Create triggers to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE
UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE
UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Insert all tags (consolidated from both files)
INSERT INTO tags (name)
VALUES ('2022'),
    ('3d'),
    ('ai'),
    ('article'),
    ('blender'),
    ('electronics'),
    ('example'),
    ('experience'),
    ('flutter'),
    ('images'),
    ('internship'),
    ('javascript'),
    ('links'),
    ('mobile development'),
    ('notes'),
    ('programming'),
    ('project'),
    ('resume'),
    ('robotics'),
    ('summer'),
    ('tags'),
    ('test'),
    ('university'),
    ('web'),
    ('website');
-- Insert blog posts
INSERT INTO blog_posts (title, description, body, created_at, updated_at)
VALUES (
        'Making my Website',
        'A short article about my experience making this website',
        '<h1>Why did I make my website?</h1><p>During the summer of 2021, I first learned about <a href="https://nodejs.org/en" rel="noopener noreferrer" target="_blank">Node.js</a>. My first experience with JavaScript was learning basic HTML in middle school, adding code between script tags to make the text change when the mouse hovered over it and little things like that. Node changed my whole paradigm with JavaScript, allowing me to run JavaScript directly on my computer or even a cloud server. At the same time, I was introduced to JavaScript frameworks that I could use to make my own website fully in JavaScript. Therefore, for my summer I decided to try and make my own responsive website using this technology that I had recently learned about.</p><p>My first trial at a website used <a href="https://vuejs.org/" rel="noopener noreferrer" target="_blank">Vue.js</a>, a popular open source component framework, and <a href="https://expressjs.com/" rel="noopener noreferrer" target="_blank">Express</a> for the back-end. While I was able to make a working website on my own computer, I ran into scaling issues trying to host my website, since it required two separate running instances of Node for the front and back ends. I had experimented with using <a href="https://www.docker.com/" rel="noopener noreferrer" target="_blank">Docker</a> Compose for this, but I didn''t have enough experience with hosting on the cloud to maintain my own server running Docker.</p><p>My next attempt the following summer had more success. Instead of using Vue, which lacked in developer support, I switched to using <a href="https://react.dev/" rel="noopener noreferrer" target="_blank">React</a>. the most popular JavaScript component framework created at Facebook. I was able to learn this entirely new framework relatively easily not only because of the greater access to resources on the Internet, but also because my previous experience with Vue gave me a more solid foundation with developing with JavaScript and Node. I wasn''t able to host my website during that summer either, but this year that changed.</p><h1>How did I make my website?</h1><p>As I started my first year at Santa Clara University, I discovered a new hosting platform called <a href="https://vercel.com/home" rel="noopener noreferrer" target="_blank">Vercel</a>. Their solutions offered an intuitive interface for hosting and maintaining my own website. I couldn''t recommend them enough! Their website allowed me to easily access deployments in both preview and production environments, sync environment variables between my local system and the server, and even <a href="https://vercel.com/storage/postgres" rel="noopener noreferrer" target="_blank">manage my own PostgreSQL database</a>. Because I didn''t have to worry about hosting, I could productively iterate on my website design and make much more progress than my previous attempts.</p><p>While I still used React components, I also used another Vercel technology in my website, <a href="https://nextjs.org/" rel="noopener noreferrer" target="_blank">NextJS</a>, a more robust framework that synergized with my production workflow. To make my website look nice, I used <a href="https://tailwindcss.com/" rel="noopener noreferrer" target="_blank">TailwindCSS</a>, a utility-class-based CSS framework, and <a href="https://daisyui.com/" rel="noopener noreferrer" target="_blank">DaisyUI</a>, a component framework that made my designs more consistent across web pages. I used <a href="https://www.prisma.io/" rel="noopener noreferrer" target="_blank">Prisma</a> as an <a href="https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping" rel="noopener noreferrer" target="_blank">ORM</a>, or object-relational mapping, which allowed me to query my SQL database using JavaScript code. To store images for my portfolio entries, I used <a href="https://aws.amazon.com/s3/" rel="noopener noreferrer" target="_blank">AWS S3</a>, a file hosting service, which gave me experience working with cloud servers.</p><p>The most important technology I used when making this website was <a href="https://www.typescriptlang.org/" rel="noopener noreferrer" target="_blank">TypeScript</a>, a superset of JavaScript that incorporates static typing features in a dynamically typed language. In short, TypeScript makes my code more readable, maintainable, and debuggable. While TypeScript is still an emerging technology, I hope to be able to use it in future web projects.</p><h1>Main Challenges</h1><p>The biggest challenge I faced when finishing this website was, well, finishing! Without a clear goal in mind, it''s hard to know when to stop and create a finished project. I recognize that I tend to focus on extremely small features or aesthetic bugs that don''t contribute to my main project rather than trying to get something that works as intended. By working on this project, especially over the final week, I learned how to meaningfully prioritize features within a project to boost my productivity.</p><p>I also faced some challenges stitching the back end and the front end through my APIs. NextJS combines support for front end and back end development through an API directory, but I also needed to ensure that my NextJS API endpoints, my SQL database, and my S3 files were all synchronized when a request was made. A lot of my time was spent just making sure that the images could be sent to the cloud at all! I struggled the most with this because I didn''t have that much experience with the cloud, but after going over the documentation from Amazon and from Prisma, I was able to overcome these challenges and create a finished product.</p><h1>What I Learned</h1><p>More-so that programming knowledge, I think this whole website making experience taught me how I should organize my projects going forward. My previous attempts at making a website failed because I didn''t think about web hosting until it became too late to easily add features or check for bugs. Before starting a new project, I now plan on formulating a prototype of my front end and back end using online tools such as <a href="https://www.figma.com/" rel="noopener noreferrer" target="_blank">Figma</a> or even just drawing out flow charts of my APIs. All in all, I am happy that I was able to finish my website and learn so much during the process!</p>',
        '2023-08-03 21:58:54.645',
        '2023-08-04 00:05:45.331'
    ),
    (
        'My Experience with Flutter',
        'My experience working with Flutter in my internship and my personal projects.',
        '<p>I recently started an online internship at <a href="https://einnel.com/" rel="noopener noreferrer" target="_blank">EinNel Technologies</a>, a company in India which I had a connection to. So far, it has been a great learning experience, not only for expertise with certain programming tools, but also with working in an active team. I was assigned to the mobile development team, where we use Flutter to create our mobile apps.</p><p>I have had some previous experience Flutter, the mobile development framework, and Dart, the language Flutter uses. Funnily enough, it was also when I was working with a team in India! During my previous time working on a Flutter project, I didn''t understand too much, and mostly helped around with maintaining our version control and selling our app to our church members.</p><p>Now, by working in a more professional capacity with Flutter, I''ve definitely learned a lot more. The hands-on experience working at EinNel has been a great boost to my career. But before I keep writing about my experience with Flutter, what even is it?</p><h2>What is Flutter and Dart?</h2><p><a href="https://flutter.dev/" rel="noopener noreferrer" target="_blank">Flutter</a> is an open-source UI software development framework created by Google. It''s designed to help developers build natively compiled applications for mobile, web, and desktop from a single codebase. Flutter allows developers to create beautiful and highly customizable user interfaces with ease. It achieves this through a rich set of pre-designed widgets that can be easily customized to match the desired look and feel of your app. Flutter has gained popularity for its fast-growing community, extensive documentation, and robust ecosystem of packages, making it a versatile choice for building cross-platform mobile applications.</p><p><a href="https://dart.dev/" rel="noopener noreferrer" target="_blank">Dart</a> is the programming language that powers Flutter. Developed by Google, Dart is a modern, object-oriented language known for its simplicity and efficiency. Dart''s syntax is similar to Java or Kotlin, which are also used for mobile app development. Dart''s concise syntax and strong type system make it relatively easy to learn and maintain, even for developers with varying levels of experience. It also boasts a well-structured package manager, [Pub](https://pub.dev/), which simplifies the process of adding third-party libraries to your Flutter project. With Dart as the foundation, Flutter provides a powerful and efficient environment for building cross-platform mobile apps, ensuring not only beautiful UIs but also excellent performance across different devices and platforms.</p><h2>What I worked on</h2><p>At EInNel, my first project was to re-create their attendance app using Flutter. My boss split up the work into smaller steps and gave each of them to me as daily or weekly tasks. For example, one day I would work on just the login page, then the next day just the profile page. At first the tasks were straightforward, introducing me to the variety of widgets that Flutter uses to manage the app''s front-end UI. Eventually I started to work on connecting the front-end I had made to the back-end infrastructure that EInNel used. Working on this part of the project was much harder for me because I had to deal with several APIs, all with different specifications. Figuring out whether to use a POST or a GET request was unclear to me at first, and even if I could figure it out, debugging any issues I faced would take a very long time and leave me frustrated. Even though the difficulty of my assignment increased, I am still continuing to learn and grow through my experience.</p><h2>Personal Project</h2><p>While working on the front-end of the project at EinNel, I still wanted to learn more about the capabilities of Flutter. So, I decided to start on my own personal project that used Flutter. I wanted to create a <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" rel="noopener noreferrer" target="_blank">pomodoro timer</a>, which I have been using since high school to keep me focused and productive. If I could successfully make this app, I could use it to manage my time better, and maybe even help other people too!</p><h3>Highs</h3><p>I started making the timer app by working on the front-end first, which was very fun. I discovered neumorphic design, which creates this 3d effect for buttons and other widgets. Although it has its issues with accessibility, I still wanted to try it out and see it in a real app. I also started to use Figma for app design, which was a tool I wasn''t familiar with at first. I started to get the hang of it as I iterated upon my front-end design, and I hope to use it more extensively in my future projects.</p><h3>Lows</h3><p>Things started getting more difficult when adding the back-end. I guess that back-end is not my strong suit! Instead of API calls to an external server. The problem arose when testing my app on a physical device. When testing a Flutter app, I usually start with running my app on a phone simulator, such as the iOS simulator provided on Mac computers with Xcode. Programs run differently on the simulator, so you can''t do any performance or UX testing through a simulator. When I was happy with the results on the simulator, I tried to run my app on my iPhone. I encountered a bug where the timer would stop if the app wasn''t running in the foreground, but would instead pause. I did some research on the issue and found that making a timer app in Flutter requires making platform-specific changes, meaning that timers work differently on Android and iOS. Because of this roadblock, I started to give up on this project. Recently, however, I changed my goals for this project and am willing to try it again, just with some slightly different functionality. I also want to write a longer blog post just about this app <s>if</s> when I finish it.</p><h2>Wrap Up</h2><p>In general, I have had a very positive experience programming with Flutter. With support from my boss at EinNel, I am learning a lot about the framework through hands-on experience. Working on my personal project, the pomodoro timer, has also taught me not only more about Flutter, but also important concepts in mobile app development in general, such as testing, debugging, and specification.</p>',
        '2023-09-20 18:31:41.474',
        '2023-09-20 18:31:41.474'
    ),
    (
        'Obsidian: My Second Brain?',
        'My thoughts on Obsidian as a note-taking app and a mental tool to map out my thoughts.',
        '<p>In the quest for the perfect note-taking application, I stumbled upon <a href="https://obsidian.md/" rel="noopener noreferrer" target="_blank">Obsidian</a>, a powerful tool that promised to revolutionize the way I organize my thoughts and ideas. Eager to make the most of it, I dove headfirst into customization, experimenting with various extensions and settings to tailor the app to my liking.</p><p><br></p><p>At first, I was drawn to the idea of creating a visually appealing workspace, filled with widgets and themes that reflected my personality. However, as I delved deeper into the functionality of Obsidian, I realized that simplicity was key. Instead of overwhelming myself with unnecessary add-ons, I focused on incorporating extensions that truly enhanced my workflow.</p><p><br></p><p>Among the plethora of extensions available, two stood out as game-changers: Ollama and Excalidraw. <a href="https://ollama.com/" rel="noopener noreferrer" target="_blank">Ollama</a>, with its locally running LLM, provided me with invaluable summarization capabilities. Whether I needed to condense lengthy notes into bullet points or delve deeper into a topic, Ollama was there to assist me, especially during my upper division classes in college.</p><p><br></p><p>Another gem in Obsidian''s arsenal was <a href="https://excalidraw.com/" rel="noopener noreferrer" target="_blank">Excalidraw</a>, a tool that simplified the creation of flowcharts and diagrams. As a student grappling with complex algorithms and state machines, Excalidraw proved to be indispensable in visually representing abstract concepts, making studying and comprehension a breeze.</p><p><br></p><p>Despite the hype surrounding Obsidian as a "second brain," I found myself gravitating towards a different perspective. While I appreciated its organizational features and the ability to establish connections between notes, what truly resonated with me was the sense of ownership and control it provided over my data.</p><p><br></p><p>Unlike online services like Notion or Google Docs, where my notes felt transient and susceptible to external influences, Obsidian offered a sanctuary for my thoughts. My notes belonged to me and me alone, and it was empowering to be the architect of my own knowledge repository.</p><p><br></p><p>In essence, Obsidian isn''t just a "second brain" – it''s the manifestation of my first brain, meticulously laid out across all my devices. It''s a tool that empowers me to take ownership of my learning journey, connecting the dots and shaping my understanding of the world around me. And for that, I''m grateful.</p>',
        '2024-02-20 01:45:34.349',
        '2024-02-20 01:45:34.349'
    );
-- Insert projects
INSERT INTO projects (
        id,
        created_at,
        updated_at,
        title,
        description,
        thumbnail,
        links,
        artifacts
    )
VALUES (
        1,
        '2023-08-03 03:23:30.349+00',
        '2023-08-03 18:35:30.05+00',
        'ENGR 1 Lab',
        'During my winter quarter of my first year at Santa Clara University, I took the general engineering lab that all engineering students take to learn more about the engineering process in various fields. Every week we would have a new project that would teach us about a new field of engineering and how engineers in these fields solve problems. For one of the weeks, we learn about biomechanics by designing a hand extension out of cardboard, straws, string, and glue. From these simple elements, we were able to create a functional arm that could pick up ping pong balls and even a roll of tape! By using engineering concepts, my lab group and I were able to create something functional despite the material constraints. For the last four weeks of the lab, we had to create our own robot using any of the materials provided by the lab. This project gave us the freedom of making our own goal and designing for it, but also required us to use at least one moving component to incorporate robotics into our final design. My group and I decided to create a small RC car with a cardboard chassis, an Arduino to control the motors and sensors, and a joystick to accept human input. We were able to demo our final design during the lab''s final robot show and receive a passing grade.',
        'https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/thumbnails/3g5Dh1AoSSYryVfxCqQXg.png',
        '[{"url": "https://www.tinkercad.com/things/cbe7wxuGd0w", "title": "CAD of our robot''s electronics"}]'::jsonb,
        '[{"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/ZESTkKcP5Zktd2SEhTnXb.jpg", "alt": "Cardboard Prosthetic Hand", "type": "image"}, {"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/Y-d5uZXEiQVKNOvNrHJTj.jpg", "alt": "Our final robot, nicknamed the \"Yerba Mate JC Kart\"", "type": "image"}]'::jsonb
    ),
    (
        2,
        '2023-08-03 03:37:49.33+00',
        '2023-08-03 18:20:26.602+00',
        'August 2022 Blender Challenge',
        'In August 2022, I participate in a small online competition to create a new summer-related scene in Blender for each week of August. I was able to complete three of the four weeks, and along the way I learned more about 3d rendering, especially in Blender. For two of my three finished scenes, I used Blender''s Eevee rendering engine, which prioritizes speed and style over realism. Instead of trying to make something that looked real, I tried to many something unique that was only possible with 3d rendering software. I ended up making a summer drink, a beach chair, and a sandcastle, each using different styles, textures, and rendering methods. From this project, I learned how to think outside the box when designing renders and use computer rendering software in a way that no other medium can.',
        'https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/thumbnails/fAJt4m33oFUpoCou4iteT.png',
        '[{"url": "https://www.youtube.com/watch?v=n9ZNGVvMOSQ", "title": "Tutorial for the rendering technique I used"}, {"url": "https://www.blender.org/", "title": "Learn more about Blender"}]'::jsonb,
        '[{"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/3UUzU9n-fS6-Y83wGvvsG.png", "alt": "Summer Drink", "type": "image"}, {"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/YbnHSei4E6g7qo8xka0jm.png", "alt": "Beach Chair", "type": "image"}, {"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/2pWOVbn6L_3jJD-5gWhW2.png", "alt": "Sandcastle", "type": "image"}]'::jsonb
    ),
    (
        3,
        '2024-02-19 22:59:07.128+00',
        '2024-02-19 22:59:07.128+00',
        'CodeNest',
        'CodeNest is a fully-featured, web-based code editor that allows anyone to implement their ideas without any need to install new software. Through our platform, you can access any development environment, create a new project in any programming language, and run it hassle-free on the cloud, all without leaving your browser window. We initially started CodeNest to gain experience working on a large project as a group. Eventually, CodeNest became a proof-of-concept, an idea that we could keep building into a reality. Our goal is that CodeNest becomes a gateway to new programmers, making coding more accessible to the world.',
        'https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/thumbnails/P24S2nircV9Ntxq88mVwk.png',
        '[{"url": "https://www.codenest.space/", "title": "CodeNest"}, {"url": "https://github.com/Jeshwin/codenest", "title": "Source Code"}]'::jsonb,
        '[{"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/9S-nN4ap3EDh0Hj5L73RM.png", "alt": "Landing page I designed with colorful moving background", "type": "image"}, {"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/O3Ra2YYFAxsRzL1x3q4QA.png", "alt": "Prototype design for the code editor, made in Figma", "type": "image"}]'::jsonb
    ),
    (
        4,
        '2024-12-02 06:31:01.779+00',
        '2024-12-02 06:31:01.779+00',
        'Toucanny',
        'While working on another one of my personal projects, CodeNest, I wanted a custom solution for generating a default username and avatar when a user signs up. Currently, we are using Auth0 to handle user login and signup, and they already create a default avatar using Gravatar, but I found it to be too boring, just the user''s initials and a background color 😴. So, I decided to make my own version, and add a username generator on top.

My objective for this project was to create a username and avatar generator that generates a unique username and avatar for each new user, with no chance for duplicates, and creates a memorable and interesting output, not just random characters and a bland image.',
        'https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/thumbnails/eGBXOsx_EZ91TKJ-81eHj.jpg',
        '[{"url": "https://api.toucanny.net/", "title": "Toucanny Website"}, {"url": "https://github.com/Jeshwin/toucanny", "title": "GitHub Repo"}]'::jsonb,
        '[{"url": "https://jeshwin-portfolio-bucket.s3.us-west-1.amazonaws.com/gallery/QUxwDXD25XDq5PASM3vQx.png", "alt": "Some example avatars generated using Toucanny", "type": "image"}]'::jsonb
    );
-- Insert blog post tags relationships
INSERT INTO blog_post_tags (blog_post_id, tag_id)
SELECT 1,
    id
FROM tags
WHERE name IN ('website', 'javascript', 'project');
INSERT INTO blog_post_tags (blog_post_id, tag_id)
SELECT 2,
    id
FROM tags
WHERE name IN ('flutter', 'mobile development', 'internship');
INSERT INTO blog_post_tags (blog_post_id, tag_id)
SELECT 3,
    id
FROM tags
WHERE name IN ('notes', 'ai', 'experience');
-- Insert project tags relationships
INSERT INTO project_tags (project_id, tag_id)
SELECT 1,
    id
FROM tags
WHERE name IN ('university', 'electronics', 'robotics');
INSERT INTO project_tags (project_id, tag_id)
SELECT 2,
    id
FROM tags
WHERE name IN ('blender', '3d', 'summer', '2022');
INSERT INTO project_tags (project_id, tag_id)
SELECT 3,
    id
FROM tags
WHERE name IN ('web', 'programming', 'website');
INSERT INTO project_tags (project_id, tag_id)
SELECT 4,
    id
FROM tags
WHERE name IN ('web', 'programming', 'website');
-- Reset sequences to continue from the next available ID
SELECT setval(
        'blog_posts_id_seq',
        (
            SELECT MAX(id)
            FROM blog_posts
        )
    );
SELECT setval(
        'projects_id_seq',
        (
            SELECT MAX(id)
            FROM projects
        )
    );
SELECT setval(
        'tags_id_seq',
        (
            SELECT MAX(id)
            FROM tags
        )
    );
-- Verification queries
SELECT 'Setup Complete!' as status;
SELECT 'Blog Posts:' as table_name,
    COUNT(*) as count
FROM blog_posts
UNION ALL
SELECT 'Projects:' as table_name,
    COUNT(*) as count
FROM projects
UNION ALL
SELECT 'Tags:' as table_name,
    COUNT(*) as count
FROM tags
UNION ALL
SELECT 'Blog Post Tags:' as table_name,
    COUNT(*) as count
FROM blog_post_tags
UNION ALL
SELECT 'Project Tags:' as table_name,
    COUNT(*) as count
FROM project_tags;
-- Sample query to verify blog posts with tags
SELECT bp.id,
    bp.title,
    bp.created_at,
    STRING_AGG(
        t.name,
        ', '
        ORDER BY t.name
    ) as tags
FROM blog_posts bp
    LEFT JOIN blog_post_tags bpt ON bp.id = bpt.blog_post_id
    LEFT JOIN tags t ON bpt.tag_id = t.id
GROUP BY bp.id,
    bp.title,
    bp.created_at
ORDER BY bp.created_at DESC;
-- Sample query to verify projects with tags
SELECT p.id,
    p.title,
    p.created_at,
    STRING_AGG(
        t.name,
        ', '
        ORDER BY t.name
    ) as tags
FROM projects p
    LEFT JOIN project_tags pt ON p.id = pt.project_id
    LEFT JOIN tags t ON pt.tag_id = t.id
GROUP BY p.id,
    p.title,
    p.created_at
ORDER BY p.created_at DESC;
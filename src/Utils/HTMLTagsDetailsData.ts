export const semanticElements = {
    header: {
        description: "The <code><header></code> element represents introductory content, typically containing branding, navigation, or headings. It is commonly used at the top of a page or section.",
        bestPractice: [
            "Use <code>header</code> at the beginning of a page, article, or section.",
            "Can include <code>h1-h6</code>, <code>nav</code>, and search forms."
        ],
        commonMistake: [
            "Using multiple <code>header</code> elements unnecessarily.",
            "Placing it inside <code>footer</code> or <code>aside</code>."
        ],
        seoBenefits: [
            "Improves page structure for search engines.",
            "Enhances accessibility for screen readers."
        ],
        accessibilityBenefits: "Groups introductory content, making it easier for users to understand the context of the following content.",
        example: `<header>
  <h1>Website Name</h1>
  <!-- Navigation Menu -->
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </nav>
</header>`
    },
    nav: {
        description: "The <code><nav></code> element represents a section of a page containing navigation links. It helps structure the navigation system of a website, such as menus or table of contents.",
        bestPractice: [
            "Use <code>nav</code> for primary navigation only.",
            "Provide an <code>aria-label</code> for better accessibility."
        ],
        commonMistake: [
            "Using <code>nav</code> for small sets of unrelated links.",
            "Placing too many unrelated links inside <code>nav</code>."
        ],
        seoBenefits: [
            "Helps search engines understand site structure.",
            "Improves navigation for users."
        ],
        accessibilityBenefits: "Helps screen readers identify navigation regions and allows users to quickly find and navigate through different sections of the website.",
        example: `<nav aria-label="Main Navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`
    },
    main: {
        description: "The <code><main></code> element represents the dominant content of a webpage. It contains the primary information that is unique to the page and should not be duplicated across multiple pages.",
        bestPractice: [
            "Use only one <code>main</code> element per page.",
            "Place directly inside <code>body</code>."
        ],
        commonMistake: [
            "Using multiple <code>main</code> elements.",
            "Placing <code>main</code> inside <code>article</code> or <code>section</code>."
        ],
        seoBenefits: [
            "Helps search engines identify primary content.",
            "Improves accessibility for screen readers."
        ],
        accessibilityBenefits: "Allows screen readers to jump directly to the main content, skipping navigation and other repeated elements.",
        example: `<main>
  <h1>Welcome to My Website</h1>
  <p>This is the main content of the page.</p>
</main>`
    },
    section: {
        description: "The <code><section></code> element represents a thematic grouping of content, typically with a heading. It is commonly used to divide a webpage into distinct sections such as introductions, features, or testimonials.",
        bestPractice: [
            "Each <code>section</code> should have a heading.",
            "Use for related content blocks."
        ],
        commonMistake: [
            "Using <code>section</code> for styling purposes only.",
            "Omitting a heading within <code>section</code>."
        ],
        seoBenefits: [
            "Improves content organization for search engines.",
            "Enhances readability and navigation."
        ],
        accessibilityBenefits: "Helps organize content into logical sections, making it easier for users to understand the structure and navigate the content.",
        example: `<section>
  <h2>About Us</h2>
  <p>We provide web development services.</p>
</section>`
    },
    article: {
        description: "The <code><article></code> element represents a self-contained piece of content that can be independently distributed or reused. It can be used for blog posts, news articles, or other content that could be syndicated or reused elsewhere.",
        bestPractice: [
            "Use for content that can be independently distributed.",
            "Include a heading to describe the content."
        ],
        commonMistake: [
            "Using <code>article</code> for non-independent content.",
            "Nesting <code>article</code> elements without need."
        ],
        seoBenefits: [
            "Improves indexing of individual articles.",
            "Helps search engines understand content hierarchy."
        ],
        accessibilityBenefits: "Helps screen readers identify independent, self-contained content. Makes it easier for users to navigate between different pieces of content.",
        example: `<article>
  <h2>Blog Post Title</h2>
  <p>This is an example of a blog post content.</p>
  <footer>
    <p>Author: John Doe</p>
  </footer>
</article>`
    },
    aside: {
        description: "The <code><aside></code> element is used for content that is tangentially related to the main content, such as sidebars, advertisements, or related links. It provides additional information but is not essential to the main flow.",
        bestPractice: [
            "Use for content that complements the main content.",
            "Place inside <code>article</code> or <code>main</code> if relevant."
        ],
        commonMistake: [
            "Placing essential content inside <code>aside</code>.",
            "Using <code>aside</code> for primary content."
        ],
        seoBenefits: [
            "Distinguishes secondary content from main content.",
            "Improves user navigation and content scanning."
        ],
        accessibilityBenefits: "Indicates supplementary content that can be skipped without losing the main context of the page.",
        example: `<aside>
  <h2>Related Posts</h2>
  <ul>
    <li><a href="#">How to Learn HTML</a></li>
    <li><a href="#">Best CSS Practices</a></li>
  </ul>
</aside>`
    },
    footer: {
        description: "The <code><footer></code> element represents footer content, typically including information like copyrights, contact details, or navigation links. It is usually placed at the bottom of the page or section.",
        bestPractice: [
            "Use at the end of <code>body</code>, <code>article</code>, or <code>section</code>.",
            "Include site-wide links, copyright, or contact information."
        ],
        commonMistake: [
            "Including main navigation inside <code>footer</code>.",
            "Overloading <code>footer</code> with excessive links."
        ],
        seoBenefits: [
            "Provides context and additional navigation.",
            "Enhances website credibility and trust."
        ],
        accessibilityBenefits: "Helps users identify concluding information and additional resources related to the content.",
        example: `<footer>
  <p>&copy; 2024 My Website. All rights reserved.</p>
  <nav>
    <ul>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms of Service</a></li>
    </ul>
  </nav>
</footer>`
    },
    details: {
        description: "The <code><details></code> element represents a disclosure widget from which the user can view or hide additional information. It’s typically used to hide content like FAQs or extra details.",
        bestPractice: [
            "Use <code>details</code> for content that is not always necessary but can be revealed on demand.",
            "Pair with <code>summary</code> to provide a clickable heading."
        ],
        commonMistake: [
            "Using <code>details</code> for critical content that should always be visible.",
            "Forgetting to include a <code>summary</code> element."
        ],
        seoBenefits: [
            "Improves user experience by hiding non-essential content.",
            "Allows search engines to crawl the hidden content."
        ],
        accessibilityBenefits: "Offers keyboard-accessible expandable content with built-in ARIA states that screen readers can announce.",
        example: `<details>
  <summary>Click to read more</summary>
  <p>This is additional information that is hidden by default.</p>
</details>`
    },
    figure: {
        description: "The <code><figure></code> element is used to group media content, such as images, videos, or illustrations, and their optional caption provided by <code><figcaption></code>. It represents a piece of content that is self-contained.",
        bestPractice: [
            "Use <code>figure</code> to wrap images, videos, or code blocks with a related caption.",
            "Pair with <code>figcaption</code> for proper description."
        ],
        commonMistake: [
            "Using <code>figure</code> for purely decorative images.",
            "Omitting <code>figcaption</code> when a caption is needed."
        ],
        seoBenefits: [
            "Helps search engines associate media content with descriptive captions.",
            "Improves accessibility for screen readers."
        ],
        accessibilityBenefits: "Groups related content semantically so screen readers can present it as a cohesive unit with its caption.",
        example: `<figure>
  <img src="image.jpg" alt="Beautiful landscape">
  <figcaption>A breathtaking view of the mountains at sunrise.</figcaption>
</figure>`
    },
    figcaption: {
        description: "The <code><figcaption></code> element provides a caption or description for a <code><figure></code> element. It is used to explain the content of a figure, like an image, chart, or diagram.",
        bestPractice: [
            "Use <code>figcaption</code> directly inside <code>figure</code>.",
            "Provide a meaningful description of the associated media."
        ],
        commonMistake: [
            "Placing <code>figcaption</code> outside <code>figure</code>.",
            "Using it for non-media content."
        ],
        seoBenefits: [
            "Gives additional context to images or media files.",
            "Improves accessibility by describing media elements."
        ],
        accessibilityBenefits: "Provides screen reader users with a text description that's programmatically associated with its figure content.",
        example: `<figure>
  <img src="sunset.jpg" alt="Sunset over the ocean">
  <figcaption>The sun sets over the Pacific Ocean, painting the sky with vibrant colors.</figcaption>
</figure>`
    },
    summary: {
        description: "The <code><summary></code> element is used as a clickable heading for a <code><details></code> element. It provides a short description or title for the collapsible content inside <code><details></code>.",
        bestPractice: [
            "Use <code>summary</code> as the first child of <code>details</code>.",
            "Keep the text short and descriptive to indicate what users can expect when expanded."
        ],
        commonMistake: [
            "Placing <code>summary</code> outside of <code>details</code>.",
            "Using multiple <code>summary</code> elements inside a single <code>details</code>."
        ],
        seoBenefits: [
            "Enhances accessibility by allowing users to control hidden content.",
            "Improves usability by clearly indicating expandable sections."
        ],
        accessibilityBenefits: "Provides visible label and clickable trigger for expandable content that screen readers identify as a button",
        example: `<details>
  <summary>Click to view details</summary>
  <p>This is the hidden content that will be revealed.</p>
</details>`
    },
    time: {
        description: "The <code><time></code> element is used to represent dates, times, or durations in a machine-readable format. It enhances accessibility and helps search engines recognize time-based data.",
        bestPractice: [
            "Use <code>time</code> for timestamps, event dates, and publication dates.",
            "Include the <code>datetime</code> attribute to specify the exact time in ISO 8601 format."
        ],
        commonMistake: [
            "Using <code>time</code> without the <code>datetime</code> attribute, making it less useful for machines.",
            "Misusing <code>time</code> for non-time-related content."
        ],
        seoBenefits: [
            "Helps search engines recognize important date-related information.",
            "Improves structured data for events, articles, and schedules."
        ],
        accessibilityBenefits: "Marks dates and times in a machine-readable format that assistive technologies can interpret and announce clearly",
        example: `<p>Published on 
<time datetime="2024-02-03">February 3, 2024</time>
</p>`
    },
    mark: {
        description: "The <code><mark></code> element is used to highlight text, often to indicate a search match or emphasize important information within a passage.",
        bestPractice: [
            "Use <code>mark</code> to highlight text that is relevant to user interaction or search results.",
            "Ensure the highlighted text has meaning in context."
        ],
        commonMistake: [
            "Using <code>mark</code> just for styling instead of meaningful highlighting.",
            "Applying it excessively, making text harder to read."
        ],
        seoBenefits: [
            "Helps emphasize important words, making content more user-friendly.",
            "Improves readability in search result pages."
        ],
        accessibilityBenefits: "Indicates highlighted text with semantic meaning that screen readers can announce as emphasized content",
        example: `<p>The word 
<mark>important</mark> is highlighted in this sentence.
</p>`
    },
    form: {
        description: "The <code><form></code> element represents an interactive section of a document where users can input and submit data. It is commonly used for login forms, search bars, and surveys.",
        bestPractice: [
            "Wrap input elements inside <code>form</code> to ensure proper form submission.",
            "Use the <code>action</code> attribute to specify where form data should be sent.",
            "Include <code>label</code> elements for better accessibility."
        ],
        commonMistake: [
            "Forgetting to set the <code>action</code> attribute, causing form submission issues.",
            "Not using <code>label</code> elements for input fields."
        ],
        seoBenefits: [
            "Forms improve user interaction and engagement.",
            "Search engines can process structured data from forms, such as contact forms and search bars."
        ],
        accessibilityBenefits: "Groups related form controls logically and provides a landmark that assistive technologies use for navigation",
        example: `<form action="/submit-form" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <button type="submit">Submit</button>
</form>`
    }
};
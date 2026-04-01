// News articles data and functionality

const articles = [
  {
    id: 1,
    title: 'November 2025: Strengthening Partnerships for Productive Use Leveraging Solar Energy (PULSE)',
    category: 'Product',
    date: 'November 15, 2025',
    excerpt: '..........',
    image: 'a2.jpeg',
    imageAlt: 'PULSE Solar Energy Partnership',
    content: 'Green Innovation Ventures is excited to announce the expansion of its collaboration with the SNV Netherlands Development Organization to enhance Marketing activities for Productive Use Leveraging Solar Energy (PULSE) initiatives in the Kakuma refugee hosting area and surrounding communities in Turkana County. This partnership aims to accelerate sales and create awareness about how solar energy can power local businesses, from cold storage for fish preservation to powering community institutions.'
  
  },
  {
    id: 2,
    title: 'October 2025: Driving Africas Sustainable Future through the Digital and Green Innovation Acceleration Programme',
    category: 'Company',
    date: 'October 10, 2025',
    excerpt: '...........',
    image: 'ceo.png',
    imageAlt: 'Digital and Green Innovation Programme',
    content: 'October 2025: Driving Africas Sustainable Future through the Digital and Green Innovation Acceleration Programme'
    
  },
  {
    id: 3,
    title: 'Strategic Meetings with Kenya Power to Expand e-Cap Clean Cooking Project',
    category: 'Technology',
    date: 'September, 2025',
    excerpt: '..........',
    image: 'team.png',
    imageAlt: 'Kenya Power Partnership Meeting',
    content: 'Our team recently had a productive meeting with Eng. Kipkemoi Kibias, the Kenya Power Regional Manager for the North Rift Region, and other Kenya Power staff. Discussions centered on leveraging synergies between our PowerPay IoT platform and the e-cap clean cooking and consumer financing project. This collaboration is vital for demand generation and sales growth, supporting Kenya Powers goal of achieving universal electricity access by ensuring profitability for utilities and mini-grids.'

  },
  {
    id: 4,
    title: 'Acumen Academy Accelerator Program for Ventures Serving Displaced People',
    category: 'Development',
    date: 'May, 2025',
    excerpt: '..........',
    image: 'j.jpeg',
    imageAlt: 'Acumen Academy Accelerator Program',
    content: 'Green Innovation Ventures was selected to join the Acumen Academy Accelerator for Ventures Serving Displaced People, a 10-week program supported by the IKEA Foundation and the Swiss Agency for Development and Cooperation. This opportunity allows our directors to expand their leadership capabilities and scale the companys business and impact in challenging environments.'
    
  },
  {
    id: 5,
    title: 'Expanding into Nigeria and Madagascar Markets',
    category: 'Case Study',
    date: 'November, 2025',
    excerpt: '..........',
    image: 'a1.jpeg',
    imageAlt: 'Nigeria and Madagascar Expansion',
    content: 'GIVE Ltd has announced plans to venture into the Nigerian and Madagascar markets in 2025/2026. This expansion will focus on deploying their proprietary PowerPay IoT technology to digitalize electrical appliances, facilitate appliance financing, and drive demand generation for utility companies in those regions.'
    
  },
  {
    id: 6,
    title: 'Security Update: Enhanced Data ProtectionAcknowledged in "Green Innovation Awards" Discussion',
    category: 'Security',
    date: '2023',
    excerpt: '.........',
    image: 'jefff.jpg',
    imageAlt: 'Green Innovation Awards',
    content: 'The companys work was highlighted in a discussion surrounding the importance of "Green Innovation Awards" in the fight against climate change. GIVE Ltd was recognized as a model for using innovative solutions to address climate challenges and generate public interest in sustainable environmental management.'
  
  },

];

const articlesGrid = document.getElementById('articlesGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Function to create article card HTML
function createArticleCard(article) {
  const articleImage = article.image 
    ? `<img src="${article.image}" alt="${article.imageAlt || article.title}" class="article-img">`
    : `<div class="article-image">📰</div>`;
    
  return `
    <div class="article-card" data-article-id="${article.id}">
      <div class="article-image">
        ${articleImage}
      </div>
      <div class="article-content">
        <div class="article-meta">
          <span class="article-category">${article.category}</span>
          <span><i class="far fa-calendar"></i> ${article.date}</span>
        </div>
        <h3>${article.title}</h3>
        <p class="article-excerpt">${article.excerpt}</p>
        <span class="read-more">
          Read more <i class="fas fa-arrow-right"></i>
        </span>
      </div>
    </div>
  `;
}

// Function to render articles
function renderArticles(articlesToRender) {
  if (articlesToRender.length === 0) {
    articlesGrid.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }
  
  articlesGrid.style.display = 'grid';
  noResults.style.display = 'none';
  
  articlesGrid.innerHTML = articlesToRender.map(article => createArticleCard(article)).join('');
  
  // Add click event to article cards
  const articleCards = articlesGrid.querySelectorAll('.article-card');
  articleCards.forEach(card => {
    card.addEventListener('click', () => {
      const articleId = parseInt(card.getAttribute('data-article-id'));
      const article = articles.find(a => a.id === articleId);
      if (article) {
        openModal(article);
      }
    });
  });
}

// Search functionality
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      renderArticles(articles);
      return;
    }
    
    const filteredArticles = articles.filter(article => {
      return (
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm)
      );
    });
    
    renderArticles(filteredArticles);
  });
}

// Initial render
renderArticles(articles);

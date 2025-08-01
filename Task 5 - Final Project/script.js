  (() => {
            const postsData = [
                {
                    id: '1',
                    title: 'Exploring Modern Web Design Trends',
                    category: 'Technology',
                    image: 'https://www.theedigital.com/wp-content/uploads/2020/07/Latest-Web-Design-Trends-and-Standards.jpg',
                    description: `Discover the latest techniques and aesthetic trends in modern web design including glassmorphism, micro-interactions, and responsive layouts.`
                },
                {
                    id: '2',
                    title: '10 Tips for a Healthy Lifestyle',
                    category: 'Lifestyle',
                    image: 'https://th.bing.com/th/id/OIP.RESzN1DwDYfT6SwaIg_hhAHaE7?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3',
                    description: `Simple, effective tips to improve your wellness and adopt healthier habits that can change your life positively.`
                },
                {
                    id: '3',
                    title: 'Top Travel Destinations for 2023',
                    category: 'Travel',
                    image: 'https://i.ytimg.com/vi/IDNdq-bwYQA/maxresdefault.jpg',
                    description: `Explore top travel hotspots around the world this year, perfect for adventure seekers and culture lovers alike.`
                },
                {
                    id: '4',
                    title: 'Delicious Plant-Based Recipes',
                    category: 'Food',
                    image: 'https://www.acouplecooks.com/wp-content/uploads/2021/01/Plant-Based-Recipes.jpg',
                    description: `A collection of tasty, nutritious, and easy-to-make plant-based recipes for everyday meals.`
                },
                {
                    id: '5',
                    title: 'Understanding CSS Grid and Flexbox',
                    category: 'Technology',
                    image: 'https://miro.medium.com/v2/resize:fit:1200/1*-Wk7w5VlLZ8u1JtwRHZE4Q.png',
                    description: `A clear guide to mastering CSS Grid and Flexbox for building flexible and responsive website layouts.`
                },
                {
                    id: '6',
                    title: 'Mindfulness Practices for Stress Relief',
                    category: 'Lifestyle',
                    image: 'https://tse3.mm.bing.net/th/id/OIP.xGe6gWQ8PaOIzfeJH6djaQHaKS?rs=1&pid=ImgDetMain&o=7&rm=3',
                    description: `Techniques and daily habits to cultivate mindfulness and reduce stress for a calmer, more focused life.`
                }
            ];

            const categories = [...new Set(postsData.map(p => p.category))];

            const postsContainer = document.getElementById('posts');
            const categoriesList = document.getElementById('categories-list');
            const searchInput = document.getElementById('search');
            const modalBackdrop = document.getElementById('modal-backdrop');
            const modalTitle = document.getElementById('modal-title');
            const modalContent = document.getElementById('modal-content');
            const modalImage = document.getElementById('modal-image');
            const modalCloseBtn = document.getElementById('modal-close-btn');

            let filteredCategory = null;

            
            function createEl(tag, className, text) {
                const el = document.createElement(tag);
                if (className) el.className = className;
                if (text) el.textContent = text;
                return el;
            }

    
            function renderCategories() {
                categoriesList.innerHTML = '';
                const allItem = createEl('li');
                const allLink = createEl('a', null, 'All');
                allLink.href = '#';
                allLink.tabIndex = 0;
                if (filteredCategory === null) allLink.classList.add('active');
                allLink.addEventListener('click', e => {
                    e.preventDefault();
                    filteredCategory = null;
                    renderCategories();
                    renderPosts();
                    searchInput.value = '';
                });
                allItem.appendChild(allLink);
                categoriesList.appendChild(allItem);

                categories.forEach(cat => {
                    const li = createEl('li');
                    const a = createEl('a', null, cat);
                    a.href = '#';
                    a.tabIndex = 0;
                    if (filteredCategory === cat) a.classList.add('active');
                    a.addEventListener('click', e => {
                        e.preventDefault();
                        filteredCategory = cat;
                        renderCategories();
                        renderPosts();
                        searchInput.value = '';
                    });
                    li.appendChild(a);
                    categoriesList.appendChild(li);
                });
            }

        
            function renderPosts() {
                postsContainer.innerHTML = '';

                const searchTerm = searchInput.value.toLowerCase();

                const filteredPosts = postsData.filter(post => {
                    if (filteredCategory && post.category !== filteredCategory) return false;
                    if (searchTerm) {
                        return post.title.toLowerCase().includes(searchTerm) || post.description.toLowerCase().includes(searchTerm);
                    }
                    return true;
                });

                if (filteredPosts.length === 0) {
                    const empty = createEl('p', null, 'No posts found.');
                    empty.style.gridColumn = '1 / -1';
                    empty.style.textAlign = 'center';
                    empty.style.color = '#6b7280';
                    empty.style.fontSize = '1.25rem';
                    postsContainer.appendChild(empty);
                    return;
                }

                filteredPosts.forEach(post => {
                    const article = createEl('article', 'post-card');
                    article.tabIndex = 0;
                    article.setAttribute('role', 'button');
                    
                    const img = document.createElement('img');
                    img.loading = 'lazy';
                    img.decoding = 'async';
                    img.src = post.image;
                    img.alt = `Image for: ${post.title}`;

                    const contentDiv = createEl('div', 'content');
                    const h2 = createEl('h2', null, post.title);
                    const p = createEl('p', null, post.description.length > 120 ? post.description.slice(0, 117) + '...' : post.description);
                    const btn = createEl('button', 'read-more');
                    btn.innerHTML = 'Read More <span class="material-icons" aria-hidden="true">arrow_forward</span>';

                    btn.addEventListener('click', e => {
                        e.stopPropagation();
                        openModal(post);
                    });

                    
                    article.addEventListener('click', () => openModal(post));
                    article.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openModal(post);
                        }
                    });

                    contentDiv.appendChild(h2);
                    contentDiv.appendChild(p);
                    contentDiv.appendChild(btn);

                    article.appendChild(img);
                    article.appendChild(contentDiv);

                    postsContainer.appendChild(article);
                });
            }

            
            function openModal(post) {
                modalTitle.textContent = post.title;
                modalContent.textContent = post.description;
                modalImage.src = post.image;
                modalImage.alt = `Image for: ${post.title}`;
                modalBackdrop.classList.add('active');
                modalBackdrop.focus();
            }

        
            function closeModal() {
                modalBackdrop.classList.remove('active');
                
                searchInput.focus();
            }

            modalCloseBtn.addEventListener('click', closeModal);

            modalBackdrop.addEventListener('click', e => {
                if (e.target === modalBackdrop) closeModal();
            });

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
                    closeModal();
                }
            });

            
            searchInput.addEventListener('input', () => {
                renderPosts();
            });

            
            renderCategories();
            renderPosts();

        })();
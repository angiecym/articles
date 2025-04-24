document.addEventListener('DOMContentLoaded', function() {
const tabButtons = document.querySelectorAll('.tab');
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.dataset.category;
        addList(category);
    });
});
addList('all');

function addList(category){	
	clearList();
	fetch('/articles/contents/all_articles.txt')
       .then(response => response.text())
       .then(data => {
			const lines = data.split('\n');
			for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line === '') continue;				
				const line_data = JSON.parse(line);				
				addArticleCard(line_data,category);
			}
	   });
	tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}		

async function addArticleCard(line,category){		
	console.log(line);
	if(category!=='all' && category!==line.category){return;}
	const articleList = document.querySelector('.article-list');	
	const card = document.createElement('article');
	card.className = 'article-card';
	const alink = document.createElement('a');
	alink.href = '/articles/articles/' + line.fileId;
	alink.className = 'card-link';
	const cardImg = document.createElement('div');
	cardImg.className = 'card-image';
	const heroImg = document.createElement('img');
	heroImg.src = '/articles/images/' + line.fileId.split('.')[0] + '/' + line.heroimg;
	
	const image_overlay = document.createElement('div');
	image_overlay.className = 'image-overlay';
	cardImg.append(heroImg,image_overlay);
	const cardContent = document.createElement('div');
	cardContent.className = 'card-content';
	const title = document.createElement('h2');
	title.textContent = line.title;
	const subtitle = document.createElement('p');
	subtitle.className = 'excerpt';
	subtitle.textContent = line.excerpt;
	const meta = document.createElement('div');
	meta.className = 'meta';	
	const meta3 = document.createElement('span');
	meta3.textContent = line.tags;
	meta.append(meta3);
	cardContent.append(title,subtitle,meta);
	alink.append(cardImg,cardContent);
	card.append(alink);
	articleList.append(card);
}

function clearList(){
	const articleList = document.querySelector('.article-list');
	articleList.innerHTML = '';
}	

});
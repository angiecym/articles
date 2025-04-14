document.addEventListener('DOMContentLoaded', function() {

fetch('https://api.github.com/repos/angiecym/articles/contents/articles')
       .then(response => response.json())
       .then(data => {
         const htmlFiles = data.filter(item => item.name.endsWith('.html'));		 
		 htmlFiles.forEach(file => {addArticleCard(file.name);});        
       });

async function addArticleCard(fileName){	
	const metadata = await getArticleInfo(fileName);
	const articleList = document.querySelector('.article-list');	
	const card = document.createElement('article');
	card.className = 'article-card';
	const alink = document.createElement('a');
	alink.href = '/articles/articles/' + fileName;
	alink.className = 'card-link';
	const cardImg = document.createElement('div');
	cardImg.className = 'card-image';
	const heroImg = document.createElement('img');
	heroImg.src = '/articles/images/' + fileName.split('.')[0] + '/' + metadata.heroimg;
	console.log(metadata.heroimg);
	const image_overlay = document.createElement('div');
	image_overlay.className = 'image-overlay';
	cardImg.append(heroImg,image_overlay);
	const cardContent = document.createElement('div');
	cardContent.className = 'card-content';
	const title = document.createElement('h2');
	title.textContent = metadata.title;
	const subtitle = document.createElement('p');
	subtitle.className = 'excerpt';
	subtitle.textContent = metadata.subtitle;
	const meta = document.createElement('div');
	meta.className = 'meta';
	const meta1 = document.createElement('span');
	meta1.textContent = metadata.metainfo;
	const meta2 = document.createElement('span');
	meta2.textContent = metadata.footer;
	const meta3 = document.createElement('span');
	meta3.textContent = metadata.tags;
	meta.append(meta1,meta2,meta3);
	cardContent.append(title,subtitle,meta);
	alink.append(cardImg,cardContent);
	card.append(alink);
	articleList.append(card);
}

async function getArticleInfo(fileName){
	const metadata = {};
	const txtName = '/articles/contents/' + fileName.split('.')[0] + '.txt';
	await fetch(txtName)
        .then(response => response.text())
        .then(data => {
            // 分割文件内容为行数组
            const lines = data.split('\n');
            
            // 提取元数据部分            
            let contentStartIndex = 0;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line === '') continue;
                
                const colonIndex = line.indexOf(':');
                if (colonIndex === -1) {
                    contentStartIndex = i;
                    break;
                }
                
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                metadata[key] = value;
            }
		})
	return metadata;
}
			

});
document.addEventListener('DOMContentLoaded', function() {
    const articleContainer = document.querySelector('.article-container');
	const fullPath = window.location.pathname;
	const fileName= fullPath.split('/').pop().split('.')[0];
	const txtName = '/articles/contents/' + fileName + '.txt';
	fetch(txtName)
        .then(response => response.text())
        .then(data => {
            // 分割文件内容为行数组
            const lines = data.split('\n');
            
            // 提取元数据部分
            const metadata = {};
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
            console.log(metadata);
            // 将元数据显示在页面上
			const heroSection = document.createElement('section');
			heroSection.className = 'hero-section';
            if (metadata.heroimg) {
                heroImg = document.createElement('img');
				heroImg.src = '/articles/images/' + fileName + '/' + metadata.heroimg;
				heroImg.className = 'hero-image';
				heroSection.append(heroImg);
				overLay = document.createElement('div');
				overLay.className = 'hero-overlay';
				heroSection.append(overLay);
            }
			const articleHeader = document.createElement('header');
			articleHeader.className = 'article-header';
            if (metadata.title) {
				const articleTitle = document.createElement('h1');
				articleTitle.className = 'article-title';
				articleTitle.textContent = metadata.title;
				articleHeader.append(articleTitle);
			}
            if (metadata.excerpt) {
				const articleSubTitle = document.createElement('div');
				articleSubTitle.className = 'article-subtitle';
				articleSubTitle.textContent = metadata.excerpt;
				articleHeader.append(articleSubTitle);
			}
            if (metadata.metainfo) {
				const articleMeta = document.createElement('div');
				articleMeta.className = 'article-meta';
				const arr = metadata.metainfo.split('|');
				arr.forEach((metainfo,index) => {
					const metaSplit = document.createElement('span');
					metaSplit.textContent = metainfo;
					if(index>0){
						const divider = document.createElement('span');
						divider.className = 'meta-divider';
						divider.textContent = '|';
						articleMeta.append(divider);
					}
					articleMeta.append(metaSplit);
				});
				articleHeader.append(articleMeta);
			}
			heroSection.append(articleHeader);
			articleContainer.append(heroSection);							
            
            // 处理内容和图片
            const articleContent = document.createElement('div');
			articleContent.className = 'article-content';            
			
            for (let i = contentStartIndex; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line === '') continue;
                
                if (line.startsWith('<img') && line.endsWith('>')) {
                    const contentImg = document.createElement('img');
					contentImg.src = '/articles/images/' + fileName + '/' + line.replace('<img','').replace('>','').trim();
					articleContent.append(contentImg);
                } else {
                    const contentP = document.createElement('p');
					contentP.innerHTML = line;
					articleContent.append(contentP);
                }
            }
			articleContainer.append(articleContent);
			
			const footer = document.createElement('footer');
			footer.className = 'article-footer';
            if (metadata.footer) {
				const footerContent = document.createElement('p');
				footerContent.textContent = metadata.footer;
				footer.append(footerContent);
			}
            if (metadata.tags) {
				const tags = document.createElement('div');
				tags.className = 'tags';
				const arr = metadata.tags.split('|');
				arr.forEach(tag => {
					const tagSplit = document.createElement('span');
					tagSplit.textContent = tag;
					tagSplit.className = 'tag';
					tags.append(tagSplit);
				});
				footer.append(tags);
			}
			articleContainer.append(footer);			
        })
        .catch(error => console.error('Error loading data:', error));
});

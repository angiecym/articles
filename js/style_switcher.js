document.addEventListener('DOMContentLoaded', function() {
    // 获取所有切换按钮
    const styleButtons = document.querySelectorAll('.style-btn');
    const styleTheme = document.getElementById('style-theme');
	const toggleButton = document.querySelector('.toggle-switcher');
	const styleSwitcher = document.querySelector('.style-switcher');
	
	toggleButton.addEventListener('click', function(e) {
        e.stopPropagation();
        styleSwitcher.classList.toggle('collapsed');
    });
    
    // 从本地存储获取保存的风格偏好
    const savedStyle = localStorage.getItem('preferredStyle');
    if (savedStyle) {
        switchStyle(savedStyle);
    }else{
		switchStyle('exhibition_style');
	}
    
    // 为每个按钮添加点击事件
    styleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const style = this.dataset.style;
            switchStyle(style);
            
            // 保存偏好到本地存储
            localStorage.setItem('preferredStyle', style);
        });
    });
    
    // 切换风格函数
    function switchStyle(style) {
        // 更新CSS文件链接
        styleTheme.href = `../styles/${style}.css`;
        
        // 更新按钮激活状态
        styleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.style === style);
        });
        
        // 更新body的类名（可选，用于某些特定样式）
        document.body.className = style;
    }
});

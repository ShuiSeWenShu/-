// 主脚本负责主题切换、菜单过滤、滚动动画以及表单处理

document.addEventListener('DOMContentLoaded', () => {
  /**
   * 主题切换
   * 点击按钮在 body 上切换 dark 类，利用 CSS 变量改变配色
   */
  const toggleBtn = document.querySelector('.theme-toggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  /**
   * 菜单过滤功能
   * 根据按钮的 data-filter 属性显示对应类别的食物卡片
   */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery .item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /**
   * 使用 IntersectionObserver 实现滚动出现动画
   * 每个 section 在进入视口时添加 visible 类，实现淡入效果
   */
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(sec => {
    sec.classList.add('fade-in');
    observer.observe(sec);
  });

  /**
   * 表单提交处理
   * 此处简单地弹出提示并清空表单
   */
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('感谢您的联系，我们会尽快回复。');
    form.reset();
  });

  /**
   * 几何图形动画
   * 在 header 内的 canvas 画布中绘制不断移动的几何图形
   */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  const shapes = [];
  const colors = ['#c0392b', '#3498db', '#27ae60', '#8e44ad'];

  function createShape() {
    const size = Math.random() * 40 + 10;
    shapes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.5 ? 'rect' : 'circle'
    });
  }

  for (let i = 0; i < 30; i++) createShape();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(s => {
      ctx.fillStyle = s.color;
      if (s.type === 'rect') {
        ctx.fillRect(s.x, s.y, s.size, s.size);
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      s.x += s.dx;
      s.y += s.dy;
      if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
      if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();
});

// 将 slideIn 动画样式注入文档
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);

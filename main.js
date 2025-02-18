// Matrix rain effect
class MatrixRain {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.initialize();
  }

  initialize() {
    const matrix = document.querySelector('.matrix-rain');
    matrix.appendChild(this.canvas);
    
    this.canvas.width = matrix.offsetWidth;
    this.canvas.height = matrix.offsetHeight;
    
    this.characters = "01";
    this.fontSize = 14;
    this.columns = this.canvas.width/this.fontSize;
    this.drops = [];
    
    for(let x = 0; x < this.columns; x++) {
      this.drops[x] = 1;
    }
    
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = this.fontSize + 'px monospace';
    
    for(let i = 0; i < this.drops.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      
      if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975)
        this.drops[i] = 0;
      
      this.drops[i]++;
    }
    
    requestAnimationFrame(() => this.draw());
  }
}

// Terminal typing effect
class TerminalTyping {
  constructor(element, text, speed = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.type();
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent = this.text.slice(0, ++this.index);
      setTimeout(() => this.type(), this.speed);
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Start matrix rain
  new MatrixRain();
  
  // Start terminal typing
  const typingElement = document.querySelector('.typing-text');
  new TerminalTyping(typingElement, 'Welcome to 0x1Sm_', 150);
  
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Form submission
  document.getElementById('secureForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message transmitted successfully.');
  });
});
class DragDrop {
  constructor({ pantryEl, bowlEl, onAdd, onRemove, onDragStart }) {
    this.pantryEl = pantryEl;
    this.bowlEl = bowlEl;
    this.onAdd = onAdd;
    this.onRemove = onRemove || null;
    this.onDragStart = onDragStart || null;
    this._handlers = {};
  }

  init() {
    // Click on pantry card: add if not in bowl, remove if already in bowl
    this._handlers.pantryClick = (e) => {
      const card = e.target.closest('.ingredient-card');
      if (!card) return;
      if (card.classList.contains('in-bowl')) {
        if (this.onRemove) this.onRemove(card.dataset.ingredientId);
      } else {
        this.onAdd(card.dataset.ingredientId);
      }
    };

    // Drag start from pantry
    this._handlers.dragStart = (e) => {
      const card = e.target.closest('.ingredient-card');
      if (!card) return;
      e.dataTransfer.setData('text/plain', card.dataset.ingredientId);
      e.dataTransfer.effectAllowed = 'copy';
      card.classList.add('dragging');
      if (this.onDragStart) this.onDragStart();
    };

    this._handlers.dragEnd = (e) => {
      const card = e.target.closest('.ingredient-card');
      if (card) card.classList.remove('dragging');
    };

    // Drag start from bowl item
    this._handlers.bowlDragStart = (e) => {
      const item = e.target.closest('.bowl-item');
      if (!item) return;
      e.dataTransfer.setData('text/plain', 'bowl:' + item.dataset.id);
      e.dataTransfer.effectAllowed = 'move';
      item.style.opacity = '0.4';
      if (this.onDragStart) this.onDragStart();
    };

    this._handlers.bowlDragEnd = (e) => {
      const item = e.target.closest('.bowl-item');
      if (item) item.style.opacity = '';
    };

    // Bowl accepts drops from pantry only
    this._handlers.dragOver = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.types.includes('text/plain');
      e.dataTransfer.dropEffect = 'copy';
      this.bowlEl.classList.add('drag-over');
    };

    this._handlers.dragLeave = (e) => {
      if (!this.bowlEl.contains(e.relatedTarget)) {
        this.bowlEl.classList.remove('drag-over');
      }
    };

    this._handlers.drop = (e) => {
      e.preventDefault();
      this.bowlEl.classList.remove('drag-over');
      const data = e.dataTransfer.getData('text/plain');
      if (data && !data.startsWith('bowl:')) this.onAdd(data);
    };

    // Pantry accepts drops from bowl
    this._handlers.pantryDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    this._handlers.pantryDrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      if (data && data.startsWith('bowl:')) {
        const id = data.slice(5);
        if (this.onRemove) this.onRemove(id);
      }
    };

    this.pantryEl.addEventListener('click',    this._handlers.pantryClick);
    this.pantryEl.addEventListener('dragstart', this._handlers.dragStart);
    this.pantryEl.addEventListener('dragend',   this._handlers.dragEnd);
    this.pantryEl.addEventListener('dragover',  this._handlers.pantryDragOver);
    this.pantryEl.addEventListener('drop',      this._handlers.pantryDrop);
    this.bowlEl.addEventListener('dragstart',  this._handlers.bowlDragStart);
    this.bowlEl.addEventListener('dragend',    this._handlers.bowlDragEnd);
    this.bowlEl.addEventListener('dragover',   this._handlers.dragOver);
    this.bowlEl.addEventListener('dragleave',  this._handlers.dragLeave);
    this.bowlEl.addEventListener('drop',       this._handlers.drop);
  }

  destroy() {
    this.pantryEl.removeEventListener('click',    this._handlers.pantryClick);
    this.pantryEl.removeEventListener('dragstart', this._handlers.dragStart);
    this.pantryEl.removeEventListener('dragend',   this._handlers.dragEnd);
    this.pantryEl.removeEventListener('dragover',  this._handlers.pantryDragOver);
    this.pantryEl.removeEventListener('drop',      this._handlers.pantryDrop);
    this.bowlEl.removeEventListener('dragstart',  this._handlers.bowlDragStart);
    this.bowlEl.removeEventListener('dragend',    this._handlers.bowlDragEnd);
    this.bowlEl.removeEventListener('dragover',   this._handlers.dragOver);
    this.bowlEl.removeEventListener('dragleave',  this._handlers.dragLeave);
    this.bowlEl.removeEventListener('drop',       this._handlers.drop);
  }
}

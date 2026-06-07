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

    this._handlers.dragOver = (e) => {
      e.preventDefault();
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
      const id = e.dataTransfer.getData('text/plain');
      if (id) this.onAdd(id);
    };

    this.pantryEl.addEventListener('click', this._handlers.pantryClick);
    this.pantryEl.addEventListener('dragstart', this._handlers.dragStart);
    this.pantryEl.addEventListener('dragend', this._handlers.dragEnd);
    this.bowlEl.addEventListener('dragover', this._handlers.dragOver);
    this.bowlEl.addEventListener('dragleave', this._handlers.dragLeave);
    this.bowlEl.addEventListener('drop', this._handlers.drop);
  }

  destroy() {
    this.pantryEl.removeEventListener('click', this._handlers.pantryClick);
    this.pantryEl.removeEventListener('dragstart', this._handlers.dragStart);
    this.pantryEl.removeEventListener('dragend', this._handlers.dragEnd);
    this.bowlEl.removeEventListener('dragover', this._handlers.dragOver);
    this.bowlEl.removeEventListener('dragleave', this._handlers.dragLeave);
    this.bowlEl.removeEventListener('drop', this._handlers.drop);
  }
}

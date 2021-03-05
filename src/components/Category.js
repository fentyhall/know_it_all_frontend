class Category {

    static all = [];

    constructor(name) {
        this.name = name;
        this.renderCategory();
        this.constructor.all.push(this);
    }

    static getAll() {
        categoryApi.getCategories()
            .then(categories => categories.data.forEach(category => new Category(category.attributes.name)))
            .catch(error => alert(error));
    }

    renderCategory = () => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-btn';
            categoryDiv.innerHTML = `
               <button type="button" class="btn btn-outline-secondary" style="width: 25rem;">${this.name}</button>
            `;    
            containerDiv.appendChild(categoryDiv);
    }
}
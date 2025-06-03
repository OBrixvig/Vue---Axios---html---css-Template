const apiUrl = 'yourUrl/'; 
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            items: [],
            newItem: { name: '' },
            editingItem: null
        }
    },
    methods: {
        fetchItems() {
            axios.get(apiUrl + 'items')
                .then(response => {
                    this.items = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af elementer:', error);
                })
                .finally(() => {
                   console.log('Hentning af elementer fuldført');
                });
        },
        createItem() {
            axios.post(apiUrl + 'items', this.newItem)
                .then(response => {
                    this.fetchItems();
                    this.newItem = { name: '' };
                })
                .catch(error => {
                    console.error('Fejl ved oprettelse af element:', error);
                })
                .finally(() => {
                    console.log('Oprettelse af element fuldført');
                });
        },
        updateItem() {
            axios.put(apiUrl + `items/${this.editingItem.id}`, this.editingItem)
                .then(response => {
                    this.fetchItems();
                    this.editingItem = null;
                })
                .catch(error => {
                    console.error('Fejl ved opdatering af element:', error);
                })
                .finally(() => {
                    console.log('Opdatering af element fuldført');
                });
        },
        deleteItem(id) {
            axios.delete(apiUrl + `items/${id}`)
                .then(response => {
                    this.fetchItems();
                })
                .catch(error => {
                    console.error('Fejl ved sletning af element:', error);
                })
                .finally(() => {
                    console.log('Sletning af element fuldført');
                });
        },
    },
    mounted() {
        this.fetchItems();
    }
});

app.mount('#app');
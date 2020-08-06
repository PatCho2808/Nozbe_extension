window.onload = function() {
    let app = new App(new NozbeService(), new Auth());
    app.setupPage();

    document.getElementById('submit_button').addEventListener('click', () => {
        let checkboxes = document.getElementsByName('categories');
        let categoriesToFiltrBy = [];
        checkboxes.forEach(checkbox => {
            if(checkbox.checked)
            {
                categoriesToFiltrBy.push(checkbox.value);
            }
        });
        app.filter(categoriesToFiltrBy);
    });
}
window.onload = function() {
    let app = new App(new NozbeService(), new Auth());
    app.setupPage();
}
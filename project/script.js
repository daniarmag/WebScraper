function performSearch() {
    var searchString = document.getElementById('searchInput').value;

    // Send the search string to Python using output module
    google.colab.kernel.invokeFunction('notebook.receive_search_string', [searchString], {});
}

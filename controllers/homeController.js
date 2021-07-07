exports.home = (request, response) => {
    return response.render('index.ejs');
};


exports.list = (request, response) => {
    var listItems = ['First item', 'Second item', 'Third item']
    return response.render('list.ejs', { listItems: listItems });
};


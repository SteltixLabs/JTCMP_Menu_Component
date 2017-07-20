define(['ojs/ojcore', 'text!./js/views/menu-component.html', './js/viewModels/menu-component', 'text!./menu-component.json', 'css!./menu-component.css', 'ojs/ojcomposite'], function (oj, view, viewModel, metadata) {
        oj.Composite.register('menu-component', {
            view: {inline: view},
            viewModel: {inline: viewModel},
            metadata: {inline: JSON.parse(metadata)}
    });
    }   
);

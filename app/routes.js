export default [
    {path: '/', file: 'routes/_index.jsx'},
    {path: '/:category', file: 'routes/$category.jsx'},
    {path: '/:category/:id/:item', file: 'routes/$category.$id.$item.jsx'},
]
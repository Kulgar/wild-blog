/*
Create Angular component blogItemMenu into module app.blog with databindings properties
- editMode : boolean to indicate if blogItem is in editMode or not
- onUndo : function
- onEdit : function
- onDelete : function
- onSave : function
*/
let blogItemMenu = {
    bindings: {
        user: "<",
        editMode: "=",
        onUndo: "&",
        onEdit: "&",
        onDelete: "&",
        onSave: "&"
    },
    templateUrl: 'js/components/blog/blogItem/blogItemMenu.html'
}

export default blogItemMenu

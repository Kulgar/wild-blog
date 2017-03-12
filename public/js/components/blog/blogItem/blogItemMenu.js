/*
Create Angular component blogItemMenu into module app.blog with databindings properties
- editMode : boolean to indicate if blogItem is in editMode or not
- onUndo : function
- onEdit : function
- onDelete : function
- onSave : function
About bindings: 
http://stackoverflow.com/questions/37818740/use-of-symbols-and-in-custom-directives-scope-binding-angula
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

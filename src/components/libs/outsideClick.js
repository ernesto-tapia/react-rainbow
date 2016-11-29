
let isNodeInRoot = function (node, root) {
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

let handleDocumentKeyUp = function (closeAction, e) {
    if (e.keyCode === 27) {
        closeAction();
    }
};

let handleDocumentClick = function (root, closeAction, e) {
    // If the click originated from within this component
    // don't do anything.
    if (isNodeInRoot(e.target, root)) {
        return;
    }
    closeAction();
};

export let outsideClick = function () {
    let onDocumentClickListener;
    let onDocumentKeyupListener;
    
    return {
        bindRootCloseHandlers: function (root, closeAction) {
            var doc = window.document;
            onDocumentClickListener = handleDocumentClick.bind(this, root, closeAction);
            onDocumentKeyupListener = handleDocumentKeyUp.bind(this, closeAction);
            
            doc.addEventListener('click', onDocumentClickListener);
            doc.addEventListener('keyup', onDocumentKeyupListener);
        },
        unbindRootCloseHandlers: function () {
            var doc = window.document;
            
            doc.removeEventListener('click', onDocumentClickListener);
            doc.removeEventListener('keyup', onDocumentKeyupListener);
        }
    }    
};
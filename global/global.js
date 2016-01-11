var common = {
	getById: function(id) {
		return document.getElementById(id);
	},
    getByClass: function(sClass, oParent) {
        oParent = oParent || document;
        var elements = oParent.getElementsByTagName('*');
        var result = [];
        var reg = new RegExp('(^|\\s)' + sClass + '(\\s|$)');
        var i = 0;
        var len = elements.length;

        for (i = 0; i < len; i++) {
			if(reg.test(elements[i].className)){
				result.push(elements[i]);
			}
        }

        return result;
    }
};

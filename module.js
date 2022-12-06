var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.items = items;
    }
    TreeStore.prototype.getAll = function () {
        return this.items;
    };
    TreeStore.prototype.getItem = function (id) {
        return this.items.find(function (i) { return i.id === id; });
    };
    TreeStore.prototype.getChildren = function (id) {
        return this.items.filter(function (i) { return i.parent === id; });
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var _this = this;
        var allChildren = [];
        var currentArr = this.getChildren(id);
        if (currentArr.length) {
            currentArr.forEach(function (i) {
                allChildren.push(i);
                _this.getAllChildren(i.id).forEach(function (j) { return allChildren.push(j); });
            });
        }
        return allChildren;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var allParents = [];
        if (id) {
            var item = this.getItem(id);
            if (item) {
                return item.parent ? __spreadArray([item], this.getAllParents(item.parent), true) : false;
            }
        }
        return allParents;
    };
    return TreeStore;
}());
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var ts = new TreeStore(items);

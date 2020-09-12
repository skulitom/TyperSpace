class MenuUtils {
    calculatePosition = (position) => {
        return [resolution[0]/2-buttonWidth/2, menuLoc[1] + buttonDistance*position];
    };

    createDropdown = (sel, items, selectedItem, selectEvent, position) => {
        if(!sel) {
            sel = createSelect();
            sel.position(...this.calculatePosition(position));
            items.forEach(item => {
                sel.option(item);
            });
            sel.size(buttonWidth, buttonHeight);
            sel.style("font-size", buttonFontSize+"px");
            sel.selected(selectedItem);
            sel.changed(selectEvent);
            sel.addClass('btn-gradient red');
        }
        return sel;
    };

    createSlider = (slid, minVal, maxVal, curVal, position) => {
        if(!slid) {
            slid = createSlider(minVal, maxVal, curVal);
            slid.position(...this.calculatePosition(position+0.2));
            slid.size(buttonWidth, buttonHeight/5);
        }
        return slid;
    };

    createCheckbox = (chk, name, chkFunction, status, position) => {
        if(!chk) {
            chk = createCheckbox(name, status);
            chk.changed(chkFunction);
            chk.position(...this.calculatePosition(position));
            chk.style("font-size", buttonFontSize+"px");
            chk.size(buttonWidth, buttonHeight);
            chk.addClass('btn-gradient red');
        }
        return chk;
    };

    createButton = (btn, name, clickFunction, position) => {
        if(!btn) {
            btn = createButton(name);
            btn.mouseClicked(clickFunction);
            btn.size(buttonWidth, buttonHeight);
            btn.position(...this.calculatePosition(position));
            btn.style("font-size", buttonFontSize+"px");
            btn.addClass('btn-gradient red');
        }
        return btn;
    };

    removeItem = (item) => {
        if(item) {
            item.remove();
            item = null;
        }
        return item;
    };
}
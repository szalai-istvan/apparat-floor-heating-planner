class FloorHeater {
    centerPosition;
    alignment;
    colors;
    length;
    width;
    isSelected;
    isSelectedForDrag;
    lineWeight;
    textSize;
    padding;
    type;
    rectWidth;
    rectHeight;

    constructor(length, width, alignment = undefined) {
        this.length = length;
        this.width = width;

        this.isSelected = true;
        this.isSelectedForDrag = true;
        this.alignment = alignment ?? 1;

        this.colors = [RED, BLUE];
        this.lineWeight = FLOOR_HEATER_LINE_WEIGHT_IN_METER * scaleContext.pixelsPerMetersRatio;
        this.textSize = FLOOR_HEATER_TEXT_SIZE_IN_METER * scaleContext.pixelsPerMetersRatio;

        this.padding = FLOOR_HEATER_TYPE_RECT_PADDING_IN_METER * scaleContext.pixelsPerMetersRatio;
        this.type = width.toString().replace('.', ',') + ' m x ' + length.toString().replace('.', ',') + ' m';

        textSize(this.textSize);
        this.rectWidth = textWidth(this.type) + this.padding;
        this.rectHeight = this.textSize + this.padding;
        
        elementStore.register(this);
    }
}
class ScaleContext {
    firstPoint = null;
    secondPoint = null;
    scalingInProgress = false;
    referenceLength = null;
    pixelsPerMetersRatio = null;

    constructor() {
        elementStore.register(this);
    }

    
    startScaling() {
        if (!roomContext.thereAreRooms()) {
            this.scalingInProgress = true;
            this.clear();
            tooltip.scalingStarted();
        } else {
            scalingDialogConfirm.showModal();
            screenContext.toggleControls();
        }
    }

    addReferencePoint() {
        const point = screenContext.getMousePositionAbsolute();
        if (!this.firstPoint) {
            this.firstPoint = point;
            tooltip.firstReferencePointAdded();
        } else if (!this.secondPoint) {
            this.secondPoint = point;
            tooltip.clearCursorTooltip();
            showScalingDialog();
        }
    }

    processScalingValue(scalingValue) {
        const firstPoint = this.firstPoint;
        const secondPoint = this.secondPoint;

        const scalingValueNumber = Number(scalingValue);
        if (scalingValueNumber > 0) {
            this.referenceLength = scalingValueNumber;
            this.scalingInProgress = false;
            const referencePointDistance = calculateDistance(firstPoint, secondPoint);
            this.pixelsPerMetersRatio = referencePointDistance / this.referenceLength;
            gridContext.refreshGridResolution();
            
            scalingDialog.close();
            screenContext.toggleControls();
            tooltip.scalingFinished();
        } else {
            displayMessage('Érvénytelen méretarány. Csak pozitív szám adható meg!');
        }
    }

    ratioIsSet() {
        return Boolean(this.pixelsPerMetersRatio);
    }
    
    clear() {
        this.firstPoint = null;
        this.secondPoint = null;
        this.pixelsPerMetersRatio = null;
        gridContext.refreshGridResolution();
        roomContext.clear();
    }

}

const scaleContext = new ScaleContext();
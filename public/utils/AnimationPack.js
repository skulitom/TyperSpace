class AnimationPack
{

    constructor(dataArray, frameDelay, bLoop)
    {

        this.dataArray = dataArray;
        this.numOfFrames = dataArray.length;
        this.currFrameId = 0;
        this.frameDelay = frameDelay * 1000;
        this.frameTimeLeft = this.frameDelay;
        this.bLoop = bLoop; 

        this.bActive = false;

        this.currImg = this.dataArray[0];

    }

    getActive = () =>
    {
        return this.bActive;
    };

    startAnim = () =>
    {
        this.bActive = true;
        this.currImg = this.dataArray[0];
    };

    stopAnim = () =>
    {
        this.bActive = false;
    };

    render = (position, size) =>
    {

        if (!this.bActive)
        {
            return;
        }

        this.frameTimeLeft = this.frameTimeLeft - deltaTime;

        image(this.currImg, position.x, position.y, size.x, size.y);
        if (this.frameTimeLeft <= 0)
        {

            this.currFrameId = this.currFrameId + 1;
            if (this.currFrameId === this.numOfFrames)
            {
                this.currFrameId = 0;
                if (!this.bLoop)
                {
                    this.bActive = false;
                    return;
                }
            }

            this.currImg = this.dataArray[this.currFrameId];    
            this.frameTimeLeft = this.frameDelay;
            
        }

    };

}
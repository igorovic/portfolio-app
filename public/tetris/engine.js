class GameEngine {
    constructor() {
        this.state = "STOPPED";
        this.id = "";
        this.blocks = new Map();
    }
    getCtx() {
        const C = document.getElementById(this.id);
        if (C) {
            const context = C.getContext("2d");
            console.debug("context", context);
            return context;
        }
    }
    start() {
        console.debug("START");
        this.state = "RUNNING";
        this.interval = window.setInterval(
        //@ts-ignore
        window["TeTris"].run, 1000);
    }
    run() {
        //const ctx = this.getContext();
        console.debug("run", this.getCtx);
        //if (this.state !== "RUNNING" || !ctx) return;
        //console.log("running");
        /* this.blocks.set("currentBlock", new Block(ctx));
        console.debug(this.blocks?.entries()); */
        /* this.ctx?.clearRect(
          0,
          0,
          this.ctx.canvas.clientWidth,
          this.ctx.canvas.clientHeight
        ); */
        /* if (this.ctx) {
          console.log("add block");
          const b = new Block(this.ctx);
          b.draw();
        } */
    }
    initialize(canvasElementId) {
        this.id = canvasElementId;
        this.start();
    }
    dispose() {
        console.debug("dispose");
        window.clearInterval(this.interval);
    }
}
//@ts-ignore
window["TeTris"] = new GameEngine();
